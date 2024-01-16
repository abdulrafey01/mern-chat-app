const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  chatof: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chatwith: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["direct", "group"],
  },
  groupname: {
    type: String,
    required: function () {
      return this.type === "group";
    },
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  timestamp: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
});

module.exports = mongoose.model("Chat", chatSchema);
