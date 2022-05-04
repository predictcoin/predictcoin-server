import { time, timeStamp } from "console"
import web3 from "../application/insfrastructure/CroWeb3"
import { matchTime, playPeriod } from "../data/football/variables"

export const mockUpcomingMatches = [
        {
            "fixture": {
                "id": 710896,
                "referee": "J. Brooks",
                "timezone": "UTC",
                "date": "2022-04-30T14:00:00+00:00",
                "timestamp": 1651327200,
                "periods": {
                    "first": 1651336200,
                    "second": 1651336200
                },
                "venue": {
                    "id": 495,
                    "name": "Villa Park",
                    "city": "Birmingham"
                },
                "status": {
                    "long": "Not Started",
                    "short": "FT",
                    "elapsed": 90
                }
            },
            "league": {
                "id": 39,
                "name": "Premier League",
                "country": "England",
                "logo": "https://media.api-sports.io/football/leagues/39.png",
                "flag": "https://media.api-sports.io/flags/gb.svg",
                "season": 2021,
                "round": "Regular Season - 35"
            },
            "teams": {
                "home": {
                    "id": 66,
                    "name": "Aston Villa",
                    "logo": "https://media.api-sports.io/football/teams/66.png",
                    "winner": null
                },
                "away": {
                    "id": 71,
                    "name": "Norwich",
                    "logo": "https://media.api-sports.io/football/teams/71.png",
                    "winner": null
                }
            },
            "goals": {
                "home": null,
                "away": null
            },
            "score": {
                "halftime": {
                    "home": null,
                    "away": null
                },
                "fulltime": {
                    "home": 0,
                    "away": 1
                },
                "extratime": {
                    "home": null,
                    "away": null
                },
                "penalty": {
                    "home": null,
                    "away": null
                }
            }
        },
        {
            "fixture": {
                "id": 710898,
                "referee": "P. Tierney",
                "timezone": "UTC",
                "date": "2022-04-30T16:30:00+00:00",
                "timestamp": 1651336200,
                "periods": {
                    "first": 1651336200,
                    "second": 1651336200
                },
                "venue": {
                    "id": 546,
                    "name": "Elland Road",
                    "city": "Leeds, West Yorkshire"
                },
                "status": {
                    "long": "Not Started",
                    "short": "FT",
                    "elapsed": 90
                }
            },
            "league": {
                "id": 39,
                "name": "Premier League",
                "country": "England",
                "logo": "https://media.api-sports.io/football/leagues/39.png",
                "flag": "https://media.api-sports.io/flags/gb.svg",
                "season": 2021,
                "round": "Regular Season - 35"
            },
            "teams": {
                "home": {
                    "id": 63,
                    "name": "Leeds",
                    "logo": "https://media.api-sports.io/football/teams/63.png",
                    "winner": null
                },
                "away": {
                    "id": 50,
                    "name": "Manchester City",
                    "logo": "https://media.api-sports.io/football/teams/50.png",
                    "winner": null
                }
            },
            "goals": {
                "home": null,
                "away": null
            },
            "score": {
                "halftime": {
                    "home": null,
                    "away": null
                },
                "fulltime": {
                    "home": 1,
                    "away": 1
                },
                "extratime": {
                    "home": null,
                    "away": null
                },
                "penalty": {
                    "home": null,
                    "away": null
                }
            }
        },
        {
            "fixture": {
                "id": 710900,
                "referee": "A. Marriner",
                "timezone": "UTC",
                "date": "2022-04-30T11:30:00+00:00",
                "timestamp": 1651318200,
                "periods": {
                    "first": 1651318200,
                    "second": 1651320900
                },
                "venue": {
                    "id": 562,
                    "name": "St. James' Park",
                    "city": "Newcastle upon Tyne"
                },
                "status": {
                    "long": "Not Started",
                    "short": "FT",
                    "elapsed": 90
                }
            },
            "league": {
                "id": 39,
                "name": "Premier League",
                "country": "England",
                "logo": "https://media.api-sports.io/football/leagues/39.png",
                "flag": "https://media.api-sports.io/flags/gb.svg",
                "season": 2021,
                "round": "Regular Season - 35"
            },
            "teams": {
                "home": {
                    "id": 34,
                    "name": "Newcastle",
                    "logo": "https://media.api-sports.io/football/teams/34.png",
                    "winner": null
                },
                "away": {
                    "id": 40,
                    "name": "Liverpool",
                    "logo": "https://media.api-sports.io/football/teams/40.png",
                    "winner": null
                }
            },
            "goals": {
                "home": null,
                "away": null
            },
            "score": {
                "halftime": {
                    "home": null,
                    "away": null
                },
                "fulltime": {
                    "home": 3,
                    "away": 0
                },
                "extratime": {
                    "home": null,
                    "away": null
                },
                "penalty": {
                    "home": null,
                    "away": null
                }
            }
        },
        {
            "fixture": {
                "id": 710901,
                "referee": "J. Gillett",
                "timezone": "UTC",
                "date": "2022-04-30T14:00:00+00:00",
                "timestamp": 1651327200,
                "periods": {
                    "first": 1651336200,
                    "second": 1651336200
                },
                "venue": {
                    "id": 585,
                    "name": "St. Mary's Stadium",
                    "city": "Southampton, Hampshire"
                },
                "status": {
                    "long": "Not Started",
                    "short": "FT",
                    "elapsed": 90
                }
            },
            "league": {
                "id": 39,
                "name": "Premier League",
                "country": "England",
                "logo": "https://media.api-sports.io/football/leagues/39.png",
                "flag": "https://media.api-sports.io/flags/gb.svg",
                "season": 2021,
                "round": "Regular Season - 35"
            },
            "teams": {
                "home": {
                    "id": 41,
                    "name": "Southampton",
                    "logo": "https://media.api-sports.io/football/teams/41.png",
                    "winner": null
                },
                "away": {
                    "id": 52,
                    "name": "Crystal Palace",
                    "logo": "https://media.api-sports.io/football/teams/52.png",
                    "winner": null
                }
            },
            "goals": {
                "home": null,
                "away": null
            },
            "score": {
                "halftime": {
                    "home": null,
                    "away": null
                },
                "fulltime": {
                    "home": 7,
                    "away": 0
                },
                "extratime": {
                    "home": null,
                    "away": null
                },
                "penalty": {
                    "home": null,
                    "away": null
                }
            }
        },
        {
            "fixture": {
                "id": 710903,
                "referee": "C. Pawson",
                "timezone": "UTC",
                "date": "2022-04-30T14:00:00+00:00",
                "timestamp": 1651327200,
                "periods": {
                    "first": 1651336200,
                    "second": 1651336200
                },
                "venue": {
                    "id": 596,
                    "name": "Vicarage Road",
                    "city": "Watford"
                },
                "status": {
                    "long": "Not Started",
                    "short": "FT",
                    "elapsed": 90
                }
            },
            "league": {
                "id": 39,
                "name": "Premier League",
                "country": "England",
                "logo": "https://media.api-sports.io/football/leagues/39.png",
                "flag": "https://media.api-sports.io/flags/gb.svg",
                "season": 2021,
                "round": "Regular Season - 35"
            },
            "teams": {
                "home": {
                    "id": 38,
                    "name": "Watford",
                    "logo": "https://media.api-sports.io/football/teams/38.png",
                    "winner": null
                },
                "away": {
                    "id": 44,
                    "name": "Burnley",
                    "logo": "https://media.api-sports.io/football/teams/44.png",
                    "winner": null
                }
            },
            "goals": {
                "home": null,
                "away": null
            },
            "score": {
                "halftime": {
                    "home": null,
                    "away": null
                },
                "fulltime": {
                    "home": 9,
                    "away": 5
                },
                "extratime": {
                    "home": null,
                    "away": null
                },
                "penalty": {
                    "home": null,
                    "away": null
                }
            }
        },
        {
            "fixture": {
                "id": 710905,
                "referee": "S. Hooper",
                "timezone": "UTC",
                "date": "2022-04-30T14:00:00+00:00",
                "timestamp": 1651327200,
                "periods": {
                    "first": 1651336200,
                    "second": 1651336200
                },
                "venue": {
                    "id": 600,
                    "name": "Molineux Stadium",
                    "city": "Wolverhampton, West Midlands"
                },
                "status": {
                    "long": "Not Started",
                    "short": "FT",
                    "elapsed": 90
                }
            },
            "league": {
                "id": 39,
                "name": "Premier League",
                "country": "England",
                "logo": "https://media.api-sports.io/football/leagues/39.png",
                "flag": "https://media.api-sports.io/flags/gb.svg",
                "season": 2021,
                "round": "Regular Season - 35"
            },
            "teams": {
                "home": {
                    "id": 39,
                    "name": "Wolves",
                    "logo": "https://media.api-sports.io/football/teams/39.png",
                    "winner": null
                },
                "away": {
                    "id": 51,
                    "name": "Brighton",
                    "logo": "https://media.api-sports.io/football/teams/51.png",
                    "winner": null
                }
            },
            "goals": {
                "home": null,
                "away": null
            },
            "score": {
                "halftime": {
                    "home": null,
                    "away": null
                },
                "fulltime": {
                    "home": 4,
                    "away": 2
                },
                "extratime": {
                    "home": null,
                    "away": null
                },
                "penalty": {
                    "home": null,
                    "away": null
                }
            }
        }
    ]

