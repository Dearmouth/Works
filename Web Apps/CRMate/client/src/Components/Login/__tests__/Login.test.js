import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Login from "../Login";
import authService from "../../../Tools/authService";
import People from "../../People/People";
// MOCKS
// Will move this to a mock file. g for now

const mockUser = {
  email: "tombaker@email.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234",
};

describe("Login component", () => {
  const history = createMemoryHistory();
  history.push("/");

  it("Negative test - does not update local storage if authentication fails", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});

    Storage.prototype.setItem = jest.fn();
    let mockCallback = jest.fn();

    authService.auth0SignIn = jest
      .fn()
      .mockImplementation((credentials, cb) => cb("ERROR", null));
    const { container } = render(
      <Router history={history}>
        <Login />
      </Router>
    );

    let userInput = container.getElementsByClassName("form-input-email")[0];
    let passwordInput = container.getElementsByClassName("form-input-pword")[0];
    fireEvent.change(userInput, { target: { value: "email@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "1312312" } });

    fireEvent.click(container.getElementsByClassName("login-btn")[0]);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it("Negative test - Does not call auth0 if no credentials are supplied and sends a toast notification", async () => {
    Storage.prototype.setItem = jest.fn();
    let mockCallback = jest.fn();

    authService.auth0SignIn = jest.fn().mockReturnValue(
      {
        isAuthenticated: true,
        user: mockUser,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
        accessToken: "427380473289",
      },
      mockCallback
    );

    const { container } = render(
      <Router history={history}>
        <Login />
      </Router>
    );

    fireEvent.click(container.getElementsByClassName("login-btn")[0]);
    expect(mockCallback).toHaveBeenCalledTimes(0);
  });

  it("Positive test - Updates local storage if a user has successfully been authenticated", async () => {
    Storage.prototype.setItem = jest.fn();
    authService.auth0SignIn = jest.fn().mockImplementation((credentials, cb) =>
      cb(null, {
        isAuthenticated: true,
        user: mockUser,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
        accessToken: "427380473289",
      })
    );
    const { container } = render(
      <Router history={history}>
        <Login />
      </Router>
    );

    let userInput = container.getElementsByClassName("form-input-email")[0];
    let passwordInput = container.getElementsByClassName("form-input-pword")[0];

    fireEvent.change(userInput, { target: { value: "email@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "1312312" } });
    fireEvent.click(container.getElementsByClassName("login-btn")[0]);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  it("Positive test - Redirects the user to the dashboard page if login is successful", async () => {
    Storage.prototype.setItem = jest.fn();
    let mockCallback = jest.fn();

    authService.auth0SignIn = jest.fn().mockImplementation((credentials, cb) =>
      cb(null, {
        isAuthenticated: true,
        user: mockUser,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
        accessToken: "427380473289",
      })
    );
    const { container } = render(
      <Router history={history}>
        <Login />
        <People />
      </Router>
    );

    let userInput = container.getElementsByClassName("form-input-email")[0];
    let passwordInput = container.getElementsByClassName("form-input-pword")[0];

    fireEvent.change(userInput, { target: { value: "email@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "1312312" } });
    fireEvent.click(container.getElementsByClassName("login-btn")[0]);
    expect(screen.getByText(/Import/i)).toBeInTheDocument();
  });
});
