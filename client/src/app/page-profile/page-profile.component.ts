import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { ProfileItemComponent } from './profile-item/profile-item.component';
import { UserData } from '../../types/user-data';
import { ProfileItemData } from '../../types/profile-item';
import { regExps } from '../../reg-exps/reg-exps';
import { FeedbackElem } from '../../types/feedback-elem';
import { FeedbackComponent } from './feedback/feedback.component';

@Component({
  selector: 'app-page-profile',
  standalone: true,
  imports: [CommonModule, ProfileItemComponent, FeedbackComponent],
  templateUrl: './page-profile.component.html',
  styleUrl: './page-profile.component.scss'
})
export class PageProfileComponent implements OnInit {
  private userData: UserData | undefined;
  itemsData: ProfileItemData[]  = [];
  feedbacks: FeedbackElem[] = [];

  constructor(
    private authService: AuthService
  ) { }

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
        }
      },
      {
        validationStr: regExps.password,
        canChange: true,
        field: {
          name: 'password',
          value: '',
          valid: false,
          errorMsg: 'Password should contains only a-z/A-Z letters and numbers and length 3 or more chars.',
          placeholder: '********',
          inputType: 'password',
          minlen: 2
        }
      },
      {
        validationStr: regExps.name,
        canChange: true,
        field: {
          name: 'firstName',
          value: this.userData.firstName,
          valid: true,
          errorMsg: 'First name should contains only a-z/A-Z, а-я/А-Я  letters and length 3 or more chars.',
          placeholder: this.userData.firstName,
          inputType: 'text',
          minlen: 2
        },
      },
      {
        validationStr: regExps.name,
        canChange: true,
        field: {
          name: 'lastName',
          value: this.userData.lastName,
          valid: true,
          errorMsg: 'First name should contains only a-z/A-Z, а-я/А-Я  letters and length 3 or more chars.',
          placeholder: this.userData.lastName,
          inputType: 'text',
          minlen: 2
        },
      },
      {
        validationStr: regExps.phone,
        canChange: true,
        field: {
          name: 'phone',
          value: `${this.userData.phone}`,
          valid: true,
          errorMsg: 'Phone should only contains numbers and length 12 total.',
          placeholder: `${this.userData.phone}`,
          inputType: 'text',
          minlen: 11,
          maxlen: '12',
          prefix: '+7'
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
        },
      },
    ]
  }

}
