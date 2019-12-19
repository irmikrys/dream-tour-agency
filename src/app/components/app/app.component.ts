import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {ReservationsService} from '../../shared/services/reservations.service';

@Component({
  selector: 'app-hello',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private reservationsService: ReservationsService) {
  }

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.reservationsService.loadReservationsFromStorage();
  }

}
