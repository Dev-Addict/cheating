const express = require('express');

const questionController = require('../controllers/questionController');
const authController = require('../controllers/authController');
const upload = require('../utils/multerInstance');

const router = express.Router();

router.route('/')
    .get(authController.protect, questionController.getQuestions)
    .post(authController.protect, upload.single('question'), questionController.saveQuestionImage, questionController.createQuestion);
router.route('/:id')
    .get(authController.protect, questionController.getQuestion)
    .patch(authController.protect, authController.restrictTo('admin'), upload.single('question'), questionController.updateQuestion)
    .delete(authController.protect, authController.restrictTo('admin'), questionController.deleteQuestion);

module.exports = router;