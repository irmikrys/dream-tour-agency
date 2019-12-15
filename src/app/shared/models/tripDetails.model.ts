import {Trip} from './trip.model';
import {Comment} from './comment.model';
import {Reservation} from './reservation.model';

export interface TripDetails extends Trip {
  gallery: string[];
  comments: Comment[];
  reservations: Reservation[];
  createDate: Date;
}
