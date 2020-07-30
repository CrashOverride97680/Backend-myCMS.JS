import { TestBed } from '@angular/core/testing';

import { LeftbarStatesService } from './leftbar-states.service';

describe('LeftbarStatesService', () => {
  let service: LeftbarStatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeftbarStatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
