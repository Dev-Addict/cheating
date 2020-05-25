const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Exam Must Have A name'],
        trim: true,
        maxLength: [40, 'A Exam Must Have a name With Less Than 40 Characters'],
        minLength: [10, 'A Exam Must Have a name With At List 10 Characters']
    },
    startAt: {
        type: Date,
        required: [true, 'A Exam Must Have A startAt']
    },
    endAt: {
        type: Date,
        required: [true, 'A Exam Must Have A startAt']
    },
    question: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Question'
    }
});

const Exam = mongoose.model('Exam', examSchema);

export default Exam;