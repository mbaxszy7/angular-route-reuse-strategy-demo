import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyIframe } from './third-party-iframe';

describe('ThirdPartyIframe', () => {
  let component: ThirdPartyIframe;
  let fixture: ComponentFixture<ThirdPartyIframe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdPartyIframe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdPartyIframe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
