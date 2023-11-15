import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './page-login.component.html',
  styleUrl: './page-login.component.scss'
})
export class PageLoginComponent {
  
}
