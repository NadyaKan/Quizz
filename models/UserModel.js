const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Quiz = require("./Quiz");
mongoose.pluralize(null);
var passportLocalMongoose = require("passport-local-mongoose");

const userSchema = Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
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
    type: String,
  },
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email_address',
  passwordField: 'user_password'
});


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
