import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from '../../model/ProductModel';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  @Input() product: ProductModel = {} as ProductModel;
  @Input() tax: string = "0,00";
  @Input() shipping: string = "0,00";
  count: number = 1;
  fullPrice: string = '';
  couponCode: string | null = null;
  discountAmount: number = 0;

  ngOnInit(): void {
    this.count = parseInt(sessionStorage.getItem('productCount') || '1', 10);
    this.couponCode = sessionStorage.getItem('appliedCoupon');
    if (this.couponCode)
      this.applyCouponCount()
    else
      this.calculateFullPrice()
  }

  applyCoupon(): void {
    const appliedCoupon = sessionStorage.getItem('appliedCoupon');
    if (appliedCoupon) {
      alert('Você já aplicou um cupom anteriormente.');
      return;
    }
    this.applyCouponCount();
  }


  applyCouponCount() {
    const couponCodes: Record<string, number> = {
      CUPOM10: 10,
      CUPOM20: 20,
      FREE_SHIPPING: 0,
    };

    if (this.couponCode && this.couponCode in couponCodes) {
      if (this.couponCode === 'FREE_SHIPPING') {
        this.discountAmount = parseFloat(this.shipping.replace(',', '.'));
        this.shipping = '0,00'
      } else {
        const discountPercentage = couponCodes[this.couponCode];
        const totalPrice = parseFloat(this.product.price.replace(',', '.')) * this.count;
        this.discountAmount = (totalPrice * discountPercentage) / 100;
      }

      const totalPrice = parseFloat(this.product.price.replace(',', '.')) * this.count;
      this.fullPrice = (
        totalPrice - this.discountAmount +
        parseFloat(this.tax.replace(',', '.')) +
        parseFloat(this.shipping.replace(',', '.'))
      ).toFixed(2).replace('.', ',');

      sessionStorage.setItem('appliedCoupon', this.couponCode);
    } else {
      alert('Cupom inválido!');
    }
  }
  addCount(): void {
    this.count++;
    this.updateSessionStorage();
    this.calculateFullPrice();
  }

  private updateSessionStorage(): void {
    sessionStorage.setItem('productCount', this.count.toString());
  }

  decreaseCount(): void {
    if (this.count > 1) {
      this.count--;
      this.calculateFullPrice();
      this.updateSessionStorage();
    }
  }

  private calculateFullPrice(): void {
    if (this.product.price && this.tax && this.shipping) {
      const price = parseFloat(this.product.price.replace(',', '.'));
      const tax = parseFloat(this.tax.replace(',', '.'));
      const shipping = parseFloat(this.shipping.replace(',', '.'));

      if (!isNaN(price) && !isNaN(tax) && !isNaN(shipping)) {
        const totalPrice = (price * this.count) + tax + shipping;
        this.fullPrice = totalPrice.toFixed(2).replace('.', ',');
      }
    }
  }
}
