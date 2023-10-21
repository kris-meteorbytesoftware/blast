import { TestBed } from '@angular/core/testing';

import { BlastService } from './blast.service';

describe('BlastService', () => {
  let service: BlastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
