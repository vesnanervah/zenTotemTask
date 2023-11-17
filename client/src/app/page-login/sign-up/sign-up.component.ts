import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseValidatedInputComponent } from '../../base-validated-input/base-validated-input.component';
import { Router, RouterLink } from '@angular/router';
import BaseLoginVariant from '../base-login-variant';
import { AuthService } from '../../auth.service';
import { LoginData } from '../../../types/user-data';
import { regExps } from '../../../reg-exps/reg-exps';
import { signUpFields } from './sign-up-fields';

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
  regExps = regExps;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    super(signUpFields);
  }

  handleSubmitClick(event: Event) {
    this.preSubmit(event, this.elemRef, this.errorRef)
  }

  protected override async authTry() {
    const loginData:LoginData = {
      email: this.validatedFields['email'].value,
      password: this.validatedFields['password'].value
    }
    const res = await this.authService.register(loginData);
    if (res.status === 200) {
      this.router.navigateByUrl('/login/successful');
      return;
    }
  }

  passwordRepeatValidation() {
    const password = this.validatedFields['password'].value;
    return (value: string) => value === password;
  }
}
