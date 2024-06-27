import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private couponCodes: Record<string, number> = {
    CUPOM10: 10,
    CUPOM20: 20,
    FREE_SHIPPING: 0,
  };

  applyCoupon(couponCode: string, price: number, count: number, shipping: number): { discountAmount: number, newShipping: string } {
    if (couponCode in this.couponCodes) {
      let discountAmount = 0;
      let newShipping = shipping.toFixed(2).replace('.', ',');

      if (couponCode === 'FREE_SHIPPING') {
        discountAmount = shipping;
        newShipping = '0,00';
      } else {
        const discountPercentage = this.couponCodes[couponCode];
        discountAmount = (price * count * discountPercentage) / 100;
      }

      return { discountAmount, newShipping };
    }

    throw new Error('Cupom inválido!');
  }
}
