import {Injectable} from '@angular/core';
import {Reservation} from '../models/reservation.model';
import {Trip} from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private reservations: Reservation[] = [];

  constructor() {
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  addReservationFromTrip(trip: Trip): void {
    const reservation = {
      id: this.generateReservationId(),
      tripId: trip.id,
    };
    this.reservations.push(reservation);
  }

  deleteReservationFromTrip(trip: Trip): void {
    this.reservations.splice(this.reservations.findIndex(r => r.tripId === trip.id), 1);
  }

  deleteAllReservationsFromTrip(trip: Trip): void {
    for (let i = 0; i < this.reservations.length; i++) {
      if (this.reservations[i].tripId === trip.id) {
        this.reservations.splice(i, 1);
        i--;
      }
    }
  }

  private generateReservationId(): number {
    return (this.reservations
      .map(reservation => reservation.id)
      .sort((r1, r2) => r2 - r1)[0] || 0) + 1;
  }

}
