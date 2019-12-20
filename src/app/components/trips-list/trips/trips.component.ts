import {PageEvent} from '@angular/material';
import {Component, OnInit} from '@angular/core';
import {Trip} from '../../../shared/models/trip.model';
import {TripsService} from '../../../shared/services/trips-service.service';
import {ReservationsService} from '../../../shared/services/reservations.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.less']
})
export class TripsComponent implements OnInit {

  trips: Trip[] = [];
  takenTrips = 0;
  highest: string;
  lowest: string;

  isLoading = false;
  totalTrips = 0;
  tripsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];
  currentPage = 1;

  constructor(
    private tripsService: TripsService,
    private reservationsService: ReservationsService
  ) {
  }

  ngOnInit() {
    this.getTrips();
  }

  getTrips(): void {
    this.isLoading = true;
    this.tripsService
      .getTrips(this.tripsPerPage, this.currentPage)
      .subscribe(tripsData => {
        this.trips = tripsData.trips;
        this.totalTrips = tripsData.maxTrips;
        this.highest = tripsData.expensive;
        this.lowest = tripsData.cheap;
        this.takenTrips = this.trips.filter(trip => trip.placesCount === 0).length;
        this.isLoading = false;
      });
  }

  onChangePage(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex + 1;
    this.tripsPerPage = pageEvent.pageSize;
    this.getTrips();
  }

  onTripReserved(trip: Trip): void {
    this.reservationsService.addReservationFromTrip(trip.id, trip.placesCount);
  }

  onTripDiscard(trip: Trip): void {
    this.reservationsService.deleteReservationFromTrip(trip.id);
  }

  onTripDeleted(trip: Trip): void {
    this.isLoading = true;
    this.tripsService
      .deleteTrip(trip.id)
      .subscribe(() => {
        this.getTrips();
      });
    this.reservationsService.deleteReservationByTripId(trip.id);
  }

}
