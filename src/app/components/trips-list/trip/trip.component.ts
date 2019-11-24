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
  @Output() deleteTrip = new EventEmitter<Trip>();

  priceColor: object;

  rating = 3;
  starCount = 5;
  starColor: TripRatingColor = TripRatingColor.accent;
  starColorP: TripRatingColor = TripRatingColor.primary;
  starColorW: TripRatingColor = TripRatingColor.warn;

  constructor() {
  }

  ngOnInit() {
    const {trip: {id}, highest, lowest} = this;
    this.priceColor = {
      color: id === highest
        ? '#ffc107'
        : id === lowest
          ? '#2e7d32'
          : 'black'
    };
  }

  addTrip(trip) {
    this.reserveTrip.emit(trip);
  }

  removeTrip(trip) {
    if (trip.placesCount < trip.maxPlaces) {
      trip.placesCount += 1;
    }
  }

  deleteChildTrip(trip) {
    this.deleteTrip.emit(trip);
  }

  onRatingChanged(rating) {
    console.log(rating);
    this.rating = rating;
  }

}
