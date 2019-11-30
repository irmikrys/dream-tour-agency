import {Component, OnInit} from '@angular/core';
import {ReservationsService} from '../../../shared/services/reservations.service';
import {TripsService} from '../../../shared/services/trips-service.service';
import {DetailReservation} from '../../../shared/models/detailReservation.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.less']
})
export class ShoppingCartComponent implements OnInit {

  private reservations: DetailReservation[] = [];

  constructor(private reservationsService: ReservationsService, private tripsService: TripsService) {
  }

  ngOnInit() {
    this.getReservations();
  }

  getReservations(): void {
    const basicReservations = this.reservationsService.getReservations();
    basicReservations.forEach(basic => {
      this.tripsService
        .getTrip(basic.tripId)
        .subscribe(trip => {
          this.reservations.push({
            trip,
            count: trip.maxPlaces - trip.placesCount,
            id: basic.id,
          });
        });
    });
  }

}
