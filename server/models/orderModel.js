const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: {
      required: true,
      type: mongoose.Types.ObjectId,
    },

    name: {
      required: true,
      type: String,
    },

    phone: {
      required: true,
      type: Number,
    },

    pinCode: {
      required: true,
      type: Number,
    },

    district: {
      required: true,
      type: String,
    },

    address: {
      required: true,
      type: String,
    },

    totalPrice: {
      required: true,
      type: Number,
    },

    paymentMethod: {
      required: true,
      type: String,
    },

    status: {
      required: true,
      type: String,
    },

    date: {
      required: true,
      type: Date,
      default: Date.now,
    },

    cartProducts: {
      required: true,
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
