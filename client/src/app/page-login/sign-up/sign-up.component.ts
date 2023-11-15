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
      repeatPassword: {
        name: 'repeatPassword',
        ref: undefined,
        value: '',
        valid: false,
        errorMsg: "Passwords should be the same",
        placeholder: 'Repeat password',
        inputType: 'password'
      },
    });
  }

  handleSubmitClick(event: Event) {
    this.preSubmit(event, this.elemRef, this.errorRef, this.finishSignUp)
  }

  private finishSignUp() {
    // send data to server and redirect to successful sign up page
  }

  passwordValidation() {
    const password = this.validatedFields['password'].value;
    return (value: string) => value === password;
  }
}
