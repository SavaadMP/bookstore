const express = require("express");
const router = express.Router();

const { getAllBooks, createBook } = require("../controllers/bookController");

router.get("/books", getAllBooks);
router.post("/addbook", createBook);

module.exports = router;
