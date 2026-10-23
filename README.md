# HYPERMARKT 3.15

Ueber index.html ohne Build-Schritt spielbar. Bestehende Spielstaende, Kapital, Waren, Preise, Ausbau und Personal bleiben erhalten.

## 3.15: neue Moebel, Figuren und hochaufloesende Darstellung

Warenregale, Kuehlschraenke und Gefriertruhen erhalten neue, detaillierte Grafik in vier Richtungen. Die Darstellung nutzt die Originalaufloesung der neuen Atlanten ohne vorherige Verkleinerung auf Mini-Sprites. Die Gefriertruhe spannt bei 90 und 270 Grad weiterhin beide kleinen Bodenfelder auf; alle Ansichten behalten ihr Seitenverhaeltnis und stehen am Fuss ihrer Grundflaeche.

Die neue blaue Mitarbeiterfigur besitzt vier Ansichten mit 537 Pixel hohen Quellausschnitten. Animationen entstehen auf 400 x 560 Pixel grossen Arbeitsflaechen. Auch Kunden verwenden ihre nativen Quellausschnitte in 156 x 204 Pixel grossen Animationsbildern. Der Boden verwendet ruhigere Farben im halben Bauraster. Echte Warenbestaende bestimmen die gezeichnete Fuellung; leere Moebel bleiben leer. Beim Laden dienen die bisherigen Grafiken als Ersatz.

Das Canvas nutzt die tatsaechlichen Displaypixel, einschliesslich 3840 Pixel breiter UHD-Displays und hoher Pixeldichten auf Smartphones. Die Zeichenflaeche ist auf 4096 Pixel je Seite und rund 8,4 Megapixel begrenzt. Die neuen Quellatlanten messen 1254 x 1254 und 1536 x 1024 Pixel; UHD bezeichnet die Bildschirmausgabe, nicht eine native 4K-Aufloesung jedes Sprites.

Das um 50 Prozent verkleinerte Bauraster und die fuenf belegten Kassenfelder bleiben erhalten. Die Kasse wird als zusammenhaengendes Originalbild gezeichnet. Die Originaldatei assets/gemini-source.png bleibt bytegleich erhalten; Herkunft und Verarbeitung dokumentiert assets/ARTWORK.md.

WASD/Pfeile bewegen, E/Leertaste interagieren, M verschiebt, R dreht, Q oeffnet das Menue, Esc schliesst oder bricht ab. Touchgeraete behalten das Steuerkreuz und die A/B-Tasten.

Pruefungen:

- node tests/uhd-browser.cjs: Desktop, UHD und Smartphone mit dreifacher Pixeldichte; Seitenverhaeltnisse, Bodenanker, Transparenz, Figurenanimationen, Warenmenge, Ladeersatz und unveraenderter Spielzustand.
- node tests/tile-footprints-browser.cjs: Kassenmasken, zusammenhaengende Originalgrafik, freie Felder, Kollision, Auswahl, Platzierung, Speichern, gedrehte Gefriertruhen, Bar-/Kartenzahlung und zehn Minuten Verkauf.
- node tests/fine-grid-browser.cjs: halbes Bauraster, Laufwege, Lager und Platzierung.
- node tests/hd-browser.cjs: Originaldatei, Rahmenpixel, Fuellstaende, Smartphone/Querformat, Menuekontraste und Speichern.
- node tests/reference.cjs: bestehende Integrationspruefungen fuer Warenwirtschaft, Kassen, Produktion, Bewegung und Spielstaende.

Browsertests benoetigen Playwright und Chromium. POKERMART_BROWSER setzt optional den Browserpfad. POKERMART_LOCAL_FILES=1 umgeht lokale HTTP-Verbindungen fuer die bisherigen Browsertests; der UHD-Test verwendet lokale Dateien direkt.

## 3.12: feines Bauraster und bündige Wandregale

Die Rasterweite ist in beiden Richtungen um 50 % reduziert. Warenregal, Kühlung, Gefriertruhe und Bäckereiauslage belegen 2 × 1 kleine Felder, gedreht 1 × 2. Ihre tatsächliche Grundfläche bestimmt Platzierung, Kollision und Auswahl. Die frei gewordene halbe Reihe bleibt begehbar. Im Baumodus ist das feinere Raster sichtbar; die Baukarten nennen die Grundfläche. Regale schließen durch den an ihre Grundfläche angepassten Bildanker bündig an die Rückwand an.

Bestehende Spielstände behalten Größe, Positionen, Waren und Kapital. Neue halbe Positionen werden auch im Lager gespeichert. Die Wegsuche nutzt das feinere Raster mit A*. Der Originalatlas bleibt unverändert. `tests/fine-grid-browser.cjs` prüft die neue Grundfläche, alle vier Richtungen, Laufgänge, halbe Positionen, Ablehnung überlappender Möbel, Speichern/Neuladen, Lager und Kassen sowie laufenden Verkauf.

## 3.13: kachelscharfe Kasse und gedrehte Gefriertruhe

Die Kasse belegt fünf kleine Felder: vier für das Band und eines seitlich für das Terminal. Bei 90° entspricht sie der gewünschten Form mit einer durchgehenden rechten Spalte und dem Terminal links in der zweiten Reihe. Bauvorschau, Auswahl und Kollision verwenden dieselbe mitgedrehte Feldmaske. Die drei übrigen Felder des 2 × 4 großen Umrisses bleiben für Laufwege und passende Möbel nutzbar. Die Wegsuche kann enge freie Felder mit feineren Zwischenschritten erreichen; das Bauraster bleibt unverändert.

Die Gefriertruhe füllt bei 90° und 270° sichtbar beide Felder ihrer 1 × 2 großen Grundfläche. Beide Enden lassen sich auswählen. Die Originalgrafiken bleiben unverändert; erst beim Zeichnen werden die passenden Ausschnitte skaliert. Bestehende Positionen, Ausrichtungen und Spielstände bleiben erhalten.

## 3.14: zusammenhängende Originalgrafik der Kasse

Die Kasse verwendet wieder die vollständigen Richtungsbilder und die Darstellung aus 3.12. Band und Terminal werden weder getrennt skaliert noch auf einzelne Bodenfelder beschnitten. Die fünf belegten Felder aus 3.13 bleiben für Platzierung, Auswahl und Kollision erhalten. Der Browsertest sichert nun ausdrücklich ab, dass die Originalgrafik als Ganzes gezeichnet wird.
