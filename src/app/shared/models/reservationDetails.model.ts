import {Reservation} from './reservation.model';
import {User} from './user.model';

export interface ReservationDetails extends Reservation {
  placesLeft: number;
  price: number;
  name: string;
  currency: string;
  author?: User;
}
