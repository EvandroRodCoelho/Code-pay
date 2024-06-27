import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from '../../model/ProductModel';
import { OrderService } from '../../services/order.service';
import { CouponService } from '../../services/coupon.service';

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

  constructor(private orderService: OrderService, private couponService: CouponService) { }

  ngOnInit(): void {
    const sessionData = this.orderService.loadSessionData();
    this.count = sessionData.count;
    this.couponCode = sessionData.couponCode;

    if (this.couponCode) {
      this.applyCouponCount();
    } else {
      this.calculateFullPrice();
    }
  }

  applyCoupon(): void {
    if (sessionStorage.getItem('appliedCoupon')) {
      alert('Você já aplicou um cupom anteriormente.');
      return;
    }
    this.applyCouponCount();
  }

  applyCouponCount(): void {
    try {
      const price = parseFloat(this.product.price.replace(',', '.'));
      const shipping = parseFloat(this.shipping.replace(',', '.'));
      const result = this.couponService.applyCoupon(this.couponCode!, price, this.count, shipping);

      this.discountAmount = result.discountAmount;
      this.shipping = result.newShipping;

      this.updateFullPrice();
      this.orderService.saveCouponCode(this.couponCode!);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Ocorreu um erro desconhecido.');
      }
    }
  }

  addCount(): void {
    this.count++;
    this.updateSessionStorage();
    this.calculateFullPrice();
  }

  decreaseCount(): void {
    if (this.count > 1) {
      this.count--;
      this.updateSessionStorage();
      this.calculateFullPrice();
    }
  }

  private updateSessionStorage(): void {
    this.orderService.saveProductCount(this.count);
  }

  private updateFullPrice(): void {
    const price = parseFloat(this.product.price.replace(',', '.'));
    const tax = parseFloat(this.tax.replace(',', '.'));
    const shipping = parseFloat(this.shipping.replace(',', '.'));

    if (!isNaN(price) && !isNaN(tax) && !isNaN(shipping)) {
      this.fullPrice = this.orderService.calculateFullPrice(price, tax, shipping, this.count, this.discountAmount);
    }
  }

  private calculateFullPrice(): void {
    const price = parseFloat(this.product.price.replace(',', '.'));
    const tax = parseFloat(this.tax.replace(',', '.'));
    const shipping = parseFloat(this.shipping.replace(',', '.'));

    if (!isNaN(price) && !isNaN(tax) && !isNaN(shipping)) {
      this.fullPrice = this.orderService.calculateFullPrice(price, tax, shipping, this.count, this.discountAmount);
    }
  }
}
