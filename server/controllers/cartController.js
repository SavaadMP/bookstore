const Cart = require("../models/cartModel");

const addToCart = async (req, res) => {
  // * Getting product id..
  const { id } = req.params;

  // * Checking.. is User already added items to cart..
  let isUserCartExists = await Cart.findOne({ userId: req.user._id });

  if (isUserCartExists) {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      {
        $push: {
          cartProducts: id,
        },
      }
    );

    res.json(updatedCart);
  } else {
    const cartObject = {
      userId: req.user._id,
      cartProducts: [id],
    };

    const cart = await Cart.insertMany(cartObject);
    res.json(cart);
  }
};

module.exports = {
  addToCart,
};
