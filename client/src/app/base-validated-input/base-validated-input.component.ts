import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatedField} from '../../types/base-validated-input';

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
      valid = this.data.minlen ? (this.validationCompare.test(value) && value.length > this.data.minlen) : this.validationCompare.test(value);
    }
    if (typeof this.validationCompare === 'function') {
      valid = this.data.minlen ?  (this.validationCompare(value) && value.length > this.data.minlen) : this.validationCompare(value);
    }
    this.data.value = value;
    this.data.valid = valid

  }

  private isPrefixed(value: string, prefix: string): boolean {
    return value.length >= prefix.length ?
    value.startsWith(prefix) :
    value.startsWith(prefix.slice(0, value.length))
  }

  setManualy(value: string) {
    (this.inputElem as ElementRef).nativeElement.value = value;
    if(this.data) this.data.value = value;
  }
}
