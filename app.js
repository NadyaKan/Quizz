const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  logController = require("./controllers/LogController"),
  errorController = require("./controllers/ErrorController"),
  dummyController = require("./controllers/dummyController"),
  routeController = require("./controllers/routeController"),
  userController = require("./controllers/userController"),
  quizController = require("./controllers/quizController"),
  methodOverride = require("method-override"),
  passport = require("passport"),
  UserModel = require("./models/UserModel");

  const connectEnsureLogin = require('connect-ensure-login');

app.use(methodOverride("_method", { methods: ["POST", "GET", "DELETE"] }));

const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});
app.use(expressSession);




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


app.use(function(req,res,next){
  res.locals.login = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
})

//routes
app.get("/", routeController.getIndexPage);
app.get("/auth", userController.setup);
app.get("/login", userController.setup);

app.post("/register", userController.doRegister);
app.post('/login', (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log(info);
      return res.redirect('/');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/hub');
    });

  })(req, res, next);
});


app.get("/hub", connectEnsureLogin.ensureLoggedIn(), routeController.getHub);
app.get("/user", userController.show);
app.get("/profile",connectEnsureLogin.ensureLoggedIn(), userController.getProfile);
app.get("/user/:id", userController.show);
app.get("/user/:id/edit", userController.edit);
app.put("/user/:id/update", userController.update);
app.get("/user/:id/remove", userController.removeUser);
app.get('/:id/library', connectEnsureLogin.ensureLoggedIn(), quizController.getAllQuizzes);
app.get('/new-quiz',connectEnsureLogin.ensureLoggedIn(), quizController.getNewQuiz);
app.post('/:id/create-quiz', quizController.createNewQuiz);


//dummy
app.get("/adduser", dummyController.createDummyUser); //user erstellen
app.get("/addquiz", dummyController.createDummyQuiz); //quiz erstellen und user als creator nehmen
app.get("/getuser/:username", dummyController.getUserByName); //user ausgeben
app.get("/user/:userid/quizzes", dummyController.getAllQuizzesFromUser); //alle erstellten quizze von user abrufen
app.get("/user/quizzes/new", quizController.new);
app.post("/user/quizzes/create", quizController.create);
app.get("/user/quizzes/:id", quizController.showQuiz);
app.post("/user/quizzes/:id", quizController.updateQuizz);
app.get("/user/:userId/remove-quizzes", quizController.removeAllQuizzes);
app.get("/quiz/:quizId/remove-quiz", quizController.removeQuizById);
app.get("/clear", dummyController.clear);

app.delete("/logout", function(req, res){
  req.logOut();
  res.redirect("/");
});



//after middleware
app.use(errorController.respondNoResourceFound);


module.exports = app;
