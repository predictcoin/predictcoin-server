import CronTime from "cron-time-generator";
import {send as sendTx, call as callTx, call} from "../insfrastructure/transaction";
import { CroSportEvent, CroSportOracle, EventOutcome, InitialCroSportEvent } from "../domain/CroSportsOracle";
import { addSportEvents, cancelSportEvents, declareOutcomes, eventExists, getEvents, getLiveEvents, getUpcomingEvents } from "../usecases/CroSportOracle";
import cron from "node-cron";
import { getFixture, getFixtures, getLeague, getLeagues } from "../insfrastructure/footballApi";
import { leagues as preferredLeagues } from "../../data/football/leagues";
import web3 from "../insfrastructure/CroWeb3";
import { cancelledStatuses, endedStatuses } from "../../data/football/status";
import { formatEvents } from "../../utils/format";
import { currentTimestamp, destructureDate } from "../../utils/date";
import delay from "delay";
import { dailyMatches, matchTime, playPeriod } from "../../data/football/variables";
import logger from "../../utils/logger";
import { apiFixture } from "../../types/football";
import Bugsnag from "@bugsnag/js";


const runSendTx =  async (tx: (_:any) => Promise<void>) => {
  for( let i = 0; i < 10 ; i++){
    let status = false;
    const receiveStatus = (_status: boolean) => {status = _status };
    await tx(receiveStatus);
    console.log("status", status);
    // @ts-ignore
    if(status === true) break;
  }   
}

class CroSportOracleController {
  contract : CroSportOracle;
  watchedEvents = new Map();

  constructor(contract : CroSportOracle){
    this.contract = contract;
  }


