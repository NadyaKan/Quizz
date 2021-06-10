const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  logController = require("./controllers/LogController"),
  errorController = require("./controllers/ErrorController"),
  methodOverride = require("method-override"),
  passport = require("passport"),
  UserModel = require("./models/UserModel"),
  routes = require("./routes")(express),
  flash = require("express-flash");
app.use(methodOverride("_method", { methods: ["POST", "GET", "DELETE"] }));
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});
app.use(expressSession);
app.use(flash());

app.use(logController.log);
app.use(express.json());
app.use(express.static("public"));
app.use("/css", express.static("public/css"));
app.use("/js", express.static("public/js"));
app.use("/img", express.static("public/img"));
app.use(layouts);
app.use(express.urlencoded({ extended: true }));
app.use(errorController.respondInternalError);

//views
app.set("views", "./views");
app.set("view engine", "ejs");
app.set("layout", "./layout");

/* PASSPORT LOCAL AUTHENTICATION */

passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.flashMessages = req.flash();
  res.locals.login = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

app.use("/", routes);

//after middleware
app.use(errorController.respondNoResourceFound);

module.exports = app;
