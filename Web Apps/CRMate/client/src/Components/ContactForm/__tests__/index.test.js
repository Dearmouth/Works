import React from 'react';
import ContactForm from '../index'; 
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import {createMemoryHistory} from 'history'
import { Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from "enzyme";
import Home from "../../HomePage/Home"

configure({ adapter: new Adapter() });

/* Tests the add contact component */
describe("ContactForm component", () => {
  const history = createMemoryHistory();
  history.push('/people')
  it("renders with no errors", async () => {
    const { container } = render(
      <Router history={history}>
      <ContactForm />
      </Router>
    );
  
    expect(container).toMatchSnapshot();
  });

  it("goes back to the home page when the cancel button is pressed", async () => {
    const { container } = render(
      <Router history={history}>
      <ContactForm />
      <Home />
      </Router>
    );

    let cancelButton = container.getElementsByClassName("form-cancel")[0]
    fireEvent.click(cancelButton);
    expect(screen.getByText(/Search for/i)).toBeInTheDocument();
  })

  it("focuses the first name input if submission is attempted without a first name", async () => {
    window.alert = jest.fn();

    const { container } = render(
      <Router history={history}>
      <ContactForm />
      </Router>
    );

    let firstNameInput = container.getElementsByClassName("form-input-firstname")[0];
    fireEvent.change(firstNameInput, {target: {value: ''}})
    fireEvent.click(container.getElementsByClassName("form-submit")[0])
    expect(firstNameInput).toHaveFocus();
  })



})
  