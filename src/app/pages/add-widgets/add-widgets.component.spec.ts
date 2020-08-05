import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWidgetsComponent } from './add-widgets.component';

describe('AddWidgetsComponent', () => {
  let component: AddWidgetsComponent;
  let fixture: ComponentFixture<AddWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
