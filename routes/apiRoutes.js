const router = require("express").Router();
const Quiz = require("../models/Quiz");
const UserModel = require("../models/UserModel");

//all Quizes from one User
router.get("/library/:id", (req, res) => {
  Quiz.find({ creator: req.params.id }, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

//show all Users
router.get("/all", (req, res) => {
  UserModel.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      if (error) throw error;
    });
});

module.exports = router;
