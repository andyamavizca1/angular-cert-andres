import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectCountryComponent } from './components/select-country/select-country.component';
import { TeamResultsComponent } from './components/team-results/team-results.component';

const routes: Routes = [
  { path: 'countries', component: SelectCountryComponent},
  { path: 'results/:id', component: TeamResultsComponent},
  { path: '**', redirectTo: '/countries' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
