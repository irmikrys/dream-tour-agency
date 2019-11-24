import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.less']
})
export class TripDetailsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  public executeSelectedChange = (event) => {
    console.log(event);
  };

}
