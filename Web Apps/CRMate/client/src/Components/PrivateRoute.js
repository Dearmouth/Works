import React from "react";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {isAuthenticated} from "../Tools/utils";

// for private routes
// user is redirected to login page if not logged in 
const PrivateRoute = (props) => {
    const location = useLocation();
    return isAuthenticated() ? 
        (<Route {...props} />) : 
        (<Redirect to={{pathname: "/login", state: { from: location }}} />);
};
  

export default PrivateRoute