  // watches upcoming events and updates their score after full time
  async watchEvents(events: { fixture: Awaited<ReturnType<typeof getFixture>>, event: CroSportEvent }[]){
    console.log("watching");
    for(let i =0; i < events.length; i++){
      const {event, fixture} = events[i];
      if(this.watchedEvents.get(event.id)) {
        console.log(`Already watching Event ${event.id}`);
        logger.info(`Already watching Event ${event.id}`)
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
            const _fixture = (await getFixture({
              teamA: fixture.teams.home.name,
              teamB: fixture.teams.away.name,
              league: fixture.league.name,
              season: fixture.league.season,
              round: fixture.league.round,
              date: new Date(+event.startTimestamp*1000).toISOString().split('T')[0],
              timestamp: +event.startTimestamp
            }));
            if(!_fixture) {
              await this.cancelEvents([event.id]);
              break;
            };

            const {teams, score} = _fixture;
            const currentEventStates: CroSportEvent[] = (await callTx(getEvents(this.contract, [event.id])));
            if( !currentEventStates || currentEventStates.length === 0) continue;
            const currentEventState = currentEventStates[0];

            if( endedStatuses.indexOf(_fixture.fixture.status.short) > -1 ){

              if(+currentEventState.outcome === EventOutcome.Pending){
                if((score.fulltime.home !== null 
                  && score.fulltime.away !== null) 
                  && +(await web3.eth.getBlock("pending")).timestamp >= +event.endTimestamp + 30
                ){
                  await this.declareOutcomes([
                  {
                    id: event.id,
                    scoreA: event.teamA === teams.home.name ? score.fulltime.home: score.fulltime.away,
                    scoreB: event. teamB === teams.away.name ? score.fulltime.away: score.fulltime.home
                  }]);
                  }
                }
              
            } else if( cancelledStatuses.indexOf(fixture.fixture.status.short) > -1 ){
              
              if(currentEventState.outcome === EventOutcome.Pending){
                await this.cancelEvents([event.id]);
              }
            }

            const _currentEventStates: CroSportEvent[] = (await callTx(getEvents(this.contract, [event.id])));
            if( !currentEventStates || currentEventStates.length === 0) continue;
            const _currentEventState = _currentEventStates[0];
            if(+_currentEventState.outcome !== EventOutcome.Pending) declared = true;
            if(declared === true || i === 29){
              this.watchedEvents.delete(event.id);
            }
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

    const cancelledEvents: string[] = [];
    const endedEvents: { id: string; scoreA: number; scoreB: number; }[] = [];
    const eventsToWatch = [];
    const availableFixtures: {[key: string]: apiFixture[]} = {};

    for(let i = 0; i<upcomingEvents.length; i++){
      const {teamA, teamB, league, season, round, startTimestamp, id, endTimestamp} = upcomingEvents[i];
      if(this.watchedEvents.get(id)) { 
        console.log(`Already watching Event ${id}`);
        logger.info(`Already watching Event ${id}`)
        continue; 
      } 

      const date = new Date(+startTimestamp*1000).toISOString().split('T')[0];

      let fixtures;
      if(!availableFixtures[date]){
        fixtures = await getFixtures({ date });
        availableFixtures[date] = fixtures;
      }else{
        fixtures = availableFixtures[date];
      }

      const fixture = (await getFixture(
        {fixtures, teamA, teamB, league, season: +season, round, date, timestamp: +startTimestamp}
      ));
      if(!fixture) {
        cancelledEvents.push(id);
        continue;
      }
      const {teams, score} = fixture;

      if( cancelledStatuses.indexOf(fixture.fixture.status.short) > -1 || !fixture ){
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

    if(cancelledEvents.length>0){ 
      await runSendTx(
        async (callback: (_:boolean)=> void) => 
          await this.cancelEvents(cancelledEvents, callback, true)
      )
    };
    if(endedEvents.length>0){ 
      await runSendTx(
        async (callback: (_:boolean)=> void) => 
          await this.declareOutcomes(endedEvents, callback, true)
      )
    };
    if(eventsToWatch.length>0){ await this.watchEvents(eventsToWatch) };
  }

  checkOutcome = async (
    {id, _delay, callback}: {id: string, _delay?: boolean, callback?: (...params: any[]) => any}
    ) => {
      _delay && await delay(2000)
      const event: CroSportEvent = (await callTx(getEvents(this.contract, [id])))[0];
      const status = event.outcome !== EventOutcome.Pending;
      callback && callback(status);
  }

  async declareOutcomes(events: {id: string, scoreA: number, scoreB: number}[], 
    callback?: (...params: any[]) => any,
    _delay?: boolean
  ){
    await sendTx(declareOutcomes(this.contract, events),
      (status: boolean, txHash) => {
        const message = status 
          ? `Declared events: ${events.map((e) => e.id).join(", ")}. Txhash: ${txHash}`
          : `Failed to declare events: ${events.map((e) => e.id).join(", ")}. ${txHash}`;
        console.log(message);
        logger.info(message);
        !status && Bugsnag.notify(new Error(message));
        this.checkOutcome({id: events[0].id, callback, _delay});
      }
    )
  }

  async cancelEvents(events: string[], callback?: (...params: any[]) => any, _delay?: boolean){
    await sendTx(cancelSportEvents(this.contract, events), 
      (status: boolean, txHash) => {
        const message = status 
          ? `Canceled events: ${events.join(", ")}. Txhash: ${txHash}`
          : `Failed to cancel events: ${events.join(", ")}. ${txHash}`;
        console.log(message);
        logger.info(message);
        !status && Bugsnag.notify(new Error(message));
        this.checkOutcome({id: events[0], callback, _delay});
      }
    );
  }

  async addNewEvents(length: number, date: string, callback?: (...params: any[]) => any){
    const _leagues = await getLeagues();
    let leagueData : {season: number | undefined, leagueName: string, leagueId: number}[] = _leagues.map( ({league, seasons}) => (
      {leagueId: league.id, 
        leagueName: league.name, 
        season: seasons[seasons.length-1].current ? seasons.pop()?.year : undefined})
    );
    leagueData = leagueData.filter(({season, leagueName}) => season !== undefined);

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
    const fixtures = await getFixtures({ date, status: "NS" });
    const blocktime = +(await web3.eth.getBlock("pending")).timestamp +
      (process.env.NODE_ENV === "development" ? 0 : 3600);

    for(let i = 0; i < leagueData.length && upcomingMatches.length < length; i++){
      const { leagueName, leagueId } = leagueData[i];
      const matches = fixtures.filter( fixture => 
        fixture.league.name === leagueName 
          && fixture.league.id === leagueId 
          && +(fixture.fixture.timestamp) > blocktime
      );

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

      _matches = (_matches);
      upcomingMatches = [...upcomingMatches, ..._matches];
    }

    upcomingMatches = upcomingMatches.slice(0, length);

    upcomingMatches.length > 0 
      && await sendTx(
          addSportEvents(this.contract, upcomingMatches), 
          (status: boolean, txHash) => {
            const message = status 
              ? `Added events for ${date}. Txhash: ${txHash}`
              : `Failed to add events for ${date}. ${txHash}`;
            console.log(message);
            logger.info(message);
            !status && Bugsnag.notify(new Error(message));
            callback && callback(status);
          }
        );
  }

  checkEventsPresent = async ({from, _delay} : {from: string, _delay?: boolean}): Promise<boolean> => {
    _delay && await delay(2000);
    let present = false;
    const upcomingEvents: CroSportEvent[] = formatEvents(await callTx(getUpcomingEvents(this.contract)));
    for(let i =0; i < upcomingEvents.length && !present; i++){
      const event = upcomingEvents[i];
        if( process.env.NODE_ENV === "development" ) {
          const time = currentTimestamp();
          present = +event.startTimestamp > time && event.startTimestamp < time + playPeriod;
        }else{
          present = new Date(+event.startTimestamp*1000).toISOString().split('T')[0] === from
        }
    }
    
    return present;
  }

  async scheduleAddEvent(){
    const length = dailyMatches;
    const addEvents = async () => {
      // add events for today
      let date = new Date();
      let from = date.toISOString().split('T')[0];
      let present1: boolean, present2: boolean;
      present1 = await this.checkEventsPresent({from})
      if(present1) console.log("Events already present on CRO for " + from)

      const checkTxSuccess = (from: string, callback: (status: boolean) => void) => async () => {
        const success = await this.checkEventsPresent({from, _delay: true});
        console.log("success", success);
        //callback(success);
      }

      if(!present1) {
        await runSendTx(
          async (callback: (status: boolean) => void) => 
            await this.addNewEvents(length, from, checkTxSuccess(from, callback))
        );
      }

      // add events for next day
      date.setDate(date.getDate() + 1);
      from = date.toISOString().split("T")[0];
      present2 = await this.checkEventsPresent({from});
      if(present2) console.log("Events already present on CRO for " + from)

      if(!present2) {
        await runSendTx(
          async (callback: (status: boolean) => void) => 
            await this.addNewEvents(length, from, checkTxSuccess(from, callback))
        );
      }
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
      },
      {
        timezone: "Etc/UTC",
      }
    );
  }
}

export default CroSportOracleController;
