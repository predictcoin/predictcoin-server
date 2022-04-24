import { CroSportOracle, CroSportEvent, CroUpdateEvent, CroDeclareEvent } from "../domain/CroSportsOracle";
import web3 from "../insfrastructure/CroWeb3";

// Transactions
export const addSportEvents = (instance: CroSportOracle, 
  events: CroSportEvent[]) => {
    let teamAs: string[] = [], teamBs: string[] = [], 
      startTimestamps: (number|string)[] = [], endTimestamps: (number|string)[] = [],
      leagues: string[] = [], seasons: (string|number)[] = [], rounds: string[] = [];
    for(let i = 0; i < events.length; i++){
      teamAs[i] = web3.utils.hexToUtf8(events[i].teamA);
      teamBs[i] = web3.utils.hexToUtf8(events[i].teamB);
      startTimestamps[i] = events[i].startTimestamp;
      endTimestamps[i] = events[i].endTimestamp;
      leagues[i] = web3.utils.hexToUtf8(events[i].league);
      rounds[i] = web3.utils.hexToUtf8(events[i].round);
      seasons[i] = events[i].season;
    }

    return instance.methods.addSportEvents(teamAs, teamBs, leagues, rounds, startTimestamps, endTimestamps, seasons);
}

export const cancelSportEvents = (instance: CroSportOracle, eventIds: string[]) => {
  return instance.methods.cancelSportEvents(eventIds);
}

export const updateSportEvents = (instance: CroSportOracle, 
  events: CroUpdateEvent[]) => {
  let eventIds: string[] = [], startTimestamps: (number|string)[] = [], endTimestamps: (number|string)[] = [];
  for(let i = 0; i < events.length; i++){
    eventIds[i] = events[i]._eventId;
    startTimestamps[i] = events[i]._startTimestamp;
    endTimestamps[i] = events[i]._endTimestamp;
  }
  return instance.methods.updateSportEvents(eventIds, startTimestamps, endTimestamps);
}

export const declareOutcomes = (instance: CroSportOracle, events: CroDeclareEvent[]) => {
  let eventIds: string[] = [], scoresA: number[] = [], scoresB: number[] = [];
  for(let i=0; i<events.length; i++){
    eventIds[i] = events[i]._eventId;
    scoresA[i] = events[i]._scoreA;
    scoresB[i] = events[i]._scoreB;
  }
  return instance.methods.declareOutcomes(eventIds, scoresA, scoresB);
}

// calls
export const getUpcomingEvents = (instance: CroSportOracle) => {
  return instance.methods.getPendingEvents();
}

export const getLiveEvents = (instance: CroSportOracle) => {
  return instance.methods.getLiveEvents();
}

export const getEventsLength = (instance: CroSportOracle) => {
  return instance.methods.getEventsLength();
}

export const getAllEvents = async (instance: CroSportOracle, length: number) => {
  return instance.methods.getAllEvents(0, length);
}

export const eventExists = async (instance: CroSportOracle, eventId: string) => {
  return instance.methods.eventExists(eventId);
}