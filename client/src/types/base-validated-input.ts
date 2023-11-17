type ValidatedField = {
    name: string,
    value: string,
    valid: boolean,
    errorMsg: string,
    placeholder: string,
    inputType: string,
    maxlen?: string,
    minlen?: number,
    prefix?: string
};

type ValidatedFields = {
    [index: string] : ValidatedField
}

export { ValidatedField, ValidatedFields };