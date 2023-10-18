import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FootballService, StandingsResponse } from 'src/app/services/football.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent {
  @Input() leagueId: number | undefined = undefined
  public standingsData$: Observable<StandingsResponse> | undefined = undefined

  constructor(private football: FootballService, private router: Router) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['leagueId']) {
      this.getStandings()
    }
  }

  private getStandings() {
    if(!this.leagueId) return
    this.standingsData$ = this.football.getStandings(this.leagueId)
  }

  public viewTeam(teamId: number) {
    this.router.navigateByUrl(`/results/${teamId}`)
  }
}
