# Samurai-KatanaBlood Frontend-Dokumentation

## Projektübersicht

Samurai-KatanaBlood ist ein browserbasiertes Kampfspiel mit 5 verschiedenen Samurai-Kämpfern. Das Frontend wurde mit modernen Webtechnologien (HTML, CSS, JavaScript) entwickelt und bietet ein futuristisches Design mit 3D-Übergangseffekten zwischen den Seiten.

## Implementierte Funktionen

### 1. Modernes, zukunftsorientiertes Design
- Glasmorphismus-Effekte für Karten und UI-Elemente
- Futuristische Farbpalette mit Gold- und Orangetönen
- Responsive Design für verschiedene Bildschirmgrößen

### 2. 3D-Übergangseffekte
- Nahtlose Übergänge zwischen Login, Dashboard und Arena
- CSS-basierte Swipe-Animationen für Seitenwechsel
- Dynamische Ein- und Ausblendeffekte für UI-Elemente

### 3. Charakterauswahl
- 5 einzigartige Samurai-Kämpfer mit individuellen Eigenschaften
- Detaillierte Charakterkarten mit Statistiken
- Speicherung der Charakterauswahl für Kampfsitzungen

### 4. Kampfsystem
- Rundenbasiertes Kampfsystem mit verschiedenen Angriffstypen
- Gesundheitszustände (gesund bei >40 Lebenspunkten, verletzt bei ≤40)
- Visuelle Kampfanimationen für verschiedene Angriffe
- Kampflog zur Nachverfolgung von Aktionen

### 5. Sieges-/Niederlagen-Animationen
- Siegesanimation mit Goldgürtel für den Gewinner
- Niederlagenanimation mit Sanitätern für den Verlierer
- Detaillierte Ergebnisanzeige mit Kampfstatistiken

## Seitenstruktur

### Login-Seite (login.html)
- Anmeldeformular mit Benutzername und Passwort
- Registrierungsoption für neue Spieler
- Hintergrundvideo für atmosphärische Wirkung

### Dashboard-Seite (dashboard.html)
- Charakterauswahl mit detaillierten Kämpferprofilen
- Leaderboard mit Rangliste der besten Spieler
- Spielerprofil mit Kampfstatistiken
- Spielverlauf mit vergangenen Kämpfen

### Arena-Seite (arena.html)
- Kampfbereich mit Spieler- und Gegner-Kämpfer
- Gesundheitsanzeigen mit visuellen Zustandsänderungen
- Steuerelemente für verschiedene Angriffstypen
- Kampflog zur Nachverfolgung von Aktionen

## Technische Details

### CSS-Dateien
- **modern-styles.css**: Enthält alle grundlegenden Stile für das moderne Design
- **animations.css**: Enthält alle Animationen und Übergangseffekte

### JavaScript-Dateien
- **login.js**: Funktionalität für die Login-Seite
- **dashboard.js**: Funktionalität für das Dashboard und die Charakterauswahl
- **arena.js**: Kampflogik und Steuerung für die Arena-Seite
- **transitions.js**: Seitenübergangseffekte und Navigation

### Verzeichnisstruktur
```
frontend/
├── css/
│   ├── animations.css
│   ├── modern-styles.css
│   └── ...
├── js/
│   ├── arena.js
│   ├── dashboard.js
│   ├── login.js
│   ├── transitions.js
│   └── ...
├── images/
│   ├── zustandgesund/
│   │   └── [Kämpferbilder im gesunden Zustand]
│   ├── zustandverletzt/
│   │   └── [Kämpferbilder im verletzten Zustand]
│   └── ...
├── arena.html
├── dashboard.html
└── login.html
```

## Zugriff auf die Anwendung

Die Anwendung ist über die folgende temporäre URL erreichbar:
https://3000-i1jrcj1m0uf3tvpwep02u-b53cb8bb.manus.computer

## Anleitung für Dozenten

1. Öffnen Sie die temporäre URL in einem modernen Browser (Chrome, Firefox, Edge)
2. Auf der Login-Seite können Sie sich mit einem beliebigen Benutzernamen und Passwort anmelden (mind. 3 Zeichen)
3. Im Dashboard können Sie einen der 5 Samurai-Kämpfer auswählen
4. Klicken Sie auf "Kämpfen", um zur Arena zu gelangen
5. In der Arena können Sie verschiedene Angriffstypen auswählen, um gegen den Gegner zu kämpfen
6. Beobachten Sie die Gesundheitszustände der Kämpfer (gesund >40 LP, verletzt ≤40 LP)
7. Nach dem Kampf wird eine Sieges- oder Niederlagenanimation angezeigt

## Hinweise zur Weiterentwicklung

- Die Anwendung verwendet eine temporäre URL für Präsentationszwecke
- Für eine permanente Deployment-Lösung könnte die Anwendung auf GitHub Pages, Netlify oder Vercel gehostet werden
- Das Backend ist bereits vorbereitet und kann mit dem Frontend verbunden werden
- Weitere Kämpfer können durch Hinzufügen neuer Bilder und Aktualisierung der Charakterdaten implementiert werden
