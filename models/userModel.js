const mongoose = require('mongoose');
mongoose.pluralize(null);

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date: String,
    id: Number
});

module.exports = mongoose.model('registered', userSchema); //collection, schema