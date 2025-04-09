const attack1PlayerButton = document.getElementById("attack-1-player");
const attack2PlayerButton = document.getElementById("attack-2-player");
const attack3PlayerButton = document.getElementById("attack-3-player");
const attack4PlayerButton = document.getElementById("attack-4-player");

const attack1EnemyButton = document.getElementById("attack-1-enemy");
const attack2EnemyButton = document.getElementById("attack-2-enemy");
const attack3EnemyButton = document.getElementById("attack-3-enemy");
const attack4EnemyButton = document.getElementById("attack-4-enemy");



const player = "Utsushi no Oni";
const enemy = "Kōgei no Shinobi";
const attackePlayer1 = "lecki";



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
    console.log("Character data:", data);
    const playerName = document.getElementById("player-name");
    playerName.textContent = player

    const enemyName = document.getElementById("enemy-name");
    enemyName.textContent = enemy

    const angriffPlayer1 = document.getElementById("attack-1-player");
    angriffPlayer1.textContent = attackePlayer1

    // hier müssen wir grade die attacke aus der Datenbank reinschreiben und nicht hardgecodet wie in Zeile 15




  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
