const User = require('../controllers/authController');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerSchema, loginSchema } = require('../validators/userValidate');
const validate = require('../middlewares/validateMiddleware');
const {authLimiter} = require('../middlewares/rateLimiter')

router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);

module.exports = router;