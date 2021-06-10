const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const quizSchema = Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    }, //id for sharing -> /quiz/Object_ID
    title: {
        type: String,
        required: true
    },
    creator: {type: mongoose.Types.ObjectId, ref: 'User'},
    data: [{
            question: String, 
            answer: [String],
            correct: Number
        }]
});


quizSchema.methods.getID = () => { return this._id; }
quizSchema.methods.getTitle = () => { return this.title; }
quizSchema.methods.getCreator = () => { return this.creator; }
quizSchema.methods.getQuestionData = () => { return this.questionData; }
quizSchema.methods.getAnswerData = () => { return this.answerData; }


module.exports = mongoose.model('Quizzes', quizSchema); //collection, schema

