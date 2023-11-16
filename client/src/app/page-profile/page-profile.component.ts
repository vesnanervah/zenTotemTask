import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProfileItemComponent } from './profile-item/profile-item.component';
import { UserData } from '../../types/user-data';
import { ProfileItemData } from '../../types/profile-item';
import { regExps } from '../../reg-exps/reg-exps';
import { FeedbackElem } from '../../types/feedback-elem';

@Component({
  selector: 'app-page-profile',
  standalone: true,
  imports: [CommonModule, ProfileItemComponent],
  templateUrl: './page-profile.component.html',
  styleUrl: './page-profile.component.scss'
})
export class PageProfileComponent implements OnInit {
  
  //@ViewChild('feedback') feedbackRef: ElementRef<HTMLElement> | undefined;
  private userData: UserData | undefined;
  itemsData: ProfileItemData[]  = [];
  feedbacks: FeedbackElem[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.isLoggedIn() === false) {
      router.navigateByUrl('login'); // TODO: Replace by guards
    }
    if (this.authService.isLoggedIn() === undefined) {
      this.router.navigateByUrl('home'); 
    }
  }

  ngOnInit(): void {
    this.userData = this.authService.getUserData();
    this.createItemsData()
  }

  handleSuccessfulUpdate(elem: FeedbackElem) {
    if (this.feedbacks.length >= 2) {
      this.feedbacks.shift();
    }
    this.feedbacks.push(elem);
    this.destroyFeedbackElem(elem);
  }

  handleDestroyClick(elem: FeedbackElem) {
    this.feedbacks.splice(this.feedbacks.indexOf(elem), 1);
  }

  private destroyFeedbackElem(elem: FeedbackElem) {
    setTimeout(() => {
      if(Object.is(this.feedbacks[0], elem)) this.feedbacks.shift();
    }, 30000)
  }

  private createItemsData() {
    if(this.userData)
    this.itemsData = [
      {
        validationStr: undefined,
        canChange: false,
        field: {
          name: 'email',
          value: this.userData.email,
          valid: true,
          errorMsg: '',
          placeholder: this.userData.email,
          inputType: 'email',
          ref: undefined
        }
      },
      {
        validationStr: regExps.password,
        canChange: true,
        field: {
          name: 'password',
          value: 'Password should contains only a-z/A-Z letters and numbers.',
          valid: true,
          errorMsg: '',
          placeholder: '********',
          inputType: 'password',
          ref: undefined
        }
      },
      {
        validationStr: regExps.name,
        canChange: true,
        field: {
          name: 'firstName',
          value: this.userData.firstName,
          valid: true,
          errorMsg: 'First name should contains only a-z/A-Z, а-я/А-Я  letters.',
          placeholder: this.userData.firstName,
          inputType: 'text',
          ref: undefined
        },
      },
      {
        validationStr: regExps.name,
        canChange: true,
        field: {
          name: 'lastName',
          value: this.userData.lastName,
          valid: true,
          errorMsg: 'First name should contains only a-z/A-Z, а-я/А-Я  letters.',
          placeholder: this.userData.lastName,
          inputType: 'text',
          ref: undefined
        },
      },
      {
        validationStr: regExps.phone,
        canChange: true,
        field: {
          name: 'phone',
          value: `+7 ${this.userData.phone}`,
          valid: true,
          errorMsg: 'Phone should only contains numbers, 10 count total.',
          placeholder: `+7 ${this.userData.phone}`,
          inputType: 'text',
          ref: undefined
        },
      },
      {
        validationStr: undefined,
        canChange: false,
        field: {
          name: 'role',
          value: this.userData.role,
          valid: true,
          errorMsg: '',
          placeholder: this.userData.role,
          inputType: 'text',
          ref: undefined
        },
      },
      {
        validationStr: regExps.website,
        canChange: true,
        field: {
          name: 'website',
          value: this.userData.website ? this.userData.website : '',
          valid: true,
          errorMsg: 'Website should be in www.site.com format.',
          placeholder: this.userData.website ? this.userData.website : 'Не указан',
          inputType: 'text',
          ref: undefined
        },
      },
    ]
  }

}
