const router = require("express").Router();
const Quiz = require("../models/Quiz");

//Quizes
router.get("/library/:id", (req, res) => {
  Quiz.find({ creator: req.params.id }, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = router;
