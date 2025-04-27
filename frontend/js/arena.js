const socket = io();

const selectedCharacter = localStorage.getItem("selectedCharacter");
const playerName = localStorage.getItem("playerName");

const params = new URLSearchParams(window.location.search);
const room = params.get("room");
let clientGamestate = {};

const setupPlayerInRoom = {
  roomId: room,
  playerName: playerName,
  chosenCharacterId: selectedCharacter,
};

// Event-Listener für Angriffstasten
document.querySelectorAll(".attack-button").forEach((button) => {
  button.addEventListener("click", function () {
    const attackType = this.getAttribute("data-attack");
    if (clientGamestate.playerTurn) {
      performAttack(attackType);
    }
  });
});

// Zurück-Button
const backButton = document.getElementById("backToDashboard");
if (backButton) {
  backButton.addEventListener("click", function () {
    window.location.href = "dashboard.html";
  });
}

function setupArena(gamestate) {
  // Spieler-Kämpfer einrichten
  const arenaRow = document.getElementById("arena-row");

  if (playerName !== gamestate.player) {
    arenaRow.style.display = "flex";
    arenaRow.style.flexDirection = "row-reverse";
  }

  const playerFighter = document.getElementById("playerFighter");
  if (playerFighter) {
    // Bild des ausgewählten Charakters laden
    const playerImage = playerFighter.querySelector("img");
    if (playerImage) {
      playerImage.src = `./images/${gamestate.playerCharacter.id}/atk.webp`;
      playerImage.alt = gamestate.playerCharacter.name;
    }

    // Name und Statistiken anzeigen
    const playerName = playerFighter.querySelector(".fighter-name");
    if (playerName) {
      playerName.textContent = gamestate.playerCharacter.name; // hier muss der Name aus dem objekt hin
    }

    const playerStats = playerFighter.querySelector(".fighter-stats");
    if (playerStats && gamestate.playerCharacter) {
      playerStats.textContent = `Angriff: ${gamestate.playerCharacter.attack} | Verteidigung: ${gamestate.playerCharacter.defense}`;
    }
  }

  // Gegner-Kämpfer einrichten
  const enemyFighter = document.getElementById("enemyFighter");
  if (enemyFighter) {
    // Bild des Gegners laden
    const enemyImage = enemyFighter.querySelector("img");
    if (enemyImage) {
      enemyImage.src = `./images/${gamestate.enemyCharacter.id}/atk.webp`;
      enemyImage.alt = gamestate.enemyCharacter.name;
    }

    // Name und Statistiken anzeigen
    const enemyName = enemyFighter.querySelector(".fighter-name");
    if (enemyName) {
      enemyName.textContent = gamestate.enemyCharacter.name;
    }

    const enemyStats = enemyFighter.querySelector(".fighter-stats");
    if (enemyStats && gamestate.enemyCharacter) {
      enemyStats.textContent = `Angriff: ${gamestate.enemyCharacter.attack} | Verteidigung: ${gamestate.enemyCharacter.defense}`;
    }
  }
}

function startBattle(gamestate) {
  // Kampflog leeren
  const logMessages = document.getElementById("logMessages");
  if (logMessages) {
    logMessages.innerHTML = "";
  }

  // Kampfbeginn-Nachricht
  addLogMessage(
    `Der Kampf zwischen ${gamestate.playerCharacter.name} und ${gamestate.enemyCharacter.name} beginnt!`,
    "system"
  );
  if (gamestate.playerTurn === playerName) {
    addLogMessage("Du bist am Zug. Wähle deinen Angriff!", "system");
    enableAttackButtons(true);
  } else {
    addLogMessage("Der Gegner ist am Zug. Bitte warten...", "system");
    enableAttackButtons(false);
  }
}

function performAttack(attackType) {
  // Deaktiviere die Angriffstasten während der Animation
  enableAttackButtons(false);

  // Emit attack event to the server
  socket.emit("attack", {
    roomId: clientGamestate.roomId,
    playerName: playerName,
    attackType: attackType,
  });
}

function enableAttackButtons(enable) {
  const buttons = document.querySelectorAll(".attack-button");
  buttons.forEach((button) => {
    button.disabled = !enable;
    if (enable) {
      button.classList.remove("disabled");
    } else {
      button.classList.add("disabled");
    }
  });
}

function updateHealthBars(playerHealth, enemyHealth) {
  // Spieler-Gesundheitsbalken
  if (playerHealth < 0) {
    playerHealth = 0;
  }

  if (enemyHealth < 0) {
    enemyHealth = 0;
  }

  const playerHealthBar = document.getElementById("playerHP");
  if (playerHealthBar) {
    playerHealthBar.style.width = `${playerHealth}%`;

    // Farbe basierend auf Gesundheitszustand
    playerHealthBar.className = "health";
    if (playerHealth > 70) {
      playerHealthBar.classList.add("high");
    } else if (playerHealth > 40) {
      playerHealthBar.classList.add("medium");
    } else {
      playerHealthBar.classList.add("low");
    }
  }

  // Gegner-Gesundheitsbalken
  const enemyHealthBar = document.getElementById("enemyHP");
  if (enemyHealthBar) {
    enemyHealthBar.style.width = `${enemyHealth}%`;

    // Farbe basierend auf Gesundheitszustand
    enemyHealthBar.className = "health";
    if (enemyHealth > 70) {
      enemyHealthBar.classList.add("high");
    } else if (enemyHealth > 40) {
      enemyHealthBar.classList.add("medium");
    } else {
      enemyHealthBar.classList.add("low");
    }
  }
}

