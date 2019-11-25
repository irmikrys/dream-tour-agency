import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {TripsService} from '../../services/trips-service.service';
import {Trip} from '../../shared/models/trip.model';
import {ErrorStateMatcher} from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-trip-form',
  templateUrl: './new-trip-form.component.html',
  styleUrls: ['./new-trip-form.component.less']
})
export class NewTripFormComponent implements OnInit {

  nameFormControl = new FormControl('', [Validators.required]);
  countryFormControl = new FormControl('', [Validators.required]);
  startDateFormControl = new FormControl('', [
    Validators.required,
    // Validators.pattern('YYYY-MM-DD') // fixme use datepicker
  ]);
  endDateFormControl = new FormControl('', [Validators.required]);
  priceFormControl = new FormControl('', [Validators.required]); // todo price with currency
  maxPlacesFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]); // todo textarea & max length
  pictureLinkFormControl = new FormControl('', [Validators.required]);

  formData: FormGroup = new FormGroup({
    name: this.nameFormControl,
    country: this.countryFormControl,
    startDate: this.startDateFormControl,
    endDate: this.endDateFormControl,
    price: this.priceFormControl,
    maxPlaces: this.maxPlacesFormControl,
    description: this.descriptionFormControl,
    pictureLink: this.pictureLinkFormControl,
  });

  matcher = new MyErrorStateMatcher();

  constructor(private tripsService: TripsService) {
  }

  ngOnInit() {
  }

  onClickSubmit(tripData: Trip) {
    console.log('Submitted!', tripData);
    tripData.startDate = new Date(tripData.startDate);
    tripData.endDate = new Date(tripData.endDate);
    tripData.placesCount = tripData.maxPlaces;

    this.tripsService.addProduct(tripData);
  }
}
