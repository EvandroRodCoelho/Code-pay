import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCT_DATA } from '../../../data/productData';
import { states } from '../../../data/states';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.scss']
})
export class EnvioComponent {
  step = 2;
  product = PRODUCT_DATA;
  states = states;
  addressForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.addressForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', Validators.required, this.asyncStateValidator()],
      street: ['', [Validators.required, Validators.minLength(3)]],
      number: [null, [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }
  asyncStateValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> => {
      const state = control.value;
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!this.states.includes(state)) {
            resolve({ invalidState: true });
          } else {
            resolve(null);
          }
        }, 1000);
      });
    };
  }


  ValidateState() {
    return false;
  }
  teste() {
    console.log(this.addressForm.get('state')?.errors)
  }

  goToNextPage() {
    this.router.navigate(['compra/pagamento']);
  }
}
