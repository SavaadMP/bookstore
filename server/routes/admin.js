const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  createBook,
  deleteBook,
} = require("../controllers/bookController");

router.get("/books", getAllBooks);
router.post("/addbook", createBook);
router.delete("/deletebook/:id", deleteBook);

module.exports = router;
