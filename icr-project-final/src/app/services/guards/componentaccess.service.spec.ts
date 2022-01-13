import { TestBed } from '@angular/core/testing';

import { ComponentaccessService } from './componentaccess.service';

describe('ComponentaccessService', () => {
  let service: ComponentaccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentaccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
