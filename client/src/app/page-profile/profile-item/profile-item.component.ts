import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseValidatedInputComponent } from '../../base-validated-input/base-validated-input.component';
import { ProfileItemData } from '../../../types/profile-item';


@Component({
  selector: 'app-profile-item',
  standalone: true,
  imports: [CommonModule, BaseValidatedInputComponent],
  templateUrl: './profile-item.component.html',
  styleUrl: './profile-item.component.scss'
})
export class ProfileItemComponent {
  @Input() data: ProfileItemData | undefined;
  @ViewChild('error') errorRef: ElementRef<HTMLElement> | undefined;
  editMode = false;

  handleEditClick() {
    this.editMode = true;
  }

  handleCancelClick() {
    this.editMode = false;
    (this.errorRef?.nativeElement as HTMLElement).textContent = ''
  }

  async handleSaveClick(event: Event) {
    event.preventDefault();
    if (this.checkSubmitReady()) {
      this.editMode = false;
      
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

  }
}
