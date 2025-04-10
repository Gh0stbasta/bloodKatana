const player = 2;
const enemy = 5;

fetch("http://localhost:3000/charakter", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    // das ist nur zum prüfen ob die db verbindung was ausspuckt
    console.log("Character data:", data);

    // daten vom Spieler aktualisieren
    const playerName = document.getElementById("player-name");
    const playerData = data.find((character) => character.id === player);
    playerName.textContent = playerData ? playerData.name : "Unknown Player";

    const playerImg = document.getElementById("player-img");
    playerImg.src = `./images/${player}/idle.webp`;

    const attack1PlayerButton = document.getElementById("attack-1-player");
    if (playerData && playerData.angriff1) {
      attack1PlayerButton.textContent = playerData.angriff1;
    } else {
      attack1PlayerButton.textContent = "Unknown Attack";
    }

    const attack2PlayerButton = document.getElementById("attack-2-player");
    if (playerData && playerData.angriff2) {
      attack2PlayerButton.textContent = playerData.angriff2;
    } else {
      attack2PlayerButton.textContent = "Unknown Attack";
    }

    const attack3PlayerButton = document.getElementById("attack-3-player");
    if (playerData && playerData.angriff3) {
      attack3PlayerButton.textContent = playerData.angriff3;
    } else {
      attack3PlayerButton.textContent = "Unknown Attack";
    }

    const attack4PlayerButton = document.getElementById("attack-4-player");
    if (playerData && playerData.angriff4) {
      attack4PlayerButton.textContent = playerData.angriff4;
    } else {
      attack4PlayerButton.textContent = "Unknown Attack";
    }

    // Daten vom Enemy aktualisieren
    const enemyName = document.getElementById("enemy-name");
    const enemyData = data.find((character) => character.id === enemy);
    enemyName.textContent = enemyData ? enemyData.name : "Unknown Player";

    const enemeImg = document.getElementById("enemy-img");
    enemeImg.src = `./images/${enemy}/idle.webp`;

    const attack1EnemyButton = document.getElementById("attack-1-enemy");
    if (enemyData && enemyData.angriff1) {
      attack1EnemyButton.textContent = enemyData.angriff1;
    } else {
      attack1EnemyButton.textContent = "Unknown Attack";
    }

    const attack2EnemyButton = document.getElementById("attack-2-enemy");
    if (enemyData && enemyData.angriff2) {
      attack2EnemyButton.textContent = enemyData.angriff2;
    } else {
      attack2EnemyButton.textContent = "Unknown Attack";
    }

    const attack3EnemyButton = document.getElementById("attack-3-enemy");
    if (enemyData && enemyData.angriff3) {
      attack3EnemyButton.textContent = enemyData.angriff3;
    } else {
      attack3EnemyButton.textContent = "Unknown Attack";
    }

    const attack4EnemyButton = document.getElementById("attack-4-enemy");
    if (enemyData && enemyData.angriff4) {
      attack4EnemyButton.textContent = enemyData.angriff4;
    } else {
      attack4EnemyButton.textContent = "Unknown Attack";
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
