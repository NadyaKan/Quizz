const { PERMANENT_REDIRECT } = require('http-status-codes');
const User = require('../models/User');


exports.setup = (req, res) => {
        res.render('getstarted', {typo: ''});
}


exports.create = (req, res) => {
    User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            date: new Date().toLocaleDateString(), 
        }, (err) => {
            if(err) res.status(400).render('getstarted', {typo: err.message})
            else res.status(200).render('welcome', {name: req.body.username});
        })      
    
}

exports.show = (req, res) =>  {
    console.log(req.params.id);
    let query = null;
    if(req.params.id === undefined)
        query = {}
    else query = {_id: req.params.id}
    User.find(query).then(users => {
        res.render("userOverview", {all: users})})
        .catch(error => {
            if(error) throw error;
    })
}

exports.edit = (req, res, next) => {
    let userId = req.params.id;  
    User.findById(userId).then(user => {
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
    User.findByIdAndUpdate(
        userId, {    
        $set: userParams  })
        .then(() => {
            res.redirect(`/user/${userId}`);
            next();
        })
        .catch(error => {
            console.log(`Error updating user by ID: ${error.message}`);
            next(error);
        }
    );
    
}


exports.clearUsers = (req, res) => {
    User.remove({}, () => {
        console.log('all users removed successfully')
    });
}

exports.getUserById = (req, res) => {
    User.findOne({id: req.params.id}, (err, user) => {
        if(err) console.log('user not found');
        res.send(user); // just sending back for now
    })
}

exports.getUserByName = (req, res) => {
    User.findOne({username: req.params.username}, (err, user) => {
        if(err) console.log('user not found');
        res.send(user); // just sending back for now
    })
}


exports.removeUser = (req, res) => {
    User.remove({id: req.params.id}, () => {
        res.status(200).render('index'); 
    })
}

