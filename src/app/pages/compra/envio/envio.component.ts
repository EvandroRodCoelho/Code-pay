import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../../model/Address';
import { states } from '../../../data/states';
import { PRODUCT_DATA } from '../../../data/productData';
import { Observable } from 'rxjs';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.scss']
})
export class EnvioComponent implements OnInit {
  addressForm: FormGroup = {} as FormGroup;
  step = 2;
  states = states;
  product = PRODUCT_DATA;
  savedAddressArray: Address[] = [];
  user = this.authService.getUserEmail();
  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getSavedAddress();
    sessionStorage.removeItem('currentAddress');
    sessionStorage.removeItem('currentAddressTimestamp');
  }

  createForm(): void {
    this.addressForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', Validators.required, this.asyncStateValidator()],
      street: ['', [Validators.required, Validators.minLength(3)]],
      number: [null, [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  selectAddressSaved(address: Address): void {
    this.addressForm.setValue({
      city: address.city,
      state: address.state,
      street: address.street,
      number: address.number
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

  getSavedAddress(): void {
    const address = sessionStorage.getItem('addressArray');
    if (address) {
      try {
        this.savedAddressArray = JSON.parse(address) as Address[];
        console.log(this.savedAddressArray);
      } catch (error) {
        console.error("Error parsing address from sessionStorage:", error);
      }
    } else {
      console.log("No address found in sessionStorage");
    }
  }

  goToNextPage(): void {
    if (this.addressForm.valid) {
      const address = new Address(
        this.addressForm.value.city,
        this.addressForm.value.state,
        this.addressForm.value.street,
        this.addressForm.value.number
      );
      this.addAddress(address);
      this.setCurrentAddress(address);
      this.router.navigate(['compra/pagamento']);
    } else {
      this.addressForm.markAllAsTouched();
    }
  }
  setCurrentAddress(address: Address) {
    sessionStorage.setItem('currentAddress', JSON.stringify(address));
    sessionStorage.setItem('currentAddressTimestamp', Date.now().toString());
  }
  onAddressChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedAddressJson = target.value;
    if (selectedAddressJson) {
      const selectedAddress: Address = JSON.parse(selectedAddressJson);
      this.selectAddressSaved(selectedAddress);
    }
  }

  addAddress(newAddress: Address): void {
    const storedAddressArray = sessionStorage.getItem('addressArray');
    let addressArray: Address[] = [];
    if (storedAddressArray) {
      addressArray = JSON.parse(storedAddressArray);
    }
    const addressExists = addressArray.some(address =>
      address.city === newAddress.city &&
      address.state === newAddress.state &&
      address.street === newAddress.street &&
      address.number === newAddress.number
    );
    if (!addressExists) {
      addressArray.push(newAddress);
    }
    sessionStorage.setItem('addressArray', JSON.stringify(addressArray));
  }

  get formControls() {
    return this.addressForm.controls;
  }
}
