import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderService]
    });
    service = TestBed.inject(OrderService);
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load session data with default values if session is empty', () => {
    const data = service.loadSessionData();
    expect(data.count).toBe(1);
    expect(data.couponCode).toBeNull();
  });

  it('should load session data with stored values', () => {
    sessionStorage.setItem('productCount', '5');
    sessionStorage.setItem('appliedCoupon', 'SAVE20');
    const data = service.loadSessionData();
    expect(data.count).toBe(5);
    expect(data.couponCode).toBe('SAVE20');
  });

  it('should save product count to session storage', () => {
    service.saveProductCount(3);
    expect(sessionStorage.getItem('productCount')).toBe('3');
  });

  it('should save coupon code to session storage', () => {
    service.saveCouponCode('DISCOUNT10');
    expect(sessionStorage.getItem('appliedCoupon')).toBe('DISCOUNT10');
  });

  it('should calculate full price correctly', () => {
    const price = 100;
    const tax = 10;
    const shipping = 5;
    const count = 2;
    const discountAmount = 15;
    const totalPrice = service.calculateFullPrice(price, tax, shipping, count, discountAmount);
    expect(totalPrice).toBe('200,00');
  });

  it('should format total price with comma correctly', () => {
    const price = 123.45;
    const tax = 0;
    const shipping = 0;
    const count = 1;
    const discountAmount = 0;
    const totalPrice = service.calculateFullPrice(price, tax, shipping, count, discountAmount);
    expect(totalPrice).toBe('123,45');
  });
});
