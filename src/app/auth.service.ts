import { Injectable } from '@angular/core';
import { UserData } from '../types/user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;
  private userData: UserData | undefined;

  constructor() { }

  isLoggedIn() {
    return this.loggedIn;
  }

  getUserData() {
    return this.userData;
  }
}
