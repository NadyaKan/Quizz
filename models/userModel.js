const mongoose = require("mongoose");
mongoose.pluralize(null);

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date: String,
  id: Number,
});

userSchema.methods.getName = () => {
  return this.name;
};

module.exports = mongoose.model("registered", userSchema); //collection, schema
