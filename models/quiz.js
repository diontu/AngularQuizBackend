const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    question: String,
    answer: String,
    nonAnswer: [String],
    explanation: String
});

const QuizModel = mongoose.model('Quiz', quizSchema, 'Quiz');

module.exports = QuizModel;