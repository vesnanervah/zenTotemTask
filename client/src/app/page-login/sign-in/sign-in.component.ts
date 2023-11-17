import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseValidatedInputComponent } from '../../base-validated-input/base-validated-input.component';
import { Router, RouterLink } from '@angular/router';
import BaseLoginVariant from '../base-login-variant';
import { AuthService } from '../../auth.service';
import { LoginData } from '../../../types/user-data';
import { regExps } from '../../../reg-exps/reg-exps';
import { signInFields } from './sign-in-fields';

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
  regExps = regExps;


  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    super(signInFields);
  }

  handleSubmitClick(event: Event) {
    this.preSubmit(event, this.elemRef, this.errorRef);
  }

  protected override async authTry() {
    const loginData:LoginData = {
      email: this.validatedFields['email'].value,
      password: this.validatedFields['password'].value
    }
    const res = await this.authService.login(loginData);
    if (res.status === 200) {
      this.router.navigateByUrl('/profile');
      return;
    }
    if(this.errorRef)this.errorRef.nativeElement.textContent = 'Неправильный логин или пароль';
    this.animateIncompleteState(this.elemRef?.nativeElement);
  }
}

