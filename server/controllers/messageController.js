const { default: mongoose } = require("mongoose");
const Message = require("../models/messageModel");

const addMessage = async (req, res) => {
  const { name, email, message } = req.body;

  const newMessage = Message.create({ name, email, message });
  res.status(200).json(newMessage);
};

const getMessages = async (req, res) => {
  const messages = await Message.find({}).sort({ createdAt: -1 });
  res.status(200).json(messages);
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Message not found!!" });
  }

  const message = await Message.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(id),
  });
  if (!message) return res.status(404).json({ error: "Book not found!!" });

  res.status(200).json(message);
};

module.exports = { addMessage, getMessages, deleteMessage };
