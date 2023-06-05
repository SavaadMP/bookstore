const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // * create a token for the user
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  // * access the values from the user
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw Error("All Fields must be entered!!");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid!!");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough!!");
  }

  try {
    const user = await User.signup(username, email, password);

    // * create a token for the user
    const token = createToken(user._id);
    res.status(200).json({ email, username, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { loginUser, registerUser };
