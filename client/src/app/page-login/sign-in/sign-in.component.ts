import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseValidatedInputComponent } from '../../base-validated-input/base-validated-input.component';
import { RouterLink } from '@angular/router';
import BaseLoginVariant from '../base-login-variant';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, BaseValidatedInputComponent, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent extends BaseLoginVariant {
  @ViewChild('variant') elemRef: ElementRef <HTMLElement> | undefined;
  @ViewChild('error') errorRef: ElementRef <HTMLElement> | undefined;

  constructor() {
    super({
      login: {
        name: 'login',
        ref: undefined,
        value: "",
        valid: false,
        errorMsg: "Login should contains only a-z, A-Z letters.",
        placeholder: 'Login',
        inputType: 'text'
      },
      password: {
        name: 'password',
        ref: undefined,
        value: '',
        valid: false,
        errorMsg: "Password should contains only a-z, A-Z letters and 0-9 number.",
        placeholder: 'Password',
        inputType: 'password'
      },
    });
  }

  handleSubmitClick(event: Event) {
    this.preSubmit(event, this.elemRef, this.errorRef, this.finishLogin);
  }

  private finishLogin() {
    // send login data to server
  }

  

}
