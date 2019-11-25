import {Component, OnInit} from '@angular/core';
import {Trip} from '../../../shared/models/trip.model';
import {TripsService} from '../../../services/trips-service.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.less']
})
export class TripsComponent implements OnInit {

  trips: Trip[] = [];
  takenTrips: number;
  highest: number;
  lowest: number;

  constructor(private tripsService: TripsService) {
  }

  ngOnInit() {
    this.getProducts();
    this.takenTrips = 0;
    this.highest = this.trips
      .sort((a, b) => (a.price > b.price) ? 1 : -1)
      .map(trip => trip.id)[this.trips.length - 1];
    this.lowest = this.trips
      .sort((a, b) => (a.price > b.price) ? 1 : -1)
      .map(trip => trip.id)[0];
  }

  getProducts(): void {
    this.trips = this.tripsService.getProducts();
  }

  onTripReserved(trip: Trip): void {
    trip.placesCount -= 1;
    if (trip.placesCount === 0) {
      this.takenTrips += 1;
    }
  }

  onTripDeleted(trip: Trip): void {
    this.tripsService.deleteProduct(trip.id);
  }

  onTripRated(trip: Trip): void {
    console.log('trip rated', trip);
    this.tripsService.updateProduct(trip);
  }

}
