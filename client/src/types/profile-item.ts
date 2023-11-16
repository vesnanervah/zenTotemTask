import { ValidatedField } from "./base-validated-input"

type ProfileItemData = {
    validationStr: RegExp | undefined,
    canChange: boolean,
    field: ValidatedField,
}


export { ProfileItemData };