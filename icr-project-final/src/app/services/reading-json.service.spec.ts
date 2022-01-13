import { TestBed } from '@angular/core/testing';

import { ReadingJSONService } from './reading-json.service';

describe('ReadingJsonService', () => {
  let service: ReadingJSONService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingJSONService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
