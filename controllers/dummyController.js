const Quiz = require("../models/Quiz");
const User = require("../models/UserModel");



exports.clear = (req, res) => {
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
};
