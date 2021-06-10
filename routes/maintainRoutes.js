const User = require('../models/UserModel');
const Quiz = require('../models/Quiz');
const router = require('express').Router();

router.get("/maintain/clear", (req, res) => {
    Quiz.remove({})
      .then(
        User.remove({})
          .then(() => {
            res.redirect("/user");
          })
          .catch((err) => {
            if (err) throw err;
          })
      )
      .catch((err) => {
        if (err) throw err;
      });
});


module.exports = router;