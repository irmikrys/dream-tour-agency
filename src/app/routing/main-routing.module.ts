import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from '../components/navigation/page-not-found/page-not-found.component';
import {TripsComponent} from '../components/trips/trips.component';
import {TripDetailsComponent} from '../components/trip-details/trip-details.component';
import {NewTripFormComponent} from '../components/new-trip-form/new-trip-form.component';

const routes: Routes = [
  {
    path: 'trips',
    component: TripsComponent,
    data: {title: 'Trips List'}
  },
  {path: 'trips/:id', component: TripDetailsComponent},
  {path: 'new-trip', component: NewTripFormComponent},
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
