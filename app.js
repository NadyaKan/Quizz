const port = process.env.PORT || 3000,
  logController = require("./controllers/LogController"),
  indexController = require("./controllers/IndexController"),
  errorController = require("./controllers/ErrorController"),
  registerController = require("./controllers/RegisterController"),
  profileController = require("./controllers/ProfileController"),
  mongoose = require("mongoose"),
  expressLayouts = require("express-ejs-layouts"),
  express = require("express"),
  app = express();
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

//databse

//const DB_URI = process.env.MONGODB_URI || ((process.env.NODE_ENV === 'test') ? 'mongodb://localhost:27017/modulehandbook_test_db' : 'mongodb://localhost:27017/modulehandbook_db')
const DB_URI = process.env.MONGODB_URI || "mongodb://mongo:27017/quiz-data"; //Main DB
mongoose.connect(DB_URI, { useNewUrlParser: true }).then(() => {
  app.listen(port, () => console.info(`server listening on port ${port}`));
  console.log("Main DB connected");
});
