const User = require('../models/userModel');
const mongoose = require('mongoose');
const db = mongoose.connection;
const dataCTRL = require('./databaseController');


exports.getSignup = (req, res) => {
    res.render('signup');
};

exports.postSignup = (req, res) => {
    const id = 'quiz-data';
    dataCTRL.useDB(id);
    dataCTRL.isertUserIntoRegistered(req);
    res.status(200).render('ty', {name: req.body.username});
};

exports.getAllRegistered = (req, res) =>{
    db.collection('registered') //COLLECTION_NAME
    .find().toArray((err, data) => {
        if(err) throw err;
        res.status(200).render('allusers', {all: data});
    })
}
