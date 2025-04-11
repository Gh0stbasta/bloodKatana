/**
 * transitions.js
 * Enthält Funktionen für die 3D-Übergänge zwischen den Seiten
 * und die Animation der Kämpfer-Zustände
 */

// Globale Variablen
let currentPage = "login"; // Aktuelle Seite (login, dashboard, arena)
let transitionInProgress = false; // Verhindert mehrfache Übergänge gleichzeitig

/**
 * Initialisiert die Seitenübergänge
 */
document.addEventListener("DOMContentLoaded", function () {
  // Event-Listener für Navigationsbuttons
  setupNavigationListeners();
});

/**
 * Richtet Event-Listener für Navigationsbuttons ein
 */
function setupNavigationListeners() {
  // Zurück-zum-Dashboard-Button in der Arena
  const backToDashboardButton = document.getElementById("backToDashboard");
  if (backToDashboardButton) {
    backToDashboardButton.addEventListener("click", function () {
      navigateTo("dashboard");
    });
  }

  // Kampf-Buttons im Dashboard
  const fightButtons = document.querySelectorAll(".fight-button");
  fightButtons.forEach((button) => {
    button.addEventListener("click", function () {
      navigateTo("arena");
    });
  });

  // Charakterauswahl im Dashboard
  const characterCards = document.querySelectorAll(".character-card");
  characterCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Ausgewählten Charakter speichern
      const characterName = this.querySelector("h3").textContent;
      localStorage.setItem("selectedCharacter", characterName);

      // Visuelles Feedback für die Auswahl
      characterCards.forEach((c) => c.classList.remove("selected"));
      this.classList.add("selected");
    });
  });
}

/**
 * Navigiert zu einer anderen Seite mit 3D-Übergangseffekt
 * @param {string} targetPage - Zielseite ('login', 'dashboard', 'arena')
 */
function navigateTo(targetPage) {
  // Verhindere mehrfache Übergänge
  if (transitionInProgress) return;
  transitionInProgress = true;

  // Aktuelle Seite ausblenden
  const currentContent = document.querySelector(`.${currentPage}-container`);
  if (currentContent) {
    currentContent.style.animation = "fadeOut 0.5s ease-out forwards";
  }

  // Übergangsanimation erstellen
  const transition = document.createElement("div");
  transition.className = "page-transition";

  const transitionContent = document.createElement("div");
  transitionContent.className = "transition-content";

  // Übergangstyp basierend auf Start- und Zielseite
  let transitionClass = "";
  transitionClass = "dashboard-to-arena";

  transitionContent.classList.add(transitionClass);
  transition.appendChild(transitionContent);
  document.body.appendChild(transition);

  // Nach der Übergangsanimation zur Zielseite navigieren
  setTimeout(function () {
    // Tatsächliche Navigation durchführen
    window.location.href = `${targetPage}.html`;

    // Aktualisiere die aktuelle Seite
    currentPage = targetPage;
    transitionInProgress = false;
  }, 800); // Dauer der Übergangsanimation
}

/**
 * Aktualisiert den Gesundheitszustand eines Kämpfers basierend auf den Lebenspunkten
 * @param {string} fighterId - ID des Kämpfer-Elements
 * @param {number} healthPoints - Aktuelle Lebenspunkte
 * @param {number} maxHealth - Maximale Lebenspunkte
 */
function updateFighterHealth(fighterId, healthPoints, maxHealth) {
  const fighter = document.getElementById(fighterId);
  if (!fighter) return;

  // Gesundheitsbalken aktualisieren
  const healthBar = fighter.querySelector(".health");
  if (healthBar) {
    const healthPercentage = (healthPoints / maxHealth) * 100;
    healthBar.style.width = `${healthPercentage}%`;

    // Farbe basierend auf Gesundheitszustand
    healthBar.classList.remove("high", "medium", "low");
    if (healthPercentage > 70) {
      healthBar.classList.add("high");
    } else if (healthPercentage > 40) {
      healthBar.classList.add("medium");
    } else {
      healthBar.classList.add("low");
    }
  }
}
/**
 * Zeigt die Sieges- oder Niederlagen-Animation
 * @param {boolean} isVictory - true für Sieg, false für Niederlage
 */
function showBattleResult(isVictory) {
  // Erstelle das Ergebnis-Display
  const resultDisplay = document.createElement("div");
  resultDisplay.className = `result-display ${
    isVictory ? "victory" : "defeat"
  }`;

  // Ergebnis-Titel
  const resultTitle = document.createElement("h1");
  resultTitle.className = "result-title";
  resultTitle.textContent = isVictory ? "SIEG!" : "NIEDERLAGE!";
  resultDisplay.appendChild(resultTitle);

  if (isVictory) {
    // Sieger-Text
    const victorText = document.createElement("p");
    victorText.textContent = "Du hast den Kampf gewonnen!";
    victorText.className = "victory-text";
    resultDisplay.appendChild(victorText);
  } else {
    // Sanitäter für Niederlage
    const medic = document.createElement("div");
    medic.className = "medic medic-enter";

    resultDisplay.appendChild(medic);

    // Niederlagen-Text
    const defeatText = document.createElement("p");
    defeatText.textContent = "Du wurdest besiegt!";
    defeatText.className = "defeat-text";
    resultDisplay.appendChild(defeatText);
  }

  // Zurück-Button
  const backButton = document.createElement("button");
  backButton.className = "btn btn-primary";
  backButton.textContent = "Zurück zum Dashboard";
  backButton.addEventListener("click", function () {
    navigateTo("dashboard");
  });
  resultDisplay.appendChild(backButton);

  // Zum DOM hinzufügen
  const arenaContainer = document.querySelector(".arena-container");
  if (arenaContainer) {
    arenaContainer.appendChild(resultDisplay);

    // Animation starten
    setTimeout(function () {
      resultDisplay.classList.add("visible");
    }, 100);
  }
}

/**
 * Spielt eine Kampfanimation ab
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

// Exportiere Funktionen für die Verwendung in anderen Skripten
window.navigateTo = navigateTo;
window.updateFighterHealth = updateFighterHealth;
window.showBattleResult = showBattleResult;
window.playAttackAnimation = playAttackAnimation;
