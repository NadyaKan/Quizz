process.env.NODE_ENV = 'test';
const User = require('../models/userModel')
const request = require('supertest');

module.exports = {
  app: require('../app'),
  request: request
}

const mongoose = require('mongoose');
//mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

afterAll(async () => {
    await db.close()
  })
  
  beforeEach(function (done) {
    // console.log('global beforeEach')
    Course.deleteMany({})
      .then(() => {
        // console.log('all courses deleted')
        done()
      })
      .catch(error => {
        // console.log('error caught: ' + error.message)
        done(error.message)
      })
  })