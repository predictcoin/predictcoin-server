import CronTime from "cron-time-generator";
import {send as sendTx, call as callTx, call} from "../../utils/transaction";
import { CroSportEvent, CroSportOracle } from "../domain/CroSportsOracle";
import { addSportEvents, cancelSportEvents, eventExists, getLiveEvents, getUpcomingEvents } from "../usecases/CroSportOracle";
import cron from "node-cron";
import { getFixture, getFixtureWithId, getLeague, getLeagues, getTeam, getUpcomingMatches } from "../../utils/footballApi";
import { leagues, leagues as preferredLeagues } from "../../data/football/leagues";
import { time } from "console";
import web3 from "../insfrastructure/CroWeb3";
import { cancelledStatuses, endedStatuses } from "../../data/football/status";
import { formatEvents } from "../../utils/format";
import { Fixture } from "../../types/football";
import { destructureDate } from "../../utils/date";
import delay from "delay";

const matchTime = process.env.NODE_ENV === "development" ? 2*60 : 105*60;

class CroSportOracleController {
  contract : CroSportOracle;

  constructor(contract : CroSportOracle){
    this.contract = contract;
  }


  // watches upcoming events and updates their score after full time
  async watchEvents(events: { fixture: Awaited<ReturnType<typeof getFixture>>[0], event: CroSportEvent }[]){
    for(let i =0; i < events.length; i++){
      const {event, fixture} = events[i];
      if(fixture.fixture.timestamp !== event._startTimestamp) {
        console.error("Discrepancy between timestamps", event._eventId);
      }
      const date = new Date();
      date.setDate(date.getDate() + 1);
      if( Math.trunc(date.getTime()/1000 ) > fixture.fixture.timestamp) continue;
      const _date = new Date(+event._endTimestamp * 1000);

      const { seconds, minutes, hour, monthDay, month, weekDay } = destructureDate(_date);


      cron.schedule(
        `${seconds} ${minutes} ${hour} ${monthDay} ${month + 1} ${weekDay}`,
        async () => {
          let declared = false;
          for(let i =0; i<40 || declared === true; i++){
            const _fixture = (await getFixtureWithId(fixture.fixture.id))[0];
            const {teams, score} = _fixture;
            if( endedStatuses.indexOf(_fixture.fixture.status.short) > -1 ){
              await this.declareOutcomes([
                {
                  eventId: event._eventId!,
                  teamA: event._teamA === teams.home.name ? score.fulltime.home!: score.fulltime.away!,
                  teamB:event. _teamB === teams.away.name ? score.fulltime.away!: score.fulltime.home!
                }])
              declared = true;
            } else if( cancelledStatuses.indexOf(fixture.fixture.status.short) > -1 ){
              await this.cancelEvents([event._eventId!]);
              declared = true;
            } else{
              // delay for 3 minutes
              delay(60000 * 3);
            }
          }
        }
      )
    }
  }

  // checks for Events and updates them or watches them with watchEvents
  async checkEvents(){
    const upcomingEvents: CroSportEvent[] = formatEvents(await callTx(getUpcomingEvents(this.contract)));
    const liveEvents: CroSportEvent[] = formatEvents(await callTx(getLiveEvents(this.contract)));
    upcomingEvents.push(...liveEvents);
    const cancelledEvents = [];
    const endedEvents = [];
    const eventsToWatch = [];

    for(let i = 0; i<upcomingEvents.length; i++){
      const {_teamA, _teamB, _league, _season, _round, _startTimestamp, _eventId} = upcomingEvents[i];
      const date = new Date(_startTimestamp).toISOString().split('T')[0];
      const teamId = (await getTeam(_teamA)).team.id;
      const leagueId = (await getLeague(_league)).league.id;
      const fixture = (await getFixture(teamId, leagueId, +_season, _round, date))[0];
      const {teams, score} = fixture;
      if( cancelledStatuses.indexOf(fixture.fixture.status.short) > -1 ){
        cancelledEvents.push(_eventId!);
      } else if(endedStatuses.indexOf(fixture.fixture.status.short) > -1){

        endedEvents.push({
          eventId: _eventId!, 
          teamA: _teamA === teams.home.name ? score.fulltime.home!: score.fulltime.away!,
          teamB: _teamB === teams.away.name ? score.fulltime.away!: score.fulltime.home!
        });

      } else{
        eventsToWatch.push({fixture, event:upcomingEvents[i]});
      }
    }
    if(cancelledEvents.length>1){ await this.cancelEvents(cancelledEvents) };
    if(endedEvents.length>1){ await this.declareOutcomes(endedEvents) };
    if(eventsToWatch.length>1){ await this.watchEvents(eventsToWatch) };
  }

