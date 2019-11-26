import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ReservationsService} from '../../../shared/services/reservations.service';
import {Reservation} from '../../../shared/models/reservation.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  private reservations: Reservation[] = [];

  constructor(private reservationsService: ReservationsService) {
  }

  ngOnInit() {
    this.getReservations();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  getReservations() {
    this.reservations = this.reservationsService.getReservations();
  }
}
