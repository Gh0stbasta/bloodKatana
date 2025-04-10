/**
 * arena.js
 * Enthält die Kampflogik und Steuerung für die Arena-Seite
 */

// Globale Variablen
let playerHealth = 100;
let enemyHealth = 100;
const maxHealth = 100;
let battleInProgress = false;
let playerTurn = true;
let selectedCharacter = "";
let enemyCharacter = "";
let selectedCharacterID = 0;
let enemyCharacterID = 0;

// Verfügbare Charaktere mit ihren Eigenschaften
const characters = {
  "Sōgō no Shisha": { attack: 30, defense: 120, special: "Präzisionsschlag" },
  Ayatsurishi: { attack: 70, defense: 70, special: "Schattendoppelgänger" },
  "Bedy Yamiko": { attack: 90, defense: 50, special: "Drachenklaue" },
  "Utsushi no Oni": {
    attack: 50,
    defense: 90,
    special: "Dämonische Reflexion",
  },
  "Kōgei no Shinobi": {
    attack: 80,
    defense: 60,
    special: "Tödliche Präzision",
  },
};

/**
 * Initialisiert die Arena beim Laden der Seite
 */
document.addEventListener("DOMContentLoaded", function () {
  // Lade den ausgewählten Charakter aus dem lokalen Speicher
  selectedCharacter =
    localStorage.getItem("selectedCharacter") || "Sōgō no Shisha";

    if (selectedCharacter === "Sōgō no Shisha") {
      selectedCharacterID = 1;
    } else if (selectedCharacter === "Ayatsurishi") {
      selectedCharacterID = 2;
    } else if (selectedCharacter === "Bedy Yamiko") {
      selectedCharacterID = 3;
    } else if (selectedCharacter === "Utsushi no Oni") {
      selectedCharacterID = 4;
    } else if (selectedCharacter === "Kōgei no Shinobi") {
      selectedCharacterID = 5;
    }

  // Wähle einen zufälligen Gegner
  const availableEnemies = Object.keys(characters).filter(
    (char) => char !== selectedCharacter
  );
  enemyCharacter = availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
  if (enemyCharacter === "Sōgō no Shisha") {
    enemyCharacterID = 1;
  } else if (enemyCharacter === "Ayatsurishi") {
    enemyCharacterID = 2;
  } else if (enemyCharacter === "Bedy Yamiko") {
    enemyCharacterID = 3;
  } else if (enemyCharacter === "Utsushi no Oni") {
    enemyCharacterID = 4;
  } else if (enemyCharacter === "Kōgei no Shinobi") {
    enemyCharacterID = 5;
  }

  // Initialisiere die Arena
  setupArena();

  // Event-Listener für Angriffstasten
  document.querySelectorAll(".attack-button").forEach((button) => {
    button.addEventListener("click", function () {
      const attackType = this.getAttribute("data-attack");
      if (battleInProgress && playerTurn) {
        performAttack(attackType);
      }
    });
  });

  // Zurück-Button
  const backButton = document.getElementById("backToDashboard");
  if (backButton) {
    backButton.addEventListener("click", function () {
      window.navigateTo("dashboard");
    });
  }

  // Starte den Kampf
  startBattle();
});

/**
 * Richtet die Arena mit den Kämpfern ein
 */
