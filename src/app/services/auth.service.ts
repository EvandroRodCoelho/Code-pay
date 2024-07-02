import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersKey = 'registeredUsers';
  constructor() {
    if (!localStorage.getItem(this.usersKey)) {
      localStorage.setItem(this.usersKey, JSON.stringify([]));
    }
  }

  login(email: string, password: string): Observable<boolean> {
    const users = this.getRegisteredUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify({ email }));
      return of(true);
    } else {
      return of(false);
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  register(email: string, password: string): Observable<boolean> {
    const users = this.getRegisteredUsers();
    const userExists = users.some(u => u.email === email);

    if (userExists) {
      alert("USER already registered")
      return of(false);
    } else {
      users.push({ email, password });

      localStorage.setItem(this.usersKey, JSON.stringify(users));
      return of(true);
    }
  }

  isLoggedIn(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    return !!currentUser;
  }
  getUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? true : false;
  }

  getUserEmail() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '[]');
    return currentUser ? currentUser.email : currentUser
  }
  private getRegisteredUsers(): { email: string, password: string }[] {
    const usersString = localStorage.getItem(this.usersKey);
    return usersString ? JSON.parse(usersString) : [];
  }
}
