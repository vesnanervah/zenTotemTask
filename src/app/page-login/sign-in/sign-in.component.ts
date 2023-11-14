import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatedFields } from '../../../types/base-validated-input';
import { BaseValidatedInputComponent } from '../../base-validated-input/base-validated-input.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, BaseValidatedInputComponent, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
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
  };
}
