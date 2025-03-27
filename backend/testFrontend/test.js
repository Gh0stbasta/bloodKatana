// Verbindung zum WebSocket-Server herstellen
const socket = new WebSocket("ws://localhost:3000");

// Event: Verbindung geöffnet
socket.onopen = () => {
  console.log("WebSocket-Verbindung hergestellt.");
  socket.send(JSON.stringify({ spieler: "paria", schaden: 30 })); // Nachricht an den Server senden
};

// Event: Nachricht vom Server empfangen
socket.onmessage = (event) => {
  console.log("Nachricht vom Server:", event.data);
};

// Event: Verbindung geschlossen
socket.onclose = () => {
  console.log("WebSocket-Verbindung geschlossen.");
};

// Event: Fehler
socket.onerror = (error) => {
  console.error("WebSocket-Fehler:", error);
};