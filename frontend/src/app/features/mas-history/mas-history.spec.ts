import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasHistoryComponent } from './mas-history';

describe('MasHistoryComponent', () => {
  let component: MasHistoryComponent;
  let fixture: ComponentFixture<MasHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
