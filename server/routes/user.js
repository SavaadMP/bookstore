const express = require("express");
const router = express.Router();

const { loginUser, registerUser } = require("../controllers/userController");
const {
  addToCart,
  displayCart,
  getCartCount,
  changeQuantity,
  deleteCartItem,
  getCartPrice,
} = require("../controllers/cartController");
const {
  placeOrder,
  getOrderedProducts,
  getOrderedDetails,
} = require("../controllers/orderController");

const requireAuth = require("../middlewares/requireAuth");

router.get("/cart", requireAuth, displayCart);
router.get("/cartCount", requireAuth, getCartCount);
router.get("/getCartPrice", requireAuth, getCartPrice);
router.get("/orders", requireAuth, getOrderedDetails);
router.get("/orderedProducts/:id", requireAuth, getOrderedProducts);

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/addtocart/:id", requireAuth, addToCart);
router.post("/changeQuantity", requireAuth, changeQuantity);
router.post("/deleteCartItem/:id", requireAuth, deleteCartItem);
router.post("/placeOrder", requireAuth, placeOrder);

module.exports = router;
