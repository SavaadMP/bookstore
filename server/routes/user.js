const express = require("express");
const router = express.Router();

const { loginUser, registerUser } = require("../controllers/userController");
const { addToCart, getCartItems } = require("../controllers/cartController");

const requireAuth = require("../middlewares/requireAuth");

router.post("/login", loginUser);
router.post("/register", registerUser);

router.get("/cart", requireAuth, getCartItems);
router.post("/addtocart/:id", requireAuth, addToCart);

module.exports = router;