function setupArena() {
  // Spieler-Kämpfer einrichten
  const playerFighter = document.getElementById("playerFighter");
  if (playerFighter) {
    // Bild des ausgewählten Charakters laden
    const playerImage = playerFighter.querySelector("img");
    if (playerImage) {
      playerImage.src = `./images/${selectedCharacterID}/atk.webp`;
      playerImage.alt = selectedCharacter;
    }

    // Name und Statistiken anzeigen
    const playerName = playerFighter.querySelector(".fighter-name");
    if (playerName) {
      playerName.textContent = selectedCharacter;
    }

    const playerStats = playerFighter.querySelector(".fighter-stats");
    if (playerStats && characters[selectedCharacter]) {
      playerStats.textContent = `Angriff: ${characters[selectedCharacter].attack} | Verteidigung: ${characters[selectedCharacter].defense}`;
    }
  }

  // Gegner-Kämpfer einrichten
  const enemyFighter = document.getElementById("enemyFighter");
  if (enemyFighter) {
    // Bild des Gegners laden
    const enemyImage = enemyFighter.querySelector("img");
    if (enemyImage) {
      enemyImage.src = `./images/${enemyCharacterID}/atk.webp`;
      enemyImage.alt = enemyCharacter;
    }

    // Name und Statistiken anzeigen
    const enemyName = enemyFighter.querySelector(".fighter-name");
    if (enemyName) {
      enemyName.textContent = enemyCharacter;
    }

    const enemyStats = enemyFighter.querySelector(".fighter-stats");
    if (enemyStats && characters[enemyCharacter]) {
      enemyStats.textContent = `Angriff: ${characters[enemyCharacter].attack} | Verteidigung: ${characters[enemyCharacter].defense}`;
    }
  }

  // Gesundheitsbalken initialisieren
  updateHealthBars();
}

/**
 * Aktualisiert die Gesundheitsbalken beider Kämpfer
 */
function updateHealthBars() {
  // Spieler-Gesundheitsbalken
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

/**
 * Startet einen neuen Kampf
 */
function startBattle() {
  // Kampfvariablen zurücksetzen
  playerHealth = 100;
  enemyHealth = 100;
  battleInProgress = true;
  playerTurn = true;

  // Gesundheitsbalken aktualisieren
  updateHealthBars();

  // Kampflog leeren
  const logMessages = document.getElementById("logMessages");
  if (logMessages) {
    logMessages.innerHTML = "";
  }

  // Kampfbeginn-Nachricht
  addLogMessage(
    `Der Kampf zwischen ${selectedCharacter} und ${enemyCharacter} beginnt!`,
    "system"
  );
  addLogMessage("Du bist am Zug. Wähle deinen Angriff!", "system");

  // Aktiviere die Angriffstasten
  enableAttackButtons(true);
}

/**
 * Führt einen Angriff aus
 * @param {string} attackType - Art des Angriffs ('katana', 'schatten', 'konter', 'tod')
 */
function performAttack(attackType) {
  if (!battleInProgress || !playerTurn) return;

  // Deaktiviere die Angriffstasten während der Animation
  enableAttackButtons(false);

  // Spieler-Angriff
  let damage = calculateDamage(attackType, true);

  // Angriffs-Animation abspielen
  playAttackAnimation(attackType, "enemyFighter");

  // Verzögerung für die Animation
  setTimeout(function () {
    // Schaden anwenden
    enemyHealth = Math.max(0, enemyHealth - damage);

    // Kampflog-Nachricht
    addLogMessage(
      `Du führst ${getAttackName(
        attackType
      )} aus und verursachst ${damage} Schaden!`,
      "player"
    );

    // Gesundheitsbalken aktualisieren
    updateHealthBars();

    // Prüfen, ob der Gegner besiegt wurde
    if (enemyHealth <= 0) {
      endBattle(true);
      return;
    }

    // Gegner ist am Zug
    playerTurn = false;
    addLogMessage(`${enemyCharacter} ist am Zug...`, "system");

    // Gegner-Angriff nach kurzer Verzögerung
    setTimeout(function () {
      enemyAttack();
    }, 1500);
  }, 1000);
}

/**
 * Führt den Angriff des Gegners aus
 */
function enemyAttack() {
  if (!battleInProgress) return;

  // Zufälligen Angriffstyp wählen
  const attackTypes = ["katana", "schatten", "konter", "tod"];
  const attackType =
    attackTypes[Math.floor(Math.random() * attackTypes.length)];

  // Schaden berechnen
  let damage = calculateDamage(attackType, false);

  // Angriffs-Animation abspielen
  playAttackAnimation(attackType, "playerFighter");

  // Verzögerung für die Animation
  setTimeout(function () {
    // Schaden anwenden
    playerHealth = Math.max(0, playerHealth - damage);

    // Kampflog-Nachricht
    addLogMessage(
      `${enemyCharacter} führt ${getAttackName(
        attackType
      )} aus und verursacht ${damage} Schaden!`,
      "enemy"
    );

    // Gesundheitsbalken aktualisieren
    updateHealthBars();

    // Prüfen, ob der Spieler besiegt wurde
    if (playerHealth <= 0) {
      endBattle(false);
      return;
    }

    // Spieler ist wieder am Zug
    playerTurn = true;
    addLogMessage("Du bist am Zug. Wähle deinen Angriff!", "system");

    // Angriffstasten wieder aktivieren
    enableAttackButtons(true);
  }, 1000);
}

/**
 * Berechnet den Schaden eines Angriffs
 * @param {string} attackType - Art des Angriffs ('katana', 'schatten', 'konter', 'tod')
 * @param {boolean} isPlayer - true, wenn der Spieler angreift, false für Gegner
 * @returns {number} - Berechneter Schaden
 */
function calculateDamage(attackType, isPlayer) {
  const attacker = isPlayer ? selectedCharacter : enemyCharacter;
  const defender = isPlayer ? enemyCharacter : selectedCharacter;

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
        addLogMessage("Kritischer Treffer!", "system");
      }
      break;
    case "konter":
      // Reduzierter Schaden, aber erhöht die Verteidigung für den nächsten Angriff
      damage *= 0.7;
      break;
    case "tod":
      // Hoher Schaden, aber nur 50% Trefferchance
      if (Math.random() < 0.5) {
        damage *= 2;
        addLogMessage("Tödlicher Treffer!", "system");
      } else {
        damage = 0;
        addLogMessage("Der Angriff verfehlt sein Ziel!", "system");
      }
      break;
  }

  // Verteidigung berücksichtigen
  damage = Math.max(1, damage - defenseValue * 0.5);

  // Zufälligkeit hinzufügen
  damage = Math.floor(damage * (Math.random() * 0.2 + 0.9)); // 90-110% Zufälligkeit

  return damage;
}

