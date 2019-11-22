import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Trip} from '../../shared/models/trip.model';

@Component({
  selector: 'app-wycieczka',
  templateUrl: './wycieczka.component.html',
  styleUrls: ['./wycieczka.component.less']
})
export class WycieczkaComponent implements OnInit {

  @Input() trip;
  @Input() lowest;
  @Input() highest;

  @Output() reserveTrip = new EventEmitter<Trip>();
  @Output() deleteTrip = new EventEmitter<object>();

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
