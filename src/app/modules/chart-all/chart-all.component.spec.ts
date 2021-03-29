import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAllComponent } from './chart-all.component';

describe('ChartAllComponent', () => {
  let component: ChartAllComponent;
  let fixture: ComponentFixture<ChartAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
