import React from "react";
import "../HomePage/Home.css"
import { logOut } from "../../Tools/utils";

function LogoutButton() {

  
    // redirects user to homepage
    const logout = () => {
      logOut();
      localStorage.removeItem("access token")

    };
  
    return <button className = "home-button" name = "logout-btn" onClick={logout}>Logout</button>;
}

export default LogoutButton;