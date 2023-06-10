const express = require("express");
const router = express.Router();

const { loginUser, registerUser } = require("../controllers/userController");
const {
  addToCart,
  displayCart,
  getCartCount,
  changeQuantity,
  deleteCartItem,
} = require("../controllers/cartController");

const requireAuth = require("../middlewares/requireAuth");

router.get("/cart", requireAuth, displayCart);
router.get("/cartCount", requireAuth, getCartCount);

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/addtocart/:id", requireAuth, addToCart);
router.post("/changeQuantity", requireAuth, changeQuantity);
router.post("/deleteCartItem/:id", requireAuth, deleteCartItem);

module.exports = router;
