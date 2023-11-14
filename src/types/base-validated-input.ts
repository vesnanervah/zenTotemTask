import { ElementRef } from "@angular/core"

type TypedEventArgs = {
    name: string, 
    result: string
};


type ValidationEventArgs = {
    name: string, 
    result: boolean
}

type ValidatedField = {
    name: string,
    ref: ElementRef<HTMLElement> | undefined,
    value: string,
    valid: boolean,
    errorMsg: string,
    placeholder: string,
    inputType: string,
};

type ValidatedFields = {
    [index: string] : ValidatedField
}

export { TypedEventArgs, ValidationEventArgs, ValidatedField, ValidatedFields };