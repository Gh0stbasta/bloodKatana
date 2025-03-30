const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Statische Dateien aus dem Frontend-Verzeichnis bereitstellen
app.use(express.static(path.join(__dirname, 'frontend')));

// Standardroute zur index.html (falls vorhanden) oder login.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});

// Route für das Dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dashboard.html'));
});

// Route für die Kampfarena
app.get('/fight', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'fight.html'));
});

// Server starten
app.listen(port, '0.0.0.0', () => {
    console.log(`Samurai-KatanaBlood Server läuft auf http://localhost:${port}`);
});
