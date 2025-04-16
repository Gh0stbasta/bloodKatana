// join socket.io room via room from url and send info: player-name, choosen character, room number
// Connecting to websocket in defined room via url
const socket = io();
const params = new URLSearchParams(window.location.search);
const room = params.get("room");

socket.emit("joinGame", room);



// set up room via emited information from the server

// if player has first turn activate fight buttons

// else wait for information from server and update healthbar and play animation from enemy attack

// check for win/loose condition from server on every turn