import { TestBed } from '@angular/core/testing';
import { CouponService } from './coupon.service';

describe('CouponService', () => {
  let service: CouponService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CouponService]
    });
    service = TestBed.inject(CouponService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should apply 10% coupon correctly', () => {
    const result = service.applyCoupon('CUPOM10', 100, 2, 10);
    expect(result.discountAmount).toBe(20);
    expect(result.newShipping).toBe('10,00');
  });

  it('should apply 20% coupon correctly', () => {
    const result = service.applyCoupon('CUPOM20', 50, 3, 15);
    expect(result.discountAmount).toBe(30);
    expect(result.newShipping).toBe('15,00');
  });

  it('should apply free shipping coupon correctly', () => {
    const result = service.applyCoupon('FREE_SHIPPING', 75, 1, 20);
    expect(result.discountAmount).toBe(20);
    expect(result.newShipping).toBe('0,00');
  });

  it('should throw an error for an invalid coupon', () => {
    expect(() => service.applyCoupon('INVALID_COUPON', 100, 2, 10)).toThrowError('Cupom inválido!');
  });
});
