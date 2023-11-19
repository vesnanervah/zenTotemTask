import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackElem } from '../../../types/feedback-elem';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent implements AfterViewInit {
  @Input() data: FeedbackElem | undefined;
  @ViewChild('feedback') elemRef: ElementRef<HTMLElement> | undefined;
  @Output() destroyClicked: EventEmitter<void> = new EventEmitter();

  ngAfterViewInit(): void {
    this.animateAppear();
  }

  private animateAppear() {
    if(!this.elemRef) {
      return
    }
    this.elemRef.nativeElement.animate([
      {
        transform: 'translateX(400px)'
      },
      {
        transform: 'translateX(0px)'
      }
    ], {
      duration: 200
    });
  }

  handleDestroyClick() {
    this.destroyClicked.emit();
  }
}
