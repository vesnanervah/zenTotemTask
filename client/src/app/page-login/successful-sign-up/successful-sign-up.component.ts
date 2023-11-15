import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successful-sign-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './successful-sign-up.component.html',
  styleUrl: './successful-sign-up.component.scss'
})
export class SuccessfulSignUpComponent implements OnInit{
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.router.navigateByUrl('/profile'), 3000)
  }
}
