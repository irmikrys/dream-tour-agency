import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from '../components/navigation/page-not-found/page-not-found.component';
import {TripsComponent} from '../components/trips-list/trips/trips.component';
import {TripDetailsComponent} from '../components/trip-details-page/trip-details/trip-details.component';
import {NewTripFormComponent} from '../components/new-trip-form/new-trip-form.component';
import {ShoppingCartComponent} from '../components/cart/shopping-cart/shopping-cart.component';
import {RegisterFormComponent} from '../components/auth/register-form/register-form.component';
import {LoginFormComponent} from '../components/auth/login-form/login-form.component';
import {TripReservationConfirmationComponent} from '../components/trip-reservation-confirmation/trip-reservation-confirmation.component';
import {AuthGuard} from '../shared/utils/AuthGuard';

const routes: Routes = [
  {path: 'login', component: LoginFormComponent},
  {path: 'register', component: RegisterFormComponent},
  {path: 'confirmation', component: TripReservationConfirmationComponent, canActivate: [AuthGuard]},
  {
    path: 'trips',
    component: TripsComponent,
    data: {title: 'Trips List'}
  },
  {path: 'trips/:id', component: TripDetailsComponent},
  {path: 'new-trip', component: NewTripFormComponent , canActivate: [AuthGuard]}, // FIXME: new trip guard for admin
  {path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
  {
    path: '',
    redirectTo: '/trips',
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class MainRoutingModule {
}
