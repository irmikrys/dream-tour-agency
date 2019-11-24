import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Trip} from '../../shared/models/trip.model';

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
    if (trip.miejsc < trip.maxMiejsc) {
      trip.miejsc += 1;
    }
  }

  deleteChildTrip(trip) {
    this.deleteTrip.emit(trip);
  }

}
