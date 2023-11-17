import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypedEventArgs, ValidatedField, ValidationEventArgs } from '../../types/base-validated-input';

@Component({
  selector: 'app-base-validated-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-validated-input.component.html',
  styleUrl: './base-validated-input.component.scss'
})
export class BaseValidatedInputComponent implements OnInit {
  @Input() data: ValidatedField | undefined;
  @Input() validationCompare: RegExp | undefined | ((value: string) => boolean); 
  @Input() disabled: boolean | undefined;
  @ViewChild('inputElem') inputElem: ElementRef<HTMLInputElement> | undefined;

  ngOnInit(): void {
    if (this.data && this.data.value.length > 0 && this.inputElem) {
      this.inputElem.nativeElement.value = this.data.value;
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  handleKeyUp(event: KeyboardEvent, value: string) {
    if (event.key === ' ' || !this.data || !this.inputElem) {
      event.preventDefault();
      return;
    }
    
    if (this.data.prefix && !this.isPrefixed(value, this.data.prefix)) {
      value = this.data.prefix + value;
      this.inputElem.nativeElement.value = value;
    }
    let valid = false;
    if (this.validationCompare instanceof RegExp) {
      valid = this.validationCompare.test(value)
    }
    if (typeof this.validationCompare === 'function') {
      valid = this.validationCompare(value);
    }
    if(this.data.minlen) {
      valid = value.length > this.data.minlen;
    }
    this.data.value = value;
    this.data.valid = valid

  }

  isPrefixed(value: string, prefix: string): boolean {
    return value.length >= prefix.length ?
    value.startsWith(prefix) :
    value.startsWith(prefix.slice(0, value.length))
  }
}
