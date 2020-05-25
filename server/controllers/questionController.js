const factory = require('./handlerFactory');
const Question = require('../models/Question');

exports.getQuestions = factory.getAll(Question);

exports.createQuestion = factory.createOne(Question);

exports.getQuestion = factory.getOne(Question);

exports.updateQuestion = factory.updateOne(Question);

exports.deleteQuestion = factory.deleteOne(Question);