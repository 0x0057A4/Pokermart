# Pokermart

Spielbarer Shopkeeper-Prototyp, komplett in `index.html`. Grafiken, CSS und JavaScript sind eingebettet; keine Installation, Bibliotheken, Build-Schritte oder Server nötig.

## GitHub Pages

Im Repository **Settings → Pages → Build and deployment → Deploy from a branch** einstellen:

- Branch: `main`
- Folder: `/ (root)`
- Save

Die Website erscheint nach dem Pages-Deployment unter https://0x0057A4.github.io/Pokermart/ .

## Bedienung

WASD oder Pfeiltasten: bewegen. E: an Kasse, Warenmöbeln, Lieferungen, Schmutz und Dieben interagieren. B: Möbelbau öffnen. Escape: Bauauftrag abbrechen. Richtungstasten auf Touchgeräten.

Erst Laden öffnen, Kunden abwarten, zur Kasse unten links laufen und E drücken. Bargeld und EC haben eigene Verkaufsdialoge. Neue Ware bestellen, im rechten Lager annehmen und am passenden Möbel einräumen. Alle Menüs pausieren die Simulation.

## Systeme

20 Kundenprofile, 10 Anfangsartikel und 150 freischaltbare Produktvarianten; Einkauf und langsamere, günstigere Importlieferungen; Produktpreise, Lager und Auslagen; Regale, Kühlung und Tiefkühlung; Möbelplatzierung mit Laufwegprüfung, Flächenerweiterung, Personal, Selbstbedienungskassen, Pfandservice, Schmutz und Diebstahl.

Ein Spieltag dauert vier Minuten. Personal kostet 85 € je Person und Tag, dazu kommen Betriebskosten. Fortschritt wird im Browser automatisch gespeichert. JSON-Export und Import sind im Management-Menü verfügbar. Keine Offline-Fortschritte.

Die 150 Zusatzartikel sind benannte Varianten der zehn Produktfamilien. Dies ist eine erste spielbare Version; Kunden und Personal verwenden vereinfachte Simulationsregeln. Das bereitgestellte Sprite-Asset wird im Spiel verwendet.

## Prüfung

JavaScript-Syntax und Simulationsabläufe automatisiert geprüft: zwölf simulierte Minuten mit Kunden und Kassenpersonal; Bestellung, Lieferung, Warenannahme und Auffüllen; Produktfreischaltung; manuelle Kassenzahlung; Speichern und Validierung des Imports. Eine visuelle Browserprüfung war in der Erstellungsumgebung nicht verfügbar.
