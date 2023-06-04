const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// * Static signup method
userSchema.statics.signup = async function (username, email, password) {
  // * Checking entered email is already registered
  const existEmail = await this.findOne({ email });
  if (existEmail) throw Error("Email already in use!!");

  //   * change the entered password to hashed password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   * adding the user to database
  const user = await this.create({ username, email, password: hashedPassword });
  return user;
};

module.exports = mongoose.model("User", userSchema);