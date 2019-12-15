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
  highest: string;
  lowest: string;

  constructor(
    private tripsService: TripsService,
    private reservationsService: ReservationsService
  ) {
  }

  ngOnInit() {
    this.getTrips();
    this.takenTrips = 0;
  }

  getTrips(): void {
    this.tripsService
      .getTrips()
      .subscribe(trips => {
        this.trips = trips;
        this.highest = this.getHighestPricedTrip();
        this.lowest = this.getLowestPricedTrip();
      });
  }

  onTripReserved(trip: Trip): void {
    trip.placesCount -= 1;
    if (trip.placesCount === 0) {
      this.takenTrips += 1;
    }
    this.reservationsService.addReservationFromTrip(trip);
    this.tripsService.updateTrip(trip).subscribe();
  }

  onTripDiscard(trip: Trip): void {
    if (trip.placesCount < trip.maxPlaces) {
      trip.placesCount += 1;
    }
    this.reservationsService.deleteReservationFromTrip(trip);
  }

  onTripDeleted(trip: Trip): void {
    this.trips.splice(this.trips.findIndex(t => t.id === trip.id), 1);
    this.tripsService
      .deleteTrip(trip.id)
      .subscribe();
    this.reservationsService.deleteAllReservationsFromTrip(trip);
    this.recalculateOffers(trip.id);
  }

  onTripRated(trip: Trip): void {
    this.tripsService
      .updateTrip(trip)
      .subscribe();
  }

  private getHighestPricedTrip() {
    return this.trips
      .sort((a, b) => (a.price > b.price) ? 1 : -1)
      .map(trip => trip.id)[this.trips.length - 1];
  }

  private getLowestPricedTrip() {
    return this.trips
      .sort((a, b) => (a.price > b.price) ? 1 : -1)
      .map(trip => trip.id)[0];
  }

  private recalculateOffers(id: string) {
    if (this.highest === id) {
      this.highest = this.getHighestPricedTrip();
      console.log(`highest now is ${this.highest}`);
    }
    if (this.lowest === id) {
      this.lowest = this.getLowestPricedTrip();
      console.log(`lowest now is ${this.lowest}`);
    }
  }

}
