import {Injectable} from '@angular/core';
import {Trip} from '../shared/models/trip.model';
import {fakeTrips} from '../shared/data/fakeTripsData';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor() {
  }

  getProducts(): Trip[] {
    return fakeTrips;
  }

  getProduct(id: number) {
    return fakeTrips.filter(trip => trip.id === id);
  }

  addProduct(trip: Trip) {
    fakeTrips.push(trip);
  }

  deleteProduct(id: number) {
    fakeTrips.splice(fakeTrips.findIndex(trip => {
      return trip.id === id;
    }), 1);
  }
}
