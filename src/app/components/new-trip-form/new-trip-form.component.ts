import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TripsService} from '../../services/trips-service.service';

@Component({
  selector: 'app-new-trip-form',
  templateUrl: './new-trip-form.component.html',
  styleUrls: ['./new-trip-form.component.less']
})
export class NewTripFormComponent implements OnInit {

  formdata;

  constructor(private tripsService: TripsService) {
  }

  ngOnInit() {
    this.formdata = new FormGroup({
      name: new FormControl(),
      country: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      price: new FormControl(),
      maxPlaces: new FormControl(),
      description: new FormControl(),
      pictureLink: new FormControl(),
    });
  }

  onClickSubmit(data) {
    console.log('Submitted!', data);
  }
}
