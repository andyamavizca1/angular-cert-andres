import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Match, FootballService } from '../../services/football.service';

@Component({
  selector: 'app-team-results',
  templateUrl: './team-results.component.html',
  styleUrls: ['./team-results.component.scss']
})
export class TeamResultsComponent implements OnInit {
  public teamId: number | undefined = undefined
  public resultsData$: Observable<Match[]> = of([])

  constructor(private football: FootballService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.params['id']

    this.getResults()
  }

  getResults() {
    if(!this.teamId) return
    this.resultsData$ = this.football.getResults(this.teamId, 10)
  }
}
