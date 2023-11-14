import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseValidatedInputComponent } from '../../base-validated-input/base-validated-input.component';
import { RouterLink } from '@angular/router';
import { ValidatedFields } from '../../../types/base-validated-input';
import BaseLoginVariant from '../base-login-variant';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, BaseValidatedInputComponent, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent extends BaseLoginVariant{
  @ViewChild('variant') elemRef: ElementRef <HTMLElement> | undefined;
  validatedFields: ValidatedFields = {
    login: {
      name: 'login',
      ref: undefined,
      value: "Login should contains only a-z, A-Z letters.",
      valid: false,
      errorMsg: "Login",
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
    repeatPassword: {
      name: 'repeatPassword',
      ref: undefined,
      value: '',
      valid: false,
      errorMsg: "Passwords should be the same",
      placeholder: 'Repeat password',
      inputType: 'password'
    },
  };

  constructor() {
    super();
  }

  handleSubmitClick(event: Event) {
    this.preSubmit(event, this.validatedFields, this.elemRef, this.finishSignUp)
  }

  private finishSignUp() {
    // send data to server and redirect to successful sign up page
  }
}
