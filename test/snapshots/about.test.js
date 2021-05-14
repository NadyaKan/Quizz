const { app, request } = require("../commonJest");

it("renders about correctly", (done) => {
  request(app)
    .get("/about")
    .then((response) => {
      expect(response.text).toMatchSnapshot();
      done();
    });
});
