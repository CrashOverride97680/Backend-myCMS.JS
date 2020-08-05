import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartEarningComponent } from './chart-earning.component';

describe('ChartEarningComponent', () => {
  let component: ChartEarningComponent;
  let fixture: ComponentFixture<ChartEarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartEarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
