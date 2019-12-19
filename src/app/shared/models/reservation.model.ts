import {User} from './user.model';

export interface Reservation {
  id: string;
  author?: string; // User; not necessary
  tripId: string;
  count: number;
}
