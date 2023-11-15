import { ElementRef } from "@angular/core";
import { TypedEventArgs, ValidatedFields, ValidationEventArgs } from "../../types/base-validated-input";

export default class BaseLoginVariant {

    validatedFields: ValidatedFields;

    constructor(fields: ValidatedFields) {
        this.validatedFields = fields
    }

    private checkSubmitReady() {
        return Object.values(this.validatedFields).every((field) => field.valid);
    }

    private createErrorMessage() {
        return Object.values(this.validatedFields).filter((field) => !field.valid).reduce((acc, current) =>acc + '<br>' + current.errorMsg, '');
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

    protected preSubmit(event: Event, 
        wrapper: ElementRef<HTMLElement> | undefined,
        errorMsg: ElementRef<HTMLElement> | undefined, 
        onSuccedCallback: () => void) {
        event.preventDefault();
        if (this.checkSubmitReady()) {
            if (errorMsg?.nativeElement) errorMsg.nativeElement.innerHTML = '';
            onSuccedCallback();
        } else {
          const errorHtml = this.createErrorMessage();
          this.animateIncompleteState(wrapper?.nativeElement);
          if (errorMsg?.nativeElement) errorMsg.nativeElement.innerHTML = errorHtml;
        }
    }

    protected handleInput(args: TypedEventArgs) {
        this.validatedFields[args.name].value = args.result;
      }
    
    protected handleValidation(args: ValidationEventArgs) {
      this.validatedFields[args.name].valid = args.result;
    }
}