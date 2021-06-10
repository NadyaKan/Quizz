const Quiz = require("../models/Quiz");


exports.getNewQuiz = (req, res) => {
  res.status(200).render('newQuiz');
}

exports.createNewQuiz = (req, res) => {
  const questionData = req.body.questions;
  const answerData = req.body.answers;
  const correct = req.body.correct;
  var data = [];

  for(var i = 0; i < questionData.length; i++){
    let answers = []
    answers[0] = answerData[i][0];
    answers[1] = answerData[i][1];


    data[i] = {question: questionData[i], answer: answers, correct: correct[i]};
  }

  Quiz.create(
    {
      title: req.body.title,
      creator: req.params.id,
      data: data,
    },
    (err) => {
      if (err) throw err;
      req.flash('error', 'Quiz creation failed..')
    }
  );
  req.flash('success', 'Quiz has been created')
  res.redirect(`/quiz/library/${req.params.id}`);

}

exports.getAllQuizzes = (req, res) => {
  Quiz.find({creator: req.params.id}, (err, result) => {
    if (err) throw err;
    res.status(200).render("library", { quizzes: result });
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
