export class Address {
  city: string;
  state: string;
  street: string;
  number: number;

  constructor(city: string, state: string, street: string, number: number) {
    this.city = city;
    this.state = state;
    this.street = street;
    this.number = number;
  }
}
