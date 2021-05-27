const Quiz = require('../models/Quiz');
const User = require('../models/User');


exports.createQuiz = (req, res) => {
    const questions = document.getElementsByName('questions[]');        // question[0] related to answer[0]
    const answers = document.getElementsByName('answers[]');
    var loggedInUsername = 'Larry';
    

    User.findOne({username: loggedInUsername}, (err, user) => {
        Quiz.create({
            title: 'FoodQuiz',
            creator: user._id,
            questionData: questions,
            answerData: answers
        }, (err) => {
            if (err) throw err
        })
    })
}

exports.getAllQuizzesByUserID = (req, res) => {
    let user_id = req.params.id; //  /user/:id/quizzes
    Quiz.find({creator: user_id}, (result) => {
        res.send(result);
    })
}

exports.showQuiz = (req, res) => {
    let quizId = req.params.id;
    console.log(quizId);
    Quiz.findOne({_id: quizId}, (err, quiz) => {
        if (err) throw err; 
        res.status(200).render('quizView', {quiz: quiz});
    })
}

// remove quiz 
// remove all quizzes from user
// get quiz by id, maybe name if unique innerhalb eines users


