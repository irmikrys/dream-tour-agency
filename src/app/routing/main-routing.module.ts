import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TripsComponent} from '../components/trips/trips.component';
import {TripComponent} from '../components/trip/trip.component';

const routes: Routes = [
  {path: 'trips', component: TripsComponent},
  {path: 'trip/:id', component: TripComponent},
  {
    path: '',
    redirectTo: '/trips',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
