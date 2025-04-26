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



    // Gegner ist am Zug
    playerTurn = false;
    addLogMessage(`${enemyCharacter} ist am Zug...`, "system");

    // Gegner-Angriff nach kurzer Verzögerung
    setTimeout(function () {
      enemyAttack();
    }, 1500);
  }, 1000);