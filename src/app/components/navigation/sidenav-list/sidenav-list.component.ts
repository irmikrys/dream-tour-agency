import {Subscription} from 'rxjs';
import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Reservation} from '../../../shared/models/reservation.model';
import {ReservationsService} from '../../../shared/services/reservations.service';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.less']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() sidenavClose = new EventEmitter();

  reservations: Reservation[] = [];

  private authListenerSubs: Subscription;

  isUserAuthenticated = false;
  isAdmin = false;

  constructor(
    private reservationsService: ReservationsService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.getReservations();
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.isAdmin = this.authService.getUserRole() === 'admin';
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(authStatusData => {
        this.isUserAuthenticated = authStatusData.isAuthenticated;
        this.isAdmin = authStatusData.isAdmin;
        if (!this.isUserAuthenticated) {
          this.reservationsService.clearReservations();
          this.getReservations();
        }
      });
  }
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

  getReservations() {
    this.reservations = this.reservationsService.getReservations();
  }

  onLogout() {
    this.onSidenavClose();
    this.authService.logout();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
