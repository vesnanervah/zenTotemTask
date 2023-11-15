import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
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
    `Вы вошли как ${this.authService.getUserData()?.firstName} ${this.authService.getUserData()?.lastName}`
    : 'Вы не вошли.'
  }

  getBtnTxt () {
    return this.authService.isLoggedIn() ? 'Выйти' : 'Войти';
  }

  handleBtnClick() {
    if (this.authService.isLoggedIn()) {
      // logout
    } else {
      console.log('Navigatin to login')
      this.router.navigateByUrl('login');
    }
  }

}
