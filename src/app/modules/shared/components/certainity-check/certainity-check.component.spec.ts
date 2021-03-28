import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertainityCheckComponent } from './certainity-check.component';

describe('CertainityCheckComponent', () => {
  let component: CertainityCheckComponent;
  let fixture: ComponentFixture<CertainityCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertainityCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertainityCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
