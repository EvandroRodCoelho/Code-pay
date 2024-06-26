import { Component } from '@angular/core';
import { PRODUCT_DATA } from '../../../data/productData';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.scss'
})
export class PayComponent {
  step = 3;
  product = PRODUCT_DATA;
}
