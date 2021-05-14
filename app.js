const port = process.env.PORT || 3000;
const logController = require("./controllers/LogController");
const indexController = require("./controllers/IndexController");
const errorController = require("./controllers/ErrorController");
const registerController = require("./controllers/RegisterController");
const profileController = require("./controllers/ProfileController");
const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const app = express();

//before middleware
app.use(logController.log);
app.use(express.json());
app.use(express.static("public"));
app.use("/css", express.static("public/css"));
app.use("/js", express.static("public/js"));
app.use("/img", express.static("public/img"));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", indexController.getIndexPage);
app.get("/sign-up", registerController.getSignupPage);
app.post("/sign-up", registerController.postSignup);
app.get("/profile", profileController.getProfilePage);
app.post("/profile", profileController.postProfile);
app.get("/users", registerController.getAllRegisteredPage);

app.get("/howstart", function (req, res) {
  res.render("howstart");
});
app.get("/about", function (req, res) {
  res.render("about");
});

//views
app.set("views", "./views");
app.set("view engine", "ejs");
app.set("layout", "./layout");

//after middleware
app.use(errorController.respondInternalError);
app.use(errorController.respondNoResourceFound);

module.exports = app;
