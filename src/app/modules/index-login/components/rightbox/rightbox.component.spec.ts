import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightboxComponent } from './rightbox.component';

describe('RightboxComponent', () => {
  let component: RightboxComponent;
  let fixture: ComponentFixture<RightboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
