import {Injectable} from '@angular/core';
import {Trip} from '../shared/models/trip.model';
import {fakeTrips} from '../shared/data/fakeTripsData';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  private trips: Trip[];

  constructor() {
    this.trips = fakeTrips;
  }

  getProducts(): Trip[] {
    return this.trips;
  }

  getProduct(id: number) {
    return this.trips.filter(trip => trip.id === id);
  }

  addProduct(trip: Trip) {
    this.trips.push(trip);
  }

  deleteProduct(id: number) {
    this.trips.splice(fakeTrips.findIndex(trip => {
      return trip.id === id;
    }), 1);
  }
}
