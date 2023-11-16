import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { AuthService } from './auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, RouterOutlet, HeaderComponent, NavbarComponent]
})
export class AppComponent {
  title = 'zen-totem';
  constructor(
    private authService: AuthService
  ) {
    this.authService.loginByToken();
  }
}
