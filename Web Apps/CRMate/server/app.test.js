
const app = require("./app");
const request = require("supertest");
const {mongoose} = require("./models/index.js");

describe("GET /", () => {
    it("responds with Hello World!", (done) => {
        request(app).get("/").expect("App", done);
    })
    afterAll(async () => {
	await mongoose.connection.close();
  });
});

describe("POST /users/add", () => {
  it ("should return status code 400 as req. is unauthenticated", async () => {
    
    const response = await request(app).post("/users").send({
    firstName: "name"
  })

  expect(response.statusCode).toBe(400);

})


    

    afterAll(async () => {
      await mongoose.connection.close();
    })

});
