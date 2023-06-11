const Message = require("../models/messageModel");

const addMessage = async (req, res) => {
  const { name, email, message } = req.body;

  const newMessage = Message.create({ name, email, message });
  res.status(200).json(newMessage);
};

module.exports = { addMessage };
