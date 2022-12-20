export const validate = (credentials, notify) => {
  const passwordVal =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (credentials.fName.length === 0) {
    notify("First name should not be empty!");
    return false;
  } else if (credentials.lName.length === 0) {
    notify("Last name should not be empty!");
    return false;
  } else if (credentials.email.length === 0) {
    notify("Email should not be empty!");
    return false;
  } else if (!passwordVal.test(credentials.password)) {
    notify(
      "Password must be minimum eight characters, contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character!"
    );
    return false;
  } else if (credentials.password !== credentials.cPassword) {
    notify("Password does not match!");
    return false;
  }
  // correct validation
  return true;
};
