const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionString: {
        type: String,
        default: ''
    },
    answers: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Answer'
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;