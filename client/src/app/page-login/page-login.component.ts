import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-page-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './page-login.component.html',
  styleUrl: './page-login.component.scss'
})
export class PageLoginComponent {
  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn() === true) { // TODO: Replace by guards
      router.navigateByUrl('profile'); 
    }
    if (this.authService.isLoggedIn() === undefined) {
      this.router.navigateByUrl('home'); 
    }
  }
}
