import {Injectable} from '@angular/core';
import {Trip} from '../models/trip.model';
import {fakeTrips} from '../data/fakeTripsData';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  private readonly trips: Trip[];

  constructor() {
    this.trips = fakeTrips;
  }

  getProducts(): Trip[] {
    return this.trips;
  }

  getProduct(id: number): Trip | null {
    const filtered = this.trips.filter(trip => trip.id === id);
    return filtered.length ? filtered[0] : null;
  }

  addProduct(trip: Trip): void {
    trip.id = this.trips
      .map(t => t.id)
      .sort((t1, t2) => t2 - t1)[0] + 1;
    this.trips.push(trip);
  }

  deleteProduct(id: number): void {
    this.trips.splice(fakeTrips.findIndex(trip => trip.id === id), 1);
  }

  updateProduct(trip: Trip): void {
    const itemIndex = this.trips.findIndex(item => item.id === trip.id);
    this.trips[itemIndex] = trip;
  }
}