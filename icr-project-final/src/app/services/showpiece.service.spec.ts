import { TestBed } from '@angular/core/testing';

import { ShowpieceService } from './showpiece.service';

describe('ShowpieceService', () => {
  let service: ShowpieceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowpieceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
