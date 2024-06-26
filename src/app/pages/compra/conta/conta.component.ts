import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.scss'
})
export class ContaComponent {
  constructor(
    private router: Router
  ) { }
  step = 1;
  goToNextPage() {
    this.router.navigate(['compra/envio']);
  }
}
