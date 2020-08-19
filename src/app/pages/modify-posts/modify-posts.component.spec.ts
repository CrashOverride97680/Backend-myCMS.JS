import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPostsComponent } from './modify-posts.component';

describe('ModifyPostsComponent', () => {
  let component: ModifyPostsComponent;
  let fixture: ComponentFixture<ModifyPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
