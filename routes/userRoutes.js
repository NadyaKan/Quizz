const   router = require('express').Router(),
        userController = require("../controllers/userController"),
        connectEnsureLogin = require('connect-ensure-login'),
        passport = require('passport');

router.get("/auth", userController.setup);
router.get("/", userController.setup);
router.post('/login', (req, res, next) => {
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
router.post("/user/register", userController.doRegister);

router.get("/all", userController.show);
router.get("/profile",connectEnsureLogin.ensureLoggedIn(), userController.getProfile);
router.get("/:id", userController.show);
router.get("/:id/edit", userController.edit);
router.put("/:id/update", userController.update);
router.get("/:id/remove", userController.removeUser);

router.delete("/logout", function(req, res){
  req.logOut();
  res.redirect("/");
});


module.exports = router;