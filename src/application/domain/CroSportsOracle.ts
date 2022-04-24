import { CroSportOracle as _SportOracle } from "../../contracts/CroSportOracle";

export interface CroSportOracle extends _SportOracle{};

export interface CroSportEvent {
    teamA: string,
    teamB: string,
    league: string,
    round: string,
    startTimestamp: number | string,
    endTimestamp: number | string,
    season: number | string
}

export interface CroUpdateEvent {
  _eventId: string,
  _startTimestamp: number | string,
  _endTimestamp: number | string,
}

export interface CroDeclareEvent {
  _eventId: string,
  _scoreA: number,
  _scoreB: number,
}
