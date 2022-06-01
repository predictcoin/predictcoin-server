import { BscSportOracle, BscUpdateEvent, BscDeclareEvent, InitialBscSportEvent } from "../domain/BscSportsOracle";

// Transactions
export const addSportEvents = (instance: BscSportOracle, 
  events: InitialBscSportEvent[]) => {
    let teamAs: string[] = [], teamBs: string[] = [], 
      startTimestamps: (number|string)[] = [], endTimestamps: (number|string)[] = [],
      leagues: string[] = [], seasons: (string|number)[] = [], rounds: string[] = [];
    for(let i = 0; i < events.length; i++){
      teamAs[i] = events[i].teamA;
      teamBs[i] = events[i].teamB;
      startTimestamps[i] = events[i].startTimestamp;
      endTimestamps[i] = events[i].endTimestamp;
      leagues[i] = events[i].league;
      rounds[i] = events[i].round;
      seasons[i] = events[i].season;
    }

    return instance.methods.addSportEvents(teamAs, teamBs, leagues, rounds, startTimestamps, endTimestamps, seasons);
}

export const cancelSportEvents = (instance: BscSportOracle, eventIds: string[]) => {
  return instance.methods.cancelSportEvents(eventIds);
}

export const updateSportEvents = (instance: BscSportOracle, 
  events: BscUpdateEvent[]) => {
  let eventIds: string[] = [], startTimestamps: (number|string)[] = [], endTimestamps: (number|string)[] = [];
  for(let i = 0; i < events.length; i++){
    eventIds[i] = events[i].id;
    startTimestamps[i] = events[i].startTimestamp;
    endTimestamps[i] = events[i].endTimestamp;
  }
  return instance.methods.updateSportEvents(eventIds, startTimestamps, endTimestamps);
}

export const declareOutcomes = (instance: BscSportOracle, events: BscDeclareEvent[]) => {
  let eventIds: string[] = [], scoresA: number[] = [], scoresB: number[] = [];
  for(let i=0; i<events.length; i++){
    eventIds[i] = events[i].id;
    scoresA[i] = events[i].scoreA;
    scoresB[i] = events[i].scoreB;
  }
  return instance.methods.declareOutcomes(eventIds, scoresA, scoresB);
}

// calls
export const getUpcomingEvents = (instance: BscSportOracle) => {
  return instance.methods.getPendingEvents();
}

export const getLiveEvents = (instance: BscSportOracle) => {
  return instance.methods.getLiveEvents();
}

export const getEventsLength = (instance: BscSportOracle) => {
  return instance.methods.getEventsLength();
}

export const getEvents = (instance: BscSportOracle, eventIds: string[]) => {
  return instance.methods.getEvents(eventIds)
}

export const getAllEvents =(instance: BscSportOracle, length: number) => {
  return instance.methods.getAllEvents(0, length);
}

export const eventExists = (instance: BscSportOracle, eventId: string) => {
  return instance.methods.eventExists(eventId);
}