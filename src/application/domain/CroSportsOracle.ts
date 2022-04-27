import { CroSportOracle as _SportOracle } from "../../contracts/CroSportOracle";

export interface CroSportOracle extends _SportOracle{};

export interface CroSportEvent {
    _eventId?: string,
    _teamA: string,
    _teamB: string,
    _league: string,
    _round: string,
    _startTimestamp: number | string,
    _endTimestamp: number | string,
    _season: number | string
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
