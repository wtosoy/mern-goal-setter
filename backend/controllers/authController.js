const User = require("../models/User");
const errorHandler = require("../utilities/errorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Sign Up
const signup = async (request, response, next) => {
  try {
    const { username, password } = request.body;

    // Check all fields.
    if (!username || !password)
      throw errorHandler(400, "Missing required fields");

    // Check if the user already exists.
    const existingUser = await User.findOne({ username });
    if (existingUser) throw errorHandler(400, "User already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    if (newUser) {
      return response.status(201).json(newUser);
    } else {
      throw errorHandler(400, "Invalid user data");
    }
  } catch (error) {
    next(error);
  }
};

// Login
const login = async (request, response, next) => {
  try {
    const { username, password } = request.body;

    if (!username || !password)
      throw errorHandler(400, "Missing required fields");

    const user = await User.findOne({ username });
    if (!user) throw errorHandler(401, "Invalid username or password");

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) throw errorHandler(401, "Invalid username or password");

    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    response
      .cookie("user_token", token, {
        httpOnly: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "Login successful", user_token: token });
  } catch (error) {
    next(error);
  }
};

// Logout
const logout = async (request, response) => {
  response.clearCookie("user_token").json({ message: "Logout successful" });
};

module.exports = {
  signup,
  login,
  logout,
};
