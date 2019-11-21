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
      nazwa: new FormControl(),
      kraj: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      cena: new FormControl(),
      maxMiejsc: new FormControl(),
      opis: new FormControl(),
      zdjecie: new FormControl(),
    });
  }

  onClickSubmit(data) {
    console.log('Submitted!', data);
  }
}
