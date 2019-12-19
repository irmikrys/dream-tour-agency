import {Injectable} from '@angular/core';
import {Reservation} from '../models/reservation.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private reservations: Reservation[] = []; // reservations for auth user

  constructor(private authService: AuthService) {
  }

  loadReservationsFromStorage(): void {
    const reservationsData = JSON.parse(localStorage.getItem('reservations'));
    if (reservationsData && reservationsData.length > 0) {
      this.reservations = reservationsData;
    }
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  addReservationFromTrip(tripId: string, placesLeft: number): void {
    let reservation = this.getTripReservation(tripId);
    if (reservation) {
      if (reservation.count < placesLeft) {
        reservation.count += 1;
        localStorage.setItem('reservations', JSON.stringify(this.reservations));
      }
    } else {
      reservation = {
        id: this.generateReservationId(),
        tripId,
        count: 1,
        author: this.authService.getUserId()
      };
      this.reservations.push(reservation);
      localStorage.setItem('reservations', JSON.stringify(this.reservations));
    }
  }

  deleteReservationFromTrip(tripId: string): void {
    const reservation = this.getTripReservation(tripId);
    if (reservation) {
      reservation.count -= 1;
      localStorage.setItem('reservations', JSON.stringify(this.reservations));
      if (reservation.count === 0) {
        this.deleteReservationByTripId(tripId);
      }
    }
  }

  deleteReservationByTripId(tripId: string): void {
    const reservation = this.getTripReservation(tripId);
    if (reservation) {
      this.reservations.splice(this.reservations.indexOf(reservation), 1);
      localStorage.setItem('reservations', JSON.stringify(this.reservations));
    }
  }

  private getTripReservation(tripId: string): Reservation | null {
    return this.reservations.filter(r => r.tripId === tripId)[0] || null;
  }

  private generateReservationId(): string {
    return (
      (this.reservations
        .map(reservation => Number(reservation.id))
        .sort((a, b) => a > b ? 1 : -1)[0] || 0) + 1
    ).toString();
  }

}
