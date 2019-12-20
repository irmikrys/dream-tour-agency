import {Reservation} from './reservation.model';

export interface ReservationDetails extends Reservation {
  placesLeft: number;
  price: number;
  name: string;
  currency: string;
}
