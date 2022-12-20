// all shared functionality goes here
import jwt_decode from "jwt-decode";
import authService from "./authService";

// enter key 
export const ENTER_KEY = 13;

// get the _id of the user by decoding the token
export const getUserId = () => {
    const decoded = jwt_decode(localStorage.getItem("access token"));

    // access the sub field of the decoded token
    // remove the 'auth0|' part in the sub field
    const userId = decoded.sub.replace("auth0|", "");
    return userId;
}

// check if user is logged in 
export const isAuthenticated = () => {
    // check if token exsist
    if (localStorage.getItem("access token") === null) {
        return false;
    } else {
        // check that token is not expired
        const decoded = jwt_decode(localStorage.getItem("access token"));
        if (decoded.exp < Date.now()/1000) {
            localStorage.removeItem("access token");
            return false;
        }
        return true
    };
}

export const fields = ["Name", "Phone", "Email", "Tags"];
export const logOut = () => {
    localStorage.removeItem("access token");
    authService.auth0LogOut();
}

export const getname = (contactInformation) => {
  if (contactInformation.firstName && contactInformation.lastName) {
    return `${contactInformation.firstName} ${contactInformation.lastName}`;
  } else if (
    !contactInformation.firstName &&
    contactInformation.lastName
  ) {
    return contactInformation.lastName;
  } else if (
    !contactInformation.lastName &&
    contactInformation.firstName
  ) {
    return contactInformation.firstName;
  }
};

const util = {
  isAuthenticated
}

export default util;