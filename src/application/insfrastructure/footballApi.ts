import axios from "axios";
import {Request} from "express";
import { getMockFixtureWithId, getMockFixtureWithTeamId, getMockUpcomingMatches, mockLeague, mockTeams } from "../../mock/football";
import { Country, Fixture, FixtureLeague, FixtureTeam, Goals, League, Score, Season, Status, Team } from "../../types/football";
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


const handleCall = <T>(call: (..._: any)=> T) => {
  return async (...params:any) => {
    try{
      const result = await call(...params)
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

export const getUpcomingMatches = handleCall(async (from: string, to: string, league: number, season: number): Promise<
  {fixture: Fixture, league: FixtureLeague, teams: { home:FixtureTeam, away:FixtureTeam }, goals: Goals, score: Score}[]
  > => {
  if(process.env.NODE_ENV === "development") return getMockUpcomingMatches(from);
    
  if(from === to){
    const { data } = await callFootballApi({query: {url: "/fixtures", date: from, status: "NS", league, season}});
    return (data as any).response;
  }else {
    const { data } = await callFootballApi({query: {url: "/fixtures", from, to, status: "NS", league, season}});
    return (data as any).response;
  }
})

export const getLeague = handleCall(async(name: string): Promise<{league: League, country: Country, seasons: Season[]}> => {
  if(process.env.NODE_ENV === "development") return mockLeague;
  const { data } = await callFootballApi({query: {url: "/leagues", name}})
  return (data as any).response[0];
})

export const getLeagues = handleCall(async (): Promise<{league: League, country: Country, seasons: Season[]}[]> => {
  if(process.env.NODE_ENV === "development") return [JSON.parse(JSON.stringify(mockLeague))];
  const {data} = await callFootballApi({query: {url: "/leagues"}})
  return (data as any).response
})

export const getTeam = handleCall(async(name: string): Promise<{team: Team}> => {
  if(process.env.NODE_ENV === "development") return mockTeams[name as keyof typeof mockTeams];
  const {data} = await callFootballApi({query: {url: "/teams", name}});
  return (data as any).response;
})

export const getFixture = handleCall(async(team: number, league: number, season: number, round: string, date: string, timestamp?: number)
  : Promise<
    {fixture: Fixture, league: FixtureLeague, teams: { home:FixtureTeam, away:FixtureTeam }, goals: Goals, score: Score}[]
  > => {
    if(process.env.NODE_ENV === "development" && timestamp) return [getMockFixtureWithTeamId(team, timestamp) ];
    const {data} = await callFootballApi({query: {url: "/fixtures", team, league, season, round, date}})
    return (data as any).response;
})

export const getFixtureWithId = handleCall(async(id: number, timestamp?: number)
  : Promise<
    {fixture: Fixture, league: FixtureLeague, teams: { home:FixtureTeam, away:FixtureTeam }, goals: Goals, score: Score}[]
  > => {
    if(process.env.NODE_ENV === "development" && timestamp) return [getMockFixtureWithId(id, timestamp)];
    const {data} = await callFootballApi({query: {url: "/fixtures", id}})
    return (data as any).response;
})
