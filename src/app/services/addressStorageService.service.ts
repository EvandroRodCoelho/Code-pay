import { Injectable } from '@angular/core';
import { Address } from '../model/Address';

@Injectable({
  providedIn: 'root'
})
export class AddressStorageService {
  private addressKey = 'addressArray';
  private currentAddressKey = 'currentAddress';
  private currentAddressTimestampKey = 'currentAddressTimestamp';

  clearCurrentAddress(): void {
    sessionStorage.removeItem(this.currentAddressKey);
    sessionStorage.removeItem(this.currentAddressTimestampKey);
  }

  setCurrentAddress(address: Address): void {
    sessionStorage.setItem(this.currentAddressKey, JSON.stringify(address));
    sessionStorage.setItem(this.currentAddressTimestampKey, Date.now().toString());
  }

  getCurrentAddress(): Address | null {
    const address = sessionStorage.getItem(this.currentAddressKey);
    if (address) {
      return JSON.parse(address);
    }
    return null;
  }

  addAddress(newAddress: Address): void {
    const storedAddressArray = sessionStorage.getItem(this.addressKey);
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
    sessionStorage.setItem(this.addressKey, JSON.stringify(addressArray));
  }

  getSavedAddresses(): Address[] {
    const address = sessionStorage.getItem(this.addressKey);
    if (address) {
      return JSON.parse(address);
    }
    return [];
  }
}
