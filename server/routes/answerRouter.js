const express = require('express');

const answerController = require('../controllers/answerController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/')
    .get(authController.protect, answerController.getAnswers)
    .post(authController.protect, authController.restrictTo('admin'), answerController.createAnswer);
router.route('/:id')
    .get(authController.protect, answerController.getAnswer)
    .patch(authController.protect, authController.restrictTo('admin', 'selfUser'), answerController.updateAnswer)
    .delete(authController.protect, authController.restrictTo('admin', 'selfUser'), answerController.deleteAnswer);

module.exports = router;