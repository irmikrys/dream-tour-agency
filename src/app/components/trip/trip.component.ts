import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Trip} from '../../shared/models/trip.model';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.less']
})
export class TripComponent implements OnInit {

  @Input() trip;
  @Input() lowest;
  @Input() highest;

  @Output() reserveTrip = new EventEmitter<Trip>();
  @Output() deleteTrip = new EventEmitter<Trip>();

  constructor() {
  }

  ngOnInit() {
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
