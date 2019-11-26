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
        count: 1
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
    console.log('delete all reservations from trip', trip);
    // this.reservations.splice(this.reservations.findIndex(r => r.tripId === trip.id), 1);
  }

  deleteReservationByTripId(tripId: number): void {
    this.reservations.splice(this.reservations.findIndex(r => r.tripId === tripId), 1);
  }

  private getTripReservation(tripId): Reservation | null {
    return this.reservations.filter(r => r.tripId === tripId)[0] || null;
  }

  private generateReservationId(): number {
    return (this.reservations
      .map(reservation => reservation.id)
      .sort((r1, r2) => r2 - r1)[0] || 0) + 1;
  }

}
