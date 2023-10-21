import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectCountryComponent } from './components/select-country/select-country.component';
import { TeamResultsComponent } from './components/team-results/team-results.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: 'error', component: ErrorComponent },
  { path: 'countries', component: SelectCountryComponent},
  { path: 'results/:id', component: TeamResultsComponent},
  { path: '**', redirectTo: '/countries' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
