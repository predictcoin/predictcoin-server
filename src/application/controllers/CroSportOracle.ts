import CronTime from "cron-time-generator";
import {send as sendTx, call as callTx, call} from "../../utils/transaction";
import { CroSportEvent, CroSportOracle } from "../domain/CroSportsOracle";
import { addSportEvents, eventExists, getUpcomingEvents } from "../usecases/CroSportOracle";
import cron from "node-cron";
import { getFixture, getLeague, getLeagues, getTeam, getUpcomingMatches } from "../../utils/footballApi";
import { leagues, leagues as preferredLeagues } from "../../data/football/leagues";
import { time } from "console";
import web3 from "../insfrastructure/CroWeb3";

class CroSportOracleController {
  contract : CroSportOracle;

  constructor(contract : CroSportOracle){
    this.contract = contract;
  }

  async watchEvents(){
    const upcomingEvents: CroSportEvent[] = await callTx(getUpcomingEvents(this.contract));
    let date = new Date();
    const timestamp = date.setDate(date.getDate() + 1);
    const events = upcomingEvents.filter(event => event.startTimestamp > timestamp);
  }

  async checkEvents(){
    const upcomingEvents: CroSportEvent[] = await callTx(getUpcomingEvents(this.contract));
    for(let i = 0; i<upcomingEvents.length; i++){
      const {teamA, league, season, round, startTimestamp} = upcomingEvents[i];
      const date = new Date(startTimestamp).toISOString().split('T')[0];
      const teamId = (await getTeam(teamA)).team.id;
      const leagueId = (await getLeague(league)).league.id;
      const fixture = await getFixture(teamId, leagueId, +season, round, date);
      
    }
  }

  declareOutcomes(eventIds: string[]){

  }

  updateEvents(){

  }

  cancelEvents(){
    
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

    let upcomingMatches: Awaited<ReturnType<typeof getUpcomingMatches>> = [];
    for(let i = 0; i < leagueData.length && upcomingMatches.length <= length; i++){
      const {leagueId, season} = leagueData[i];
      const matches = await getUpcomingMatches(from, to, leagueId, season!);
      const _matches = matches.map(async (match): Promise<CroSportEvent|undefined> => {
        const _match = {
          teamA: match.teams.home.name,
          teamB: match.teams.away.name,
          league: match.league.name,
          round: match.league.round,
          season: match.league.season,
          startTimestamp: match.fixture.timestamp,
          endTimestamp: match.fixture.timestamp + 45 * 60
        }
        const eventId = web3.utils.soliditySha3(
          _match.teamA, _match.teamB, _match.league, _match.round, 
          {type: "uint16", value: _match.round}
        );
        
        const exists = await callTx(eventExists(this.contract, eventId!))
        return exists ? _match : undefined;

      }).filter(match => match !== undefined);

      upcomingMatches = [...upcomingMatches, ...matches]
    }

    upcomingMatches = upcomingMatches.slice(0, length);
    console.log(upcomingMatches);

    // sendTx(addSportEvents(this.contract, _upcomingMatches));

  }

  scheduleAddEvent(){
    cron.schedule(CronTime.everyDayAt(0, 0), 
      async () => {
        const upcomingEvents: CroSportEvent[] = await callTx(getUpcomingEvents(this.contract));
        let date = new Date();
        const from = date.toISOString().split('T')[0];
        await this.addNewEvents(10, from, from);
        
        if(upcomingEvents.length === 0){
          date.setDate(date.getDate() + 1);
          const from = date.toISOString().split("T")[0];
          await this.addNewEvents(10, from, from);
        }
      }
    );
  }
}

export default CroSportOracleController;
