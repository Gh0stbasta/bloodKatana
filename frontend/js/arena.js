const attack1PlayerButton = document.getElementById("attack-1-player");
const attack2PlayerButton = document.getElementById("attack-2-player");
const attack3PlayerButton = document.getElementById("attack-3-player");
const attack4PlayerButton = document.getElementById("attack-4-player");

const attack1EnemyButton = document.getElementById("attack-1-enemy");
const attack2EnemyButton = document.getElementById("attack-2-enemy");
const attack3EnemyButton = document.getElementById("attack-3-enemy");
const attack4EnemyButton = document.getElementById("attack-4-enemy");

const player = "Utsushi no Oni";
const enemey = "Kōgei no Shinobi";

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
    // You can process the data here
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
