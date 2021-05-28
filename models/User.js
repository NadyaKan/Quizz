const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Quiz = require("./Quiz");
mongoose.pluralize(null);

const userSchema = Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  username: {
    type: String,
    required: [true, "Name is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "You need to enter a password!"],
    minLength: [6, "Password must be at least 6 characters long!"],
  },
  date: {
    type: String,
  },
});

userSchema.path("email").validate(async (email) => {
  const emailCount = await mongoose.models.User.countDocuments({ email });
  return !emailCount;
}, "This Email is already being used. Please use another email!");

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
