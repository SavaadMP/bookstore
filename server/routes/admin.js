const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  createBook,
  deleteBook,
  getSingleBook,
} = require("../controllers/bookController");

router.get("/books", getAllBooks);
router.post("/addbook", createBook);
router.delete("/deletebook/:id", deleteBook);
router.get("/book/:id", getSingleBook);

module.exports = router;
