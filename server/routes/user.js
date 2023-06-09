const express = require("express");
const router = express.Router();

const { loginUser, registerUser } = require("../controllers/userController");

const requireAuth = require("../middlewares/requireAuth");

router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
