import { TestBed } from '@angular/core/testing';

import { ToastUXService } from './toast-ux.service';

describe('ToastUXService', () => {
  let service: ToastUXService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastUXService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
