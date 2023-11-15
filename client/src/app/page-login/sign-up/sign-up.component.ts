import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseValidatedInputComponent } from '../../base-validated-input/base-validated-input.component';
import { Router, RouterLink } from '@angular/router';
import { ValidatedFields } from '../../../types/base-validated-input';
import BaseLoginVariant from '../base-login-variant';
import { AuthService } from '../../auth.service';
import { LoginData } from '../../../types/user-data';

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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
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
    this.preSubmit(event, this.elemRef, this.errorRef)
  }

  protected override async authTry() {
    const loginData:LoginData = {
      login: this.validatedFields['login'].value,
      password: this.validatedFields['password'].value
    }
    const res = await this.authService.register(loginData);
    if (res.status === 200) {
      this.router.navigateByUrl('/login/successful');
      return;
    }
  }

  passwordValidation() {
    const password = this.validatedFields['password'].value;
    return (value: string) => value === password;
  }
}
