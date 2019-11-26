import {Component, OnInit} from '@angular/core';
import {Trip} from '../../../shared/models/trip.model';
import {TripsService} from '../../../shared/services/trips-service.service';
import {ReservationsService} from '../../../shared/services/reservations.service';

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

  constructor(private tripsService: TripsService, private reservationsService: ReservationsService) {
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
    this.reservationsService.addReservationFromTrip(trip);
  }

  onTripDiscard(trip: Trip): void {
    if (trip.placesCount < trip.maxPlaces) {
      trip.placesCount += 1;
    }
    this.reservationsService.deleteReservationFromTrip(trip);
  }

  onTripDeleted(trip: Trip): void {
    this.tripsService.deleteProduct(trip.id);
    this.reservationsService.deleteAllReservationsFromTrip(trip);
  }

  onTripRated(trip: Trip): void {
    this.tripsService.updateProduct(trip);
  }

}
