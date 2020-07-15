import { TestBed } from '@angular/core/testing';

import { AuthRecepGuard } from './auth-recep.guard';

describe('AuthRecepGuard', () => {
  let guard: AuthRecepGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthRecepGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
