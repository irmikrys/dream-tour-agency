export interface Trip {
  id: number;
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  price: number;
  maxPlaces: number;
  placesCount?: number;
  description: string;
  pictureLink: string;
}
