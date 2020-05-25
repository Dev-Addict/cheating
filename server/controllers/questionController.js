const factory = require('./handlerFactory');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const catchRequest = require('../utils/catchRequest');
const AppError = require('../utils/AppError');

exports.getQuestions = factory.getAll(Question);

exports.createQuestion = factory.createOne(Question);

exports.getQuestion = factory.getOne(Question);

exports.updateQuestion = factory.updateOne(Question);

exports.deleteQuestion = factory.deleteOne(Question);

exports.pushAnswer = catchRequest(
    async (req, res) => {
        const question = await Question.findById(req.params.id);
        if (!question) {
            throw new AppError('No document found with this ID', 404)
        }
        const answer = await Answer.create(req.body);
        question.answers.push(answer._id);
        const doc = await Question.findByIdAndUpdate(req.params.id, question, {
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