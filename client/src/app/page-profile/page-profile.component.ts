import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-page-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-profile.component.html',
  styleUrl: './page-profile.component.scss'
})
export class PageProfileComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    if (!authService.isLoggedIn()) {
     router.navigateByUrl('login'); 
    }
  }

}
