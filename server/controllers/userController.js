const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const { username, role } = user;

    // * create a token for the user
    const token = createToken(user._id);
    res.status(200).json({ username, email, token, role });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  // * access the values from the user
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);
    const { role } = user;

    // * create a token for the user
    const token = createToken(user._id);
    res.status(200).json({ email, username, token, role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { loginUser, registerUser };
