import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningCardComponent } from './screening-card.component';

describe('ScreeningCardComponent', () => {
  let component: ScreeningCardComponent;
  let fixture: ComponentFixture<ScreeningCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreeningCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
