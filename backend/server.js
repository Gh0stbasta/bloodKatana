const express = require("express");
const sqlite3 = require("sqlite3");
const http = require("http");
const WebSocket = require("ws");
const { json } = require("stream/consumers");

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
// db.run(
//   `DROP TABLE data`,
//   (err) => {
//     if (err) {
//       console.error("Error deleting table:", err.message);
//     } else {
//       console.log("Table 'data' is deleted.");
//     }
//   }
// );

const server = express();
const hauptserver = http.createServer(server);
const wss = new WebSocket.Server({ server: hauptserver });

wss.on("connection", (ws) => {
  console.log("Neue WebSocket-Verbindung hergestellt.");

  ws.on("message", (message) => {
    console.log("Nachricht empfangen:", message);
    // Hier unbedingt aus dem Frontendein JSON in folgendem Format senden: { attackierer: name, gegner: name, schaden: zahl }
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
  const { id } = req.params; // Extrahiere die Benutzer-ID aus den URL-Parametern
  const { siege, niederlagen } = req.body; // Extrahiere die neuen Werte aus dem Anfrage-Body

  // Überprüfe, ob 'siege' und 'niederlagen' Zahlen sind
  if (typeof siege !== "number" || typeof niederlagen !== "number") {
    return res.status(400).send("Ungültige Eingabedaten");
  }

  // Aktualisiere die Tabelle 'user' mit den neuen Werten für 'siege' und 'niederlagen'
  db.run(
    `UPDATE user SET siege = ?, niederlagen = ? WHERE id = ?`,
    [siege, niederlagen, id],
    function (err) {
      if (err) {
        // Fehler protokollieren und 500-Statuscode senden, falls das Update fehlschlägt
        console.error("Fehler beim Aktualisieren des Benutzers:", err.message);
        res.status(500).send("Interner Serverfehler");
      } else if (this.changes === 0) {
        // 404-Statuscode senden, falls keine Zeilen aktualisiert wurden (Benutzer nicht gefunden)
        res.status(404).send("Benutzer nicht gefunden");
      } else {
        // Erfolgsnachricht senden, falls das Update erfolgreich war
        res.send("Benutzer erfolgreich aktualisiert");
      }
    }
  );
});

// Start the server
hauptserver.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

// db.run(
//   `INSERT INTO user (name, passwort, siege, niederlagen) VALUES
//   ('stefan', 'stefan', 0, 0),
//   ('erwin', 'erwin', 0, 0),
//   ('paria', 'paria', 0, 0),
//   ('beata', 'beata', 0, 0),
//   ('volkan', 'volkan', 0, 0)`,
//   (err) => {
//     if (err) {
//       console.error("Error inserting users:", err.message);
//     } else {
//       console.log("Users 'stefan', 'erwin', 'paria', 'beata', and 'volkan' have been added.");
//     }
//   }
// );

// db.run(
//   `INSERT INTO charakter (name, stärke, verteidigung, angriff1, angriffsschaden1, angriff2, angriffsschaden2, angriff3, angriffsschaden3, angriff4, angriffsschaden4) VALUES
//   ('Sōgō no Shisha', 80, 60, 'Klingensturm', 15, 'Schattenhieb', 20, 'Nebeltritt', 10, 'Dunkelstoß', 25),
//   ('Ayatsurishi', 70, 70, 'Flammenwirbel', 18, 'Frostklinge', 16, 'Donnerschlag', 22, 'Windklinge', 14),
//   ('Bedy Yamiko', 150, 100, 'Giftnebel', 12, 'Verhexung', 14, 'Seelenraub', 18, 'Dämonenfluch', 20),
//   ('Utsushi no Oni', 200, 200, 'Schattenklinge', 25, 'Toxischer Schlag', 20, 'Phantomtritt', 22, 'Dunkelstich', 30),
//   ('Kōgei no Shinobi', 1000, 5000, 'Höllenfächer', 50, 'Schattenfächerexplosion', 40, 'Todesfächerwirbel', 45, 'Ninjutsu: Fächersturm', 60)`,
//   (err) => {
//     if (err) {
//       console.error("Error inserting characters:", err.message);
//     } else {
//       console.log("Characters with cool ninja attacks have been added.");
//     }
//   }
// );
