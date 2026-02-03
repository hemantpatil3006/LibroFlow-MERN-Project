const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { error } = require('../utils/responseHandler');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      if (!token) {
        return error(res, 'Not authorized, no token provided', 401);
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return error(res, 'Not authorized, user not found', 401);
      }

      next();
    } catch (err) {
      console.error(err);
      return error(res, 'Not authorized, token failed', 401);
    }
  } else {
    return error(res, 'Not authorized, no token', 401);
  }
};

module.exports = { protect };
