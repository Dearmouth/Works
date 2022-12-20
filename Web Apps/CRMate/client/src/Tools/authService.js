import auth0 from 'auth0-js';
import { logoutUrl } from './apiIndex';

/* Defines functions relating to authentication */

const webAuth = new auth0.WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  audience: "https://" + process.env.REACT_APP_AUTH0_DOMAIN + "/api/v2/",
  responseType: 'id_token',
  scope: "openid profile"
});

 const auth0SignUp = (credentials, callback) => webAuth.signup({
  connection: 'MongoDB',
  email: credentials.email,
  password: credentials.password,
  given_name: credentials.fName,
  family_name: credentials.lName
}, callback)

 const auth0SignIn = (credentials, callback) => 
   webAuth.client.login({
  realm: "MongoDB",
  username: credentials.email,
  password: credentials.password,
}, callback)
 

 const auth0ChangePassword = (email, callback) => 
  webAuth.changePassword({
    connection: 'MongoDB',
    email: email
  }, callback)

 const auth0LogOut = () => {
  webAuth.logout({
    returnTo: logoutUrl,
    client_id:process.env.REACT_APP_AUTH0_CLIENT_ID
  })
}

  let authService = {
    webAuth,
    auth0LogOut,
    auth0ChangePassword,
    auth0SignIn,
    auth0SignUp
  }

  export default authService;


