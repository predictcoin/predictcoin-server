import axios from "axios";
import {Request} from "express";
import { getMockFixtureWithTeam, getMockFixtures, mockLeague, mockTeams } from "../../mock/football";
import { apiFixture, apiLeague, Country, Fixture, FixtureLeague, FixtureTeam, Goals, League, Score, Season, Status, Team } from "../../types/football";
import logger from "../../utils/logger";
import Bugsnag from "../../utils/notification";

const rapidKey = process.env.RAPID_API_KEY;


const footballApi = axios.create({
  baseURL: "https://api-football-v1.p.rapidapi.com/v3",
  headers: {
    'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
    'x-rapidapi-key': rapidKey!
  }
});


const handleCall = <T1, T2>(call: (params: T1)=> T2) => {
  return async (params:T1) => {
    try{
      const result = await call(params)
      return result;
    }catch(error: any){
      console.warn((error as any).message);
      logger.error(error.message);
      Bugsnag.notify(new Error(error.message));
      throw new Error(error.message)
    }
  }
}

export  const callFootballApi = async (request: Request | 
  {query: {[key: string]: number|string}}) => {
  const url = request.query.url as string;
  const params = request.query as {[key: string]: string};
  delete(params.url);
  let response = await footballApi.get(
    url, {
      params,
    }
  )
  return response;
}

type getUpcomingFixturesInput = {league: string, fixtures: apiFixture[]};

export const getUpcomingFixtures = handleCall<getUpcomingFixturesInput, Promise<apiFixture[]>>
  (async (param: getUpcomingFixturesInput): Promise<
    apiFixture[]
    > => {
    const {league, fixtures} = param;
    return fixtures.filter( fixture => fixture.league.name === league)
})

type getLeagueReturn = {league: League, country: Country, seasons: Season[]};

export const getLeague = handleCall<{name: string}, Promise<getLeagueReturn>>
  (async(param: {name: string}): Promise<apiLeague> => {
    const {name} = param;
    if(process.env.NODE_ENV === "development") return mockLeague;
    const { data } = await callFootballApi({query: {url: "/leagues", name}});
    return (data as any).response[0];
})

export const getLeagues = handleCall<void, Promise<apiLeague[]>>
  (async (): Promise<{league: League, country: Country, seasons: Season[]}[]> => {
    if(process.env.NODE_ENV === "development") return [JSON.parse(JSON.stringify(mockLeague))];
    const {data} = await callFootballApi({query: {url: "/leagues"}})
    return (data as any).response
})

export const getTeam = handleCall<{name: string, country: string}, Promise<{team:Team}>>
  (async(param: {name: string, country: string}): Promise<{team: Team}> => {
    const {name, country} = param;
    if(process.env.NODE_ENV === "development") return mockTeams[name as keyof typeof mockTeams];
    const {data} = await callFootballApi({query: {url: "/teams", name}});
    return (data as any).response.filter((team:{team: Team}) => {
      return country.toLowerCase() === team.team.country.toLowerCase()}
      )[0];
})

type getFixtureInput = {teamA: string, teamB: string, league:string, season: number, round: string, 
      date:string, fixtures?: apiFixture[], timestamp: number};

export const getFixture = handleCall<getFixtureInput, Promise<apiFixture>>
  (async(param: getFixtureInput)
    : Promise<apiFixture> => {
      let { teamA, teamB, league, season, date, fixtures, timestamp } = param;

      if(process.env.NODE_ENV === "development" && timestamp) return getMockFixtureWithTeam(teamA, timestamp);
      fixtures = !fixtures ? await getFixtures({date}) : fixtures;
      const fixture = fixtures.filter((fixture:apiFixture) => {
        return fixture.fixture.date.split("T")[0] === date
          && (fixture.teams.away.name === teamA || fixture.teams.home.name === teamA)
          && (fixture.teams.away.name === teamB || fixture.teams.home.name === teamB)
          && fixture.league.name === league
          && fixture.league.season === season
      })[0]

      return fixture;
})

export const getFixtures = handleCall<{date:string, status?: Status}, Promise<apiFixture[]>>
  (async (param: {date: string, status?: Status})
    : Promise<apiFixture[]> => {
      const {date, status} = param;
      if(process.env.NODE_ENV === "development") return getMockFixtures(date);
      const {data} = await callFootballApi({
        query: {url: "/fixtures",
          date,
        ...(status ? {status} : {}) 
      }});
      return (data as any).response;
})


