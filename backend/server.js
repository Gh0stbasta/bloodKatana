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
    defense: 110,
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
    defense: 20,
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

  socket.on("attack", ({ roomId, playerName, attackType }) => {
    const game = games[roomId];
    if (!game || game.length < 2) return;

    let attacker = "";
    let defender = "";
    let message = "";

    if (gameStateDb[roomId].player === playerName) {
      attacker = gameStateDb[roomId].playerCharacter.id - 1;
      defender = gameStateDb[roomId].enemyCharacter.id - 1;
    } else {
      defender = gameStateDb[roomId].playerCharacter.id - 1;
      attacker = gameStateDb[roomId].enemyCharacter.id - 1;
    }

    // Basis-Angriffswert und Verteidigungswert
    const attackValue = characters[attacker].attack;
    const defenseValue = characters[defender].defense;

    // Basis-Schaden
    let damage = attackValue * (Math.random() * 0.4 + 0.8); // 80-120% des Angriffswerts

    // Modifikatoren basierend auf Angriffstyp
    switch (attackType) {
      case "katana":
        // Normaler Angriff, keine Modifikation
        break;
      case "schatten":
        // Chance auf kritischen Treffer
        if (Math.random() < 0.3) {
          damage *= 1.5;
          (message = "Kritischer Treffer!"), "system";
        }
        break;
      case "konter":
        // Reduzierter Schaden, aber erhöht die Verteidigung für den nächsten Angriff
        damage *= 0.7;
        break;
      case "tod":
        // Hoher Schaden, aber nur 20% Trefferchance
        if (Math.random() < 0.2) {
          damage *= 2;
          (message = "Tödlicher Treffer!"), "system";
        } else {
          damage = 0;
          (message = "Der Angriff verfehlt sein Ziel!"), "system";
        }
        break;
    }

    // Verteidigung berücksichtigen
    damage = Math.max(1, damage - defenseValue * 0.5);

    // Zufälligkeit hinzufügen
    damage = Math.floor(damage * (Math.random() * 0.2 + 0.9)); // 90-110% Zufälligkeit

    if (gameStateDb[roomId].player === playerName) {
      gameStateDb[roomId].enemyHealth -= damage;
      gameStateDb[roomId].playerTurn = gameStateDb[roomId].enemy;
    } else {
      gameStateDb[roomId].playerHealth -= damage;
      gameStateDb[roomId].playerTurn = gameStateDb[roomId].player;
    }

    const gameState = gameStateDb[roomId];
    const animationTarget = defender + 1;

    io.to(roomId).emit("updateGameState", {
      gameState,
      message,
      attackType,
      animationTarget,
    });
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

server.listen(3000, "0.0.0.0", () => {
  console.log("🚀 Server running at Port 3000");
});
