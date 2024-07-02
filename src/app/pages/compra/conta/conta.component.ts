import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCT_DATA } from '../../../data/productData';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { EnvioComponent } from './../envio/envio.component';


@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.scss'
})
export class ContaComponent {
  step = 1;
  product = PRODUCT_DATA;
  accountForm: FormGroup = {} as FormGroup;
  loggedInUser: any;
  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router) {
    this.createForm();
  }

  createForm(): void {
    this.accountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
    });
  }
  onAssign() {
    if (this.accountForm.valid) {
      const value = this.accountForm.value;
      this.authService.login(value.email, value.password);
    }
    else {
      this.accountForm.markAllAsTouched();
    }
  }
  async onRegister() {
    if (this.accountForm.valid) {
      const value = this.accountForm.value;

      this.authService.register(value.email, value.password);
    }
    else {
      this.accountForm.markAllAsTouched();
    }
  }

  goToNextPage() {
    this.router.navigate(['compra/envio']);
  }

}
