import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  loadSessionData(): { count: number, couponCode: string | null } {
    const count = parseInt(sessionStorage.getItem('productCount') || '1', 10);
    const couponCode = sessionStorage.getItem('appliedCoupon');
    return { count, couponCode };
  }

  saveProductCount(count: number): void {
    sessionStorage.setItem('productCount', count.toString());
  }

  saveCouponCode(couponCode: string): void {
    sessionStorage.setItem('appliedCoupon', couponCode);
  }

  calculateFullPrice(price: number, tax: number, shipping: number, count: number, discountAmount: number): string {
    const totalPrice = (price * count) + tax + shipping - discountAmount;
    return totalPrice.toFixed(2).replace('.', ',');
  }
}
