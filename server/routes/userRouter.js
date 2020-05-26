const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/signin').post(authController.signIn);
router.route('/checktoken').post(authController.protect, authController.isSignedIn);

router.route('/')
    .get(authController.protect, userController.getUsers)
    .post(authController.protect, authController.restrictTo('admin'), userController.createUser);
router.route('/:id')
    .get(authController.protect, userController.getUser)
    .patch(authController.protect, authController.restrictTo('admin'), userController.updateUser)
    .delete(authController.protect, authController.restrictTo('admin'), userController.deleteUser);

module.exports = router;