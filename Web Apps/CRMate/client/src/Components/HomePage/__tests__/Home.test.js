import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Home from "../../HomePage/Home";
import util from "../../../Tools/utils";

describe("Home page test", () => {
  const history = createMemoryHistory();
  it("Shows a logout button for authenticated users", () => {
    util.isAuthenticated = jest.fn(() => true);

    render(
      <Router history={history}>
        <Home />
      </Router>
    );

    const button = screen.queryByText(/Logout/);
    expect(button).not.toBeNull();
  });
  it("Does not show a logout button for unauthenticated users", () => {
    util.isAuthenticated = jest.fn(() => false);

    render(
      <Router history={history}>
        <Home />
      </Router>
    );

    const button = screen.queryByText(/Logout/);
    expect(button).toBeNull();
  });
  it("Does not show a register button for authenticated users", () => {
    util.isAuthenticated = jest.fn(() => true);

    render(
      <Router history={history}>
        <Home />
      </Router>
    );

    const button = screen.queryByText(/Register/);
    expect(button).toBeNull();
  });
  it("Does show a register button for unauthenticated users", () => {
    util.isAuthenticated = jest.fn(() => false);

    render(
      <Router history={history}>
        <Home />
      </Router>
    );

    const button = screen.queryByText(/Register/);
    expect(button).not.toBeNull();
  });
  it("Shows a dashboard button for authenticated users", () => {
    util.isAuthenticated = jest.fn(() => true);

    render(
      <Router history={history}>
        <Home />
      </Router>
    );

    const button = screen.queryByText(/Dashboard/);
    expect(button).not.toBeNull();
  });
  it("Does not show a dashboard button for unauthenticated users", () => {
    util.isAuthenticated = jest.fn(() => false);

    render(
      <Router history={history}>
        <Home />
      </Router>
    );

    const button = screen.queryByText(/Dashboard/);
    expect(button).toBeNull();
  });
});
