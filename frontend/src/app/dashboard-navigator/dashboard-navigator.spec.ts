import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNavigator } from './dashboard-navigator';

describe('DashboardNavigator', () => {
  let component: DashboardNavigator;
  let fixture: ComponentFixture<DashboardNavigator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNavigator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardNavigator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
