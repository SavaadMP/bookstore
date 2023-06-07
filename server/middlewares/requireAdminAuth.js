const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAdminAuth = async (req, res, next) => {
  // * Verify Authentication
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ error: "Authoriation token requird!!" });

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findOne({ _id }).select("role");

    if (req.user.role === "user") res.status(401).json({ error: "Admin Only" });
    else {
      next();
    }
  } catch (error) {
    res.status(400).json({ error: "Request is not authorized!!" });
  }
};

module.exports = requireAdminAuth;
