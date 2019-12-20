import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationData, TripsService} from '../../shared/services/trips-service.service';

@Component({
  selector: 'app-trip-reservation-confirmation',
  templateUrl: './trip-reservation-confirmation.component.html',
  styleUrls: ['./trip-reservation-confirmation.component.less']
})
export class TripReservationConfirmationComponent implements OnInit {

  private confirmation: ConfirmationData = null;

  isLoading = false;

  constructor(private route: ActivatedRoute, private tripsService: TripsService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramsMap) => {
      this.isLoading = true;
      const {tripId, confirmationId} = (paramsMap as any).params;
      this.getConfirmationById(String(tripId), String(confirmationId));
    });
  }

  private getConfirmationById(tripId: string, confId: string): void {
    this.tripsService
      .getReservation(tripId, confId)
      .subscribe(confirmation => {
        const date = new Date(confirmation.reservationData.createDate);
        this.isLoading = false;
        this.confirmation = confirmation;
        this.confirmation.reservationData.createDate = date;
        console.log(confirmation);
      });
  }

}
