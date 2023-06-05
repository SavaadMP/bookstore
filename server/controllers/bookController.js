const Book = require("../models/bookModel");

const getAllBooks = async (req, res) => {
  const allBooks = await Book.find({}).sort({ createdAt: -1 });
  res.status(200).json(allBooks);
};
const createBook = async (req, res) => {
  const { title, description, price, author, imageURL } = req.body;

  try {
    const book = await Book.create({
      title,
      description,
      price,
      author,
      imageURL,
    });

    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getAllBooks, createBook };
