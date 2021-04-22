import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickSeatComponent } from './pick-seat.component';

describe('PickSeatComponent', () => {
  let component: PickSeatComponent;
  let fixture: ComponentFixture<PickSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickSeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
