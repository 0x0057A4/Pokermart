# HYPERMARKT 3.8 — neue Pixelwelt

Die beiden neuen Originalatlanten wurden mit Imagegen für dieses Spiel erzeugt, als visuelle Umsetzung des vom Nutzer bestätigten Supermarkt-Konzepts in der Ästhetik heller GBA-Rollenspiele. Sie enthalten keine übernommenen Pokémon-Sprites oder Figuren.

GBA_PROPS_SOURCE: 1536×1024 RGBA, 24 leere Möbel- / Ausstattungsbilder. GBA_PEOPLE_SOURCE: 887×1774 RGBA, acht Figuren mit je vier Richtungen. Eingebettet in gba-furniture-source-*.js und gba-people-source-*.js, damit das Spiel auch direkt aus index.html ohne Fetch / CORS startet. Die Originale liegen verlustfrei als PNG-Daten vor.

gba-renderer.js enthält Ausschnittgrenzen, Laufzeitabtastung auf kleine Pixelrahmen, Alpha-Schwellenwert gegen weiche Ränder und Caches. Es zeichnet Kleidungspaletten, Gehposen, Waren und reine 90°-Möbelprofile in derselben Palette. Die Kassenbilder werden nach der Bedienseite gewählt; Kundenseite und Bedienplatz kommen weiterhin aus der Simulation. Menüs verwenden dieselben dynamischen Produktbilder wie die Auslagen. Der Ofen und die Bedientheken erhalten die neuen Fronten. gba-theme.css vereinheitlicht Management und Steuerung.

Vorherige Atlanten bleiben ausschließlich als Lade- / Fehler-Fallback und für ältere Render-Funktionen im Projekt. Das aktive Spiel zeichnet mit dem neuen Renderer. Es werden keine externen Bildserver oder Fremdschriften benötigt.

Möbel-Prompt: cohesive top-down GBA-era supermarket pixel sprite atlas, warm wood, cream shelves, navy outlines, blue steel, six columns and four rows, isolated on transparent RGBA; empty groceries / refrigerator / freezer / heavy rack / bakery / coffee, four checkout directions, meat and bakery counters, oven, clean / dirty table, bin, plant, broom holder, dough bin, carton, basket, self checkout, deposit machine and entrance.

Figuren-Prompt: original small GBA-style humans for the same supermarket, four columns down/up/left/right and eight rows; red-cap owner, apron employee and six diverse adult civilian designs, strong pixel silhouettes, consistent proportions, transparent background, no Pokémon characters.
