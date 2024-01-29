const Chat = require("../models/Chat");

exports.create = async (req, res) => {
  try {
    const { chatof, chatwith, type, groupname, messages } = req.body;

    if (type === "direct") {
      // check if chat already exists
      let chat = await Chat.findOne({
        $and: [{ chatof }, { chatwith }, { type: "direct" }],
      });
      if (chat) {
        return res.status(400).json({ error: "Chat already exists" });
      }
    }

    let chat = await Chat.create({
      chatof,
      chatwith,
      type,
      groupname,
      messages,
    });

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fetchAll = async (req, res) => {
  try {
    const { id } = req.params;

    const chats = await Chat.find({
      $or: [{ chatof: id }, { chatwith: id }],
    })
      .populate("chatof", "_id username email")
      .populate("chatwith", "_id username email")
      .populate({
        path: "messages",
        populate: [
          { path: "from", model: "User", select: "_id username email" },
          {
            path: "to",
            model: "User" && "Chat",
            select: "_id username email" && "groupname",
          },
        ],
      });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Chat Id is required to delete" });
    }

    const chat = await Chat.findOneAndDelete({ _id: id });

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
