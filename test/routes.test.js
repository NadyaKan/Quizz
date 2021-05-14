const request = require("supertest");
const express = require("express");

const app = express();

app.get("/about", function (req, res) {
  res.status(200);
});

describe("get about page", function () {
  it("should be 200", function (done) {
    request(app)
      .get("/about")
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
    done();
  });
});

app.get("/", function (req, res) {
  res.status(200);
});

describe("get index page", function () {
  it("should be 200", function (done) {
    request(app)
      .get("/")
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
    done();
  });
});
