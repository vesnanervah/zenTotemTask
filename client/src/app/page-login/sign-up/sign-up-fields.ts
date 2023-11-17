import { ValidatedFields } from "../../../types/base-validated-input";

const signUpFields: ValidatedFields = {
    email: {
      name: 'email',
      value: "",
      valid: false,
      errorMsg: "Email should be in 'example@mail.com'.",
      placeholder: 'Email',
      inputType: 'text'
    },
    password: {
      name: 'password',
      value: '',
      valid: false,
      errorMsg: "Password should contains only a-z, A-Z letters and 0-9 number.",
      placeholder: 'Password',
      inputType: 'password'
    },
    repeatPassword: {
      name: 'repeatPassword',
      value: '',
      valid: false,
      errorMsg: "Passwords should be the same",
      placeholder: 'Repeat password',
      inputType: 'password'
    },
};

export { signUpFields };