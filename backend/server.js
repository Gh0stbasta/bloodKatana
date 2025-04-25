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
let gameStateDb = [];
let roomCounter = 0;

const characters = [
  {
    id: 1,
    name: "Sōgō no Shisha",
    attack: 30,
    defense: 120,
  },
  {
    id: 2,
    name: "Ayatsurishi",
    attack: 70,
    defense: 70,
  },
  {
    id: 3,
    name: "Bedy Yamiko",
    attack: 90,
    defense: 50,
  },
  {
    id: 4,
    name: "Utsushi no Oni",
    attack: 50,
    defense: 90,
  },
  {
    id: 5,
    name: "Kōgei no Shinobi",
    attack: 120,
    defense: 30,
  },
];

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("createGame", () => {
    const roomId = roomCounter;
    console.log(`${socket.id} requested a new game in room ${roomId}`);
    socket.join(roomId);
    if (!games[roomId]) games[roomId] = [];
    games[roomId].push(socket.id);

    if (games[roomId].length === 2) {
      io.to(roomId).emit("gameCreated", roomId);
      roomCounter++;
    }
  });

  socket.on("joinGame", ({ roomId, playerName, chosenCharacterId }) => {
    console.log(playerName, chosenCharacterId);
    if (!games[roomId]) games[roomId] = [];
    socket.join(roomId);

    const chosenCharacter = characters[chosenCharacterId - 1];

    games[roomId].push({ id: socket.id, playerName, chosenCharacter });

    if (games[roomId].length === 2) {
      const gameState = {
        roomId: roomId,
        playerHealth: 100,
        enemyHealth: 100,
        maxHealth: 100,
        battleInProgress: false,
        playerTurn: games[roomId][0].playerName,
        player: games[roomId][0].playerName,
        enemy: games[roomId][1].playerName,
        playerCharacter: games[roomId][0].chosenCharacter,
        enemyCharacter: games[roomId][1].chosenCharacter,
      };
      gameStateDb.push(gameState);

      io.to(roomId).emit("startGame", { roomId, gameState });
    }
    console.log(
      `${playerName} (${socket.id}) entered ${roomId} with character ${chosenCharacter}`
    );
    console.log(gameStateDb);
  });

  socket.on("attack", ({ roomId, damage }) => {
    const game = games[roomId];
    if (!game || game.length < 2) return;

    io.to(roomId).emit("updateGameState", gameState);
  });

  socket.on("disconnect", () => {
    for (const roomId in games) {
      games[roomId] = games[roomId].filter((id) => id !== socket.id);
      if (games[roomId].length === 0) {
        delete games[roomId];
      }
    }
  });
});

server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});

// check for win loose condition
