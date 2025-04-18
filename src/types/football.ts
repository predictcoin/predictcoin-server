export type Status = 
  | "TBD" // Time To Be Defined
  | "NS" // Not Started
  | "1H" // First Half, Kick Off
  | "HT" // Halftime
  | "2H" // Second Half, 2nd Half Started
  | "ET" // Extra Time
  | "P"// Penalty In Progress
  | "FT" // Match Finished
  | "AET" // Match Finished After Extra Time
  | "PEN" // Match Finished After Penalty
  | "BT" // Break Time (in Extra Time)
  | "SUSP" // Match Suspended
  | "INT" // Match Interrupted
  | "PST" // Match Postponed
  | "CANC" // Match Cancelled
  | "ABD" // Match Abandoned
  | "AWD" // Technical Loss
  | "WO" // WalkOver
  | "LIVE" // In Progress

export interface League {
  id: number,
  name: string,
  type?: string,
  logo: string
}

export interface FixtureLeague extends League {
  flag: string,
  season: number,
  round: string
}

export interface Country {
  name: string,
  code: string,
  flag: string
}

export interface Season {
  year: number,
  start: string,
  end: string,
  current: boolean,
  coverage: {[key: string]: any}
}

export interface Fixture {
  id: number,
  referee: string,
  date: string,
  timestamp: number,
  periods: {first: number, second: number},
  venue: {id: number, name: string, city: string}
  status: {long: string, short: string, elapsed: number}
}

export interface Team {
  id: number,
  name: string,
  code: string,
  country: string,
  founded: number,
  national: boolean,
  logo: string,
}

export interface FixtureTeam {
  id: number,
  name: string,
  winner: boolean | null
}

export interface Goals  {
  home: number | null,
  away: number | null
}

export interface Score  {
  halftime: Goals,
  fulltime: Goals,
  extratime: Goals,
  penalty: Goals,
}

export type apiFixture = {fixture: Fixture, league: FixtureLeague, teams: { home:FixtureTeam, away:FixtureTeam }, goals: Goals, score: Score};

export type apiLeague = {league: League, country: Country, seasons: Season[]};

