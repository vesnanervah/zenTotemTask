import { ValidatedFields } from "../../../types/base-validated-input";

const signInFields: ValidatedFields = {
    email: {
      name: 'email',
      value: "",
      valid: false,
      errorMsg: "Email should be in 'example@mail.com'.",
      placeholder: 'Email',
      inputType: 'text',
    },
    password: {
      name: 'password',
      value: '',
      valid: false,
      errorMsg: "Password should contains only a-z, A-Z letters and 0-9 numbers and length 3 or more chars.",
      placeholder: 'Password',
      inputType: 'password',
      minlen: 2
    },
};

export { signInFields };

