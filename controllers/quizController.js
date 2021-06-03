const Quiz = require("../models/Quiz");
const User = require("../models/User");

exports.createQuiz = (req, res) => {
  const questions = document.getElementsByName("questions[]"); // question[0] related to answer[0]
  const answers = document.getElementsByName("answers[]");
  var loggedInUsername = "Larry";

  User.findOne({ username: loggedInUsername }, (err, user) => {
    Quiz.create(
      {
        title: "FoodQuiz",
        creator: user._id,
        questionData: questions,
        answerData: answers,
      },
      (err) => {
        if (err) throw err;
      }
    );
  });
};
//TODO: this create quiz doesn't work with new schema anymore. has to be changed

exports.getAllQuizzesByUserID = (req, res) => {
  let user_id = req.params.id; //  /user/:id/quizzes
  Quiz.find({ creator: user_id }, (result) => {
    res.send(result);
  });
};

exports.showQuiz = (req, res) => {
  let quizId = req.params.id;
  console.log(quizId);
  Quiz.findOne({ _id: quizId }, (err, quiz) => {
    if (err) throw err;
    res.status(200).render("quizView", { quiz: quiz });
  });
};

exports.removeAllQuizzes = (req, res) => {
  let user_id = req.params.id; //  /user/:id/quizzes
  Quiz.remove({ creator: user_id }, (result) => {
    res.send(result);
  });
};

exports.removeQuizById = (req, res) => {
  let quiz_id = req.params.id; //  /user/:id/quizzes
  Quiz.remove({ quiz_id }, (result) => {
    res.send(result);
  });
};

exports.updateQuizz = (req, res, next) => {
  let quizId = req.params.id;
  let bodyKeys = Object.keys(req.body);
  let questionKeys = bodyKeys.filter((key) => key.includes("question"));
  let answerKeys = bodyKeys.filter((key) => key.includes("answerOption"));
  let correctKeys = bodyKeys.filter((key) => key.includes("answerCorrect"));

  let data = [];
  for (let i = 0; i < questionKeys.length; i++) {
    let answers = [];
    for (let j = 0; j < req.body[answerKeys[i]].length; j++) {
      answers.push({
        option: req.body[answerKeys[i]][j],
        correct: req.body[correctKeys[i]][j],
      });
    }
    data.push({
      question: req.body[questionKeys[i]],
      answer: answers,
    });
  }
  Quiz.findByIdAndUpdate(quizId, {
    $set: { data: data },
  })
    .then(() => {
      res.redirect("back");
      next();
    })
    .catch((error) => {
      console.log(`Error updating user by ID: ${error.message}`);
      return next(error);
    });
};
