import {Trip} from './trip.model';

export interface DetailReservation {
  id: number;
  count: number;
  trip: Trip;
}
