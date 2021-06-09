const Quiz = require("../models/Quiz");
const User = require("../models/UserModel");


exports.getNewQuiz = (req, res) => {
  res.status(200).render('newQuiz');
}

exports.createNewQuiz = (req, res) => {
  res.send(req.body);
  
}

exports.getAllQuizzes = (req, res) => {
  Quiz.find({_id: req.params.id}, (err, result) => {
    if (err) throw err;
    res.status(200).render("quizOverview", { quizzes: result });
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

exports.new = (req, res) => {
  res.render("quizNew");
};

exports.create = (req, res) => {
  const data = [
    {
      question: req.body.question1,
      answer: [
        { option: req.body.option1_1, correct: true },
        { option: req.body.option1_2, correct: false },
        { option: req.body.option1_3, correct: false },
      ],
    },
    {
      question: req.body.question2,
      answer: [
        { option: req.body.option2_1, correct: true },
        { option: req.body.option2_2, correct: false },
        { option: req.body.option2_3, correct: false },
      ],
    },
  ];

  var loggedInMail = "larry@test.de";

  User.findOne({ email: loggedInMail }, (err, user) => {

    Quiz.create(
      {
        title: req.body.title,
        creator: user._id,
        data: data,
      },
      (err) => {
        if (err) throw err;
      }
    );
    res.redirect(`/user/${user._id}/quizzes`);
  });
};

