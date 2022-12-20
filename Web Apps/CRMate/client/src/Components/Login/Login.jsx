import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { LogoWithText } from "../Presentational/LogoWithText";
import "../Presentational/presentational.css";
import { CardDisplay } from "../Presentational/CardDisplay";
import authService from "../../Tools/authService";
import { toast } from "react-toastify";

const Login = () => {
  const history = useHistory();
  const location = useLocation({ email: "", password: "" });

  let [credentials, setCredentials] = useState({ email: "", password: "" });

  let handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    // Basic validation
    if (!credentials.password || !credentials.email) {
      toast.error("Both email and password are required!");
      return;
    }
    toast.success("Logging in...");
    authService.auth0SignIn(credentials, (e, res) => {
      if (e) {
        toast.dismiss();
        console.log(e);
        toast.error("Email or password is incorrect! Please try again.");
      } else if (res) {
        localStorage.setItem("access token", res.accessToken);
        const { from } = location.state || { from: { pathname: "/" } };
        // redirect user from the page they came from
        // if they logged in from home page, redirect them to /people
        if (from.pathname === "/") {
          history.push("/people");
        } else {
          history.replace(from);
        }
        toast.dismiss();
      }
    });
  };

  return (
    <div className="wrapper">
      <div className="wrapper__panel wrapper__panel--left">
        <LogoWithText />
        <h1>Login</h1>
        <h3>Take control of all your contacts with a few clicks</h3>
        <form onSubmit={login}>
          <div className="form-container">
            <label className="form-label" htmlFor="email">
              Email
            </label>

            <input
              onChange={handleChange}
              className="form-input form-input-email"
              name="email"
              placeholder="Enter your email address"
              tabIndex="1"
            />

            <label className="form-label" htmlFor="password">
              Password{" "}
              <a href="/Resetpassword" style={{ fontSize: "12px" }}>
                {" "}
                Forgot?
              </a>
            </label>

            <input
              type="password"
              onChange={handleChange}
              className="form-input form-input-pword"
              name="password"
              placeholder="Enter your password"
              tabIndex="2"
            />
          </div>
          <div className="btn-wrapper">
            <button
              type="submit"
              className="login-btn btn-with-shadow"
              tabIndex="3"
            >
              Login
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
};

export default Login;
