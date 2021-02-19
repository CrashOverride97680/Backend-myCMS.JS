import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPostComponent } from './modify-post.component';

describe('ModifyPostComponent', () => {
  let component: ModifyPostComponent;
  let fixture: ComponentFixture<ModifyPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
