import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerFluidComponent } from './container-fluid.component';

describe('ContainerFluidComponent', () => {
  let component: ContainerFluidComponent;
  let fixture: ComponentFixture<ContainerFluidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerFluidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerFluidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
