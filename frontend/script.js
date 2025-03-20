const player = { hp: 100 };
const enemy = { hp: 100 };

function attack(type) {
    let playerDamage = 0;
    let enemyDamage = 0;
    let logMessage = '';

    // Spieler-Angriff
    switch (type) {
        case 'katana':
            playerDamage = Math.floor(Math.random() * 15) + 10; // 10-25 Schaden
            logMessage = `Spieler verwendet Katana-Schnitt! -${playerDamage} HP`;
            break;
        case 'schatten':
            if (Math.random() < 0.3) { // 30% Chance auf kritischen Treffer
                playerDamage = Math.floor(Math.random() * 20) + 20; // 20-40 Schaden
                logMessage = `Spieler verwendet Schattenschlag (kritisch)! -${playerDamage} HP`;
            } else {
                playerDamage = Math.floor(Math.random() * 10) + 5; // 5-15 Schaden
                logMessage = `Spieler verwendet Schattenschlag! -${playerDamage} HP`;
            }
            break;
        case 'konter':
            playerDamage = Math.floor(Math.random() * 5) + 5; // 5-10 Schaden
            player.hp += 10; // Heilung
            if (player.hp > 100) player.hp = 100;
            logMessage = `Spieler verwendet Konterhaltung! -${playerDamage} HP, +10 HP`;
            break;
        case 'tod':
            if (Math.random() < 0.2) { // 20% Chance auf Fehlschlag
                logMessage = `Spieler verwendet Todesstoß, aber es fehlschlägt!`;
            } else {
                playerDamage = Math.floor(Math.random() * 30) + 20; // 20-50 Schaden
                logMessage = `Spieler verwendet Todesstoß! -${playerDamage} HP`;
            }
            break;
    }

    // Schaden auf Gegner anwenden
    enemy.hp -= playerDamage;
    if (enemy.hp < 0) enemy.hp = 0;

    // Log-Nachricht hinzufügen
    addLogMessage(logMessage);

    // Überprüfen, ob der Gegner besiegt wurde
    if (enemy.hp <= 0) {
        addLogMessage("Gegner besiegt! Sieg!");
        resetGame();
        return;
    }

    // Gegner-Angriff
    const enemyAttackTypes = ['katana', 'schatten', 'konter', 'tod'];
    const enemyAttack = enemyAttackTypes[Math.floor(Math.random() * enemyAttackTypes.length)];
    switch (enemyAttack) {
        case 'katana':
            enemyDamage = Math.floor(Math.random() * 15) + 10;
            logMessage = `Gegner verwendet Katana-Schnitt! -${enemyDamage} HP`;
            break;
        case 'schatten':
            if (Math.random() < 0.3) {
                enemyDamage = Math.floor(Math.random() * 20) + 20;
                logMessage = `Gegner verwendet Schattenschlag (kritisch)! -${enemyDamage} HP`;
            } else {
                enemyDamage = Math.floor(Math.random() * 10) + 5;
                logMessage = `Gegner verwendet Schattenschlag! -${enemyDamage} HP`;
            }
            break;
        case 'konter':
            enemyDamage = Math.floor(Math.random() * 5) + 5;
            enemy.hp += 10;
            if (enemy.hp > 100) enemy.hp = 100;
            logMessage = `Gegner verwendet Konterhaltung! -${enemyDamage} HP, +10 HP`;
            break;
        case 'tod':
            if (Math.random() < 0.2) {
                logMessage = `Gegner verwendet Todesstoß, aber es fehlschlägt!`;
            } else {
                enemyDamage = Math.floor(Math.random() * 30) + 20;
                logMessage = `Gegner verwendet Todesstoß! -${enemyDamage} HP`;
            }
            break;
    }

    // Schaden auf Spieler anwenden
    player.hp -= enemyDamage;
    if (player.hp < 0) player.hp = 0;

    // Log-Nachricht hinzufügen
    addLogMessage(logMessage);

    // Überprüfen, ob der Spieler besiegt wurde
    if (player.hp <= 0) {
        addLogMessage("Spieler besiegt! Niederlage!");
        resetGame();
        return;
    }

    // HP-Balken aktualisieren
    updateHP();
}

function addLogMessage(message) {
    const log = document.getElementById('logMessages');
    const logEntry = document.createElement('p');
    logEntry.textContent = message;
    log.appendChild(logEntry);
    log.scrollTop = log.scrollHeight; // Automatisch nach unten scrollen
}

function updateHP() {
    document.getElementById('playerHP').style.width = player.hp + '%';
    document.getElementById('enemyHP').style.width = enemy.hp + '%';
}

function resetGame() {
    player.hp = 100;
    enemy.hp = 100;
    updateHP();
    setTimeout(() => {
        document.getElementById('logMessages').innerHTML = ''; // Log leeren
    }, 3000);
}