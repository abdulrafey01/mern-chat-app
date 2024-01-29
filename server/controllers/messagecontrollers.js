const Message = require("../models/Message");

exports.create = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const newMessage = await Message.create({
      from,
      to,
      message,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
