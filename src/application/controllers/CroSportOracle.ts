import CronTime from "cron-time-generator";
import {send as sendTx, call as callTx, call} from "../insfrastructure/transaction";
import { CroSportEvent, CroSportOracle, EventOutcome, InitialCroSportEvent } from "../domain/CroSportsOracle";
import { addSportEvents, cancelSportEvents, declareOutcomes, eventExists, getEvents, getLiveEvents, getUpcomingEvents } from "../usecases/CroSportOracle";
import cron from "node-cron";
import { getFixture, getFixtureWithId, getLeague, getLeagues, getTeam, getUpcomingMatches } from "../insfrastructure/footballApi";
import { leagues as preferredLeagues } from "../../data/football/leagues";
import web3 from "../insfrastructure/CroWeb3";
import { cancelledStatuses, endedStatuses } from "../../data/football/status";
import { formatEvents } from "../../utils/format";
import { currentTimestamp, destructureDate } from "../../utils/date";
import delay from "delay";
import { dailyMatches, matchTime, playPeriod } from "../../data/football/variables";


class CroSportOracleController {
  contract : CroSportOracle;
  watchedEvents = new Map();

  constructor(contract : CroSportOracle){
    this.contract = contract;
  }


  // watches upcoming events and updates their score after full time
  async watchEvents(events: { fixture: Awaited<ReturnType<typeof getFixture>>[0], event: CroSportEvent }[]){
    console.log("watching");
    for(let i =0; i < events.length; i++){
      const {event, fixture} = events[i];
      if(this.watchedEvents.get(event.id)) {
        console.log("Already watching event 2");
        continue;
      }

      if(fixture.fixture.timestamp !== event.startTimestamp) {
        console.error("Discrepancy between timestamps", event.id);
        continue;
      }
      const date = new Date();
      date.setDate(date.getDate() + 1);
      const _date = new Date(+event.endTimestamp * 1000);

      // checks for possible events that have ended but lag due to blockchain time
      if(_date.getTime()/1000 < currentTimestamp()){
        _date.setTime((currentTimestamp() + 60)*1000);
      }

      const { seconds, minutes, hour, monthDay, month, weekDay } = destructureDate(_date);
      console.log(seconds, minutes, hour, monthDay, month, weekDay)

      cron.schedule(
        `${seconds} ${minutes} ${hour} ${monthDay} ${month + 1} ${weekDay}`,
        async () => {
          let declared = false;
          console.log("running");
          for(let i = 0; i<40 && !declared; i++){
            const _fixture = (await getFixtureWithId(fixture.fixture.id, event.startTimestamp))[0];
            const {teams, score} = _fixture;
            if( endedStatuses.indexOf(_fixture.fixture.status.short) > -1 ){
              console.log("b");

              const currentEventState: CroSportEvent = (await callTx(getEvents(this.contract, [event.id])))[0];

              if(+currentEventState.outcome === EventOutcome.Pending){
                console.log("i")
                if((score.fulltime.home !== null 
                  && score.fulltime.away !== null) 
                  && +(await web3.eth.getBlock("pending")).timestamp >= +event.endTimestamp + 30
                ){
                  console.log("a")
                  await this.declareOutcomes([
                  {
                    id: event.id,
                    scoreA: event.teamA === teams.home.name ? score.fulltime.home: score.fulltime.away,
                    scoreB: event. teamB === teams.away.name ? score.fulltime.away: score.fulltime.home
                  }]);
                  }
                }
              
            } else if( cancelledStatuses.indexOf(fixture.fixture.status.short) > -1 ){
              const currentEventState: CroSportEvent = (await callTx(getEvents(this.contract, [event.id])))[0];
              if(currentEventState.outcome === EventOutcome.Pending){
                await this.cancelEvents([event.id]);
              }
            }

            const currentEventState: CroSportEvent = (await callTx(getEvents(this.contract, [event.id])))[0];
            if(+currentEventState.outcome !== EventOutcome.Pending) declared = true;

            // delay for 3 minutes
            (process.env.NODE_ENV === "development") ? await delay(10000) :  await delay(60000 * 3);
          }
        },
        {
          timezone: "Etc/UTC",
        }
      )

      this.watchedEvents.set(event.id, true);
    }
  }

