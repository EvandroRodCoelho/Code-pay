import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrl: './envio.component.scss'
})
export class EnvioComponent {
  constructor(
    private router: Router
  ) { }
  step = 2;
  goToNextPage() {
    this.router.navigate(['compra/pagamento']);
  }

}
