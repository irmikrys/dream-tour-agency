import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TripsComponent} from '../components/trips/trips.component';
import {TripComponent} from '../components/trip/trip.component';
import {PageNotFoundComponent} from '../components/navigation/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'trips',
    component: TripsComponent,
    data: {title: 'Trips List'}
  },
  {path: 'trip/:id', component: TripComponent},
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
