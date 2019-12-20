import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TripsService} from '../../../shared/services/trips-service.service';
import {TripDetails} from '../../../shared/models/tripDetails.model';
import {TripRatingColor} from '../../trips-list/trip-rating/trip-rating.component';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.less']
})
export class TripDetailsComponent implements OnInit {

  trip: TripDetails = null;
  isParticipant = false;

  isLoading = false;

  overallRating = 0;
  rating = 0;
  starCount = 5;
  starColor: TripRatingColor = TripRatingColor.accent;

  constructor(private route: ActivatedRoute, private tripsService: TripsService, private authService: AuthService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramsMap) => {
      this.isLoading = true;
      this.getTripById(String((paramsMap as any).params.id));
    });
  }

  onTripRated(rating: number): void {
    this.tripsService
      .addRating(this.trip.id, rating)
      .subscribe(ratings => {
        this.trip.ratings = ratings;
        this.countOverAllRating();
        this.countUserRating();
      });
  }

  private getTripById(id: string): void {
    this.tripsService
      .getTrip(id)
      .subscribe(trip => {
        this.isLoading = false;
        this.trip = trip;
        this.isParticipant = this.trip.reservations
          .filter(r => r.author.toString() === this.authService.getUserId()).length > 0;
        this.countOverAllRating();
        this.countUserRating();
      });
  }

  private countOverAllRating() {
    this.overallRating = this.trip.ratings.map(r => r.rating).reduce((prev, curr, index, array) => {
      return prev + curr;
    }, 0) / this.trip.ratings.length;
  }

  private countUserRating() {
    if (this.isParticipant) {
      this.rating = this.trip.ratings
        .filter(r => r.author.toString() === this.authService.getUserId())
        .map(r => r.rating)[0];
    }
  }

}
