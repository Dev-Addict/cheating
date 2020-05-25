const sharp = require('sharp');

const factory = require('./handlerFactory');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const catchRequest = require('../utils/catchRequest');
const AppError = require('../utils/AppError');

exports.getQuestions = factory.getAll(Question);

exports.createQuestion = catchRequest(
    async (req, res) => {
        if (!req.file) {
            throw new AppError('no file found in request', 404);
        }
        req.body.question = req.file.filename;
        const doc = await Question.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                doc
            }
        });
    }
);

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

exports.saveQuestionImage = catchRequest(
    async (req, res, next) => {
        if (!req.file) {
            return next();
        }
        const ext = req.file.mimetype.split('/')[1];
        req.file.filename = `question-${req.user.id}-${Date.now()}.${ext}`;
        await sharp(req.file.buffer)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`uploads/questions/${req.file.filename}`);
        next();
    });