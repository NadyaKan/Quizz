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

router.post('/quiz/:userId', (req, res) => {
  Quiz.create(req.body, (err) => {
    if (err) console.log(err);
    else{
      req.flash("success", "Quiz has been created");
      res.render('hub');
    }
  })
})

module.exports = router;
