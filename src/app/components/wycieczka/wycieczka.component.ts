import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-wycieczka',
  templateUrl: './wycieczka.component.html',
  styleUrls: ['./wycieczka.component.less']
})
export class WycieczkaComponent implements OnInit {

  @Input() trip;
  @Input() lowest;
  @Input() highest;

  @Output() reserveTrip = new EventEmitter<object>();
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
