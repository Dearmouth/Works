import {getname} from "../../Tools/utils"

describe("Get name function", () => {
  it ("Returns the first and last name correctly", () => {
    const mockName = {
      firstName: "Tom",
      lastName: "Baker"
    }
    expect(getname(mockName)).toEqual("Tom Baker")
  })
  it ("Returns only the first name if no last name is specified", () => {
    const mockName = {
      firstName: "Tom"
    }
    expect(getname(mockName)).toEqual("Tom")
  })
  it ("Returns only the last name if no last name is specified", () => {
    const mockName = {
      lastName: "Baker"
    }
    expect(getname(mockName)).toEqual("Baker")
  })
})