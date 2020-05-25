const factory = require('./handlerFactory');
const Answer = require('../models/Answer');

exports.getAnswers = factory.getAll(Answer);

exports.createAnswer = factory.createOne(Answer);

exports.getAnswer = factory.getOne(Answer);

exports.updateAnswer = factory.updateOne(Answer);

exports.deleteAnswer = factory.deleteOne(Answer);