const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Exam Must Have A name'],
        trim: true,
        maxLength: [40, 'A Exam Must Have a name With Less Than 40 Characters'],
        minLength: [10, 'A Exam Must Have a name With At List 10 Characters']
    },
    questions: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Question'
    }
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;