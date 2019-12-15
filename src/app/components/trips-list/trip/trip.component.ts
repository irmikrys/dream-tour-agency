import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Trip} from '../../../shared/models/trip.model';
import {TripRatingColor} from '../trip-rating/trip-rating.component';
import {Rating} from '../../../shared/models/rating.model';

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
  @Output() rateTrip = new EventEmitter<Rating>();

  ratesCount = 0;
  overallRating = 0;
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

  onRatingChanged(rating: 1 | 2 | 3 | 4 | 5) {
    this.rating = rating;

    let ratesCount = this.ratesCount || 0;
    let currentRating = this.overallRating || 0;

    currentRating *= ratesCount;
    ratesCount += 1;

    this.ratesCount = ratesCount;
    this.overallRating = (currentRating + rating) / ratesCount;

    this.rateTrip.emit({
      tripId: this.trip.id,
      rating,
      author: null // TODO: get user from auth service
    });
  }

}
