const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

const { validateUserRegistration, validateUserLogin } = require('../middleware/validationMiddleware');

router.post('/register', validateUserRegistration, registerUser);
router.post('/login', validateUserLogin, loginUser);

module.exports = router;
