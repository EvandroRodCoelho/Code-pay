import { Component, OnInit } from '@angular/core';
import { PRODUCT_DATA } from '../../../data/productData';
import { PaymentCard } from "../../../model/PaymentCard";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  cardForm: FormGroup = {} as FormGroup;
  step = 3;
  product = PRODUCT_DATA;
  savedPaymentCardsArray: PaymentCard[] = [];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  createForm(): void {
    this.cardForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      number: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      expirationMouth: ['', [Validators.required]],
      expirationYear: ['', [Validators.required]],
      cvc: ['', []]
    });
  }

  ngOnInit(): void {
    this.getSavedCards();
  }

  getSavedCards(): void {
    const address = sessionStorage.getItem('paymentCardArray');
    if (address) {
      try {
        this.savedPaymentCardsArray = JSON.parse(address) as PaymentCard[];
        console.log(this.savedPaymentCardsArray);
      } catch (error) {
        console.error("Error parsing cards from sessionStorage:", error);
      }
    } else {
      console.log("No cards found in sessionStorage");
    }
  }

  confirmPurchase(): void {
    if (this.cardForm.valid) {
      const expiration = this.cardForm.value.expirationMouth + '/' + this.cardForm.value.expirationYear;
      const paymentCard = new PaymentCard(this.cardForm.value.name, this.cardForm.value.number, expiration, this.cardForm.value.cvc);
      this.addPaymentCard(paymentCard);
    } else {
      this.cardForm.markAllAsTouched();
    }
  }

  addPaymentCard(newPaymentCard: PaymentCard): void {
    const storedAddressArray = sessionStorage.getItem('paymentCardArray');
    let paymentCardArray: PaymentCard[] = [];
    if (storedAddressArray) {
      paymentCardArray = JSON.parse(storedAddressArray);
    }
    const cardPaymentExists = paymentCardArray.some(cardPayment =>
      cardPayment.name === newPaymentCard.name &&
      cardPayment.expiration === newPaymentCard.expiration &&
      cardPayment.cvc === newPaymentCard.cvc &&
      cardPayment.number === newPaymentCard.number
    );
    if (!cardPaymentExists) {
      paymentCardArray.push(newPaymentCard);
    }
    sessionStorage.setItem('paymentCardArray', JSON.stringify(paymentCardArray));
  }



  onPaymentCardChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedPaymentCardJson = target.value;
    if (selectedPaymentCardJson) {
      const selectedPaymentCard: PaymentCard = JSON.parse(selectedPaymentCardJson);
      this.selectedPaymentCardSaved(selectedPaymentCard);
    }
  }

  selectedPaymentCardSaved(paymentCard: PaymentCard): void {
    this.cardForm.setValue({
      name: paymentCard.name,
      number: paymentCard.number,
      expirationMouth: paymentCard.expiration.split('/')[0],
      expirationYear: paymentCard.expiration.split('/')[1],
      cvc: paymentCard.cvc
    });
  }
}
