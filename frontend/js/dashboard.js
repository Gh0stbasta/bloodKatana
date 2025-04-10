/**
 * dashboard.js
 * Enthält die Funktionalität für das Dashboard und die Charakterauswahl
 */

// Globale Variablen
let selectedCharacter = '';

/**
 * Initialisiert das Dashboard beim Laden der Seite
 */
document.addEventListener('DOMContentLoaded', function() {
    // Lade den ausgewählten Charakter aus dem lokalen Speicher, falls vorhanden
    const savedCharacter = localStorage.getItem('selectedCharacter');
    if (savedCharacter) {
        selectCharacter(savedCharacter);
    }
    
    // Event-Listener für Charakterkarten
    setupCharacterSelection();
    
    // Event-Listener für Kampf-Buttons
    setupFightButtons();
    
    // Spielersuche
    setupPlayerSearch();
    
    // Dashboard anzeigen (nach der Swipe-Animation)
    showDashboard();
});

/**
 * Zeigt das Dashboard an
 */
function showDashboard() {
    const dashboardContainer = document.querySelector('.dashboard-container');
    if (dashboardContainer) {
        dashboardContainer.classList.add('visible');
    }
}

/**
 * Richtet die Charakterauswahl ein
 */
function setupCharacterSelection() {
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        card.addEventListener('click', function() {
            // Ausgewählten Charakter speichern
            const characterName = this.getAttribute('data-character');
            selectCharacter(characterName);
        });
    });
}

/**
 * Wählt einen Charakter aus
 * @param {string} characterName - Name des ausgewählten Charakters
 */
function selectCharacter(characterName) {
    // Speichere den ausgewählten Charakter
    selectedCharacter = characterName;
    localStorage.setItem('selectedCharacter', characterName);
    
    // Visuelles Feedback für die Auswahl
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach(card => {
        if (card.getAttribute('data-character') === characterName) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
    
    // Aktualisiere die Spielerübersicht
    updatePlayerProfile(characterName);
}

/**
 * Aktualisiert die Spielerübersicht basierend auf dem ausgewählten Charakter
 * @param {string} characterName - Name des ausgewählten Charakters
 */
function updatePlayerProfile(characterName) {
    const playerProfile = document.querySelector('.player-profile');
    if (!playerProfile) return;
    
    // Aktualisiere den bevorzugten Samurai
    const profileText = playerProfile.querySelector('p');
    if (profileText) {
        profileText.textContent = `Siegquote: 80% | Bevorzugter Samurai: ${characterName}`;
    }
    
    // Hervorheben des ausgewählten Charakters in der Charakternutzung
    const characterUsage = playerProfile.querySelectorAll('.stat-row');
    characterUsage.forEach(row => {
        const label = row.querySelector('.stat-label');
        if (label && label.textContent.includes(characterName)) {
            row.classList.add('highlighted');
        } else {
            row.classList.remove('highlighted');
        }
    });
}

/**
 * Richtet die Kampf-Buttons ein
 */
function setupFightButtons() {
    const fightButtons = document.querySelectorAll('.fight-button');
    
    fightButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Prüfe, ob ein Charakter ausgewählt wurde
            // if (!selectedCharacter) {
            //     alert('Bitte wähle zuerst einen Charakter aus!');
            //     return;
            // }
            
            // Navigiere zur Arena
            window.navigateTo('arena');
        });
    });
}

/**
 * Richtet die Spielersuche ein
 */
function setupPlayerSearch() {
    const searchBar = document.querySelector('.search-bar');
    if (!searchBar) return;
    
    searchBar.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        // Hier würde normalerweise eine API-Anfrage erfolgen
        // Für dieses Beispiel simulieren wir die Suche
        
        // Wenn der Suchbegriff leer ist, zeige das Standard-Profil
        if (searchTerm === '') {
            updateSearchResults('Player1');
            return;
        }
        
        // Simuliere eine Verzögerung für die Suche
        setTimeout(function() {
            // Prüfe, ob der Suchbegriff einem der vordefinierten Spieler entspricht
            const players = ['Player1', 'Player2', 'Player3', 'Player4', 'Player5'];
            const matchedPlayers = players.filter(player => player.toLowerCase().includes(searchTerm));
            
            if (matchedPlayers.length > 0) {
                updateSearchResults(matchedPlayers[0]);
            } else {
                // Kein Spieler gefunden
                const playerProfile = document.querySelector('.player-profile');
                if (playerProfile) {
                    playerProfile.innerHTML = '<p>Kein Spieler gefunden.</p>';
                }
            }
        }, 300);
    });
}

