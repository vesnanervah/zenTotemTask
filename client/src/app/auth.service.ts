import { Injectable } from '@angular/core';
import { LoginData, UserData } from '../types/user-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;
  private userData: UserData | undefined;

  constructor(
  ) { }

  async login(data: LoginData) {
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    if (res.status === 200) {
      this.userData = await res.json();
      this.loggedIn = true;
    }
    return res;
  }

  async register(data: LoginData) {
    const res = await fetch('http://localhost:5000/new-user', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    if (res.status === 200) {
      this.userData = await res.json();
      this.loggedIn = true;
    }
    return res;
  }

  loggout() {
    this.userData = undefined;
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getUserData() {
    return this.userData;
  }
}
