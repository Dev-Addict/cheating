const factory = require('./handlerFactory');
const Exam = require('../models/Exam');
const Question = require('../models/Question');
const catchRequest = require('../utils/catchRequest');
const AppError = require('../utils/AppError');

exports.getExams = factory.getAll(Exam);

exports.createExam = factory.createOne(Exam);

exports.getExam = factory.getOne(Exam, {path: 'answers'});

exports.updateExam = factory.updateOne(Exam);

exports.deleteExam = factory.deleteOne(Exam);

exports.pushQuestion = catchRequest(
    async (req, res) => {
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            throw new AppError('No document found with this ID', 404)
        }
        const question = await Question.create(req.body);
        exam.questions.push(question._id);
        const doc = await Exam.findByIdAndUpdate(req.params.id, exam, {
            new: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });
    }
);