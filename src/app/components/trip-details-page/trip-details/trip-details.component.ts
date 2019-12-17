import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TripsService} from '../../../shared/services/trips-service.service';
import {TripDetails} from '../../../shared/models/tripDetails.model';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.less']
})
export class TripDetailsComponent implements OnInit {

  private trip: TripDetails = null;

  isLoading = false;

  constructor(private route: ActivatedRoute, private tripsService: TripsService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramsMap) => {
      this.isLoading = true;
      this.getTripById(String((paramsMap as any).params.id));
    });
  }

  public executeSelectedChange = (event) => {
    console.log(event);
  }

  private getTripById(id: string): void {
    this.tripsService
      .getTrip(id)
      .subscribe(trip => {
        this.isLoading = false;
        this.trip = trip;
      });
  }

}