  // checks for Events and updates them or watches them with watchEvents
  async checkEvents(){
    console.log("checking");
    const upcomingEvents: CroSportEvent[] = formatEvents(await callTx(getUpcomingEvents(this.contract)));
    const liveEvents: CroSportEvent[] = formatEvents(await callTx(getLiveEvents(this.contract)));
    upcomingEvents.push(...liveEvents);
    const cancelledEvents = [];
    const endedEvents = [];
    const eventsToWatch = [];

    for(let i = 0; i<upcomingEvents.length; i++){
      const {teamA, teamB, league, season, round, startTimestamp, id, endTimestamp} = upcomingEvents[i];
      if(this.watchedEvents.get(id)) { console.log("Already watching event 1"); continue; } ;
      const date = new Date(startTimestamp).toISOString().split('T')[0];
      const teamId = (await getTeam(teamA)).team.id;
      const leagueId = (await getLeague(league)).league.id;
      const fixture = (await getFixture(teamId, leagueId, +season, round, date, startTimestamp))[0];
      const {teams, score} = fixture;

      if( cancelledStatuses.indexOf(fixture.fixture.status.short) > -1 ){
        cancelledEvents.push(id);
      } 
      else if(
        endedStatuses.indexOf(fixture.fixture.status.short) > -1 &&
        +(await web3.eth.getBlock("pending")).timestamp >= +endTimestamp + 30
      ){
        if(score.fulltime.home === null || score.fulltime.away === null){ continue };
        endedEvents.push({
          id: id, 
          scoreA: teamA === teams.home.name ? score.fulltime.home: score.fulltime.away,
          scoreB: teamB === teams.away.name ? score.fulltime.away: score.fulltime.home
        });
      } else{
        eventsToWatch.push({fixture, event:upcomingEvents[i]});
      }
    }

    if(cancelledEvents.length>1){ await this.cancelEvents(cancelledEvents) };
    if(endedEvents.length>1){ await this.declareOutcomes(endedEvents) };
    if(eventsToWatch.length>1){ await this.watchEvents(eventsToWatch) };
  }

  async declareOutcomes(events: {id: string, scoreA: number, scoreB: number}[]){
    await sendTx(declareOutcomes(this.contract, events),
      (status: boolean, message) => status 
        ? console.log(`Declared events: ${events.map((e) => e.id).join(", ")}. Txhash: ${message}`)
        : console.log(`Failed to declare events: ${events.map((e) => e.id).join(", ")}. ${message}`)
    )
  }

  async cancelEvents(events: string[]){
    await sendTx(cancelSportEvents(this.contract, events), 
      (status: boolean, message) => status 
        ? console.log(`Canceled events: ${events.join(", ")}. Txhash: ${message}`)
        : console.log(`Failed to cancel events: ${events.join(", ")}. ${message}`)
    );
  }

