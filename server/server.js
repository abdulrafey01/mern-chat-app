const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { connectDB } = require("./config/db");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const server = createServer(app);

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Auth Routes
app.use("/api/auth", require("./routes/authroutes"));

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
