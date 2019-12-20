import { Component, OnInit } from '@angular/core';
import {TripsService} from '../../shared/services/trips-service.service';
import {Trip} from '../../shared/models/trip.model';
import {PageEvent} from '@angular/material';
import {ReservationsService} from '../../shared/services/reservations.service';

@Component({
  selector: 'app-admin-trips',
  templateUrl: './admin-trips.component.html',
  styleUrls: ['./admin-trips.component.less']
})
export class AdminTripsComponent implements OnInit {

  trips: Trip[] = [];

  isLoading = false;
  totalTrips = 0;
  tripsPerPage = 10;
  pageSizeOptions = [5, 10, 15, 20];
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
        const trips = tripsData.trips;
        trips.forEach(t => t.createDate = new Date(t.createDate));
        this.totalTrips = tripsData.maxTrips;
        this.trips = trips;
        this.isLoading = false;
      });
  }

  onChangePage(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex + 1;
    this.tripsPerPage = pageEvent.pageSize;
    this.getTrips();
  }

  onTripDeleted(tripId: string): void {
    this.isLoading = true;
    this.tripsService
      .deleteTrip(tripId)
      .subscribe(() => {
        this.getTrips();
      });
    this.reservationsService.deleteReservationByTripId(tripId);
  }

}
