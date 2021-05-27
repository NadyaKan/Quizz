const Quiz = require('../models/Quiz');
const User = require('../models/User');

exports.createDummyUser = (req, res) => {
    User.create({
        username: 'Larry',
        email: 'larry@test.de',
        password: 'larry123',
        date: new Date().toLocaleDateString()
    }, (err) => {
        if(err) throw err;
        res.send('User created')
    })
}


exports.createDummyQuiz = (req, res) => {
    const data = [
        {
        question: 'What is my favorite food?', 
        answer: [{option: 'Pizza', correct: true}, {option: 'Pasta', correct: false}, {option: 'Fish', correct: false}]},
        {
        question: 'What is my favorite color?',
        answer: [{option: 'Blue', correct: true},{option: 'Green', correct: false},{option: 'Red', correct: false}]
    }];

    var loggedInMail = 'larry@test.de';
    
    User.findOne({email: loggedInMail}, (err, user) => {
        Quiz.create({
            title: 'FoodQuiz',
            creator: user._id,
            data: data
        }, (err) => {
            if (err) throw err
        })
    }) 
    res.send('Quiz created')
}

exports.getAllQuizzesFromUser = (req, res) => {
    const user_id = req.params.userid;
    Quiz.find({creator: user_id}, (err, result) => {
        if(err) throw err
        res.status(200).render('quizOverview', {quizzes: result});
    })
}

exports.getUserByName = (req, res) => {
    User.findOne({username: req.params.username}, (err, user) => {
        if(err) console.log('user not found');
        res.send(user); // just sending back for now
    })
    
}

exports.getQuizByTitle = (req, res) => {
    Quiz.find({title: req.params.title}, (result) => {
        res.send(result);
    })
}

exports.clear = (req, res) => {
    Quiz.remove({}).then(
        User.remove({}).then(() => {
            res.redirect('/user');
        }).catch((err) =>{
            if(err) throw err;
        })
    ).catch((err) =>{
        if(err) throw err;
    })
}





