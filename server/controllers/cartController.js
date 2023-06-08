const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");

const addToCart = async (req, res) => {
  const { id } = req.params;

  var isCartExists = false;

  if (!isCartExists) {
    const user = await User.find({ _id: req.user._id });
    const resp = user[0].cart;

    let isDuplicate = false;

    resp.forEach((doc) => {
      if (doc.productId === id) {
        isDuplicate = true;
      }
    });

    if (isDuplicate) {
      const resp = await User.findOneAndUpdate(
        { _id: req.user._id, "cart.productId": id },
        {
          $inc: { "cart.$.quantity": 1 },
        },
        { new: true }
      );

      res.json(resp);
    } else {
      console.log(id);
      const addToCart = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              productId: id,
              quantity: 1,
            },
          },
        },
        { new: true }
      );

      res.json(addToCart);
    }
  }
};

module.exports = { addToCart };
