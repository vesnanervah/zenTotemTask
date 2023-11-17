import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseValidatedInputComponent } from '../../base-validated-input/base-validated-input.component';
import { ProfileItemData } from '../../../types/profile-item';
import { AuthService } from '../../auth.service';
import { FeedbackElem } from '../../../types/feedback-elem';


@Component({
  selector: 'app-profile-item',
  standalone: true,
  imports: [CommonModule, BaseValidatedInputComponent],
  templateUrl: './profile-item.component.html',
  styleUrl: './profile-item.component.scss'
})
export class ProfileItemComponent {

  constructor( private authService: AuthService) { }

  @Input() data: ProfileItemData | undefined;
  @ViewChild('error') errorRef: ElementRef<HTMLElement> | undefined;
  @ViewChild('inputElem') inputRef: BaseValidatedInputComponent | undefined;
  @Output() successfulUpdate: EventEmitter<FeedbackElem> = new EventEmitter();
  beforeEdit: string | undefined;
  editMode = false;

  handleEditClick() {
    this.editMode = true;
    this.beforeEdit = this.data?.field.value;
  }

  handleCancelClick() {
    this.editMode = false;
    (this.errorRef?.nativeElement as HTMLElement).textContent = '';
    if (this.beforeEdit && this.data) {
      this.data.field.value = this.beforeEdit;
      this.inputRef?.setManualy(this.beforeEdit);
    }
  }

  async handleSaveClick(event: Event) {
    event.preventDefault();
    if (this.checkSubmitReady()) {
      this.editMode = false;
      this.submitUpdate(this.data?.field.name as string, this.data?.field.value as string);
    }
  }

  private checkSubmitReady() {
    if (this.data?.field.valid) {
      (this.errorRef?.nativeElement as HTMLElement).textContent = '';
      return true
    } else  {
      (this.errorRef?.nativeElement as HTMLElement).textContent = (this.data as ProfileItemData).field.errorMsg;
      return false
    }
  }


  private async submitUpdate(name: string, value: string) {
    try {
      const res = await this.authService.updateUser({ 
        userID: this.authService.getUserData()?.userID as number,
        name,
        value
      });
      this.successfulUpdate.emit({ name, newValue: value});
    } catch {
      console.log('Profile page cant update value')
    }
  }
}
