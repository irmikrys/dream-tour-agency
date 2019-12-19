import {Subscription} from 'rxjs';
import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ReservationsService} from '../../../shared/services/reservations.service';
import {Reservation} from '../../../shared/models/reservation.model';
import {AuthService} from '../../../shared/services/auth.service';
import {navbarLeftRoutes, navbarRightRoutes} from '../../../shared/config/routes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Output() public sidenavToggle = new EventEmitter();

  private reservations: Reservation[] = [];
  private authListenerSubs: Subscription;

  isUserAuthenticated = false;
  isAdmin = false;
  leftRoutes = navbarLeftRoutes;
  rightRoutes = navbarRightRoutes;

  constructor(private reservationsService: ReservationsService, private authService: AuthService) {
  }

  ngOnInit() {
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.isAdmin = this.authService.getUserRole() === 'admin';
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(authStatusData => {
        this.isUserAuthenticated = authStatusData.isAuthenticated;
        this.isAdmin = authStatusData.isAdmin;
      });
    this.getReservations();
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  getReservations() {
    this.reservations = this.reservationsService.getReservations();
  }

  onLogout() {
    this.authService.logout();
  }
}
