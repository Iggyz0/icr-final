import { TestBed } from '@angular/core/testing';

import { CartguardService } from './cartguard.service';

describe('CartguardService', () => {
  let service: CartguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
