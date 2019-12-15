import {User} from './user.model';

export interface Comment {
  author: User;
  title: string;
  content: string;
  createDate: Date;
  tripId: string;
}
