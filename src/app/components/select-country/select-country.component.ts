import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FootballService, League } from '../../services/football.service';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.scss']
})
export class SelectCountryComponent {

  public selectedLeagueId: number | undefined = undefined
  public countries$: Observable<League[]>

  constructor(private football: FootballService) {
    this.countries$ = this.football.getCountries()

    const storedLeagueId = localStorage.getItem('selectedLeagueId')
    if (storedLeagueId) {
      this.selectCountry(+storedLeagueId)
    }
  }

  public selectCountry(league: number): void {
    this.selectedLeagueId = league
    localStorage.setItem('selectedLeagueId', league.toString())
  }
}
