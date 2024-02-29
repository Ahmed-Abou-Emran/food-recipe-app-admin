// RegExpressions

const PhoneRegEx =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const PasswordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

/***************** Authentication Validations *****************/

// Email
export const EmailValidation = {
  required: "This field is required ",
  pattern: {
    value: /^\S+@\S+\.\S+$/,
    message: "Invalid email address",
  },
};

// Password
export const PasswordValidation = {
  required: "This field is required",
  pattern: {
    value: PasswordRegEx,
    message:
      "At least 6 characters: UPPER/lowercase, numbers and special characters",
  },
};

// Phone Validation

export const PhoneValidation = {
  required: "This field is required ",
  pattern: {
    value: PhoneRegEx,
    message: "Not a Valid Phone Number",
  },
};
