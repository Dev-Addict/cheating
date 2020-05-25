const sharp = require('sharp');

const factory = require('./handlerFactory');
const Question = require('../models/Question');
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