import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  getHelloTxt () {
    return this.authService.getUserData() ? 
    'Вы вошли как '
    : 'Вы не вошли.'
  }

  getFullName() {
    return this.authService.getUserData() ? this.authService.getUserData()?.firstName + ' ' + this.authService.getUserData()?.lastName : ''
  }

  getBtnTxt () {
    return this.authService.isLoggedIn() ? 'Выйти' : 'Войти';
  }

  handleBtnClick() {
    if (this.authService.isLoggedIn()) {
      this.authService.loggout()
    } 
    this.router.navigateByUrl('login');
  }

}
