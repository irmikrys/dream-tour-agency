import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {MainRoutingModule} from './routing/main-routing.module';
import {AppComponent} from './components/app/app.component';
import {TripsComponent} from './components/trips-list/trips/trips.component';
import {HeaderComponent} from './components/trips-list/header/header.component';
import {TripComponent} from './components/trips-list/trip/trip.component';
import {NewTripFormComponent} from './components/new-trip-form/new-trip-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './components/navigation/navbar/navbar.component';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule, MatDatepickerModule,
  MatIconModule, MatInputModule,
  MatMenuModule,
  MatRippleModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './shared/services/in-memory-data.service';

import {LayoutComponent} from './components/layout/layout.component';
import {SidenavListComponent} from './components/navigation/sidenav-list/sidenav-list.component';
import {PageNotFoundComponent} from './components/navigation/page-not-found/page-not-found.component';
import {TripDetailsComponent} from './components/trip-details-page/trip-details/trip-details.component';
import {TripRatingComponent} from './components/trips-list/trip-rating/trip-rating.component';
import {ShoppingCartComponent} from './components/cart/shopping-cart/shopping-cart.component';
import {LoginFormComponent} from './components/auth/login-form/login-form.component';
import {RegisterFormComponent} from './components/auth/register-form/register-form.component';
import {TripCommentsComponent} from './components/trip-details-page/trip-comments/trip-comments.component';
import {TripReservationConfirmationComponent} from './components/trip-reservation-confirmation/trip-reservation-confirmation.component';
import { MessageComponent } from './components/message/message.component';
import { TripSearchComponent } from './components/trips-list/trip-search/trip-search.component';

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    HeaderComponent,
    TripComponent,
    NewTripFormComponent,
    NavbarComponent,
    LayoutComponent,
    SidenavListComponent,
    PageNotFoundComponent,
    TripDetailsComponent,
    TripRatingComponent,
    ShoppingCartComponent,
    LoginFormComponent,
    RegisterFormComponent,
    TripCommentsComponent,
    TripReservationConfirmationComponent,
    MessageComponent,
    TripSearchComponent,
  ],
  imports: [
    BrowserModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatMenuModule,
    FlexModule,
    FlexLayoutModule,
    MatCardModule,
    MatTooltipModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatBadgeModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class MainModule {
}
