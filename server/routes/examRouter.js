const express = require('express');

const examController = require('../controllers/examController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/')
    .get(authController.protect, examController.getExams)
    .post(authController.protect, authController.restrictTo('admin'), examController.createExam);
router.route('/:id')
    .get(authController.protect, examController.getExam)
    .patch(authController.protect, authController.restrictTo('admin'), examController.updateExam)
    .delete(authController.protect, authController.restrictTo('admin'), examController.deleteExam);

module.exports = router;