import { TestBed } from '@angular/core/testing';

import { ProfileguardService } from './profileguard.service';

describe('ProfileguardService', () => {
  let service: ProfileguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
