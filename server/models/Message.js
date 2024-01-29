const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" || "Chat",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
});

module.exports = mongoose.model("Message", messageSchema);
