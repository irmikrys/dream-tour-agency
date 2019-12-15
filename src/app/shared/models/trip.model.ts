import {Comment} from './comment.model';
import {Rating} from './rating.model';

export interface Trip {
  id: string;
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  price: number;
  currency: string;
  maxPlaces: number;
  description: string;
  pictureLink: string;
  placesCount?: number;
  ratings?: Rating[];
}
