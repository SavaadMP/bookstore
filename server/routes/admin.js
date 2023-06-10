const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  createBook,
  deleteBook,
  getSingleBook,
  updateSingleBook,
} = require("../controllers/bookController");
const requireAuth = require("../middlewares/requireAuth");
const requireAdminAuth = require("../middlewares/requireAdminAuth");

// * requireAuth for all requests
router.use(requireAuth);

router.get("/books", getAllBooks);
router.get("/book/:id", getSingleBook);

router.post("/addbook", requireAdminAuth, createBook);

router.delete("/deletebook/:id", requireAdminAuth, deleteBook);

router.patch("/editbook/:id", updateSingleBook);

module.exports = router;
