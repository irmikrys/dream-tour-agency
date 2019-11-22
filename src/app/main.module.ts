import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { AppComponent } from './components/app/app.component';
import { TripsComponent } from './components/trips/trips.component';
import { HeaderComponent } from './components/header/header.component';
import { TripComponent } from './components/trip/trip.component';
import { NewTripFormComponent } from './components/new-trip-form/new-trip-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    HeaderComponent,
    TripComponent,
    NewTripFormComponent
  ],
  imports: [
    BrowserModule,
    MainRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class MainModule { }
