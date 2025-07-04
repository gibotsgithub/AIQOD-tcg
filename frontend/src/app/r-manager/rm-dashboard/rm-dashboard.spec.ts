import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmDashboard } from './rm-dashboard';

describe('RmDashboard', () => {
  let component: RmDashboard;
  let fixture: ComponentFixture<RmDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RmDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RmDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
