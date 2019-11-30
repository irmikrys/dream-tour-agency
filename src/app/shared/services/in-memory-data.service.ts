import { Injectable } from '@angular/core';
import {Trip} from '../models/trip.model';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {fakeTrips} from '../data/fakeTripsData';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    return {trips: fakeTrips};
  }

  genId(trips: Trip[]): number {
    return trips.length > 0 ? Math.max(...trips.map(hero => hero.id)) + 1 : 11;
  }
}
