import { CroSportOracle as _SportOracle } from "../../contracts/CroSportOracle";

export interface CroSportOracle extends _SportOracle{};

export interface CroSportEvent {
    id: string,
    teamA: string,
    teamB: string,
    league: string,
    round: string,
    startTimestamp: number | string,
    endTimestamp: number | string,
    season: number | string,
    outcome: EventOutcome
}

export type InitialCroSportEvent = Omit<CroSportEvent, "id" | "outcome">;

export interface CroUpdateEvent {
  id: string,
  startTimestamp: number | string,
  endTimestamp: number | string,
}

export interface CroDeclareEvent {
  id: string,
  scoreA: number,
  scoreB: number,
}

export enum EventOutcome {
  Pending,    // match has not been fought to decision
  Decided,    // match has been finally Decided 
  Cancelled   // match was cancelled
}
