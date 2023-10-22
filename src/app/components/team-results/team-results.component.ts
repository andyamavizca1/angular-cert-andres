import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Match, FootballService } from '../../services/football.service';

@Component({
  selector: 'app-team-results',
  templateUrl: './team-results.component.html',
  styleUrls: ['./team-results.component.scss']
})
export class TeamResultsComponent implements OnInit {
  public teamId: number | undefined = undefined
  public resultsData$: Observable<Match[]> = of([])

  constructor(private football: FootballService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id !== null) {
        this.teamId = +id
        this.getResults()
      }
    })
  }

  getResults() {
    if(!this.teamId) return
    this.resultsData$ = this.football.getResults(this.teamId, 10)
  }

  public viewTeam(teamId: number) {
    this.router.navigateByUrl(`/results/${teamId}`)
  }
}
