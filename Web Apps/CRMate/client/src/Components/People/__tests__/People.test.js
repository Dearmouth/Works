import React from "react"
import People from "../People"
import { render,cleanup, waitFor } from "@testing-library/react";
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history'
import apiService from "../../../Tools/apiIndex"
import {mockPeopleData} from "../mockdata"

afterEach(cleanup);

describe("People component", () => {
  it ("Positive test - returns the correct number of people cards", async () => {
    apiService.getPeople = jest.fn().mockResolvedValue(mockPeopleData)

    let history = createMemoryHistory();
    history.push('/people')

    const { container } = render(
      <Router history={history}>
      <People />
      </Router>
    );
    await waitFor(() => {
      let peopleCards = container.getElementsByClassName("contact-card-abstract");
      expect(apiService.getPeople).toHaveBeenCalled(); 
      expect(peopleCards.length).toBe(3);
    })
  })
  it ("Negative test - returns no people cards if no contacts are found", async () => {
    apiService.getPeople = jest.fn().mockResolvedValue([])
    let history = createMemoryHistory();
    history.push('/people')

    const { container } = render(
      <Router history={history}>
        <People />
      </Router>
    );
    await waitFor(() => {
      let peopleCards = container.getElementsByClassName("contact-card-abstract");
      expect(apiService.getPeople).toHaveBeenCalled(); 
      expect(peopleCards.length).toBe(0);
    })
  })
})