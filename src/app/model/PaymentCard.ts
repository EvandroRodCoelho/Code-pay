export class PaymentCard {
  name: string;
  number: string;
  expiration: string;
  cvc: number;

  constructor(name: string, number: string, expiration: string, cvc: number) {
    this.name = name;
    this.number = number;
    this.expiration = expiration;
    this.cvc = cvc;
  }
}
