import {Component, OnInit} from '@angular/core';
import {Trip} from '../shared/models/trip.model';

@Component({
  selector: 'app-wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.less']
})
export class WycieczkiComponent implements OnInit {

  trips: Trip[];

  highest: number = this.trips
    .sort((a, b) => (a.cena > b.cena) ? 1 : -1)
    .map(trip => trip.id)[this.trips.length - 1];

  lowest: number = this.trips
    .sort((a, b) => (a.cena > b.cena) ? 1 : -1)
    .map(trip => trip.id)[0];

  takenTrips = 0;

  onTripReserved(trip) {
    trip.miejsc -= 1;
    if (trip.miejsc === 0) {
      this.takenTrips += 1;
    }
  }

  onTripDeleted(trip) {
    this.trips = this.trips.filter(it => it.id !== trip.id);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
