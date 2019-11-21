import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTripFormComponent } from './new-trip-form.component';

describe('NewTripFormComponent', () => {
  let component: NewTripFormComponent;
  let fixture: ComponentFixture<NewTripFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTripFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTripFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
