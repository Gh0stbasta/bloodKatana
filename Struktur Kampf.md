# Blood Katana - Rundenbasiertes Samurai-Kampfspiel

## Beschreibung
Blood Katana ist ein rundenbasiertes Kampfspiel, in dem zwei Samurai in einer Arena gegeneinander antreten. Jeder Spieler hat vier verschiedene Attacken, die strategisch eingesetzt werden müssen, um den Gegner zu besiegen.

## Spiellogik
Das Spiel findet in einer 2D-Arena statt, in der die Samurai statisch positioniert sind. Die Kämpfe verlaufen rundenbasiert:
1. Der Spieler wählt eine von vier Attacken.
2. Der Schaden der Attacke wird berechnet und auf die Lebenspunkte (HP) des Gegners angewendet.
3. Falls eine Attacke eine besondere Eigenschaft hat (z. B. Heilung, kritischer Treffer, Fehlschlag), wird dies berücksichtigt.
4. Nach dem Zug des Spielers greift der Gegner automatisch mit einer zufälligen Attacke zurück.
5. Der Kampf endet, wenn die HP eines Samurai auf 0 sinken.

## Attacken-System
Jeder Samurai verfügt über vier einzigartige Attacken:
- **Katana-Schnitt**: Verursacht mittleren Schaden.
- **Schattenschlag**: Hat eine Chance auf kritischen Treffer, der doppelten Schaden verursacht.
- **Konterhaltung**: Geringer Schaden, heilt den Samurai jedoch leicht.
- **Todesstoß**: Sehr starker Angriff, kann aber mit einer gewissen Wahrscheinlichkeit fehlschlagen.

## Benutzeroberfläche
- Eine **Kampfarena**, in der beide Samurai sichtbar sind.
- **Lebensbalken** für Spieler und Gegner, die sich mit dem Kampfverlauf anpassen.
- **Angriffs-Buttons**, mit denen der Spieler seine Attacken auswählt.
- Ein **Log-Fenster**, das die aktuellen Aktionen und Angriffe beschreibt.

## Ziel des Spiels
Das Ziel ist es, den Gegner durch geschickten Einsatz der Attacken zu besiegen, bevor die eigenen HP auf 0 sinken. Durch verschiedene Angriffstypen und Zufallselemente entsteht eine taktische Komponente, die den Kampf spannend macht.

---
Falls du weitere Anpassungen oder Features hinzufügen möchtest (z. B. Spezialeffekte, Sound oder Mehrspieler-Optionen), lass es mich wissen!