const fixtureTime: any = {}

export const mockLeague =
        {
            "league": {
                "id": 39,
                "name": "Premier League",
                "type": "League",
                "logo": "https://media.api-sports.io/football/leagues/39.png"
            },
            "country": {
                "name": "England",
                "code": "GB",
                "flag": "https://media.api-sports.io/flags/gb.svg"
            },
            "seasons": [
                {
                    "year": 2010,
                    "start": "2010-08-14",
                    "end": "2011-05-17",
                    "current": false,
                    "coverage": {
                        "fixtures": {
                            "events": true,
                            "lineups": true,
                            "statistics_fixtures": false,
                            "statistics_players": false
                        },
                        "standings": true,
                        "players": true,
                        "top_scorers": true,
                        "top_assists": true,
                        "top_cards": true,
                        "injuries": false,
                        "predictions": true,
                        "odds": false
                    }
                },
                {
                    "year": 2011,
                    "start": "2011-08-13",
                    "end": "2012-05-13",
                    "current": false,
                    "coverage": {
                        "fixtures": {
                            "events": true,
                            "lineups": true,
                            "statistics_fixtures": false,
                            "statistics_players": false
                        },
                        "standings": true,
                        "players": true,
                        "top_scorers": true,
                        "top_assists": true,
                        "top_cards": true,
                        "injuries": false,
                        "predictions": true,
                        "odds": false
                    }
                },
                {
                    "year": 2012,
                    "start": "2012-08-18",
                    "end": "2013-05-19",
                    "current": false,
                    "coverage": {
                        "fixtures": {
                            "events": true,
                            "lineups": true,
                            "statistics_fixtures": false,
                            "statistics_players": false
                        },
                        "standings": true,
                        "players": true,
                        "top_scorers": true,
                        "top_assists": true,
                        "top_cards": true,
                        "injuries": false,
                        "predictions": true,
                        "odds": false
                    }
                },
                {
                    "year": 2013,
                    "start": "2013-08-17",
                    "end": "2014-05-11",
                    "current": false,
                    "coverage": {
                        "fixtures": {
                            "events": true,
                            "lineups": true,
                            "statistics_fixtures": false,
                            "statistics_players": false
                        },
                        "standings": true,
                        "players": true,
                        "top_scorers": true,
                        "top_assists": true,
                        "top_cards": true,
                        "injuries": false,
                        "predictions": true,
                        "odds": false
                    }
                },
                {
                    "year": 2014,
                    "start": "2014-08-16",
                    "end": "2015-05-24",
                    "current": false,
                    "coverage": {
                        "fixtures": {
                            "events": true,
                            "lineups": true,
                            "statistics_fixtures": true,
                            "statistics_players": true
                        },
                        "standings": true,
                        "players": true,
                        "top_scorers": true,
                        "top_assists": true,
                        "top_cards": true,
                        "injuries": false,
                        "predictions": true,
                        "odds": false
                    }
                },
                {
                    "year": 2015,
                    "start": "2015-08-08",
                    "end": "2016-05-17",
                    "current": false,
                    "coverage": {
                        "fixtures": {
                            "events": true,
                            "lineups": true,
                            "statistics_fixtures": true,
                            "statistics_players": true
                        },
                        "standings": true,
                        "players": true,
                        "top_scorers": true,
                        "top_assists": true,
                        "top_cards": true,
                        "injuries": false,
                        "predictions": true,
                        "odds": false
                    }
                },
                {
                    "year": 2016,
                    "start": "2016-08-13",
                    "end": "2017-05-21",
                    "current": false,
                    "coverage": {
                        "fixtures": {
                            "events": true,
                            "lineups": true,
                            "statistics_fixtures": true,
                            "statistics_players": true
                        },
                        "standings": true,
                        "players": true,
                        "top_scorers": true,
                        "top_assists": true,
                        "top_cards": true,
                        "injuries": false,
                        "predictions": true,
                        "odds": false
                    }
                },
                {
                    "year": 2017,
                    "start": "2017-08-11",
                    "end": "2018-05-13",
                    "current": false,
                    "coverage": {
                        "fixtures": {
                            "events": true,
                            "lineups": true,
                            "statistics_fixtures": true,
                            "statistics_players": true
                        },
                        "standings": true,
                        "players": true,
                        "top_scorers": true,
                        "top_assists": true,
                        "top_cards": true,
                        "injuries": false,
                        "predictions": true,
                        "odds": false
                    }
                },
                {
                    "year": 2018,
                    "start": "2018-08-10",
                    "end": "2019-05-12",
                    "current": false,
                    "coverage": {
                        "fixtures": {
                            "events": true,
                            "lineups": true,
                            "statistics_fixtures": true,
                            "statistics_players": true
                        },
                        "standings": true,
                        "players": true,
                        "top_scorers": true,
                        "top_assists": true,
                        "top_cards": true,
                        "injuries": false,
                        "predictions": true,
                        "odds": false
                    }
                },
                {
                    "year": 2019,
                    "start": "2019-08-09",
                    "end": "2020-07-26",
                    "current": false,
                    "coverage": {
                        "fixtures": {
                            "events": true,
                            "lineups": true,
                            "statistics_fixtures": true,
                            "statistics_players": true
                        },
                        "standings": true,
                        "players": true,
                        "top_scorers": true,
                        "top_assists": true,
                        "top_cards": true,
                        "injuries": false,
                        "predictions": true,
                        "odds": false
                    }
                },
                {
                    "year": 2020,
                    "start": "2020-09-12",
                    "end": "2021-05-23",
                    "current": false,
                    "coverage": {
                        "fixtures": {
                            "events": true,
                            "lineups": true,
                            "statistics_fixtures": true,
                            "statistics_players": true
                        },
                        "standings": true,
                        "players": true,
                        "top_scorers": true,
                        "top_assists": true,
                        "top_cards": true,
                        "injuries": true,
                        "predictions": true,
                        "odds": false
                    }
                },
                {
                    "year": 2021,
                    "start": "2021-08-13",
                    "end": "2022-05-22",
                    "current": true,
                    "coverage": {
                        "fixtures": {
                            "events": true,
                            "lineups": true,
                            "statistics_fixtures": true,
                            "statistics_players": true
                        },
                        "standings": true,
                        "players": true,
                        "top_scorers": true,
                        "top_assists": true,
                        "top_cards": true,
                        "injuries": true,
                        "predictions": true,
                        "odds": true
                    }
                }
            ]
        }

