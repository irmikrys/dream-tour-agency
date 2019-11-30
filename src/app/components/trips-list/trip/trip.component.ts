import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Trip} from '../../../shared/models/trip.model';
import {TripRatingColor} from '../trip-rating/trip-rating.component';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.less']
})
export class TripComponent implements OnInit {

  @Input() trip: Trip;
  @Input() lowest;
  @Input() highest;

  @Output() reserveTrip = new EventEmitter<Trip>();
  @Output() discardTrip = new EventEmitter<Trip>();
  @Output() deleteTrip = new EventEmitter<Trip>();
  @Output() rateTrip = new EventEmitter<Trip>();

  rating = 0;
  starCount = 5;
  starColor: TripRatingColor = TripRatingColor.accent;

  constructor() {
  }

  ngOnInit() {
  }

  addTripToShoppingCart(trip: Trip): void {
    this.reserveTrip.emit(trip);
  }

  removeTripFromShoppingCart(trip) {
    this.discardTrip.emit(trip);
  }

  deleteChildTrip(trip) {
    this.deleteTrip.emit(trip);
  }

  onRatingChanged(rating) {
    this.rating = rating;

    let ratesCount = this.trip.ratesCount || 0;
    let currentRating = this.trip.rating || 0;

    currentRating *= ratesCount;
    ratesCount += 1;

    this.trip.ratesCount = ratesCount;
    this.trip.rating = (currentRating + rating) / ratesCount;

    this.rateTrip.emit(this.trip);
  }

}