function addLogMessage(message, type) {
  const logMessages = document.getElementById("logMessages");
  if (!logMessages) return;

  const messageElement = document.createElement("div");
  messageElement.className = `log-message ${type}`;
  messageElement.textContent = message;

  // Neue Nachricht oben einfügen
  logMessages.insertBefore(messageElement, logMessages.firstChild);

  // Scroll zum Anfang
  logMessages.scrollTop = 0;
}

function getAttackName(attackType) {
  switch (attackType) {
    case "katana":
      return "Katana-Schnitt";
    case "schatten":
      return "Schattenschlag";
    case "konter":
      return "Konterhaltung";
    case "tod":
      return "Todesstoß";
    default:
      return "Unbekannter Angriff";
  }
}

function playAttackAnimation(attackType, targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  // Animation-Element erstellen
  const animation = document.createElement("div");
  animation.className = "attack-animation";

  // Animation basierend auf Angriffstyp
  switch (attackType) {
    case "katana":
      animation.classList.add("katana-slash");
      break;
    case "schatten":
      animation.classList.add("shadow-attack");
      break;
    case "konter":
      animation.classList.add("counter-stance");
      break;
    case "tod":
      animation.classList.add("death-blow");
      break;
    default:
      animation.classList.add("katana-slash");
  }

  // Animation zum Ziel hinzufügen
  target.appendChild(animation);

  // Animation nach Abschluss entfernen
  setTimeout(function () {
    animation.remove();
  }, 1000);
}

function endBattle(playerWon) {
  // Kampfende-Nachricht
  if (playerWon) {
    if (playerName === clientGamestate.player) {
      addLogMessage(
        `Du hast ${clientGamestate.enemyCharacter.name} besiegt!`,
        "system"
      );
    } else {
      addLogMessage(
        `Du hast ${clientGamestate.playerCharacter.name} besiegt!`,
        "system"
      );
    }
  } else {
    if (playerName === clientGamestate.player) {
      addLogMessage(
        `Du wurdest von ${clientGamestate.enemyCharacter.name} besiegt!`,
        "system"
      );
    } else {
      addLogMessage(
        `Du wurdest von ${clientGamestate.playerCharacter.name} besiegt!`,
        "system"
      );
    }
  }

  // Deaktiviere die Angriffstasten
  enableAttackButtons(false);

  // Lokalen Speicher leeren
  localStorage.clear();

  // Zeige die Sieges- oder Niederlagen-Animation
  setTimeout(function () {
    const resultDisplay = document.createElement("div");
    resultDisplay.className = "result-display";

    const resultTitle = document.createElement("h1");
    resultTitle.className = "result-title";

    const resultText = document.createElement("h2");
    resultText.className = "result-text";

    if (playerWon) {
      resultTitle.textContent = "SIEG";
      resultText.textContent = "Mr. Miagi wäre stolz auf dich!";
      resultDisplay.classList.add("victory");
    } else {
      resultTitle.textContent = "NIEDERLAGE";
      resultText.textContent = "Du kleines Stück Scheiße hast verloren";
      resultDisplay.classList.add("defeat");
    }

    const backButton = document.getElementById("backToDashboard");
    if (backButton) {
      backButton.addEventListener("click", function () {
        window.location.href = "dashboard.html";
      });
    }
    resultDisplay.classList.add("visible");

    resultDisplay.appendChild(resultTitle);
    resultDisplay.appendChild(resultText);
    resultDisplay.appendChild(backButton);
    document.body.appendChild(resultDisplay);
  }, 2000);
}

socket.emit("joinGame", setupPlayerInRoom);

socket.on("startGame", ({ roomId, gameState }) => {
  clientGamestate = gameState;
  setupArena(gameState);
  startBattle(gameState);
});

socket.on(
  "updateGameState",
  ({ gameState, message, attackType, animationTarget }) => {
    clientGamestate = gameState;

    // Play attack animation
    if (animationTarget === clientGamestate.playerCharacter.id) {
      playAttackAnimation(attackType, "playerFighter");
    } else {
      playAttackAnimation(attackType, "enemyFighter");
    }

    // Add log message for the attack
    if (animationTarget !== clientGamestate.playerCharacter.id) {
      addLogMessage(
        `${clientGamestate.playerCharacter.name} führt ${getAttackName(
          attackType
        )} aus!`,
        "player"
      );
    } else {
      addLogMessage(
        `${clientGamestate.enemyCharacter.name} führt ${getAttackName(
          attackType
        )} aus!`,
        "player"
      );
    }

    // Add log message if provided
    if (message) {
      addLogMessage(message, "system");
    }

    // Update health bars
    const { playerHealth, enemyHealth } = clientGamestate;
    updateHealthBars(playerHealth, enemyHealth);

    // Check if the game is over
    // Prüfen, ob der Gegner besiegt wurde
    setTimeout(() => {
      if (enemyHealth <= 0) {
        if (clientGamestate.player === playerName) {
          endBattle(true);
        } else {
          endBattle(false);
        }
        return;
      }

      if (playerHealth <= 0) {
        if (clientGamestate.player === playerName) {
          endBattle(false);
        } else {
          endBattle(true);
        }
        return;
      }
    }, 1000);

    // Update turn information
    if (clientGamestate.playerTurn === playerName) {
      addLogMessage("Du bist am Zug. Wähle deinen Angriff!", "system");
      enableAttackButtons(true);
    } else {
      addLogMessage("Der Gegner ist am Zug. Bitte warten...", "system");
      enableAttackButtons(false);
    }
  }
);
