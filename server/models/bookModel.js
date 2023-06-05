const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    imageURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
