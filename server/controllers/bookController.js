const { default: mongoose } = require("mongoose");
const Book = require("../models/bookModel");

const getAllBooks = async (req, res) => {
  const allBooks = await Book.find({}).sort({ createdAt: -1 });
  res.status(200).json(allBooks);
};

const createBook = async (req, res) => {
  const { title, description, price, author, imageURL } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!price) {
    emptyFields.push("price");
  }
  if (!author) {
    emptyFields.push("author");
  }
  if (!imageURL) {
    emptyFields.push("imageURL");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all fields!!", emptyFields });
  }

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

const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Book not found!!" });
  }

  const book = await Book.findOneAndDelete({ _id: id });
  if (!book) {
    return res.status(404).json({ error: "Book not found!!" });
  }

  res.status(200).json(book);
};

module.exports = { getAllBooks, createBook, deleteBook };
