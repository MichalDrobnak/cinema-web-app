import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningManagementComponent } from './screening-management.component';

describe('ScreeningManagementComponent', () => {
  let component: ScreeningManagementComponent;
  let fixture: ComponentFixture<ScreeningManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreeningManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
