/**
 * transitions.js
 * Enthält Funktionen für die 3D-Übergänge zwischen den Seiten
 * und die Animation der Kämpfer-Zustände
 */

// Globale Variablen
let currentPage = 'login'; // Aktuelle Seite (login, dashboard, arena)
let transitionInProgress = false; // Verhindert mehrfache Übergänge gleichzeitig

/**
 * Initialisiert die Seitenübergänge
 */
document.addEventListener('DOMContentLoaded', function() {
    // Event-Listener für Navigationsbuttons
    setupNavigationListeners();
    
    // Swipe-Animation beim ersten Laden
    showInitialAnimation();
});

/**
 * Zeigt die initiale Swipe-Animation beim Laden der Seite
 */
function showInitialAnimation() {
    const swipeAnimation = document.getElementById('swipeAnimation');
    const swipeVideo = document.getElementById('swipeVideo');
    
    if (swipeAnimation && swipeVideo) {
        swipeAnimation.style.display = 'flex';
        
        // Event-Listener für das Ende des Videos
        swipeVideo.addEventListener('ended', function() {
            // Animation ausblenden
            swipeAnimation.style.opacity = '0';
            
            // Nach dem Ausblenden entfernen
            setTimeout(function() {
                swipeAnimation.style.display = 'none';
                
                // Hauptinhalt einblenden
                const mainContent = document.querySelector('.main-content') || 
                                   document.querySelector('.dashboard-container') ||
                                   document.querySelector('.login-container') ||
                                   document.querySelector('.arena-container');
                
                if (mainContent) {
                    mainContent.classList.add('visible');
                    mainContent.style.animation = 'fadeIn 0.8s ease-out forwards';
                }
            }, 500);
        });
        
        // Video abspielen
        swipeVideo.play().catch(error => {
            console.error('Video konnte nicht abgespielt werden:', error);
            // Fallback, wenn Video nicht abgespielt werden kann
            swipeAnimation.style.display = 'none';
            const mainContent = document.querySelector('.main-content') || 
                               document.querySelector('.dashboard-container') ||
                               document.querySelector('.login-container') ||
                               document.querySelector('.arena-container');
            
            if (mainContent) {
                mainContent.classList.add('visible');
                mainContent.style.animation = 'fadeIn 0.8s ease-out forwards';
            }
        });
    } else {
        // Fallback, wenn Animation-Elemente nicht gefunden werden
        const mainContent = document.querySelector('.main-content') || 
                           document.querySelector('.dashboard-container') ||
                           document.querySelector('.login-container') ||
                           document.querySelector('.arena-container');
        
        if (mainContent) {
            mainContent.classList.add('visible');
            mainContent.style.animation = 'fadeIn 0.8s ease-out forwards';
        }
    }
}

/**
 * Richtet Event-Listener für Navigationsbuttons ein
 */
