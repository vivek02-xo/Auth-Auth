const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const { generateToken } = require("../utils/jwtUtils.js");
const { verifyToken } = require("../utils/authMiddlewares.js");

async function login(email, password) {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error("user not found");
    }
    const isPasswordValid = bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      throw new Error("Invaild Password!");
    }
    const token = generateToken(existingUser);
    return token;
  } catch (err) {
    console.log(`Somwthing went wrong ${err}`);
  }
}

async function refreshToken(oldToken) {
  try {
    const decodeToken = verifyToken(oldToken);
    const user = await User.findById(decodeToken._id);
    if (!user) {
      throw new Error("User not Found!");
    }
    const newToken = generateToken(user);
    return newToken;
  } catch (err) {
    console.log(`Something went wrong: ${err}`);
  }
}

module.exports = { login, refreshToken };
