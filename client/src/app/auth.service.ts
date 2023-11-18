import { Injectable } from '@angular/core';
import { LoginData, LoginResponse, UpdateData, UserData } from '../types/user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: boolean | undefined;
  private userData: UserData | undefined;
  private tokenLogedIn: Promise<boolean | undefined> | undefined;

  constructor(
  ) {
    this.tokenLogedIn = this.loginByToken()
    }

  async loginByToken() {  // use only once in app component on app initialize
    const authData = this.getAuthFromStorage();
    if(!authData.email || !authData.token) {
      this.loggout();
      return this.loggedIn
    }
    try {
      const res = await fetch('http://localhost:5000/auth', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData)
      });
      if (res.status === 200 ) {
        this.loggedIn = true 
        this.userData = (await res.json() as UserData)
      } else {
        this.loggout();
      }
    } catch {
      this.loggout();
    } finally {
      return this.loggedIn
    }
  
  }

  async login(data: LoginData) {
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    if (res.status === 200) {
      const jRes = (await res.json()) as LoginResponse
      this.userData = jRes.user;
      this.loggedIn = true;
      this.setAuthToStorage(jRes.token, jRes.user.email);
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
      const jRes = (await res.json()) as LoginResponse
      this.userData = jRes.user;
      this.loggedIn = true;
      this.setAuthToStorage(jRes.token, jRes.user.email);
    }
    return res;
  }

  async updateUser(data: UpdateData) {
    const res = await fetch('http://localhost:5000/update-user', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    if (res.status === 200) {
      this.userData = await res.json() as UserData;
    } else{
      throw new Error('Error while updating user');
    }
    return res;
  }

  loggout() { 
    this.userData = undefined;
    this.loggedIn = false;
    this.deleteAuthInStorage();
  }

  isLoggedIn() {
    return this.loggedIn !== undefined ? this.loggedIn : this.tokenLogedIn ;
  }

  getUserData() {
    return this.userData;
  }

  private setAuthToStorage(token: string, email: string) {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('email', email); // всё ещё очень небезопасно
  }

  private deleteAuthInStorage() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('email');
  }

  private getAuthFromStorage() {
    const token = window.localStorage.getItem('token');
    const email = window.localStorage.getItem('email');
    return { token, email };
  } 
}
