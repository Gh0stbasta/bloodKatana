/**
 * login.js
 * Enthält die Funktionalität für die Login-Seite
 */

// Globale Variablen
let loginAttempts = 0;

/**
 * Initialisiert die Login-Seite beim Laden
 */
document.addEventListener('DOMContentLoaded', function() {
    // Event-Listener für Login-Button
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            handleLogin();
        });
    }
    
    // Event-Listener für Registrierungs-Button
    const registerButton = document.getElementById('registerButton');
    if (registerButton) {
        registerButton.addEventListener('click', function() {
            showRegistrationForm();
        });
    }
    
    // Event-Listener für Eingabefelder (Enter-Taste)
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    if (usernameInput) {
        usernameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (passwordInput) {
                    passwordInput.focus();
                }
            }
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleLogin();
            }
        });
    }
    
    // Maskottchen-Interaktion
    setupMascotInteraction();
});

/**
 * Verarbeitet den Login-Versuch
 */
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Einfache Validierung
    if (!username || !password) {
        showError('Bitte gib Benutzername und Passwort ein.');
        return;
    }
    
    // Für Demo-Zwecke: Akzeptiere jeden Login mit mindestens 3 Zeichen
    if (username.length >= 3 && password.length >= 3) {
        // Erfolgreicher Login
        localStorage.setItem('loggedInUser', username);
        
        // Navigiere zum Dashboard mit 3D-Übergangseffekt
        window.navigateTo('dashboard');
    } else {
        // Fehlgeschlagener Login
        loginAttempts++;
        
        if (loginAttempts >= 3) {
            showError('Zu viele fehlgeschlagene Versuche. Bitte versuche es später erneut.');
        } else {
            showError('Ungültiger Benutzername oder Passwort.');
        }
    }
}

/**
 * Zeigt eine Fehlermeldung an
 * @param {string} message - Fehlermeldungstext
 */
function showError(message) {
    // Prüfe, ob bereits eine Fehlermeldung existiert
    let errorElement = document.querySelector('.error-message');
    
    if (!errorElement) {
        // Erstelle ein neues Element für die Fehlermeldung
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        
        // Füge es zum Login-Formular hinzu
        const loginForm = document.querySelector('.login-form');
        if (loginForm) {
            loginForm.insertBefore(errorElement, loginForm.firstChild);
        }
    }
    
    // Setze die Fehlermeldung
    errorElement.textContent = message;
    
    // Animation für die Fehlermeldung
    errorElement.style.animation = 'none';
    setTimeout(function() {
        errorElement.style.animation = 'fadeIn 0.3s ease-out forwards';
    }, 10);
}

/**
 * Zeigt das Registrierungsformular an
 */
function showRegistrationForm() {
    // In einer vollständigen Implementierung würde hier ein Registrierungsformular angezeigt
    // Für dieses Demo-Projekt zeigen wir nur eine Meldung an
    
    // Verstecke das Login-Formular
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.innerHTML = `
            <h1>Neuen Kämpfer erstellen</h1>
            <div class="form-group">
                <input type="text" id="reg-username" placeholder="Wähle einen Benutzernamen" class="form-control">
            </div>
            <div class="form-group">
                <input type="password" id="reg-password" placeholder="Wähle ein Passwort" class="form-control">
            </div>
            <div class="form-group">
                <input type="password" id="reg-confirm-password" placeholder="Passwort bestätigen" class="form-control">
            </div>
            <div class="form-group">
                <select id="reg-character" class="form-control">
                    <option value="">Wähle deinen Startcharakter</option>
                    <option value="Sōgō no Shisha">Sōgō no Shisha</option>
                    <option value="Ayatsurishi">Ayatsurishi</option>
                    <option value="Bedy Yamiko">Bedy Yamiko</option>
                    <option value="Utsushi no Oni">Utsushi no Oni</option>
                    <option value="Kōgei no Shinobi">Kōgei no Shinobi</option>
                </select>
            </div>
            <div class="form-group">
                <button id="createAccountButton" class="btn btn-primary">Konto erstellen</button>
            </div>
            <div class="form-group">
                <button id="backToLoginButton" class="btn btn-outline">Zurück zum Login</button>
            </div>
        `;
        
        // Event-Listener für die neuen Buttons
        const createAccountButton = document.getElementById('createAccountButton');
        if (createAccountButton) {
            createAccountButton.addEventListener('click', function() {
                // In einer vollständigen Implementierung würde hier die Registrierung verarbeitet
                alert('Registrierung erfolgreich! Du kannst dich jetzt anmelden.');
                window.location.reload();
            });
        }
        
        const backToLoginButton = document.getElementById('backToLoginButton');
        if (backToLoginButton) {
            backToLoginButton.addEventListener('click', function() {
                window.location.reload();
            });
        }
    }
}

/**
 * Richtet die Interaktion mit dem Maskottchen ein
 */
function setupMascotInteraction() {
    const mascot = document.querySelector('.mascot');
    if (!mascot) return;
    
    // Zufällige Bewegungen für das Maskottchen
    setInterval(function() {
        const randomX = Math.random() * 10 - 5; // -5 bis 5
        const randomY = Math.random() * 10 - 5; // -5 bis 5
        
        mascot.style.transform = `translate(${randomX}px, ${randomY}px)`;
        
        setTimeout(function() {
            mascot.style.transform = 'translate(0, 0)';
        }, 500);
    }, 5000);
}
