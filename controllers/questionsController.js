const Question = require("../models/questionsModel");
const mongoose = require("mongoose");

const db = mongoose.connection; //default connection

exports.createOneQuizQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const option1 = req.body.option_1;
    const option2 = req.body.option_2;
    const option3 = req.body.option_3;

    const quiz = await Question.create({
      question,
      option1,
      option2,
      option3,
      isCorrect: "option1",
    });

    return res.status(201).json(quiz);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
