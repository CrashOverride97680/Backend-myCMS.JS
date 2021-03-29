import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftboxComponent } from './leftbox.component';

describe('LeftboxComponent', () => {
  let component: LeftboxComponent;
  let fixture: ComponentFixture<LeftboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
