// function enemyAttack() {
//   if (!battleInProgress) return;

//   // Zufälligen Angriffstyp wählen
//   const attackTypes = ["katana", "schatten", "konter", "tod"];
//   const attackType =
//     attackTypes[Math.floor(Math.random() * attackTypes.length)];

//   // Schaden berechnen
//   let damage = calculateDamage(attackType, false);

//   // Angriffs-Animation abspielen
//   playAttackAnimation(attackType, "playerFighter");

//   // Verzögerung für die Animation
//   setTimeout(function () {
//     // Schaden anwenden
//     playerHealth = Math.max(0, playerHealth - damage);

//     // Kampflog-Nachricht
//     addLogMessage(
//       `${enemyCharacter} führt ${getAttackName(
//         attackType
//       )} aus und verursacht ${damage} Schaden!`,
//       "enemy"
//     );

//     // Gesundheitsbalken aktualisieren
//     updateHealthBars();

//     // Prüfen, ob der Spieler besiegt wurde
//     if (playerHealth <= 0) {
//       endBattle(false);
//       return;
//     }

//     // Spieler ist wieder am Zug
//     playerTurn = true;
//     addLogMessage("Du bist am Zug. Wähle deinen Angriff!", "system");

//     // Angriffstasten wieder aktivieren
//     enableAttackButtons(true);
//   }, 1000);
// }

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

  // Zeige die Sieges- oder Niederlagen-Animation
  setTimeout(function () {
    showBattleResult(playerWon);
  }, 2000);
}








//  --------------------------------------------------------
//  --------------------------------------------------------
//  --------------------------------------------------------
//  --------------------------------------------------------
//  --------------------------------------------------------
//  --------------------------------------------------------
//  --------------------------------------------------------

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