const AuthController = require("../controllers/AuthController.js");
const authenticateToken = require("../middlewares/authorization.js");
const express = require('express');
const router = express.Router();


router.post('/new-password', AuthController.resetPassword);
router.post('/login', AuthController.login);
router.post('/reset-password', AuthController.forgotPassword);

router.post('/verify-otp', AuthController.verifyOTP);
router.post('/register', AuthController.register);
router.post('/logout', authenticateToken, AuthController.logout);

module.exports = router;
