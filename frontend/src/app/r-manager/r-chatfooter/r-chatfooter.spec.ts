import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RChatfooter } from './r-chatfooter';

describe('RChatfooter', () => {
  let component: RChatfooter;
  let fixture: ComponentFixture<RChatfooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RChatfooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RChatfooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
