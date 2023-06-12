const mongoose = require("mongoose");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");

const placeOrder = async (req, res) => {
  const { name, phone, pinCode, district, address, paymentMethod, cartPrice } =
    req.body;

  let emptyFields = [];
  if (!name) emptyFields.push("name");
  if (!phone) emptyFields.push("phone");
  if (!pinCode) emptyFields.push("pinCode");
  if (!district) emptyFields.push("district");
  if (!address) emptyFields.push("address");
  if (!paymentMethod) emptyFields.push("paymentMethod");
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all fields", emptyFields });
  }

  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    let cartProducts = cart.cartProducts;
    let status = paymentMethod === "COD" ? "Initialized" : "Pending";

    await Order.create({
      userId: new mongoose.Types.ObjectId(req.user._id),
      name,
      phone,
      pinCode,
      district,
      address,
      paymentMethod,
      totalPrice: cartPrice,
      cartProducts,
      status,
    }).then(async () => {
      const deletedCart = await Cart.deleteOne({ userId: req.user._id });
      res.status(200).json(deletedCart);
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getOrderedDetails = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: new mongoose.Types.ObjectId(req.user._id),
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getOrderedProducts = async (req, res) => {
  const { id } = req.params;

  let orderedItems = await Order.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    { $unwind: "$cartProducts" },
    {
      $project: {
        item: "$cartProducts.item",
        quantity: "$cartProducts.quantity",
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "item",
        foreignField: "_id",
        as: "CartItems",
      },
    },
    {
      $project: {
        item: 1,
        quantity: 1,
        CartItems: {
          $arrayElemAt: ["$CartItems", 0],
        },
      },
    },
  ]).exec();

  res.status(200).json(orderedItems);
};

const getDetailedOrderedDetails = async (req, res) => {
  const orders = await Order.find({});

  res.status(200).json(orders);
};

const getDetailedOrderedProducts = async (req, res) => {
  const { id } = req.params;

  let orderedItems = await Order.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    { $unwind: "$cartProducts" },
    {
      $project: {
        item: "$cartProducts.item",
        quantity: "$cartProducts.quantity",
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "item",
        foreignField: "_id",
        as: "CartItems",
      },
    },
    {
      $project: {
        item: 1,
        quantity: 1,
        CartItems: {
          $arrayElemAt: ["$CartItems", 0],
        },
      },
    },
  ]).exec();

  res.status(200).json(orderedItems);
};

module.exports = {
  placeOrder,
  getOrderedDetails,
  getOrderedProducts,
  getDetailedOrderedDetails,
  getDetailedOrderedProducts,
};
