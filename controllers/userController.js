const User = require('../models/UserModel');


exports.setup = (req, res) => {
        res.render('auth');
}

exports.doRegister = function(req, res) {
    console.log(req.body.email_address);
  
    const newUser = new User({
      username: req.body.username,
      email_address: req.body.email_address,
      user_password: req.body.user_password,
      date: new Date().toLocaleDateString()
    });
  
    User.register(newUser, req.body.user_password, function(err, user) {
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

