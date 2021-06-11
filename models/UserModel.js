const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Quiz = require("./Quiz");
mongoose.pluralize(null);
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require('bcryptjs');

const userSchema = Schema({
  _id: {
    type: mongoose.Types.ObjectId
  },
  username: {
    type: String,
    required: [true, "Name is required!"],
  },
  email_address: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
  },
  user_password: {
    type: String,
    required: [true, "You need to enter a password!"],
    minLength: [6, "Password must be at least 6 characters long!"],
  },
  date: {
    type: String
  },
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email_address',
  passwordField: 'user_password'
});


SALT_WORK_FACTOR = 5;

userSchema.pre('save', function(next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('user_password')) return next();
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
   if (err) return next(err);
   // hash the password using our new salt
   bcrypt.hash(user.user_password, salt, function(err, hash) {
    if (err) return next(err);
    // override the cleartext password with the hashed one
    user.user_password = hash;
    next();
   });
  });
 });

 userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.user_password, function(err, isMatch) {
   if (err) return cb(err);
   cb(null, isMatch);
  });
 };


userSchema.methods.getUsername = () => {
  return this.username;
};
userSchema.methods.getEmail = () => {
  return this.email;
};
userSchema.methods.getPassword = () => {
  return this.password;
};
userSchema.methods.getDate = () => {
  return this.date;
};
userSchema.methods.getID = () => {
  return this.id;
};
userSchema.methods.getAllQuizzes = () => {
  Quiz.find({ creator: this._id }, (result) => {
    return result;
  });
};

module.exports = mongoose.model("User", userSchema); //collection, schema
