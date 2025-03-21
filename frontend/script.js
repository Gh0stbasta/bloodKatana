document.getElementById('loginButton').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Hier kannst du die Login-Logik implementieren
    alert(`Willkommen zurück, ${username}!`);
    // 3D-Swipe-Animation starten
    window.location.href = 'dashboard.html';
});

document.getElementById('registerButton').addEventListener('click', function() {
    // Hier kannst du die Registrierungslogik implementieren
    alert('Neuer Kämpfer wird erstellt...');
});