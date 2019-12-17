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
  leftRoutes = navbarLeftRoutes;
  rightRoutes = navbarRightRoutes;

  constructor(private reservationsService: ReservationsService, private authService: AuthService) {
  }

  ngOnInit() {
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isUserAuthenticated = isAuthenticated;
      });
    this.getReservations();
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  getReservations() {
    this.reservations = this.reservationsService.getReservations();
  }
}
