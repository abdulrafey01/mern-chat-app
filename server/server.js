const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { connectDB } = require("./config/db");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { create } = require("./controllers/messagecontrollers");
const Message = require("./models/Message");
const Chat = require("./models/Chat");

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173 ",
  },
});

io.on("connection", (socket) => {
  let allRooms = [];
  socket.on("join_room", (room) => {
    if (!allRooms.includes(room)) {
      allRooms.push(room);
      socket.join(room);
    }
  });

  socket.on("message", async (data) => {
    console.log(data);
    try {
      const message = new Message({
        from: data.from._id,
        to: data.to._id,
        message: data.message,
      });

      await message.save();
      io.to(data.chatId).emit("receive_message", {
        _id: message._id,
        from: {
          _id: message.from,
          //also send username of sending person. Can be useful in case of group
          username: data.from.username,
        },
        to: message.to,
        message: message.message,
        chatId: data.chatId,
        type: data.type,
        groupname: data.groupname,
      });

      const updatedChat = await Chat.findOneAndUpdate(
        { _id: data.chatId },
        {
          $push: {
            messages: message._id,
          },
        }
      );
    } catch (error) {
      io.to(room).emit("receive_message", "Error :message not sent");
    }

    // io.to(socket.room).emit("receive_message", data);
  });

  // Eithere chat created or deleted
  socket.on("chat_status_change", () => {
    socket.broadcast.emit("chat_status_message");
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Auth Routes
app.use("/api/auth", require("./routes/authroutes"));

// Chat Routes
app.use("/api/chat", require("./routes/chatroutes"));

// Message Routes
app.use("/api/message", require("./routes/messageroutes"));
server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
