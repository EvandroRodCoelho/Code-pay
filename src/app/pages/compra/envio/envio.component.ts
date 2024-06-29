import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../../model/Address'; // Importe sua classe Address
import { states } from '../../../data/states';
import { PRODUCT_DATA } from '../../../data/productData';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.scss']
})
export class EnvioComponent {
  addressForm: FormGroup;
  step = 2;
  states = states;
  product = PRODUCT_DATA;
  constructor(private fb: FormBuilder, private router: Router) {
    this.addressForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', Validators.required],
      street: ['', [Validators.required, Validators.minLength(3)]],
      number: [null, [Validators.required, Validators.pattern('^[0-9]+$')]]
    });

  }


  private isEmptyForm(): boolean {
    const formValues = this.addressForm.value;
    return Object.keys(formValues).every(key => !formValues[key]);
  }

  goToNextPage() {
    if (this.addressForm.valid) {

      const address = new Address(
        this.addressForm.value.city,
        this.addressForm.value.state,
        this.addressForm.value.street,
        this.addressForm.value.number
      );
      sessionStorage.setItem('address', JSON.stringify(address));
      this.router.navigate(['compra/pagamento']);
    } else {
      this.addressForm.markAllAsTouched();
    }
  }

  get formControls() {
    return this.addressForm.controls;
  }
}
