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
    let reservation = this.getTripReservation(trip.id);
    if (reservation) {
      reservation.count += 1;
    } else {
      reservation = {
        id: this.generateReservationId(),
        tripId: trip.id,
        count: 1,
        author: null // TODO: get user form AuthService
      };
      this.reservations.push(reservation);
    }
  }

  deleteReservationFromTrip(trip: Trip): void {
    const reservation = this.getTripReservation(trip.id);
    if (reservation) {
      reservation.count -= 1;
      if (reservation.count === 0) {
        this.deleteReservationByTripId(trip.id);
      }
    }
  }

  deleteAllReservationsFromTrip(trip: Trip): void {
    this.deleteReservationByTripId(trip.id);
  }

  deleteReservationByTripId(tripId: string): void {
    const reservation = this.getTripReservation(tripId);
    if (reservation) {
      this.reservations.splice(this.reservations.indexOf(reservation), 1);
    }
  }

  private getTripReservation(tripId): Reservation | null {
    return this.reservations.filter(r => r.tripId === tripId)[0] || null;
  }

  private generateReservationId(): string {
    return (
      this.reservations
        .map(reservation => reservation.id)
        .join('')
    ) + '1';
  }

}
