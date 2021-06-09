const UserModel = require('../models/UserModel');
const mongoose = require('mongoose');


exports.setup = (req, res) => {
        res.render('auth');
}

exports.doRegister = function(req, res) {
    const newUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      email_address: req.body.email_address,
      user_password: req.body.user_password,
      date: new Date().toLocaleDateString()
    });
  
    UserModel.register(newUser, req.body.user_password, function(err, user) {
      if (err) {
        console.log(err);
        return res.redirect('/auth');
      }
  
      req.login(user, err => {
        if (err) throw err;
        else res.redirect('/hub');
      });
    });
  };

exports.show = (req, res) =>  {
    let query = null;
    if(req.params.id === undefined)
        query = {}
    else query = {_id: req.params.id}
    UserModel.find(query).then(users => {
        res.render("userOverview", {all: users})})
        .catch(error => {
            if(error) throw error;
    })
}

exports.edit = (req, res, next) => {
    let userId = req.params.id;  
    UserModel.findById(userId).then(user => {
        res.render("updateUser", {user: user});
    }).catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
    });
}

exports.update = (req, res, next) => {
        let userId = req.params.id,
            userParams = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password   
            };
    UserModel.findByIdAndUpdate(
        userId, {    
        $set: userParams  })
        .then(() => {
            res.redirect(`/hub`);
            next();
        })
        .catch(error => {
            console.log(`Error updating user by ID: ${error.message}`);
            next(error);
        }
    );
    
}

exports.removeUser = (req, res) => {
    UserModel.remove({id: req.params.id}, () => {
        res.status(200).render('index'); 
    })
}

exports.getProfile = (req, res) => {
    res.status(200).render('updateUser');
}

