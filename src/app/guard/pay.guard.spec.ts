import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PayGuard } from './pay.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('PayGuard', () => {
  let guard: PayGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [PayGuard],
    });

    guard = TestBed.inject(PayGuard);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if address and valid timestamp are present', () => {
    sessionStorage.setItem('currentAddress', '123 Main St');
    sessionStorage.setItem('currentAddressTimestamp', (Date.now()).toString());

    expect(guard.canActivate()).toBeTrue();
  });

  it('should navigate to "compra/envio" and return false if address is missing', () => {
    sessionStorage.removeItem('currentAddress');
    sessionStorage.setItem('currentAddressTimestamp', (Date.now()).toString());

    expect(guard.canActivate()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['compra/envio']);
  });

  it('should navigate to "compra/envio" and return false if timestamp is missing', () => {
    sessionStorage.setItem('currentAddress', '123 Main St');
    sessionStorage.removeItem('currentAddressTimestamp');

    expect(guard.canActivate()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['compra/envio']);
  });

  it('should navigate to "compra/envio" and return false if timestamp is expired', () => {
    sessionStorage.setItem('currentAddress', '123 Main St');
    const expiredTimestamp = Date.now() - 31 * 60 * 1000; // 31 minutes ago
    sessionStorage.setItem('currentAddressTimestamp', expiredTimestamp.toString());

    expect(guard.canActivate()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['compra/envio']);
  });
});
