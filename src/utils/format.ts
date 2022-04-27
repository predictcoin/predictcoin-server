import { CroSportEvent } from "../application/domain/CroSportsOracle"
import web3 from "../application/insfrastructure/CroWeb3"

export const formatEvents = (events: CroSportEvent[]): CroSportEvent[] => {
  return events.map( event => (
    {
      _eventId: event._eventId!,
      _teamA: web3.utils.hexToString(event._teamA),
      _teamB: web3.utils.hexToString(event._teamB),
      _league: web3.utils.hexToString(event._league),
      _round: web3.utils.hexToString(event._season),
      _startTimestamp: event._startTimestamp,
      _endTimestamp: event._endTimestamp,
      _season: event._season
    }
  ))
}