export const mockTeams ={
        "Aston Villa":    {
            "team": {
                "id": 66,
                "name": "Aston Villa",
                "code": "AST",
                "country": "England",
                "founded": 1874,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/66.png"
            },
            "venue": {
                "id": 495,
                "name": "Villa Park",
                "address": "Trinity Road",
                "city": "Birmingham",
                "capacity": 42788,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/495.png"
            }},
        "66":    {
            "team": {
                "id": 66,
                "name": "Aston Villa",
                "code": "AST",
                "country": "England",
                "founded": 1874,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/66.png"
            },
            "venue": {
                "id": 495,
                "name": "Villa Park",
                "address": "Trinity Road",
                "city": "Birmingham",
                "capacity": 42788,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/495.png"
            }
        },
        "Norwich":         {
            "team": {
                "id": 71,
                "name": "Norwich",
                "code": "NOR",
                "country": "England",
                "founded": 1902,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/71.png"
            },
            "venue": {
                "id": 565,
                "name": "Carrow Road",
                "address": "Carrow Road",
                "city": "Norwich, Norfolk",
                "capacity": 27606,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/565.png"
            }
        },
        "71":         {
            "team": {
                "id": 71,
                "name": "Norwich",
                "code": "NOR",
                "country": "England",
                "founded": 1902,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/71.png"
            },
            "venue": {
                "id": 565,
                "name": "Carrow Road",
                "address": "Carrow Road",
                "city": "Norwich, Norfolk",
                "capacity": 27606,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/565.png"
            }
        },
        "63":{
            "team": {
                "id": 63,
                "name": "Leeds",
                "code": "LEE",
                "country": "England",
                "founded": 1919,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/63.png"
            },
            "venue": {
                "id": 546,
                "name": "Elland Road",
                "address": "Elland Road",
                "city": "Leeds, West Yorkshire",
                "capacity": 40204,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/546.png"
            }
        },
        "Leeds":         {
            "team": {
                "id": 63,
                "name": "Leeds",
                "code": "LEE",
                "country": "England",
                "founded": 1919,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/63.png"
            },
            "venue": {
                "id": 546,
                "name": "Elland Road",
                "address": "Elland Road",
                "city": "Leeds, West Yorkshire",
                "capacity": 40204,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/546.png"
            }
        },
        "50":         {
            "team": {
                "id": 50,
                "name": "Manchester City",
                "code": "MAC",
                "country": "England",
                "founded": 1880,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/50.png"
            },
            "venue": {
                "id": 555,
                "name": "Etihad Stadium",
                "address": "Rowsley Street",
                "city": "Manchester",
                "capacity": 55097,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/555.png"
            }
        },
        "Manchester City":         {
            "team": {
                "id": 50,
                "name": "Manchester City",
                "code": "MAC",
                "country": "England",
                "founded": 1880,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/50.png"
            },
            "venue": {
                "id": 555,
                "name": "Etihad Stadium",
                "address": "Rowsley Street",
                "city": "Manchester",
                "capacity": 55097,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/555.png"
            }
        },
        "41":        {
            "team": {
                "id": 41,
                "name": "Southampton",
                "code": "SOU",
                "country": "England",
                "founded": 1885,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/41.png"
            },
            "venue": {
                "id": 585,
                "name": "St. Mary's Stadium",
                "address": "Britannia Road",
                "city": "Southampton, Hampshire",
                "capacity": 32689,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/585.png"
            }
        },
        "Southampton":         {
            "team": {
                "id": 41,
                "name": "Southampton",
                "code": "SOU",
                "country": "England",
                "founded": 1885,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/41.png"
            },
            "venue": {
                "id": 585,
                "name": "St. Mary's Stadium",
                "address": "Britannia Road",
                "city": "Southampton, Hampshire",
                "capacity": 32689,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/585.png"
            }
        },
        52:        {
            "team": {
                "id": 52,
                "name": "Crystal Palace",
                "code": "CRY",
                "country": "England",
                "founded": 1905,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/52.png"
            },
            "venue": {
                "id": 525,
                "name": "Selhurst Park",
                "address": "Holmesdale Road",
                "city": "London",
                "capacity": 26309,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/525.png"
            }
        }, 
        "Crystal Palace":         {
            "team": {
                "id": 52,
                "name": "Crystal Palace",
                "code": "CRY",
                "country": "England",
                "founded": 1905,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/52.png"
            },
            "venue": {
                "id": 525,
                "name": "Selhurst Park",
                "address": "Holmesdale Road",
                "city": "London",
                "capacity": 26309,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/525.png"
            }
        },
        "38":         {
            "team": {
                "id": 38,
                "name": "Watford",
                "code": "WAT",
                "country": "England",
                "founded": 1881,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/38.png"
            },
            "venue": {
                "id": 596,
                "name": "Vicarage Road",
                "address": "Vicarage Road",
                "city": "Watford",
                "capacity": 22200,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/596.png"
            }
        },
        "Watford":         {
            "team": {
                "id": 38,
                "name": "Watford",
                "code": "WAT",
                "country": "England",
                "founded": 1881,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/38.png"
            },
            "venue": {
                "id": 596,
                "name": "Vicarage Road",
                "address": "Vicarage Road",
                "city": "Watford",
                "capacity": 22200,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/596.png"
            }
        },
        "44":         {
            "team": {
                "id": 44,
                "name": "Burnley",
                "code": "BUR",
                "country": "England",
                "founded": 1882,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/44.png"
            },
            "venue": {
                "id": 512,
                "name": "Turf Moor",
                "address": "Harry Potts Way",
                "city": "Burnley",
                "capacity": 22546,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/512.png"
            }
        },
        "Burnley":         {
            "team": {
                "id": 44,
                "name": "Burnley",
                "code": "BUR",
                "country": "England",
                "founded": 1882,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/44.png"
            },
            "venue": {
                "id": 512,
                "name": "Turf Moor",
                "address": "Harry Potts Way",
                "city": "Burnley",
                "capacity": 22546,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/512.png"
            }
        },
        "39":         {
            "team": {
                "id": 39,
                "name": "Wolves",
                "code": "WOL",
                "country": "England",
                "founded": 1877,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/39.png"
            },
            "venue": {
                "id": 600,
                "name": "Molineux Stadium",
                "address": "Waterloo Road",
                "city": "Wolverhampton, West Midlands",
                "capacity": 32050,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/600.png"
            }
        },
        "Wolves":         {
            "team": {
                "id": 39,
                "name": "Wolves",
                "code": "WOL",
                "country": "England",
                "founded": 1877,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/39.png"
            },
            "venue": {
                "id": 600,
                "name": "Molineux Stadium",
                "address": "Waterloo Road",
                "city": "Wolverhampton, West Midlands",
                "capacity": 32050,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/600.png"
            }
        },
        "51":         {
            "team": {
                "id": 51,
                "name": "Brighton",
                "code": "BRI",
                "country": "England",
                "founded": 1901,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/51.png"
            },
            "venue": {
                "id": 508,
                "name": "The American Express Community Stadium",
                "address": "Village Way",
                "city": "Falmer, East Sussex",
                "capacity": 31800,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/508.png"
            }
        },
        "Brighton":         {
            "team": {
                "id": 51,
                "name": "Brighton",
                "code": "BRI",
                "country": "England",
                "founded": 1901,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/51.png"
            },
            "venue": {
                "id": 508,
                "name": "The American Express Community Stadium",
                "address": "Village Way",
                "city": "Falmer, East Sussex",
                "capacity": 31800,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/508.png"
            }
        },
        "34":         {
            "team": {
                "id": 34,
                "name": "Newcastle",
                "code": "NEW",
                "country": "England",
                "founded": 1892,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/34.png"
            },
            "venue": {
                "id": 562,
                "name": "St. James' Park",
                "address": "St. James&apos; Street",
                "city": "Newcastle upon Tyne",
                "capacity": 52389,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/562.png"
            }
        },
        "Newcastle":         {
            "team": {
                "id": 34,
                "name": "Newcastle",
                "code": "NEW",
                "country": "England",
                "founded": 1892,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/34.png"
            },
            "venue": {
                "id": 562,
                "name": "St. James' Park",
                "address": "St. James&apos; Street",
                "city": "Newcastle upon Tyne",
                "capacity": 52389,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/562.png"
            }
        },
        "Liverpool":         {
            "team": {
                "id": 40,
                "name": "Liverpool",
                "code": "LIV",
                "country": "England",
                "founded": 1892,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/40.png"
            },
            "venue": {
                "id": 550,
                "name": "Anfield",
                "address": "Anfield Road",
                "city": "Liverpool",
                "capacity": 55212,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/550.png"
            }
        },
        "40":         {
            "team": {
                "id": 40,
                "name": "Liverpool",
                "code": "LIV",
                "country": "England",
                "founded": 1892,
                "national": false,
                "logo": "https://media.api-sports.io/football/teams/40.png"
            },
            "venue": {
                "id": 550,
                "name": "Anfield",
                "address": "Anfield Road",
                "city": "Liverpool",
                "capacity": 55212,
                "surface": "grass",
                "image": "https://media.api-sports.io/football/venues/550.png"
            }
        }
}

