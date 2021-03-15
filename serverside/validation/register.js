import Validator from "validator"
import isEmpty from "is-empty"

export default function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // Name checks
  if (!Validator.isLength(data.name, {
    min: 2,
    max: 30
  })) {
    errors.message = 'Username should be between 2 and 30 characters'
  }
  if (Validator.isEmpty(data.name)) {
    errors.message = 'Username is required'
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.message = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.message = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.message = "Password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.message = "Password must be at least 6 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};