const User = require('../models/User');

const registerUser = async (userData) => {
  const { name, email, password } = userData;
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('User already exists');
  }

  return await User.create({
    name,
    email,
    password,
  });
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return user;
  }
  return null;
};

module.exports = {
  registerUser,
  loginUser,
};
