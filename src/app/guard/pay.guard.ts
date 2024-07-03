import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PayGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    const address: string | null = sessionStorage.getItem('currentAddress');
    const addressTimestamp: string | null = sessionStorage.getItem('currentAddressTimestamp');

    if (!this.isValidAddressTimeStamp(addressTimestamp) || address === null) {
      this.router.navigate(['compra/envio']);
      return false;
    }
    return true;
  }

  private isValidAddressTimeStamp(addressTimestamp: string | null): boolean {
    if (addressTimestamp === null) {
      return false;
    }

    const timestamp = parseInt(addressTimestamp, 10);
    const now = Date.now();
    const expirationTime = 30 * 60 * 1000;

    if (now - timestamp > expirationTime) {
      return false;
    }
    return true;
  }

}


