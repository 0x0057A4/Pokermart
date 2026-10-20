# HYPERMARKT 3.8 — Handheld-Pixelwelt

Direkt mit index.html spielbar, ohne Build-Schritt; veröffentlicht über GitHub Pages.

Die gesamte aktive Darstellung verwendet eine helle GBA-Palette, kleine native Pixelrahmen und Skalierung ohne Glättung: Spielfiguren in vier Richtungen, Gehposen, Verkaufsmöbel, alle vier Kassenrichtungen, echte 90°-Regalprofile, Warenbilder, Schwerlastregale, Rohlingbehälter, Backofen, Kaffeemaschine, Theken, Tische, Besen und Menüs. 30 zivile Erscheinungsbilder entstehen aus sechs vierseitigen Grundfiguren mit fünf Kleidungspaletten; Spieler und Personal haben eigene Figuren. Inventar wird weiterhin aus dem tatsächlichen Bestand gezeichnet.

Im Lager-Menü gibt es „Lagereinrichtung verschieben“. Alternativ I drücken, auswählen und mit WASD / Pfeilen bewegen; Leertaste setzt ab, Esc bricht ab. Schwere Regale, Rohlingbehälter und Backofen bleiben im kompakten 8×7-Lager. Die Besenhalterung steht standardmäßig direkt neben dem Durchgang und lässt sich auch im Verkaufsraum aufstellen. Zugang zu Türen, Waren, Kasse und Geräten wird geprüft. Positionen werden ohne Warenverlust gespeichert; eine laufende Ofenladung läuft nach dem Umstellen weiter.

Bedienung: WASD / Pfeile bewegen, Leertaste / E interagieren, Q Menü, B zurück, Esc schließen / abbrechen. R dreht Möbel beim Platzieren. Steuerkreuz nur auf Touchtelefonen. Alle Verwaltungsfunktionen sind im Menü erreichbar. Der Zoomregler bleibt verfügbar.

Kasse, Bar-Rückgeld, einmaliges Karten-Minispiel, Besenpflicht, Auto-Nachkauf, Backstube, Café, Bedientheken, Öffnungszeiten und Nacharbeit bleiben erhalten. Vorhandene Spielstände unter pokermart-v1 werden ergänzt, nicht zurückgesetzt.

Prüfung: node tests/gba.cjs führt die komplette bisherige Prüfket­te einschließlich Lagerverschiebung und der neuen Darstellung aus. Zusätzliche Prüfungen kontrollieren PNG-Dimensionen / Ausschnitte, Figurvarianten, Produktabdeckung, vier Kassenausrichtungen und zustandsfreie Darstellung. Canvas-Szenen wurden als Desktop- und Mobilbilder visuell geprüft. Ein vollständiger interaktiver Browsertest ist in dieser Umgebung nicht verfügbar.
