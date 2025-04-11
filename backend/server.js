const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("./frontend"));

app.get("/", (req, res) => {
  res.redirect("/dashboard.html");
});

const games = {};
let roomCounter = 1;

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("createGame", () => {
    const roomId = "room" + roomCounter;
    socket.join(roomId);
    if (!games[roomId]) games[roomId] = [];
    games[roomId].push(socket.id);

    if (games[roomId].length === 2) {
      io.to(roomId).emit("gameCreated", roomId);
      roomCounter++;
    }
  });

  socket.on("joinGame", (roomId) => {
    if (!games[roomId]) games[roomId] = [];
    socket.join(roomId);
    games[roomId].push(socket.id);

    if (games[roomId].length === 2) {
      io.to(roomId).emit("startGame", roomId);
    }
    console.log(games);
  });

  socket.on("disconnect", () => {
    for (const roomId in games) {
      games[roomId] = games[roomId].filter((id) => id !== socket.id);
      if (games[roomId].length === 0) {
        delete games[roomId];
      }
      console.log(games);
    }
  });
});

server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
