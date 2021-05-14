const request = require("supertest");
const express = require("express");

const app = express();

app.get("/about", function (req, res) {
  res.status(200);
});

request(app)
  .get("/about")
  .expect(200)
  .end(function (err, res) {
    if (err) throw err;
  });
