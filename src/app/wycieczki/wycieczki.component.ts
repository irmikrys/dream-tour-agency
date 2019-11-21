import {Component, OnInit} from '@angular/core';
import {Trip} from '../shared/models/trip.model';
import {TripsService} from '../services/trips-service.service';

@Component({
  selector: 'app-wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.less']
})
export class WycieczkiComponent implements OnInit {

  trips: Trip[];
  takenTrips: number;
  highest: number;
  lowest: number;

  constructor(private tripsService: TripsService) {
  }

  ngOnInit() {
    this.getProducts();
    this.takenTrips = 0;
    this.highest = this.trips
      .sort((a, b) => (a.cena > b.cena) ? 1 : -1)
      .map(trip => trip.id)[this.trips.length - 1];
    this.lowest = this.trips
      .sort((a, b) => (a.cena > b.cena) ? 1 : -1)
      .map(trip => trip.id)[0];
  }

  getProducts(): void {
    this.trips = this.tripsService.getProducts();
  }

  onTripReserved(trip): void {
    trip.miejsc -= 1;
    if (trip.miejsc === 0) {
      this.takenTrips += 1;
    }
  }

  onTripDeleted(trip): void {
    this.trips = this.trips.filter(it => it.id !== trip.id);
  }

}
