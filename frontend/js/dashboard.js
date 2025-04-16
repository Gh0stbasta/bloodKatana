// Globale Variablen
let selectedCharacter = "";
const socket = io();
const joinMatchButton = document.getElementById("btn-join-match");
const playerNameInput = document.getElementById("player-name");
let playerName = "";

if (playerNameInput) {
  const characterGrid = document.getElementById("character-grid");

  playerNameInput.addEventListener("input", function () {
    playerName = this.value;

    if (characterGrid) {
      if (playerName.trim() === "") {
        characterGrid.classList.add("disabled-grid");
        characterGrid.style.pointerEvents = "none";
        playerNameInput.classList.add("pulse");
      } else {
        characterGrid.classList.remove("disabled-grid");
        characterGrid.style.pointerEvents = "auto";
        playerNameInput.classList.remove("pulse");
      }
    }
  });

  // Initial state check
  if (characterGrid && playerNameInput.value.trim() === "") {
    characterGrid.classList.add("disabled-grid");
    characterGrid.style.pointerEvents = "none";
    playerNameInput.classList.add("pulse");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Lade den ausgewählten Charakter aus dem lokalen Speicher, falls vorhanden
  const savedCharacter = localStorage.getItem("selectedCharacter");
  if (savedCharacter) {
    selectCharacter(savedCharacter);
  }

  // Event-Listener für den Button "btn-join-match"
  if (joinMatchButton) {
    joinMatchButton.addEventListener("click", function () {
      // Auf Raumzuweisung warten und Spielraum kreieren
      socket.emit("createGame");
      // Deaktiviere den Button
      this.disabled = true;
      // Ändere den Text des Buttons
      this.textContent = "Warte auf Gegner...";
      // Füge die Klasse "pulse" hinzu
      this.classList.add("pulse");
    });
  }
  // Event-Listener für Charakterkarten
  setupCharacterSelection();

  // Dashboard anzeigen (nach der Swipe-Animation)
  showDashboard();
});

function showDashboard() {
  const dashboardContainer = document.querySelector(".dashboard-container");
  if (dashboardContainer) {
    dashboardContainer.classList.add("visible");
  }
}

function setupCharacterSelection() {
  const characterCards = document.querySelectorAll(".character-card");

  characterCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Ausgewählten Charakter speichern
      const characterName = this.getAttribute("data-character");
      selectCharacter(characterName);
      // Reaktivieren des Buttons "btn-join-match", falls deaktiviert
      joinMatchButton.disabled = false;
      joinMatchButton.classList.remove("disabled");
    });
  });
}

function selectCharacter(characterName) {
  // Speichere den ausgewählten Charakter
  selectedCharacter = characterName;
  localStorage.setItem("selectedCharacter", characterName);
  localStorage.setItem("playerName", playerName);

  // Visuelles Feedback für die Auswahl
  const characterCards = document.querySelectorAll(".character-card");
  characterCards.forEach((card) => {
    if (card.getAttribute("data-character") === characterName) {
      card.classList.add("selected");
    } else {
      card.classList.remove("selected");
    }
  });
}

socket.on("gameCreated", (roomId) => {
  window.location.href = "/arena.html?room=" + roomId;
});
