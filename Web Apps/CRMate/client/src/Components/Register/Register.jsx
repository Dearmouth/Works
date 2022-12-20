import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import authService from "../../Tools/authService";
import { LogoWithText } from "../Presentational/LogoWithText";
import "../Presentational/presentational.css";
import { CardDisplay } from "../Presentational/CardDisplay";
import { Loader } from "../Presentational/Loader";
import { validate } from "./helpers";
import { toast } from "react-toastify";

const Register = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const notify = (msg) => {
    toast.error(msg);
  };

  const register = (e) => {
    e.preventDefault();
    // validation - should be done in more detail
    if (!validate(credentials, notify)) return;
    setLoading(true);
    toast.success("Registering your account...");
    authService.auth0SignUp(credentials, (error, res) => {
      if (res) {
        setLoading(false);
        history.push("Login");
      } else {
        toast.dismiss();
        if (error.code === "invalid_signup") {
          toast.error("Invalid signup... do you already have an account?");
        } else {
          toast.error(error.description);
        }
        setLoading(false);
      }
    });
  };

  let handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="wrapper">
      <div className="wrapper__panel wrapper__panel--left">
        <LogoWithText />
        <h1>Register</h1>
        <h3>Join to start organising your contacts!</h3>
        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={register}>
            <div className="form-container">
              <label className="form-label" htmlFor="fName">
                First Name
              </label>

              <input
                required
                onChange={handleChange}
                className="form-input form-input-first"
                name="fName"
                placeholder="Enter your first name"
              />

              <label className="form-label" htmlFor="lName">
                Last Name
              </label>

              <input
                required
                onChange={handleChange}
                className="form-input form-input-last"
                name="lName"
                placeholder="Enter your last name"
              />

              <label className="form-label" htmlFor="email">
                Email
              </label>

              <input
                required
                onChange={handleChange}
                className="form-input form-input-email-reg"
                name="email"
                placeholder="Enter your email"
              />

              <label className="form-label" htmlFor="password">
                Password
              </label>

              <input
                required
                onChange={handleChange}
                className="form-input form-input-password"
                type="password"
                name="password"
                placeholder="Enter your password"
              />

              <label className="form-label" htmlFor="cPassword">
                Confirm password
              </label>

              <input
                required
                onChange={handleChange}
                className="form-input form-input-cpassword"
                type="password"
                name="cPassword"
                placeholder="Confirm your password"
              />
            </div>
            <div className="btn-wrapper">
              <button type="submit" className="btn-with-shadow">
                Register
              </button>
            </div>
          </form>
        )}
        <span style={{ color: "#D3D3D3" }}>
          Already have an account? <a href="/login">Login here</a>
        </span>
      </div>

      <CardDisplay backgroundColor={"#F0D3A8"} />
    </div>
  );
};

export default Register;
