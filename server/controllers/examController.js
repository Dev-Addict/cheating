const factory = require('./handlerFactory');
const Exam = require('../models/Exam');

exports.getExams = factory.getAll(Exam);

exports.createExam = factory.createOne(Exam);

exports.getExam = factory.getOne(Exam);

exports.updateExam = factory.updateOne(Exam);

exports.deleteExam = factory.deleteOne(Exam);