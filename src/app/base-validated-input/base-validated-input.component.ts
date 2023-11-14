import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypedEventArgs, ValidatedField, ValidationEventArgs } from '../../types/base-validated-input';

@Component({
  selector: 'app-base-validated-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-validated-input.component.html',
  styleUrl: './base-validated-input.component.scss'
})
export class BaseValidatedInputComponent {
  @Input() data: ValidatedField | undefined;
  @Input() validationFn: ((value: string) => boolean) | undefined;
  @Output() validation: EventEmitter<ValidationEventArgs> = new EventEmitter();
  @Output() typed: EventEmitter<TypedEventArgs> = new EventEmitter();
  @ViewChild('inputElem') inputElem: ElementRef<HTMLInputElement> | undefined;


  handleKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  handleKeyUp(event: KeyboardEvent, value: string) {
    if (event.key === ' ') {
      event.preventDefault();
      return;
    }
    const valid = this.validationFn ? this.validationFn(value) : true;
    this.validation.emit({name: this.data?.name as string, result: valid});
    this.typed.emit({ name: this.data?.name as string, result: value});
  }
}
