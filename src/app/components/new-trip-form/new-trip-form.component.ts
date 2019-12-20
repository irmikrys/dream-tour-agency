import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {TripsService} from '../../shared/services/trips-service.service';
import {MessageService} from '../../shared/services/message.service';
import {tripFormConfig} from '../../shared/config/forms';

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

  config = tripFormConfig;
  tripForm: FormGroup;

  isLoading = false;

  constructor(
    private tripsService: TripsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.tripForm = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['Indonezja', Validators.required],
      price: ['', Validators.required],
      currency: ['', Validators.required],
      maxPlaces: ['', Validators.required],
      pictureLink: ['https://www.traveligo.pl/repository/images/box_promocja/sylwia/indonezja.jpg', []],
      description: ['', Validators.required],
      startDate: [moment(), [Validators.required]],
      endDate: [moment(), [Validators.required]],
    });
  }

  onSubmit() {
    if (this.tripForm.invalid === true) {
      this.messageService.add('creation failed, invalid form');
      return;
    } else {
      this.isLoading = true;

      const tripData = this.tripForm.value;
      tripData.placesCount = tripData.maxPlaces;
      this.tripsService
        .addTrip(tripData)
        .subscribe(trip => {
            if (trip) {
              this.router.navigateByUrl('/');
            }
          }
        );
    }
  }
}
