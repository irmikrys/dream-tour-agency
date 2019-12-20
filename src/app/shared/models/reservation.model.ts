export interface Reservation {
  _id?: string;
  id: string;
  tripId: string;
  count: number;
  author?: string;
}
