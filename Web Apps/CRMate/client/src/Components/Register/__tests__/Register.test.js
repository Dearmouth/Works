import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Register from "../Register";
import authService from "../../../Tools/authService";
import People from "../../People/People";
import Login from "../../Login/Login";

describe("Register component", () => {
  const history = createMemoryHistory();
  history.push("/");

  it("Redirects the user to the login page upon successful registration", () => {
    let alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    authService.auth0SignUp = jest.fn().mockImplementation((credentials, cb) =>
      cb(null, {
        isAuthenticated: true,
      })
    );

    const { container } = render(
      <Router history={history}>
        <Login />
        <Register />
      </Router>
    );

    let firstInput = container.getElementsByClassName("form-input-first")[0];
    let lastInput = container.getElementsByClassName("form-input-last")[0];
    let emailInput = container.getElementsByClassName(
      "form-input-email-reg"
    )[0];
    let pwordInput = container.getElementsByClassName("form-input-password")[0];
    let cpwordInput = container.getElementsByClassName(
      "form-input-cpassword"
    )[0];

    fireEvent.change(firstInput, { target: { value: "Jeff" } });
    fireEvent.change(lastInput, { target: { value: "Baker" } });
    fireEvent.change(emailInput, { target: { value: "email@email.com" } });
    fireEvent.change(pwordInput, { target: { value: "passWord123!" } });
    fireEvent.change(cpwordInput, { target: { value: "passWord123!" } });
    fireEvent.click(container.getElementsByClassName("login-btn")[0]);

    expect(alertMock).toHaveBeenCalledTimes(0);
    expect(
      screen.getByText(/Take control of all your contacts with a few clicks/i)
    ).toBeInTheDocument();
  });

  it("Alerts the user upon failed registration", async () => {
    authService.auth0SignUp = jest
      .fn()
      .mockImplementation((credentials, cb) => cb(new Error(), null));

    const { container } = render(
      <Router history={history}>
        <Login />
        <Register />
      </Router>
    );

    let firstInput = container.getElementsByClassName("form-input-first")[0];
    let lastInput = container.getElementsByClassName("form-input-last")[0];
    let emailInput = container.getElementsByClassName(
      "form-input-email-reg"
    )[0];
    let pwordInput = container.getElementsByClassName("form-input-password")[0];
    let cpwordInput = container.getElementsByClassName(
      "form-input-cpassword"
    )[0];

    fireEvent.change(firstInput, { target: { value: "Jeff" } });
    fireEvent.change(lastInput, { target: { value: "Baker" } });
    fireEvent.change(emailInput, { target: { value: "email@email.com" } });
    fireEvent.change(pwordInput, { target: { value: "passWord123!" } });
    fireEvent.change(cpwordInput, { target: { value: "passWord123!" } });
    fireEvent.click(container.getElementsByClassName("login-btn")[0]);
  });
});
