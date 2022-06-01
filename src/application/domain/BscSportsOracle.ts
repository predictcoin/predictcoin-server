import { BscSportOracle as _SportOracle } from "../../contracts/BscSportOracle";

export interface BscSportOracle extends _SportOracle{};

export interface BscSportEvent {
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

export type InitialBscSportEvent = Omit<BscSportEvent, "id" | "outcome">;

export interface BscUpdateEvent {
  id: string,
  startTimestamp: number | string,
  endTimestamp: number | string,
}

export interface BscDeclareEvent {
  id: string,
  scoreA: number,
  scoreB: number,
}

export enum EventOutcome {
  Pending,    // match has not been fought to decision
  Decided,    // match has been finally Decided 
  Cancelled   // match was cancelled
}
