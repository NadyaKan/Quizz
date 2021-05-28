const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  logController = require("./controllers/LogController"),
  errorController = require("./controllers/ErrorController"),
  dummyController = require("./controllers/dummyController"),
  routeController = require("./controllers/routeController"),
  userController = require("./controllers/userController"),
  quizController = require("./controllers/quizController"),
  methodOverride = require("method-override");
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.use(logController.log);
app.use(express.json());
app.use(express.static("public"));
app.use("/css", express.static("public/css"));
app.use("/js", express.static("public/js"));
app.use("/img", express.static("public/img"));
app.use(layouts);
app.use(express.urlencoded({ extended: true }));
app.use(errorController.respondInternalError);

//routes
app.get("/", routeController.getIndexPage);
app.get("/get-started", userController.setup);
app.post("/register", userController.create);
//app.post('/login', userController.addUser);
app.get("/hub", routeController.getHub);
app.get("/user", userController.show);
app.get("/user/:id", userController.show);
app.get("/user/:id/edit", userController.edit);
app.put("/user/:id/update", userController.update);
app.get("/user/:id/remove", userController.removeUser);
// remove all quizzes from user
// remove a specific quiz from a user

//dummy
app.get("/adduser", dummyController.createDummyUser); //user erstellen
app.get("/addquiz", dummyController.createDummyQuiz); //quiz erstellen und user als creator nehmen
app.get("/getuser/:username", dummyController.getUserByName); //user ausgeben

app.get("/user/:userid/quizzes", dummyController.getAllQuizzesFromUser); //alle erstellten quizze von user abrufen
app.get("/user/quizzes/:id", quizController.showQuiz);

app.get("/user/:userId/remove-quizzes", quizController.removeAllQuizzes);
app.get("/quiz/:quizId/remove-quiz", quizController.removeQuizById);

app.get("/clear", dummyController.clear);

//views
app.set("views", "./views");
app.set("view engine", "ejs");
app.set("layout", "./layout");

//after middleware
app.use(errorController.respondNoResourceFound);

module.exports = app;
