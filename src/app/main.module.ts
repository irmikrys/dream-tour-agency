import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { AppComponent } from './app.component';
import { WycieczkiComponent } from './components/wycieczki/wycieczki.component';
import { NaglowekComponent } from './components/naglowek/naglowek.component';
import { WycieczkaComponent } from './components/wycieczka/wycieczka.component';
import { NewTripFormComponent } from './components/new-trip-form/new-trip-form.component';

@NgModule({
  declarations: [
    AppComponent,
    WycieczkiComponent,
    NaglowekComponent,
    WycieczkaComponent,
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
