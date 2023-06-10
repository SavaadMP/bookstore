const { default: mongoose } = require("mongoose");
const Cart = require("../models/cartModel");
const { response } = require("express");

const addToCart = async (req, res) => {
  // * Getting product id..
  const { id } = req.params;

  let productObject = {
    item: new mongoose.Types.ObjectId(id),
    quantity: 1,
  };

  // * Checking.. is User already added items to cart..
  let isUserCartExists = await Cart.findOne({
    userId: new mongoose.Types.ObjectId(req.user._id),
  });

  if (isUserCartExists) {
    let isProductExists = isUserCartExists.cartProducts.findIndex((product) => {
      return product.item == id;
    });

    if (isProductExists != -1) {
      let updatedCart = await Cart.findOneAndUpdate(
        {
          userId: req.user._id,
          "cartProducts.item": new mongoose.Types.ObjectId(id),
        },
        {
          $inc: { "cartProducts.$.quantity": 1 },
        }
      );

      return res.status(200).json(updatedCart);
    } else {
      const updatedCart = await Cart.findOneAndUpdate(
        { userId: req.user._id },
        {
          $push: {
            cartProducts: productObject,
          },
        }
      );

      return res.status(200).json(updatedCart);
    }
  } else {
    const cartObject = {
      userId: new mongoose.Types.ObjectId(req.user._id),
      cartProducts: [productObject],
    };

    const cart = await Cart.insertMany(cartObject);
    return res.status(200).json(cart);
  }
};

const displayCart = async (req, res) => {
  let cart = await Cart.aggregate([
    {
      $match: { userId: req.user._id },
    },
    {
      $unwind: "$cartProducts",
    },
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

  return res.status(200).json(cart);
};

const getCartCount = async (req, res) => {
  let count = 0;
  let cart = await Cart.findOne({ userId: req.user._id });

  if (cart) {
    count = cart.cartProducts.length;
  }

  return res.status(200).json(count);
};

const changeQuantity = async (req, res) => {
  const { productID, count } = req.body;

  let updatedCart = await Cart.findOneAndUpdate(
    {
      userId: req.user._id,
      "cartProducts.item": new mongoose.Types.ObjectId(productID),
    },
    {
      $inc: { "cartProducts.$.quantity": count },
    }
  );

  res.status(200).json(updatedCart);
};

const deleteCartItem = async (req, res) => {
  const { id } = req.params;

  const deletedCart = await Cart.findOneAndUpdate(
    { userId: req.user._id },
    {
      $pull: {
        cartProducts: { item: new mongoose.Types.ObjectId(id) },
      },
    }
  );

  res.json(deletedCart);
};

const getCartPrice = async (req, res) => {
  let totalPrice = await Cart.aggregate([
    {
      $match: { userId: req.user._id },
    },
    {
      $unwind: "$cartProducts",
    },
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
    {
      $group: {
        _id: null,
        total: {
          $sum: {
            $multiply: ["$quantity", "$CartItems.price"],
          },
        },
      },
    },
  ]).exec();

  return res.status(200).json(totalPrice[0]);
};
module.exports = {
  addToCart,
  displayCart,
  getCartCount,
  changeQuantity,
  deleteCartItem,
  getCartPrice,
};
