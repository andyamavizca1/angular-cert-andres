import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, throwError } from 'rxjs';
import { CacheService } from './cache.service'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private apiUrl = 'https://v3.football.api-sports.io'

  constructor(private http: HttpClient, private cache: CacheService, private router: Router) { }

  public getResults(team: number, last: number): Observable<Match[]> {

    const cacheKey = `results_${team}_${last}`

    const cachedData = this.cache.get<Match[]>(cacheKey)
    if (cachedData) {
      return of(cachedData)
    }

    return this.http.get<RawFixtureResponse>(`${this.apiUrl}/fixtures?team=${team}&last=${last}`).pipe(
      map((data: RawFixtureResponse) => {
        if(data && data.response.length) {
          const matches = data.response.map(data => data as Match)

          this.cache.set(cacheKey, matches, 1440)
          return matches
        } else {
          this.router.navigate(['/error'])
          throw new Error('An error has occurred')
        }
      })
    )
  }

  public getStandings(league: number): Observable<StandingsResponse> {

    const cacheKey = `standings_${league}`

    const cachedData = this.cache.get<StandingsResponse>(cacheKey)
    if (cachedData) {
      return of(cachedData)
    }

    const currentYear: number = new Date().getFullYear()

    return this.http.get<RawStandingsResponse>(`${this.apiUrl}/standings?league=${league}&season=${currentYear}`).pipe(
      map((data: RawStandingsResponse) => {

        if(data && data.response.length) {
          const standings = {
            league: {
              country: data.response[0].league.country,
              flag: data.response[0].league.flag,
              id: data.response[0].league.id,
              logo: data.response[0].league.logo,
              name: data.response[0].league.name,
            },
            standings: data.response[0].league.standings[0]
          } as StandingsResponse

          this.cache.set(cacheKey, standings, 1440)
          return standings
        } else {
          this.router.navigate(['/error'])
          throw new Error('An error has occurred')
        }
      })
    )
  }

  public getCountries(): Observable<League[]> {
    return this.http.get<League[]>('assets/data/countries.json')
  }
}

export interface ApiError {
  token: []
}

export interface RawStandingsResponse {
  get: string
  parameters: {
    league: string
    season: string
  }
  errors: ApiError[]
  results: number
  paging: {
    current: number
    total: number
  }
  response: [
    { league: {
      id: number
      name: string
      country: string
      logo: string
      flag: string
      season: number
      round: string
      standings: [
        Standing[]
      ]
    } }
  ]
}

export interface RawFixtureResponse {
  get: string
  parameters: {
    team: string
    last: string
  }
  errors: ApiError[]
  results: number
  paging: {
    current: number
    total: number
  }
  response: Match[]
}

export interface League {
  id: number
  name: string
  country: string
  logo: string
  flag: string
  season: number
  round: string
}

export interface Team {
  id: number
  name: string
  logo: string
}

export interface Goals {
  for: number
  against: number
}

export interface Stats {
  played: number
  win: number
  draw: number
  lose: number
  goals: Goals
}

export interface Standing {
  rank: number
  team: Team
  points: number
  goalsDiff: number
  group: string
  form: string
  status: string
  description: string
  all: Stats
  home: Stats
  away: Stats
  update: string
}

export interface StandingsResponse {
  league: League
  standings: Standing[]
}

export interface Fixture {
  id: number
  referee: string
  timezone: string
  date: string
  timestamp: number
  periods: {
    first: number
    second: number
  }
  venue: {
    id: number
    name: string
    city: string
  }
  status: {
    long: string
    short: string
    elapsed: number
  }
}

export interface Team {
  id: number
  name: string
  logo: string
  winner: boolean
}

export interface Goals {
  home: number
  away: number
}

export interface Score {
  halftime: Goals
  fulltime: Goals
  extratime: Goals | null
  penalty: Goals | null
}

export interface Match {
  fixture: Fixture
  league: League
  teams: {
    home: Team
    away: Team
  }
  goals: Goals
  score: Score
}
