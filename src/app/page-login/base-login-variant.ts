import { ElementRef } from "@angular/core";
import { ValidatedFields } from "../../types/base-validated-input";

export default class BaseLoginVariant {

    private checkSubmitReady(fields: ValidatedFields) {
        return Object.values(fields).every((field) => field.valid);
    }

    private createErrorMessage(fields: ValidatedFields) {
        return Object.values(fields).filter((field) => !field.valid).reduce((acc, current) =>acc + ' ' + current.errorMsg, '');
    }

    private animateIncompleteState(wrapper: HTMLElement | undefined) {
        if (!wrapper) {
            return
        }
        wrapper.animate([
            {
                transform:'translateX(0px)'
            },
            {
                transform:'translateX(100px)'
            },
            {
                transform:'translateX(-100px)'
            },
            {
                transform:'translateX(50px)'
            },
            {
                transform:'translateX(-50px)'
            },
            {
                transform:'translateX(25px)'
            },
            {
                transform:'translateX(-25px)'
            },
            {
                transform:'translateX(10px)'
            },
            {
                transform:'translateX(-10px)'
            },
            {
                transform:'translateX(5px)'
            },
            {
                transform:'translateX(-5px)'
            },
            {
                transform:'translateX(0px)'
            }
        ], 300);
    }

    protected preSubmit(event: Event, fields: ValidatedFields, wrapper: ElementRef<HTMLElement> | undefined, onSuccedCallback: () => void) {
        event.preventDefault();
        console.log('submited');
        if (this.checkSubmitReady(fields)) {
            onSuccedCallback();
        } else {
          const errorTxt = this.createErrorMessage(fields);
          console.log(errorTxt);
          this.animateIncompleteState(wrapper?.nativeElement);
        }
    }
}