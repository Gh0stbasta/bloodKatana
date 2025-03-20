const express = require("express");

const server = express();

server.use(express.static("frontend"));

server.get("/api", (req, res) => {
  res.send("hier kommen die daten die wir wollen!");
  // ruf die datenbank
  // bereite die daten auf
  // sende die daten ans frontend
});

// Start the server
server.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