/**
 * Aktualisiert die Suchergebnisse
 * @param {string} playerName - Name des gefundenen Spielers
 */
function updateSearchResults(playerName) {
    const playerProfile = document.querySelector('.player-profile');
    if (!playerProfile) return;
    
    // Hier würden normalerweise die Daten des gefundenen Spielers angezeigt
    // Für dieses Beispiel zeigen wir vordefinierte Daten
    
    let profileHTML = '';
    
    switch (playerName) {
        case 'Player1':
            profileHTML = `
                <h3>Spielerprofil: Player1</h3>
                <p>Siegquote: 80% | Bevorzugter Samurai: Sōgō no Shisha</p>
                
                <div class="player-stats">
                    <div class="stat-group">
                        <h4>Kampfstatistiken</h4>
                        <div class="stat-row">
                            <span class="stat-label">Gewonnene Kämpfe:</span>
                            <span class="stat-value">50</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Verlorene Kämpfe:</span>
                            <span class="stat-value">10</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Siegquote:</span>
                            <span class="stat-value">83.3%</span>
                        </div>
                    </div>
                    
                    <div class="stat-group">
                        <h4>Charakternutzung</h4>
                        <div class="stat-row">
                            <span class="stat-label">Sōgō no Shisha:</span>
                            <span class="stat-value">60%</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Ayatsurishi:</span>
                            <span class="stat-value">20%</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Bedy Yamiko:</span>
                            <span class="stat-value">10%</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Utsushi no Oni:</span>
                            <span class="stat-value">5%</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Kōgei no Shinobi:</span>
                            <span class="stat-value">5%</span>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'Player2':
            profileHTML = `
                <h3>Spielerprofil: Player2</h3>
                <p>Siegquote: 75% | Bevorzugter Samurai: Ayatsurishi</p>
                
                <div class="player-stats">
                    <div class="stat-group">
                        <h4>Kampfstatistiken</h4>
                        <div class="stat-row">
                            <span class="stat-label">Gewonnene Kämpfe:</span>
                            <span class="stat-value">45</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Verlorene Kämpfe:</span>
                            <span class="stat-value">15</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Siegquote:</span>
                            <span class="stat-value">75%</span>
                        </div>
                    </div>
                    
                    <div class="stat-group">
                        <h4>Charakternutzung</h4>
                        <div class="stat-row">
                            <span class="stat-label">Sōgō no Shisha:</span>
                            <span class="stat-value">10%</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Ayatsurishi:</span>
                            <span class="stat-value">70%</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Bedy Yamiko:</span>
                            <span class="stat-value">5%</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Utsushi no Oni:</span>
                            <span class="stat-value">10%</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Kōgei no Shinobi:</span>
                            <span class="stat-value">5%</span>
                        </div>
                    </div>
                </div>
            `;
            break;
        default:
            profileHTML = `
                <h3>Spielerprofil: ${playerName}</h3>
                <p>Keine detaillierten Daten verfügbar.</p>
            `;
    }
    
    playerProfile.innerHTML = profileHTML;
    
    // Wenn ein Charakter ausgewählt ist, hebe ihn in der Charakternutzung hervor
    if (selectedCharacter) {
        const characterUsage = playerProfile.querySelectorAll('.stat-row');
        characterUsage.forEach(row => {
            const label = row.querySelector('.stat-label');
            if (label && label.textContent.includes(selectedCharacter)) {
                row.classList.add('highlighted');
            }
        });
    }
}
