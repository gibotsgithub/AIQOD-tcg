import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerCertification } from './maker-certification';

describe('MakerCertification', () => {
  let component: MakerCertification;
  let fixture: ComponentFixture<MakerCertification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakerCertification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakerCertification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
