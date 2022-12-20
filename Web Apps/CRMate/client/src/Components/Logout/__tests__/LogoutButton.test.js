import React from "react"
import { render,screen, fireEvent, waitFor } from "@testing-library/react";
import LogoutButton from "../LogoutButton"
import {createMemoryHistory} from 'history'
import { Router } from 'react-router-dom';

describe("Logout button", () => {
  const history = createMemoryHistory();
  history.push('/people')
  it("Clears local storage of the access token when pressed", () => {
    Storage.prototype.removeItem = jest.fn();

    render(

      <Router history={history}>

      <LogoutButton />

      </Router>
    );

    fireEvent.click(screen.queryByText(/Logout/))
    expect(localStorage.removeItem).toHaveBeenCalled();
  });

})