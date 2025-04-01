const express = require("express");
const sqlite3 = require("sqlite3");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors"); // Import the cors package

// Initialize SQLite database
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        passwort TEXT NOT NULL,
        siege INTEGER NOT NULL,
        niederlagen INTEGER NOT NULL
        )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        } else {
          console.log("Table 'user' is ready.");
        }
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS charakter (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        stärke INTEGER NOT NULL,
        verteidigung INTEGER NOT NULL,
        angriff1 TEXT NOT NULL,
        angriffsschaden1 INTEGER NOT NULL,
        angriff2 TEXT NOT NULL,
        angriffsschaden2 INTEGER NOT NULL,
        angriff3 TEXT NOT NULL,
        angriffsschaden3 INTEGER NOT NULL,
        angriff4 TEXT NOT NULL,
        angriffsschaden4 INTEGER NOT NULL
        )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        } else {
          console.log("Table 'charakter' is ready.");
        }
      }
    );
  }
});

const server = express();
const hauptserver = http.createServer(server);
const wss = new WebSocket.Server({ server: hauptserver });

// Use CORS middleware
server.use(cors()); // Enable CORS for all routes

wss.on("connection", (ws) => {
  console.log("Neue WebSocket-Verbindung hergestellt.");

  ws.on("message", (message) => {
    console.log("Nachricht empfangen:", message);
    ws.send(message);
  });

  ws.on("close", () => {
    console.log("WebSocket-Verbindung geschlossen.");
  });
});

server.use(express.json());
server.use(express.static("../frontend"));

server.get("/user", (req, res) => {
  db.all(`SELECT * FROM user`, [], (err, rows) => {
    if (err) {
      console.error("Error fetching users:", err.message);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
});

server.get("/charakter", (req, res) => {
  db.all(`SELECT * FROM charakter`, [], (err, rows) => {
    if (err) {
      console.error("Error fetching charakter:", err.message);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
});

// Endpoint zum Aktualisieren eines Benutzers
server.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { siege, niederlagen } = req.body;

  if (typeof siege !== "number" || typeof niederlagen !== "number") {
    return res.status(400).send("Ungültige Eingabedaten");
  }

  db.run(
    `UPDATE user SET siege = ?, niederlagen = ? WHERE id = ?`,
    [siege, niederlagen, id],
    function (err) {
      if (err) {
        console.error("Fehler beim Aktualisieren des Benutzers:", err.message);
        res.status(500).send("Interner Serverfehler");
      } else if (this.changes === 0) {
        res.status(404).send("Benutzer nicht gefunden");
      } else {
        res.send("Benutzer erfolgreich aktualisiert");
      }
    }
  );
});

// Start the server
hauptserver.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
