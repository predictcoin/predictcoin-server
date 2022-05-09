import { CroSportEvent } from "../application/domain/CroSportsOracle"
import web3 from "../application/insfrastructure/CroWeb3"

export const formatEvents = (events: CroSportEvent[]): CroSportEvent[] => {
  return events.map( event => (
    {
      id: event.id!,
      teamA: web3.utils.hexToString(event.teamA),
      teamB: web3.utils.hexToString(event.teamB),
      league: web3.utils.hexToString(event.league),
      round: web3.utils.hexToString(event.round),
      startTimestamp: +event.startTimestamp,
      endTimestamp: +event.endTimestamp,
      season: event.season,
      outcome: +event.outcome
    }
  ))
}