import React from "react"
import People from "../People"
import { render, fireEvent, screen, cleanup, waitFor } from "@testing-library/react";
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history'
import peopleService from "../helper"
import {mockPeopleData, mockQueryResponse} from "../mockdata"
afterEach(cleanup);

describe("People helper functions", () => {

  it ("Fetches all data if no search parameter is entered", async () => {
    peopleService.loadFullData = jest.fn().mockResolvedValue(mockPeopleData);
    peopleService.searchByParams = jest.fn().mockResolvedValue(mockQueryResponse)
  
    let history = createMemoryHistory();
    history.push('/people')

    const { container } = render(
      <Router history={history}>
      <People />
      </Router>
    );

    await waitFor(() => {
      let peopleCards = container.getElementsByClassName("contact-card-abstract");
      expect(peopleCards.length).toBe(3);
    })
  })
  it ("Only returns the number of required contact cards when search parameters are entered", async() => {
      peopleService.loadFullData = jest.fn().mockResolvedValue(mockPeopleData);
  peopleService.searchByParams = jest.fn().mockResolvedValue(mockQueryResponse)

    let history = createMemoryHistory();
    history.push('/people')

    const { container } = render(
      <Router history={history}>
      <People />
      </Router>
    );

    let searchBar = container.getElementsByClassName("search-bar")[0];
    fireEvent.change(searchBar, {target: {value: 'Tom'}})

    await waitFor(() => {
      let peopleCards = container.getElementsByClassName("contact-card-abstract");
      expect(peopleCards.length).toBe(1);
    })


  })

})