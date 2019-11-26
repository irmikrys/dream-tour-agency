import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import {Component, OnInit} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {TripsService} from '../../services/trips-service.service';
import {Trip} from '../../shared/models/trip.model';
import {Router} from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-new-trip-form',
  templateUrl: './new-trip-form.component.html',
  styleUrls: ['./new-trip-form.component.less'],
  providers: [
    // todo `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class NewTripFormComponent implements OnInit {

  nameFormControl = new FormControl('', [Validators.required]);
  countryFormControl = new FormControl('', [Validators.required]);
  startDateFormControl = new FormControl(moment(), [Validators.required]);
  endDateFormControl = new FormControl(moment(), [Validators.required]);
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

  constructor(private tripsService: TripsService, private router: Router) {
  }

  ngOnInit() {
  }

  onClickSubmit(tripData: Trip) {
    console.log('Submitted!', tripData);
    tripData.startDate = new Date(tripData.startDate);
    tripData.endDate = new Date(tripData.endDate);
    tripData.placesCount = tripData.maxPlaces;

    this.tripsService.addProduct(tripData);
    this.router.navigateByUrl('/').then((val) => console.log(val));
  }
}
