const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const { success } = require('../utils/responseHandler');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);

    if (user) {
      success(res, {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      }, 'User registered successfully', 201);
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userService.loginUser(email, password);

    if (user) {
      success(res, {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      }, 'Login successful');
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
