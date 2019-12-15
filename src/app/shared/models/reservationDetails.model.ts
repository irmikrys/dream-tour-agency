import {Reservation} from './reservation.model';

export interface ReservationDetails extends Reservation {
  price: number;
  name: string;
  currency: string;
}
