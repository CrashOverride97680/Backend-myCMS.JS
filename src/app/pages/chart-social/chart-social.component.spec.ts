import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSocialComponent } from './chart-social.component';

describe('ChartSocialComponent', () => {
  let component: ChartSocialComponent;
  let fixture: ComponentFixture<ChartSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
