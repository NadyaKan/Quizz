const User = require('../models/userModel');
const mongoose = require('mongoose');
const db = mongoose.connection;


exports.getSignup = (req, res) => {
    res.render('signup');
};

exports.postSignup = (req, res) => {
    db.collection('registered').countDocuments({}, (err, count) => {    //to access collection entry count
        if(err) throw err;
        User.create({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            date: new Date().toLocaleDateString(), 
            id: count + 1
        }, (err, data) => {
            if(err) throw err;
            console.log(`successfully inserted ${data}`);
        })   
    })
    res.status(200).render('ty', {name: req.body.username});
};

exports.getAllRegistered = (req, res) =>{
    db.collection('registered') //COLLECTION_NAME
    .find().toArray((err, data) => {
        if(err) throw err;
        res.status(200).render('allusers', {all: data});
    })
}
