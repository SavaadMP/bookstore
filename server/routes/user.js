const express = require("express");
const router = express.Router();

const { loginUser, registerUser } = require("../controllers/userController");

const requireAuth = require("../middlewares/requireAuth");
const { addToCart } = require("../controllers/cartController");

router.post("/login", loginUser);
router.post("/register", registerUser);

router.post("/addToCart/:id", requireAuth, addToCart);

module.exports = router;
