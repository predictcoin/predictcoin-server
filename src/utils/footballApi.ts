import axios, { AxiosRequestConfig } from "axios";
import {Request} from "express";
import { Status } from "../types/football";

const rapidKey = process.env.RAPID_API_KEY;

const footballApi = axios.create({
  baseURL: "https://api-football-v1.p.rapidapi.com/v3",
  headers: {
    'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
    'x-rapidapi-key': rapidKey!
  }
});

export  const callFootballApi = async (request: Request) => {
  // add credentials to request
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

export const getUpcomingMatches = async (from: string, to: string, status: Status) => {
  footballApi.get(
    "/fixtures", {
      params: {
        from,
        to,
        status
      },
    }
  );
}

