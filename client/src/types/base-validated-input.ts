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
    value: string,
    valid: boolean,
    errorMsg: string,
    placeholder: string,
    inputType: string,
    maxlen?: string,
    minlen?: number
};

type ValidatedFields = {
    [index: string] : ValidatedField
}

export { TypedEventArgs, ValidationEventArgs, ValidatedField, ValidatedFields };