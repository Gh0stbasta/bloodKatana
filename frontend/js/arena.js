// join socket.io room via room from url and send info: player-name, choosen character, room number
// Connecting to websocket in defined room via url
const socket = io();

const selectedCharacter = localStorage.getItem("selectedCharacter");
const playerName = localStorage.getItem("playerName");

const params = new URLSearchParams(window.location.search);
const room = params.get("room");

const setupPlayerInRoom = {
  roomId: room,
  playerName: playerName,
  chosenCharacterId: selectedCharacter,
};

socket.emit("joinGame", setupPlayerInRoom);

socket.on("startGame", (data) => {
  console.log(data);
});
// set up room via emited information from the server

// if player has first turn activate fight buttons

// else wait for information from server and update healthbar and play animation from enemy attack

// check for win/loose condition from server on every turn
