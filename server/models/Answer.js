const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    value: {
        type: String,
        required: [true, 'An Answer Must Have A value']
    },
    file: {
        type: String
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
    }
});

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;