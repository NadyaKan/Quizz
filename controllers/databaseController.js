const mongoose = require('mongoose');
const db = mongoose.connection; //default connection
const User = require('../models/userModel');


exports.isertIntoMainDB = (COLLECTION_NAME, DATA) => {
    db.collection(COLLECTION_NAME).insertOne(DATA); 
    console.log(`SUCCESSFULLY INSERTED ${JSON.stringify(DATA)} INTO ${COLLECTION_NAME}`);  
}

exports.isertUserIntoRegistered = (req) => {
    db.collection('registered').countDocuments({}, (err, count) => {    
            if(err) throw err;
            User.create({
                name: req.body.username,
                email: req.body.email,
                password: req.body.password,
                date: new Date().toLocaleDateString(), 
                id: count + 1
            }, (err) => {
                if(err) throw err;
                console.log(`successfully registered ${req.body.username}`);
            })               
        }) 
}