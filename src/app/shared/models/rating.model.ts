import {User} from './user.model';

export interface Rating {
  author: User;
  rating: 1 | 2 | 3 | 4 | 5;
  tripId: string;
}
