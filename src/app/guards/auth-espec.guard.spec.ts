import { TestBed } from '@angular/core/testing';

import { AuthEspecGuard } from './auth-espec.guard';

describe('AuthEspecGuard', () => {
  let guard: AuthEspecGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthEspecGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
