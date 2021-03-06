import {Component, OnInit} from '@angular/core';
import {ReservationsService} from '../../../shared/services/reservations.service';
import {TripsService} from '../../../shared/services/trips-service.service';
import {ReservationDetails} from '../../../shared/models/reservationDetails.model';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.less']
})
export class ShoppingCartComponent implements OnInit {

  reservations: ReservationDetails[] = [];

  constructor(
    private reservationsService: ReservationsService,
    private tripsService: TripsService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.getReservations();
  }

  getReservations(): void {
    const tmpReservations = [];
    const basicReservations = this.reservationsService.getReservations();
    const reservationsCount = basicReservations.length;
    if (reservationsCount === 0) {
      this.reservations = [];
      return;
    }
    let processedCount = 0;
    basicReservations.forEach(basic => {
      this.tripsService
        .getTrip(basic.tripId)
        .subscribe(trip => {
          tmpReservations.push({
            price: trip.price,
            name: trip.name,
            currency: trip.currency,
            count: basic.count,
            id: basic.id,
            tripId: trip.id,
            placesLeft: trip.placesCount,
            author: this.authService.getUserId()
          });
          processedCount += 1;
          if (processedCount === reservationsCount) {
            tmpReservations.sort((a, b) => a.id > b.id ? 1 : -1);
            this.reservations = tmpReservations;
          }
        });
    });
  }

  onAdd(tripId: string, placesLeft: number) {
    this.reservationsService.addReservationFromTrip(tripId, placesLeft);
    this.getReservations();
  }

  onCountDown(tripId: string) {
    this.reservationsService.deleteReservationFromTrip(tripId);
    this.getReservations();
  }

  onConfirm(count: number, tripId: string) {
    this.tripsService
      .confirmReservation(count, tripId)
      .subscribe(reservation => {
        console.log(reservation);
        if (reservation) {
          this.reservationsService.deleteReservationByTripId(tripId);
          this.router.navigate([`/purchases/${tripId}/confirmation/${reservation._id}`]);
        }
      });
  }

}
