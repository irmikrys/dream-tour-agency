import {Rating} from './rating.model';

export interface Trip {
  createDate?: Date;
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
