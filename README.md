# HYPERMARKT 3.11

Über `index.html` ohne Build-Schritt spielbar. Bestehende Spielstände, Kapital, Waren, Preise, Ausbau und Personal bleiben erhalten.

Die Spielfigur trägt jetzt die blaue Verkäuferkleidung aus dem vom Nutzer gelieferten Gemini-Spritebogen. Vorder- und Rückansicht sowie das Seitenprofil werden in ihrer ursprünglichen Auflösung ausgeschnitten; die Gegenrichtung spiegelt das Seitenprofil. Auch die Schrittbewegungen verwenden Originalpixel. Eine vorherige Verkleinerung auf einen 64-Pixel-Körper entfällt für Verkäufer und Personal. Die bisherige Personalfigur dient während des Ladens als Ersatz.

Warenregal, Kühlschrank und Gefriertruhe verwenden passende Rahmen desselben Spritebogens mit unverändertem Seitenverhältnis. Die Warenfächer des Regals werden getrennt geleert. Abdeckung, Pfosten, Fachböden und Sockel bleiben in Originalauflösung erhalten. Der tatsächliche Füllstand bestimmt die gezeichneten Waren; die Zeichnung bleibt auf die Fächer begrenzt. Leere Regale enthalten keine Warenreste. Geschlossene Seiten- und Rückansichten bleiben ohne aufgemalte Produkte.

Die PNG unter `assets/gemini-source.png` entspricht dem gelieferten Original mit 1024 × 765 Pixeln bytegenau. `assets/gemini-source.json` dokumentiert Herkunft, Maße und SHA-256. Ausschneiden und Freistellen erfolgen auf getrennten Canvasflächen in Originalauflösung. Erst die Anzeige im Spiel skaliert die Grafik. Zusätzliche Richtungsansichten, die im Bogen fehlen, werden aus Metallflächen und Rahmenteilen ergänzt.

Menüs verwenden eine einheitliche helle Fläche mit dunkler Schrift und dunkle Hauptbuttons mit weißer Schrift. Tastaturauswahl und Fokus ändern diese Schriftkontraste nicht. Deaktivierte Buttons bleiben lesbar. Produktkacheln und Lagerkacheln sind kompakter; die Produktauswahl hat am Desktop vier und auf schmalen Displays zwei Spalten. Die Schriftart bleibt erhalten. Auffüllen und Nachbestellen behalten mindestens 44 Pixel hohe Bedienflächen.

WASD/Pfeile bewegen, E/Leertaste interagieren, M verschiebt, R dreht, Q öffnet das Menü, Esc schließt oder bricht ab. Touchgeräte behalten das Steuerkreuz und die A/B-Tasten.

Prüfungen:

- `node tests/reference.cjs`: bestehende Integrationsprüfungen einschließlich Warenwirtschaft, Kassen, Produktion, Lager, Bewegung und Spielstandkompatibilität.
- `node tests/hd-browser.cjs`: Browserprüfungen mit Playwright für Originaldatei und Pixelmaße, unveränderte Rahmenpixel, produktfreie Fächer, Füllstände und vier Ausrichtungen, Verkäuferansichten, Buttonkontraste, Smartphone/Querformat und Speichern/Neuladen. Playwright benötigt eine verfügbare Chromium-Installation; `POKERMART_BROWSER` setzt optional deren Pfad.
- Falls die Testumgebung lokale HTTP-Verbindungen sperrt, führt `POKERMART_LOCAL_FILES=1` dieselben Browserprüfungen direkt über die lokalen Dateien aus.

