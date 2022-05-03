import { CroSportOracle, CroSportEvent, CroUpdateEvent, CroDeclareEvent, InitialCroSportEvent } from "../domain/CroSportsOracle";

// Transactions
export const addSportEvents = (instance: CroSportOracle, 
  events: InitialCroSportEvent[]) => {
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

export const cancelSportEvents = (instance: CroSportOracle, eventIds: string[]) => {
  return instance.methods.cancelSportEvents(eventIds);
}

export const updateSportEvents = (instance: CroSportOracle, 
  events: CroUpdateEvent[]) => {
  let eventIds: string[] = [], startTimestamps: (number|string)[] = [], endTimestamps: (number|string)[] = [];
  for(let i = 0; i < events.length; i++){
    eventIds[i] = events[i].id;
    startTimestamps[i] = events[i].startTimestamp;
    endTimestamps[i] = events[i].endTimestamp;
  }
  return instance.methods.updateSportEvents(eventIds, startTimestamps, endTimestamps);
}

export const declareOutcomes = (instance: CroSportOracle, events: CroDeclareEvent[]) => {
  let eventIds: string[] = [], scoresA: number[] = [], scoresB: number[] = [];
  for(let i=0; i<events.length; i++){
    eventIds[i] = events[i].id;
    scoresA[i] = events[i].scoreA;
    scoresB[i] = events[i].scoreB;
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

export const getEvents = (instance: CroSportOracle, eventIds: string[]) => {
  return instance.methods.getEvents(eventIds)
}

export const getAllEvents =(instance: CroSportOracle, length: number) => {
  return instance.methods.getAllEvents(0, length);
}

export const eventExists = (instance: CroSportOracle, eventId: string) => {
  return instance.methods.eventExists(eventId);
}