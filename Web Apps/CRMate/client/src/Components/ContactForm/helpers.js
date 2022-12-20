const numericRegex = /^[0-9]*$/;
const emailRegex = /\w+@\w+\.\w{2,10}/;

export const validateEmail = (email) => email.match(emailRegex);
export const validatePhone = (phone) => phone.match(numericRegex);
