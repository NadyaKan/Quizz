const mongoose = require("mongoose");
mongoose.pluralize(null);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: Date,
  id: mongoose.Schema.Types.ObjectId,
});

userSchema.methods.getName = () => {
  return this.name;
};

userSchema.methods.getInfo = function () {
  return `Name: ${this.name} Email: ${this.email} Password: ${this.password}`;
};

userSchema.methods.findLocalUsers = function () {
  return this.model("Registered").find({ email: this.email }).exec();
};

module.exports = mongoose.model("Registered", userSchema); //collection, schema
