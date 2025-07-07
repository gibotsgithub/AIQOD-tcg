import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TIntelligence } from './tran-intelligence';

describe('Dashboard', () => {
  let component: TIntelligence;
  let fixture: ComponentFixture<TIntelligence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TIntelligence],
    }).compileComponents();

    fixture = TestBed.createComponent(TIntelligence);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