function setupNavigationListeners() {
    // Login-Button
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            navigateTo('dashboard');
        });
    }
    
    // Zurück-zum-Dashboard-Button in der Arena
    const backToDashboardButton = document.getElementById('backToDashboard');
    if (backToDashboardButton) {
        backToDashboardButton.addEventListener('click', function() {
            navigateTo('dashboard');
        });
    }
    
    // Kampf-Buttons im Dashboard
    const fightButtons = document.querySelectorAll('.fight-button');
    fightButtons.forEach(button => {
        button.addEventListener('click', function() {
            navigateTo('arena');
        });
    });
    
    // Charakterauswahl im Dashboard
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach(card => {
        card.addEventListener('click', function() {
            // Ausgewählten Charakter speichern
            const characterName = this.querySelector('h3').textContent;
            localStorage.setItem('selectedCharacter', characterName);
            
            // Visuelles Feedback für die Auswahl
            characterCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
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
        currentContent.style.animation = 'fadeOut 0.5s ease-out forwards';
    }
    
    // Übergangsanimation erstellen
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    
    const transitionContent = document.createElement('div');
    transitionContent.className = 'transition-content';
    
    // Übergangstyp basierend auf Start- und Zielseite
    let transitionClass = '';
    if (currentPage === 'login' && targetPage === 'dashboard') {
        transitionClass = 'login-to-dashboard';
    } else if (currentPage === 'dashboard' && targetPage === 'arena') {
        transitionClass = 'dashboard-to-arena';
    } else if (currentPage === 'arena' && targetPage === 'dashboard') {
        transitionClass = 'arena-to-dashboard';
    } else {
        transitionClass = 'fade-transition';
    }
    
    transitionContent.classList.add(transitionClass);
    transition.appendChild(transitionContent);
    document.body.appendChild(transition);
    
    // Nach der Übergangsanimation zur Zielseite navigieren
    setTimeout(function() {
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
    const healthBar = fighter.querySelector('.health');
    if (healthBar) {
        const healthPercentage = (healthPoints / maxHealth) * 100;
        healthBar.style.width = `${healthPercentage}%`;
        
        // Farbe basierend auf Gesundheitszustand
        healthBar.classList.remove('high', 'medium', 'low');
        if (healthPercentage > 70) {
            healthBar.classList.add('high');
        } else if (healthPercentage > 40) {
            healthBar.classList.add('medium');
        } else {
            healthBar.classList.add('low');
        }
    }
    
    // Kämpfer-Bild basierend auf Gesundheitszustand ändern
    const fighterImage = fighter.querySelector('img');
    if (fighterImage) {
        const characterName = localStorage.getItem('selectedCharacter') || 'DefaultFighter';
        const imagePath = 'images/';
        
        // Pfad zum Bild basierend auf Gesundheitszustand
        let imageState = '';
        if (healthPoints > 40) {
            imageState = 'zustandgesund/';
            fighter.classList.remove('health-injured', 'health-critical');
            fighter.classList.add('health-normal');
        } else if (healthPoints > 0) {
            imageState = 'zustandverletzt/';
            fighter.classList.remove('health-normal', 'health-critical');
            fighter.classList.add('health-injured');
        } else {
            imageState = 'zustandverletzt/'; // Oder ein spezielles Bild für besiegte Kämpfer
            fighter.classList.remove('health-normal', 'health-injured');
            fighter.classList.add('health-critical');
        }
        
        // Versuche, das entsprechende Bild zu laden
        const newImageSrc = `${imagePath}${imageState}${characterName.replace(/\s+/g, '_')}.jpg`;
        
        // Prüfe, ob das Bild existiert, bevor es gesetzt wird
        const img = new Image();
        img.onload = function() {
            fighterImage.src = newImageSrc;
        };
        img.onerror = function() {
            // Fallback-Bild, wenn das spezifische Bild nicht gefunden wird
            console.warn(`Bild nicht gefunden: ${newImageSrc}`);
        };
        img.src = newImageSrc;
    }
}

/**
 * Zeigt die Sieges- oder Niederlagen-Animation
 * @param {boolean} isVictory - true für Sieg, false für Niederlage
 */
function showBattleResult(isVictory) {
    // Erstelle das Ergebnis-Display
    const resultDisplay = document.createElement('div');
    resultDisplay.className = `result-display ${isVictory ? 'victory' : 'defeat'}`;
    
    // Ergebnis-Titel
    const resultTitle = document.createElement('h1');
    resultTitle.className = 'result-title';
    resultTitle.textContent = isVictory ? 'SIEG!' : 'NIEDERLAGE!';
    resultDisplay.appendChild(resultTitle);
    
    if (isVictory) {
        // Trophäe für Sieg
        const trophy = document.createElement('img');
        trophy.src = 'images/trophy.png';
        trophy.alt = 'Siegestrophäe';
        trophy.className = 'trophy trophy-raise';
        resultDisplay.appendChild(trophy);
        
        // Sieger-Text
        const victorText = document.createElement('p');
        victorText.textContent = 'Du hast den Kampf gewonnen!';
        victorText.className = 'victory-text';
        resultDisplay.appendChild(victorText);
    } else {
        // Sanitäter für Niederlage
        const medic = document.createElement('div');
        medic.className = 'medic medic-enter';
        
        const medicImg = document.createElement('img');
        medicImg.src = 'images/medic.png';
        medicImg.alt = 'Sanitäter';
        medic.appendChild(medicImg);
        
        resultDisplay.appendChild(medic);
        
        // Niederlagen-Text
        const defeatText = document.createElement('p');
        defeatText.textContent = 'Du wurdest besiegt!';
        defeatText.className = 'defeat-text';
        resultDisplay.appendChild(defeatText);
    }
    
    // Zurück-Button
    const backButton = document.createElement('button');
    backButton.className = 'btn btn-primary';
    backButton.textContent = 'Zurück zum Dashboard';
    backButton.addEventListener('click', function() {
        navigateTo('dashboard');
    });
    resultDisplay.appendChild(backButton);
    
    // Zum DOM hinzufügen
    const arenaContainer = document.querySelector('.arena-container');
    if (arenaContainer) {
        arenaContainer.appendChild(resultDisplay);
        
        // Animation starten
        setTimeout(function() {
            resultDisplay.classList.add('visible');
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
    const animation = document.createElement('div');
    animation.className = 'attack-animation';
    
    // Animation basierend auf Angriffstyp
    switch (attackType) {
        case 'katana':
            animation.classList.add('katana-slash');
            break;
        case 'schatten':
            animation.classList.add('shadow-attack');
            break;
        case 'konter':
            animation.classList.add('counter-stance');
            break;
        case 'tod':
            animation.classList.add('death-blow');
            break;
        default:
            animation.classList.add('katana-slash');
    }
    
    // Animation zum Ziel hinzufügen
    target.appendChild(animation);
    
    // Animation nach Abschluss entfernen
    setTimeout(function() {
        animation.remove();
    }, 1000);
}

// Exportiere Funktionen für die Verwendung in anderen Skripten
window.navigateTo = navigateTo;
window.updateFighterHealth = updateFighterHealth;
window.showBattleResult = showBattleResult;
window.playAttackAnimation = playAttackAnimation;