/**
 * Gibt den Namen eines Angriffs zurück
 * @param {string} attackType - Art des Angriffs ('katana', 'schatten', 'konter', 'tod')
 * @returns {string} - Name des Angriffs
 */
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

/**
 * Aktiviert oder deaktiviert die Angriffstasten
 * @param {boolean} enable - true zum Aktivieren, false zum Deaktivieren
 */
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

/**
 * Fügt eine Nachricht zum Kampflog hinzu
 * @param {string} message - Nachrichtentext
 * @param {string} type - Nachrichtentyp ('player', 'enemy', 'system')
 */
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

/**
 * Beendet den Kampf
 * @param {boolean} playerWon - true, wenn der Spieler gewonnen hat, false wenn er verloren hat
 */
function endBattle(playerWon) {
  battleInProgress = false;

  // Kampfende-Nachricht
  if (playerWon) {
    addLogMessage(`Du hast ${enemyCharacter} besiegt!`, "system");
  } else {
    addLogMessage(`Du wurdest von ${enemyCharacter} besiegt!`, "system");
  }

  // Deaktiviere die Angriffstasten
  enableAttackButtons(false);

  // Lokalen Speicher leeren
  localStorage.clear();
  addLogMessage("Der lokale Speicher wurde geleert.", "system");

  // Zeige die Sieges- oder Niederlagen-Animation
  setTimeout(function () {
    showBattleResult(playerWon);
  }, 2000);
}

/**
 * Spielt eine Angriffsanimation ab
 * @param {string} attackType - Art des Angriffs ('katana', 'schatten', 'konter', 'tod')
 * @param {string} targetId - ID des Ziel-Elements
 */
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

/**
 * Zeigt die Sieges- oder Niederlagen-Animation
 * @param {boolean} isVictory - true für Sieg, false für Niederlage
 */
// function showBattleResult(isVictory) {
//     // Erstelle das Ergebnis-Display
//     const resultDisplay = document.createElement('div');
//     resultDisplay.className = `result-display ${is<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>
