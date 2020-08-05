import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoSemComponent } from './seo-sem.component';

describe('SeoSemComponent', () => {
  let component: SeoSemComponent;
  let fixture: ComponentFixture<SeoSemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeoSemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeoSemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
