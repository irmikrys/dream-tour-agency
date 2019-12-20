import {Component, OnInit} from '@angular/core';
import {Purchase, TripsService} from '../../shared/services/trips-service.service';

@Component({
  selector: 'app-purchases-page',
  templateUrl: './purchases-page.component.html',
  styleUrls: ['./purchases-page.component.less']
})
export class PurchasesPageComponent implements OnInit {

  purchases: Purchase[] = [];
  isLoading = false;

  constructor(
    private tripsService: TripsService,
  ) {
  }

  ngOnInit() {
    this.getPurchases();
  }

  getPurchases(): void {
    this.isLoading = true;
    this.tripsService
      .getPurchases()
      .subscribe(purchases => {
        purchases.forEach(p => p.reservation.createDate = new Date(p.reservation.createDate));
        this.purchases = purchases;
        this.isLoading = false;
      });
  }

}
