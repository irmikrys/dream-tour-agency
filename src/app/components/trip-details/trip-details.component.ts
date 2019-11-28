import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TripsService} from '../../shared/services/trips-service.service';
import {Trip} from '../../shared/models/trip.model';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.less']
})
export class TripDetailsComponent implements OnInit {

  private trip: Trip = null;

  constructor(private route: ActivatedRoute, private tripsService: TripsService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramsMap) => {
      this.getTripById(Number((paramsMap as any).params.id));
      console.log('trip', this.trip);
    });
  }

  public executeSelectedChange = (event) => {
    console.log(event);
  }

  private getTripById(id: number): void {
    console.log('id to fetch', id);
    this.trip = this.tripsService.getProduct(id);
  }

}
