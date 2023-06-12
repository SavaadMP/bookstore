const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  createBook,
  deleteBook,
  getSingleBook,
  updateSingleBook,
} = require("../controllers/bookController");
const {
  getMessages,
  deleteMessage,
} = require("../controllers/messageController");
const {
  getDetailedOrderedDetails,
  getDetailedOrderedProducts,
} = require("../controllers/orderController");

const requireAuth = require("../middlewares/requireAuth");
const requireAdminAuth = require("../middlewares/requireAdminAuth");

// * requireAuth for all requests
router.use(requireAuth);

router.get("/books", getAllBooks);
router.get("/book/:id", getSingleBook);
router.get("/messages", requireAdminAuth, getMessages);
router.get("/orders", requireAdminAuth, getDetailedOrderedDetails);
router.get("/orderProducts/:id", requireAdminAuth, getDetailedOrderedProducts);

router.post("/addbook", requireAdminAuth, createBook);

router.delete("/deletebook/:id", requireAdminAuth, deleteBook);
router.delete("/deleteMessage/:id", requireAdminAuth, deleteMessage);

router.patch("/editbook/:id", updateSingleBook);

module.exports = router;