  async addNewEvents(length: number, from: string, to: string){
    const _leagues = await getLeagues();
    let leagueData : {season: number | undefined, leagueId: number}[] = _leagues.map( ({league, seasons}) => (
      {leagueId: league.id, season: seasons[seasons.length-1].current ? seasons.pop()?.year : undefined})
    );
    leagueData = leagueData.filter(({season, leagueId}) => season !== undefined);

    let _preferredLeagues: typeof leagueData = [];

    for(let i = 0; i < leagueData.length; i++){
      const id  = leagueData[i].leagueId
      if(preferredLeagues.indexOf(id) > -1){
        _preferredLeagues.push(leagueData[i]);
        const last = leagueData.pop();
        if(last !== undefined && leagueData.length > 1) leagueData[i] = last;
      }
    }

    _preferredLeagues.sort((a, b) => {
      return preferredLeagues.indexOf(a.leagueId) < preferredLeagues.indexOf(b.leagueId) ?
        -1 : 1;
    });

    leagueData.unshift(..._preferredLeagues);

    let upcomingMatches: InitialCroSportEvent[] = [];

    for(let i = 0; i < leagueData.length && upcomingMatches.length < length; i++){
      const {leagueId, season} = leagueData[i];
      const matches = await getUpcomingMatches(from, to, leagueId, season);
      console.log("before mapping");
      // @ts-ignore
      let _matches: InitialCroSportEvent[] = ( 
        await Promise.all( 
          matches.map( async (match): Promise<InitialCroSportEvent|undefined> => {
            const _match = {
              teamA: match.teams.home.name,
              teamB: match.teams.away.name,
              league: match.league.name,
              round: match.league.round,
              season: match.league.season,
              startTimestamp: match.fixture.timestamp,
              endTimestamp: match.fixture.timestamp + matchTime,
            }
            const eventId = web3.utils.soliditySha3(
              _match.teamA, _match.teamB, _match.league, _match.round,  
              {type: "uint16", value: String(_match.season)},
              _match.startTimestamp
            )!;
            
            const exists = await callTx(eventExists(this.contract, eventId));
            return !exists ? _match : undefined;
          })
        )
      ).filter(match => match !== undefined);
      console.log("after mapping");
      
      _matches = (_matches);
      upcomingMatches = [...upcomingMatches, ..._matches];
    }

    upcomingMatches = upcomingMatches.slice(0, length);
    await sendTx(
      addSportEvents(this.contract, upcomingMatches), 
      (status: boolean, message) => status 
        ? console.log(`Added events for ${from}. Txhash: ${message}`)
        : console.log(`Failed to add events. ${message}`)
    );
  }

  async scheduleAddEvent(){
    const length = dailyMatches;
    const addEvents = async () => {
      console.log("adding")
      const upcomingEvents: CroSportEvent[] = formatEvents(await callTx(getUpcomingEvents(this.contract)));

      // add events for today
      let date = new Date();
      let from = date.toISOString().split('T')[0];
      let present1 = false, present2 = false;
      console.log("adding 2")
      for(let i =0; i < upcomingEvents.length; i++){
        const event = upcomingEvents[i];
          if( process.env.NODE_ENV === "development" ) {
            const time = currentTimestamp();
            if(!present1) present1 = +event.startTimestamp > time && event.startTimestamp < time + playPeriod;
            continue;
          }
          if(!present1) present1 = new Date(event.startTimestamp).toISOString().split('T')[0] === from
      }

      console.log(present1);
      
      if(!present1) await this.addNewEvents(length, from, from);

      // add events for tomorrow
      date.setDate(date.getDate() + 1);
      from = date.toISOString().split("T")[0];

      for(let i = 0; i < upcomingEvents.length; i++){
        const event = upcomingEvents[i];
        if( process.env.NODE_ENV === "development" ) {
            const time = currentTimestamp() + playPeriod;
            if(!present2) present2 = +event.startTimestamp > time && event.startTimestamp < time + playPeriod*2;
            continue;
          }
          
        if(!present2) present2 = new Date(event.startTimestamp).toISOString().split('T')[0] === from
      };
      console.log(present2);

      if(!present2) await this.addNewEvents(length, from, from);
    };
    
    
    await addEvents();
    await this.checkEvents();

    cron.schedule(
      process.env.NODE_ENV === "development" 
        ? CronTime.every(playPeriod/60).minutes() 
        : CronTime.everyDayAt(0, 0), 
      async () => {
        await addEvents();
        await this.checkEvents();
      }
    );
  }
}

export default CroSportOracleController;
