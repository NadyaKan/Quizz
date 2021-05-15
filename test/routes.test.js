const request = require("supertest");
const app = require("../app");

describe("get about page", () => {
  it("should be 200", (done) => {
    request(app)
      .get("/about")
      .set("Accept", "text/html")
      .expect("Content-Type", /text/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
    done();
  });
});

describe("get index page", () => {
  it("should be 200", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
    done();
  });
});
