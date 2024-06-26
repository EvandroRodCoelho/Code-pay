import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCT_DATA } from '../../../data/productData';


@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.scss'
})
export class ContaComponent {
  constructor(
    private router: Router) { }

  step = 1;
  product = PRODUCT_DATA;
  goToNextPage() {
    this.router.navigate(['compra/envio']);
  }

}
