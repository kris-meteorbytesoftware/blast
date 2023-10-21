import { TestBed } from '@angular/core/testing';

import { LandmineService } from './landmine.service';

describe('LandmineService', () => {
  let service: LandmineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandmineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
