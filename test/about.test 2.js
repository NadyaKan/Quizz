const app = require("../app");
const request = require("supertest");

it("renders about correctly", (done) => {
  request(app)
    .get("/about")
    .then((response) => {
      expect(response.text).toMatchSnapshot();
      done();
    });
});
