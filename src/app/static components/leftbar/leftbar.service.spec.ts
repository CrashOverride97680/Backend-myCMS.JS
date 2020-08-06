import { TestBed } from '@angular/core/testing';

import { LeftbarService } from './leftbar.service';

describe('LeftbarService', () => {
  let service: LeftbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeftbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
