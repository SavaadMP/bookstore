const express = require("express");
const router = express.Router();

const { loginUser, registerUser } = require("../controllers/userController");

const requireAuth = require("../middlewares/requireAuth");
const { addToCart, getCartItems } = require("../controllers/cartController");

router.post("/login", loginUser);
router.post("/register", registerUser);

router.get("/cart", requireAuth, getCartItems);
router.post("/addToCart/:id", requireAuth, addToCart);

module.exports = router;
