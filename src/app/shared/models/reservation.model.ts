import {User} from './user.model';

export interface Reservation {
  id: string;
  author: User;
  tripId: string;
  count: number;
}
