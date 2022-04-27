import axios, { AxiosRequestConfig } from "axios";
import {Request} from "express";
import { getMockFixtureWithId, getMockFixtureWithTeamId, getMockUpcomingMatches, mockLeague, mockTeams } from "../mock/football";
import { Country, Fixture, FixtureLeague, FixtureTeam, Goals, League, Score, Season, Status, Team } from "../types/football";
import { call } from "./transaction";

const rapidKey = process.env.RAPID_API_KEY;

const footballApi = axios.create({
  baseURL: "https://api-football-v1.p.rapidapi.com/v3",
  headers: {
    'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
    'x-rapidapi-key': rapidKey!
  }
});


const handleCall = <T>(call: (...param: any)=> T) => {
  return async (...params:any) => {
    try{
      const result = await call()
      return result;
    }catch(error){
      console.warn((error as any).message)
      throw(error)
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
  if(process.env.NODE_ENV === "development") return [mockLeague];
  const {data} = await callFootballApi({query: {url: "/leagues"}})
  return (data as any).response
})

export const getTeam = handleCall(async(name: string): Promise<{team: Team}> => {
  if(process.env.NODE_ENV === "development") return mockTeams[name as keyof typeof mockTeams];
  const {data} = await callFootballApi({query: {url: "/teams", name}});
  return (data as any).response;
})

export const getFixture = handleCall(async(team: number, league: number, season: number, round: string, date: string)
  : Promise<
    {fixture: Fixture, league: FixtureLeague, teams: { home:FixtureTeam, away:FixtureTeam }, goals: Goals, score: Score}[]
  > => {
    if(process.env.NODE_ENV === "development") return [getMockFixtureWithTeamId(team)];
    const {data} = await callFootballApi({query: {url: "/fixtures", team, league, season, round, date}})
    return (data as any).response;
})

export const getFixtureWithId = handleCall(async(id: number)
  : Promise<
    {fixture: Fixture, league: FixtureLeague, teams: { home:FixtureTeam, away:FixtureTeam }, goals: Goals, score: Score}[]
  > => {
    if(process.env.NODE_ENV === "development") return [getMockFixtureWithId(id)];
    const {data} = await callFootballApi({query: {url: "/fixtures", id}})
    return (data as any).response;
})
