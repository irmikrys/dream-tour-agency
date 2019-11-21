import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { HelloComponent } from './hello.component';
import { WycieczkiComponent } from './wycieczki/wycieczki.component';
import { NaglowekComponent } from './naglowek/naglowek.component';
import { WycieczkaComponent } from './wycieczka/wycieczka.component';

@NgModule({
  declarations: [
    HelloComponent,
    WycieczkiComponent,
    NaglowekComponent,
    WycieczkaComponent
  ],
  imports: [
    BrowserModule,
    MainRoutingModule
  ],
  providers: [],
  bootstrap: [HelloComponent]
})
export class MainModule { }
