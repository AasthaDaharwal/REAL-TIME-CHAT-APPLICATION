const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
  },
});

let usersTyping = {}; // Object to track typing users

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("typing", (roomId) => {
    // Find the user who is typing
    socket.join(roomId);
    usersTyping[roomId] = socket.id;

    // Broadcast to others in the room
    socket.to(roomId).emit("typing", socket.id);
  });

  socket.on("stopTyping", (roomId) => {
    // When typing stops, remove user from the typing list
    delete usersTyping[roomId];

    // Notify others in the room
    socket.to(roomId).emit("stopTyping");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    // Handle cleanup when a user disconnects
    for (let roomId in usersTyping) {
      if (usersTyping[roomId] === socket.id) {
        delete usersTyping[roomId];
        socket.to(roomId).emit("stopTyping");
      }
    }
  });
});

// Start server
server.listen(5000, () => {
  console.log("Server is running on port 5000");
});

