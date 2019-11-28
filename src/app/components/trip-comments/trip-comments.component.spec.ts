import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCommentsComponent } from './trip-comments.component';

describe('TripCommentsComponent', () => {
  let component: TripCommentsComponent;
  let fixture: ComponentFixture<TripCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
