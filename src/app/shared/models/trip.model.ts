export interface Trip {
  id: number;
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  price: number;
  maxPlaces: number;
  description: string;
  pictureLink: string;
  placesCount?: number;
  rating?: number;
  ratesCount?: number;
}