export const getMockUpcomingMatches = (date: string) => {
    const _date = new Date().toISOString().split("T")[0];
    const _ = new Date();
    _.setDate(new Date().getDate() + 1)
    const __date = _.toISOString().split("T")[0];
    if(_date === date){
        let matches = mockUpcomingMatches.slice(0,3);
        matches = matches.map(match => {
            const timestamp = Math.trunc(new Date().getTime()/1000);
            const eventId = web3.utils.soliditySha3(
                match.teams.home.name, match.teams.away.name, match.league.name, match.league.round,  
                {type: "uint16", value: String(match.league.season)},
                timestamp
            )!;
        
            match.fixture.timestamp = Math.round(Math.random() * (playPeriod - matchTime)) + timestamp;
            match.fixture.periods.first = match.fixture.timestamp;
            match.fixture.periods.second = match.fixture.timestamp + 1*60;
            fixtureTime[eventId] = match.fixture.periods;
            
            return match;
        })

        return matches
    }
    else{
        let matches = mockUpcomingMatches.slice(3,6);
        matches = matches.map(match => {
            const timestamp = Math.trunc(new Date().getTime()/1000) + playPeriod;
                const eventId = web3.utils.soliditySha3(
                match.teams.home.name, match.teams.away.name, match.league.name, match.league.round,  
                {type: "uint16", value: String(match.league.season)},
                timestamp
            )!;

            match.fixture.timestamp = Math.trunc(Math.random()* playPeriod - matchTime) + timestamp;
            match.fixture.periods.first = match.fixture.timestamp;
            match.fixture.periods.second = match.fixture.timestamp + 1*60;
            fixtureTime[eventId] = match.fixture.periods;

            return match;
        })

        return matches;
    }

}

export const getMockFixtureWithTeam = (name: string, timestamp: number) => {
    const fixture = {...mockUpcomingMatches.filter(match => {
        return match.teams.away.name === name
            || match.teams.home.name === name
    })[0]};
    fixture.fixture = {...fixture.fixture};
    fixture.fixture.timestamp = timestamp;
    fixture.fixture.periods.first = timestamp;

    if(timestamp+matchTime <= Math.trunc(new Date().getTime()/1000)){
        fixture.fixture.status.short = "FT";
    } else {
        fixture.fixture.status.short = "NS";
    }
    return fixture;
}

export const getMockFixtureWithId = (id: number, timestamp: number) => {
    const fixture = {...mockUpcomingMatches.filter(match => {
        return match.fixture.id === id
    })[0]};
    fixture.fixture = {...fixture.fixture};
    fixture.fixture.timestamp = timestamp;
    fixture.fixture.periods.first = timestamp;

    if(timestamp+matchTime <= Math.trunc(new Date().getTime()/1000)){
        fixture.fixture.status.short = "FT";
    } else {
        fixture.fixture.status.short = "NS";
    }
    return fixture;
}

