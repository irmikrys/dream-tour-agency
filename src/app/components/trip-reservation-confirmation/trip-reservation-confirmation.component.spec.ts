import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripReservationConfirmationComponent } from './trip-reservation-confirmation.component';

describe('TripReservationConfirmationComponent', () => {
  let component: TripReservationConfirmationComponent;
  let fixture: ComponentFixture<TripReservationConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripReservationConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripReservationConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
