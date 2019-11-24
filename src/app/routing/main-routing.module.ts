import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from '../components/navigation/page-not-found/page-not-found.component';
import {TripsComponent} from '../components/trips/trips.component';
import {TripDetailsComponent} from '../components/trip-details/trip-details.component';

const routes: Routes = [
  {
    path: 'trips',
    component: TripsComponent,
    data: {title: 'Trips List'}
  },
  {path: 'trip/:id', component: TripDetailsComponent},
  {
    path: '',
    redirectTo: '/trips',
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
