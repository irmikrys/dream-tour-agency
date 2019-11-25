import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {MainRoutingModule} from './routing/main-routing.module';
import {AppComponent} from './components/app/app.component';
import {TripsComponent} from './components/trips-list/trips/trips.component';
import {HeaderComponent} from './components/trips-list/header/header.component';
import {TripComponent} from './components/trips-list/trip/trip.component';
import {NewTripFormComponent} from './components/new-trip-form/new-trip-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './components/navigation/navbar/navbar.component';
import {
  MatButtonModule,
  MatCardModule,
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
import {LayoutComponent} from './components/layout/layout.component';
import {SidenavListComponent} from './components/navigation/sidenav-list/sidenav-list.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {PageNotFoundComponent} from './components/navigation/page-not-found/page-not-found.component';
import {TripDetailsComponent} from './components/trip-details/trip-details.component';
import {TripRatingComponent} from './components/trips-list/trip-rating/trip-rating.component';

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
  ],
  imports: [
    BrowserModule,
    MainRoutingModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class MainModule {
}
