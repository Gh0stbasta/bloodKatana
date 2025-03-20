const express = require("express");

const server = express();

// Routes
server.get("/", (req, res) => {
  res.send("Server is running!");
});

server.get("/volkan", (req, res) => {
  res.send("Volkan is der geilste AI Mensch");
});
server.get("/erwin", (req, res) => {
  res.send("<h1>erwin hat 14 kilo abgenommen</h1>");
});
server.get("/beata", (req, res) => {
  res.send("beata ist vom klo zurück");
});

// Start the server
server.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
