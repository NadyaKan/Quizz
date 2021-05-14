const User = require('../models/userModel');
const dataCTRL = require('./databaseController');


exports.getSignupPage = (req, res) => {
    res.render('signup');
};

exports.postSignup = (req, res) => {
    dataCTRL.isertUserIntoRegistered(req);
    console.log(req.body.username);
    res.status(200).render('ty', {name: req.body.username});
};

exports.getAllRegisteredPage = (req, res) =>{
    User.find({}, (err, users) => {
        if(err) throw err;
        res.status(200).render('allusers', {all: users});
    })
}

exports.deleteAllRegistered = () => {
    User.remove({}); 
}
