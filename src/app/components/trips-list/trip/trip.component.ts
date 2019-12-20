import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Trip} from '../../../shared/models/trip.model';
import {TripRatingColor} from '../trip-rating/trip-rating.component';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../shared/services/auth.service';
import {UserRole} from '../../../shared/models/userRole.type';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.less']
})
export class TripComponent implements OnInit, OnDestroy {

  @Input() trip: Trip;
  @Input() lowest;
  @Input() highest;

  @Output() reserveTrip = new EventEmitter<Trip>();
  @Output() discardTrip = new EventEmitter<Trip>();
  @Output() deleteTrip = new EventEmitter<Trip>();

  private authListenerSubs: Subscription;
  isUserAuthenticated = false;
  userRole: UserRole;
  isAdmin = false;

  ratesCount = 0;
  overallRating = 0;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.userRole = this.authService.getUserRole(); // TODO check if necessary
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(authStatusData => {
        this.isUserAuthenticated = authStatusData.isAuthenticated;
        this.userRole = this.authService.getUserRole();
        this.isAdmin = authStatusData.isAdmin;
      });
    this.ratesCount = this.trip.ratings.length;
    this.countOverAllRating();
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

  addTripToShoppingCart(trip: Trip): void {
    this.reserveTrip.emit(trip);
  }

  removeTripFromShoppingCart(trip) {
    this.discardTrip.emit(trip);
  }

  deleteChildTrip(trip) {
    this.deleteTrip.emit(trip);
  }

  private countOverAllRating() {
    this.overallRating = this.trip.ratings.map(r => r.rating).reduce((prev, curr, index, array) => {
      return prev + curr;
    }, 0) / this.trip.ratings.length;
  }

}
