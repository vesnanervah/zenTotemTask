import { Injectable } from '@angular/core';
import { LoginData, LoginResponse, UserData } from '../types/user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: boolean | undefined;
  private userData: UserData | undefined;

  constructor(
  ) {  
    this.loginByToken();
  }

  async loginByToken() {
    const authData = this.getAuthFromStorage();
    if(!authData.login && !authData.token) {
      this.loggout();
      return;
    }
    const res = await fetch('http://localhost:5000/auth', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData)
    });
    if (res.status === 200 ) {
      this.loggedIn = res.status === 200 ? true : false;
      this.userData = (await res.json() as UserData)
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
      this.setAuthToStorage(jRes.token, jRes.user.login);
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
      document.cookie = `token=${jRes.token}; user=${jRes.user.login}`;
      this.loggedIn = true;
      this.setAuthToStorage(jRes.token, jRes.user.login);
    }
    return res;
  }

  loggout() {
    this.userData = undefined;
    this.loggedIn = false;
    this.deleteAuthInStorage();
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getUserData() {
    return this.userData;
  }

  private setAuthToStorage(token: string, login: string) {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('login', login); // всё ещё очень небезопасно
  }

  private deleteAuthInStorage() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('login');
  }

  private getAuthFromStorage() {
    const token = window.localStorage.getItem('token');
    const login = window.localStorage.getItem('login');
    return { token, login };
  } 
}
