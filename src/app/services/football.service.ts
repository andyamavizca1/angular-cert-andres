import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private apiKey = 'ffa4654bd6172569843b37576bc0a3f5'
  private apiUrl = 'https://v3.football.api-sports.io'

  constructor(private http: HttpClient) { }

  public getResults(team: number, last: number): Observable<Match[]> {

    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    })

    return this.http.get(`${this.apiUrl}/fixtures?team=${team}&last=${last}`, { headers }).pipe(
      map((data: any) => {
        return data.response.map((data: any) => data as Match[])
      })
    )

    /* TESTING */
    /*
    return this.http.get('assets/mock/fixtures.json').pipe(
      map((data: any) => {
        return data.response.map((data: any) => data as Match[])
      })
    )
    */
  }

  public getStandings(league: number): Observable<any> {
    const currentYear: number = new Date().getFullYear()

    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    })

    return this.http.get(`${this.apiUrl}/standings?league=${league}&season=${currentYear}`, { headers }).pipe(
      map((data: any) => {
        return data && data.response.length ?
        {
          league: {
            country: data.response[0].league.country,
            flag: data.response[0].league.flag,
            id: data.response[0].league.id,
            logo: data.response[0].league.logo,
            name: data.response[0].league.name,
          },
          standings: data.response[0].league.standings[0]
        } as StandingsResponse
        : throwError(() => 'An error has occurred')
      })
    )
    /* TESTING */
    /*
    return this.http.get('assets/mock/standings.json').pipe(
      map((data: any) => {
        return data && data.response.length ?
        {
          league: {
            country: data.response[0].league.country,
            flag: data.response[0].league.flag,
            id: data.response[0].league.id,
            logo: data.response[0].league.logo,
            name: data.response[0].league.name,
          },
          standings: data.response[0].league.standings[0]
        } as StandingsResponse
        : throwError(() => 'An error has occurred')
      })
    )
    */
  }

  public getCountries(): Observable<League[]> {
    return this.http.get<League[]>('assets/data/countries.json')
  }
}

export interface ResultsResponse {

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
