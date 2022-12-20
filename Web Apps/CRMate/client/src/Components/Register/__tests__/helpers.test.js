import React from "react"
import {validate} from "../helpers"

describe("Registration validate function", () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});

  it("Positive test - returns true when all fields are correctly entered", () => {
    let mockData = {
      fName: "Tom",
      lName: "Baker",
      email: "email@email.com",
      password: "passWord123!",
      cPassword: "passWord123!"
    }
    expect(validate(mockData)).toBe(true);
  })
  it("Negative test - returns false when the password fields do not match", () => {
    let mockData = {
      fName: "Tom",
      lName: "Baker",
      email: "email@email.com",
      password: "passWord123!",
      cPassword: "!passWord123!"
    }
    expect(validate(mockData, jest.fn())).toBe(false)
  })

})