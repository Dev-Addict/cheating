const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    value: {
        type: String,
        required: [true, 'An Answer Must Have A value']
    },
    sure: {
        type: Boolean,
        default: true
    },
    rights: {
        type: [mongoose.Schema.ObjectId],
        ref: 'User'
    },
    wrongs: {
        type: [mongoose.Schema.ObjectId],
        ref: 'User'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;