  async declareOutcomes(event: {eventId: string, teamA: number, teamB: number}[]){

  }

  async cancelEvents(events: string[]){
    await sendTx(cancelSportEvents(this.contract, events));
  }

  async addNewEvents(length: number, from: string, to: string){
    const _leagues = await getLeagues();

    let leagueData : {season: number | undefined, leagueId: number}[] = _leagues.map( ({league, seasons}) => (
      {leagueId: league.id, season: seasons[seasons.length-1].current ? seasons.pop()?.year : undefined})
    );
    leagueData = leagueData.filter(({season, leagueId}) => season !== undefined);

    let _preferredLeagues: typeof leagueData = [];
    

    for(let i = 0; i < leagueData.length; i++){
      const id  = leagueData[i].leagueId!
      if(preferredLeagues.indexOf(id) > -1){
        _preferredLeagues.push(leagueData[i]);
        const last = leagueData.pop()!;
        leagueData[i] = last;
      }
    }

    _preferredLeagues.sort((a, b) => {
      return preferredLeagues.indexOf(a.leagueId) < preferredLeagues.indexOf(b.leagueId) ?
        -1 : 1;
    });
    leagueData.unshift(..._preferredLeagues);

    let upcomingMatches: CroSportEvent[] = [];
    for(let i = 0; i < leagueData.length && upcomingMatches.length <= length; i++){
      const {leagueId, season} = leagueData[i];
      const matches = await getUpcomingMatches(from, to, leagueId, season!);
      // @ts-ignore
      let _matches: CroSportEvent[] = matches.map(async (match): Promise<CroSportEvent|undefined> => {
        const _match = {
          _teamA: match.teams.home.name,
          _teamB: match.teams.away.name,
          _league: match.league.name,
          _round: match.league.round,
          _season: match.league.season,
          _startTimestamp: match.fixture.timestamp,
          _endTimestamp: match.fixture.timestamp + matchTime
        }
        const eventId = web3.utils.soliditySha3(
          _match._teamA, _match._teamB, _match._league, _match._round, 
          {type: "uint16", value: _match._round}
        );
        
        const exists = await callTx(eventExists(this.contract, eventId!))
        return exists ? _match : undefined;

      }).filter(match => match !== undefined);
      _matches = await(Promise.all(_matches));

      upcomingMatches = [...upcomingMatches, ..._matches]
    }

    upcomingMatches = upcomingMatches.slice(0, length);

    sendTx(addSportEvents(this.contract, upcomingMatches));
  }

  scheduleAddEvent(){
    const length = process.env.NODE_ENV === "development" ? 3 : 10;
    cron.schedule(CronTime.everyDayAt(0, 0), 
      async () => {
        const upcomingEvents: CroSportEvent[] = formatEvents(await callTx(getUpcomingEvents(this.contract)));
        let date = new Date();
        const from = date.toISOString().split('T')[0];
        await this.addNewEvents(length, from, from);
        
        if(upcomingEvents.length === 0){
          date.setDate(date.getDate() + 1);
          const from = date.toISOString().split("T")[0];
          await this.addNewEvents(length, from, from);
        }
      }
    );
  }
}

export default CroSportOracleController;
