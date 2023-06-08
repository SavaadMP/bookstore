const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
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
  role: {
    type: String,
    enum: ["user", "admin"],
  },
  cart: {
    type: Array,
  },
});

// * Static signup method
userSchema.statics.signup = async function (username, email, password) {
  if (!username || !email || !password) {
    throw Error("All Fields must be entered!!");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid!!");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough!!");
  }

  // * Checking entered email is already registered
  const existEmail = await this.findOne({ email });
  if (existEmail) throw Error("Email already in use!!");

  //   * change the entered password to hashed password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (email === "admin@gmail.com" && password === "Admin@Bookstore2023") {
    const user = await this.create({
      username,
      email,
      password: hashedPassword,
      role: "admin",
    });

    return user;
  }

  //   * adding the user to database
  const user = await this.create({
    username,
    email,
    password: hashedPassword,
    role: "user",
  });
  return user;
};

// * static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("All Feilds must be filled!!");

  const user = await this.findOne({ email: email });
  if (!user) throw Error("Incorrect Email!!");

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) throw Error("Incorrect Password!!");

  return user;
};

module.exports = mongoose.model("User", userSchema);
