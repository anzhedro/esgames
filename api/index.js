const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  io.connectedUsers = ["ss", "dd"];

  socket.on("login", (user) => {
    if (io.connectedUsers.includes(user)) {
      io.emit("login_fail", user);
    } else {
      io.connectedUsers.push(user);
      io.emit("login_success", user);
    }
  });

  // console.log(socket.handshake.auth);
  // socket.on("chat_message", (msg) => {
  //   io.emit("chat_message", msg);
  // });
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
