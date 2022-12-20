import React, { useState } from "react";
import authService from "../../Tools/authService";
import { useHistory } from "react-router-dom";
import { LogoWithText } from "../Presentational/LogoWithText";
import "../Presentational/presentational.css";
import { CardDisplay } from "../Presentational/CardDisplay";
import { toast } from "react-toastify";

// sends an email link to change password
// after changing the password using the email link, it says something went wrong
// but it does work.
function ResetPassword() {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const reset = () => {
    authService.auth0ChangePassword(email, function (error, result) {
      if (error) {
        toast.error("Error occurred, please try again.");
      } else {
        toast.info(
          "Please check your inbox for a password reset confirmation."
        );
        history.push("/login");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    reset();
  };

  return (
    <div className="wrapper">
      <div className="wrapper__panel wrapper__panel--left">
        <LogoWithText />
        <h1>Reset password</h1>
        <h3>Enter your email address.</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <label className="form-label" htmlFor="email">
              Email
            </label>

            <input
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              name="email"
              placeholder="Enter your email address"
            />
          </div>
          <div className="btn-wrapper">
            <button type="submit" className="btn-with-shadow">
              Confirm
            </button>
          </div>
        </form>
        <span style={{ color: "#D3D3D3" }}>
          Don't have an account? <a href="/register">Register here</a>
        </span>
      </div>

      <CardDisplay backgroundColor={"#B0E0CF"} />
    </div>
  );
}

export default ResetPassword;
