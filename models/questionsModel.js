const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  option1: {
    type: String,
  },
  option2: {
    type: String,
  },
  option3: {
    type: String,
  },
  isCorrect:{
      type: String
  }
  
});

module.exports = mongoose.model("Question", QuestionSchema);
