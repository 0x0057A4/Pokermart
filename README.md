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

Erst Laden öffnen, Kunden abwarten, zur Kasse im Kiosk laufen und E drücken. Bargeld und EC haben eigene Verkaufsdialoge. Neue Ware bestellen, im rechten Lager annehmen und am passenden Möbel einräumen. Alle Menüs pausieren die Simulation.

## Systeme

20 Kundenprofile, 10 Anfangsartikel und 150 freischaltbare Produktvarianten; Einkauf und langsamere, günstigere Importlieferungen; Produktpreise, Lager und Auslagen; Regale, Kühlung und Tiefkühlung; Möbelplatzierung mit Laufwegprüfung, Flächenerweiterung, Personal, Selbstbedienungskassen, Pfandservice, Schmutz und Diebstahl.

Ein Spieltag dauert vier Minuten. Personal kostet 85 € je Person und Tag, dazu kommen Betriebskosten. Fortschritt wird im Browser automatisch gespeichert. JSON-Export und Import sind im Management-Menü verfügbar. Keine Offline-Fortschritte.

Die 150 Zusatzartikel sind benannte Varianten der zehn Produktfamilien. Dies ist eine erste spielbare Version; Kunden und Personal verwenden vereinfachte Simulationsregeln. Das bereitgestellte Sprite-Asset wird im Spiel verwendet.

## Prüfung

JavaScript-Syntax und Simulationsabläufe automatisiert geprüft: zwölf simulierte Minuten mit Kunden und Kassenpersonal; Bestellung, Lieferung, Warenannahme und Auffüllen; Produktfreischaltung; manuelle Kassenzahlung; Speichern und Validierung des Imports. Eine visuelle Browserprüfung war in der Erstellungsumgebung nicht verfügbar.

## Kioskstart und Ausbau

Neue Spiele starten mit 2.600 € Bargeld, 35 Verkaufsfeldern und einem separaten kleinen Lager mit neun Feldern. Zur Grundausstattung gehören zwei Warenregale, eine Getränkekühlung, eine Kasse und ein Abfallbehälter. Die drei Warenmöbel enthalten je acht Artikel; pro Startprodukt liegen zusätzlich sechs Stück im Lager. Personal und weitere Möbel werden selbst finanziert.

| Stufe | Verkaufsfelder | Lagerfelder | Ausbaupreis |
| --- | ---: | ---: | ---: |
| Kiosk | 35 | 9 | Start |
| Nachbarschaftsladen | 77 | 12 | 1.800 € |
| Mini-Markt | 176 | 28 | 4.500 € |
| Supermarkt | 198 | 30 | 9.000 € |

Unter „Möbel & Ausbau“ wird die nächste Stufe gekauft. Möbel, Ware und Fortschritt bleiben erhalten; der Lagerraum zieht in den erweiterten Anbau um. Bauen ist nur auf gekaufter Verkaufsfläche möglich. Grundbetriebskosten beginnen bei 12 € pro Tag und steigen mit der Ladenstufe. Kundenanzahl wächst mit der Fläche.

Spielstände der ersten Version behalten ihren bisherigen größeren Laden. Für den neuen Kioskstart unter „Management → Neues Spiel“ beginnen; bei Bedarf vorher exportieren.

Zusätzlich geprüft: Startkapital, Kioskfläche, sämtliche Ausbaustufen, Geldabzug, Ablehnung bei zu wenig Geld, Erreichbarkeit der Warenmöbel und Lager in jeder Stufe sowie Migration alter Spielstände.

## Bewegungs- und Aktionsanimationen

Figuren verwenden Vorder-, Rück- und Seitenansichten aus dem bereitgestellten Sprite-Asset. Vier Gehphasen bewegen Arme und Beine getrennt; Schrittzyklus, Körperbewegung, Schatten und dezente Schrittpartikel folgen der tatsächlich zurückgelegten Strecke. Im Stillstand endet die Schrittbewegung. Auch Kunden wechseln ihre Blickrichtung entlang ihrer Laufwege.

Kassieren, Einräumen, Lieferannahme, Reinigen, Pfandservice und Ansprechen von Dieben besitzen eigene zeitlich begrenzte Aktionsposen mit Karton-, Besen- oder Geldbewegungen. Kunden zeigen das Einpacken, Mitarbeitende die zugehörigen Arbeitsposen. Aktionen blockieren die Spielfigur kurz, bis die Bewegung abgeschlossen ist. Pausen und offene Menüs halten die Animationszeit an. Der Animationszustand ist vom Spielstand getrennt; vorhandene Spielstände bleiben nutzbar.

Geprüft: Richtungswechsel, Schrittfortschritt, Stillstand, Aktionssperre, Ablauf der Aktionsdauer, Pause und Speicherkompatibilität; Canvas-Darstellung der vier Richtungen, Gehphasen und Spielwelt visuell geprüft. Vollständige Browserprüfung weiterhin nicht verfügbar.

## Möbel verschieben

Über „Möbel verschieben“, Taste M, das Baumenü oder die Möbelansicht lässt sich der Verschiebemodus öffnen. Erst das vorhandene Möbel anklicken, dann den neuen Zielplatz. Regale, Kühlschränke, Gefriertruhen, Kassen, SB-Kassen, Pfandautomaten, Pflanzen und Abfallbehälter können kostenlos umgestellt werden. Produktzuordnung und Warenbestand bleiben erhalten.

Während des Verschiebens pausiert die Simulation. Das Originalmöbel bleibt bis zur gültigen Platzierung stehen; eine Vorschau zeigt den Zielplatz in Grün oder Rot. Escape oder „Verschieben beenden“ bricht ohne Änderung ab. Bauen ist auf gekaufte Verkaufsfläche begrenzt. Belegte Felder, Figurenpositionen sowie versperrte Zugänge zu Möbeln, Lager oder Ausgang werden abgewiesen. Kunden erhalten nach dem Umstellen neue Wege zu ihren bisherigen Zielen. Spielstandformat unverändert.

Geprüft: kostenloses Verschieben bei leerer Kasse, Erhalt von Objektidentität und Ware, Umstellen einer Kasse, ungültige Zielplätze, Abbruch, Pause/Fortsetzen, Ausgangswege für Kunden und Spielfigur sowie Verkaufsablauf und Speicherstand nach der Änderung.

## Sichtbare Wände und Möbel an der Rückwand

Shop und Lager besitzen hohe Rückwände mit Mauerkrone, heller Innenfläche und Sockelleiste. Die Seitenwände und die niedrige Vorderwand zeigen die Raumgrenzen, ohne das Spielgeschehen zu verdecken. Der Eingang und der Lagerdurchgang bleiben sichtbar offen. Spielfigur und Kunden benutzen diese Durchgänge; geschlossene Wandabschnitte sind nicht passierbar.

Die beiden Startregale und die Getränkekühlung stehen direkt in der hintersten Bodenreihe an der Rückwand. Kontakt- und Bodenschatten verbinden die Möbel optisch mit dem Raum. Beim Bauen und Verschieben ist die hinterste Reihe freigegeben; eine Vorschau an dieser Reihe trägt „AN DER RÜCKWAND“. Klicks auf den direkt darüberliegenden Wandstreifen rasten für Warenmöbel in diese Reihe ein. Freie Aufstellung im Raum bleibt möglich.

Direkt an der Rückwand platzierte Warenmöbel folgen beim Ausbau der versetzten Rückwand. Frei platzierte Möbel behalten ihre Position. Bei bisherigen Kiosk-Spielständen werden unveränderte Startregale und Startkühlung einmalig an die Rückwand gestellt; selbst umgestellte Möbel werden beibehalten.

Geprüft: Darstellung aller vier Ausbaustufen, Platzierung an der Rückwand, Einrasten der Vorschau, Eingang und Lagerzugang, Kundensimulation, bestehender Verschiebemodus, Spielstandmigration und Wandanschluss bei sämtlichen Ausbauten.

## Korrektur: Hinter Schränke laufen

Die Bewegung prüft jetzt die tatsächliche Fußfläche der Figur gegen die Standfläche der Möbel und die Raumgrenzen. Das gerundete Rasterfeld allein reicht nicht mehr als Kollisionsprüfung. Wandnahe Schränke blockieren die Fläche bis zur Rückwand; seitliches Einschieben in ihre Kanten ist ausgeschlossen. Die Tiefensortierung verwendet ebenfalls die Standfläche von Figuren und Möbeln.

Warenmöbel und Pfandautomaten rasten beim Platzieren in der direkt vor der Rückwand liegenden Reihe bündig an die Rückwand ein. Entsprechende wandnahe Möbel in bisherigen Spielständen werden einmalig bündig gestellt, sofern der Platz frei ist. Bereits im Möbelbereich stehende Figuren werden beim Laden auf einen freien benachbarten Platz gesetzt. Weiter im Raum platzierte Möbel bleiben frei aufgestellt. Geld, Produktzuordnung und Warenbestände bleiben erhalten.

Geprüft: die Figurposition aus dem Fehlerbild, seitliche Möbelkollision und Wandgrenzen bei dauerhaft gedrückter Bewegungstaste, freie Bedienung von vorne, Migration alter Spielstände, Wandraster und kostenloses Verschieben, Lagerzugang über alle Ausbaustufen, zehn Minuten Kundensimulation sowie wiederholtes Umstellen während laufender Kundenwege.

## Handheld-Steuerung

Die Bedienung ist wie bei einer tragbaren Spielkonsole angeordnet: links ein dauerhaft sichtbares Steuerkreuz mit WASD-Beschriftung, rechts die A-Taste für Interaktion und die B-Taste für Zurück/Abbrechen. Unten mittig öffnet MENÜ alle bisherigen Shop-Funktionen: Laden öffnen/schließen, Pause, Einkauf/Import, Preise, Möbelkauf/Ausbau, Verschieben, Personal, Erfolge, Verwaltung/Spielstände und Hilfe. Die bisherige obere Buttonleiste entfällt. Die Oberfläche passt in die verfügbare Bildschirmhöhe, einschließlich Hoch- und Querformat.

Möbelkauf: MENÜ → Möbel kaufen → Möbel wählen. WASD, Pfeile oder das Steuerkreuz bewegen einen markierten Rastercursor samt Platzierungsvorschau. A, E, Enter oder Leertaste bestätigt den Kauf am gültigen Platz. Erst bei erfolgreicher Platzierung wird bezahlt. B oder Escape beendet den Bauauftrag kostenlos.

Verschieben: MENÜ → Möbel verschieben. Mit WASD/Steuerkreuz das vorhandene Möbel wählen, A/E zum Aufnehmen drücken, den Cursor zum Ziel bewegen und erneut A/E zum Abstellen drücken. Ware und Geld bleiben unverändert. Während Bau- und Verschiebemodus pausieren Figur, Kunden und Simulation. Die bestehende Kollisions- und Laufwegprüfung bleibt aktiv. Maus/Tap-Platzierung ist zusätzlich möglich; die Koordinaten berücksichtigen die unverzerrte Darstellung des Spielfelds.

Tastatur: WASD/Pfeile bewegen Figur oder Cursor. E/Enter/Leertaste entspricht A; Q öffnet das Menü; Escape bricht ab oder öffnet das Menü. Die direkten Tastenkürzel B für Möbelkauf und M für Verschieben bleiben verfügbar.

Geprüft: Bau und Verschieben vollständig mit Richtungssteuerung und A/E, kostenlose Abbrüche, Ablehnung belegter Ziele, einmaliger Geldabzug, Touch-Steuerkreuz, vollständiger Funktionsumfang im Menü, Pause im Möbelmodus sowie bisherige Kollisions-, Kunden- und Speicherfunktionen.

## Innenansicht, zweiteilige Kasse und vollständige Controller-Menüs

Die Kamera richtet sich automatisch auf den aktuellen Innenraum aus; beim Betreten des Lagers wechselt sie auf dessen Raumgrenzen. Der Zoomregler erlaubt 60–240 % der eingepassten Ansicht. Vergrößert folgt die Kamera der Spielfigur beziehungsweise dem Möbelcursor. Zeigerkoordinaten werden durch die Kamera zurückgerechnet; Zoom beeinflusst die Simulation und Kollisionen nicht. Der Zoom wird mitgespeichert. Das Bildschirm-Steuerkreuz erscheint nur auf einem Touchtelefon (Hoch- oder Querformat); am PC werden WASD/Pfeiltasten verwendet.

Die normale Kasse besteht aus zwei Feldern: Warenablage und Registrierkasse. Beide Felder gehören zum selben Möbel und besitzen gemeinsame Kollision und Verschiebung. Im Möbelmodus dreht R oder MENÜ → Kasse 90° drehen die Vorschau um 90°. Erst A übernimmt die gültige Platzierung/Drehung; B verwirft sie. Kunden stehen an der Kundenseite, Personal hinter dem Kassenfeld. Manuelles Kassieren erfordert die Rückseite. Bereits vorhandene Einzelkassen werden beim Laden an einen passenden zweifeldrigen Platz umgesetzt, ohne Geldabzug; betroffene Spielfiguren stehen danach wieder frei.

Warenmöbel zeichnen ihre tatsächlich ausgelegten Artikel: Einräumen fügt sichtbare Packungen/Flaschen hinzu, Käufe entfernen sie. Ein leeres Regal oder Kühlmöbel zeigt leere Fächer und „LEER“. Die fest gezeichneten Waren des ursprünglichen Regal-Sprites werden überdeckt. Eine Wandablage im Lager visualisiert vorhandene Produktarten samt Vorratsmengen; noch nicht angenommene Lieferkartons bleiben separat sichtbar.

Menüs werden mit den Richtungstasten/Steuerkreuz durchsucht, A/E aktiviert die markierte Funktion, B/Escape geht zurück. Der Dialog blockiert die A/B-Tasten nicht und benötigt keine zusätzlichen Schließen- oder Zurück-Buttons. Auswahlrahmen und automatisches Scrollen halten den aktiven Eintrag sichtbar. Auswahllisten und der Menü-Zoomregler lassen sich links/rechts ändern. Preise: Preisfeld markieren, A zum Bearbeiten, hoch/runter für ±0,05 €, links/rechts für ±0,50 €, A zum Speichern oder B zum Verwerfen. Es ist keine Texteingabe erforderlich. Maus/Tap-Bedienung bleibt zusätzlich möglich.

Geprüft: Kamera und Zoom mit korrekter Zeigerzuordnung, zweifeldrige Kollision, vier Kassenorientierungen mit Kundenbetrieb, Platzierungsgrenzen, kostenlose Drehung/Abbruch, Migration alter Kassen und Spielfigurpositionen, Menüaktivierung über A/B, Preisänderungen und Rücknahme, manuelles Kassieren von der Personalseite sowie zehn simulierte Minuten mit Personal und Verkäufen. Canvas-Ansichten für Mobil/Desktop, gefüllte/leere Warenmöbel und alle Kassendrehungen wurden gerendert und visuell geprüft. Eine vollständige Browserprüfung der Menüoberfläche war in der Erstellungsumgebung nicht verfügbar.

## Kompakte Kasse und Produkt-Auswahlraster

Die Kasse belegt jetzt 2 × 1 Felder; die Textlabels auf dem Tresen entfallen. Warenablage und Kassenfeld bilden ein Möbel. Vier Ausrichtungen in 90°-Schritten, Verschieben, Platzierungsvorschau sowie Kunden- und Personalseite bleiben erhalten. Kassen aus Spielständen mit der bisherigen dritten Fläche werden ohne Geldabzug verkleinert und behalten Position und Drehung.

Am Warenmöbel öffnet „Produkt im Auswahlraster wählen“ ein Raster mit ausschließlich passenden, freigeschalteten Produkten. Jede Kachel zeigt eine Produktabbildung, den Namen, den Lagerbestand und gegebenenfalls die bestehende Zuordnung. Auf schmalen Bildschirmen hat das Raster zwei Spalten, sonst vier. Die Richtungstasten bewegen die Auswahl räumlich im Raster. A übernimmt die Zuordnung und füllt aus dem Lager auf; B kehrt ohne Änderung zur Möbelansicht zurück. Beim Wechsel geht die alte Auslage vollständig zurück ins Lager. Das frühere Produkt-Dropdown entfällt.

Geprüft: zwei belegte Kassenfelder, sämtliche Drehungen einschließlich Kundenbetrieb und manuellem Verkauf, Migration rotierter dreiteiliger Kassen, Rasterbewegung mit zwei/vier Spalten, Auswahl und Abbruch, Beschränkung auf passende freigeschaltete Produkte sowie vollständiger Erhalt von Waren und Geld beim Produktwechsel. Kassenansichten wurden gerendert und visuell geprüft; die Menübedienung wurde als Steuerungslogik geprüft.

## Korrektur: Kassenbild und Papierkorb in den Ecken

Die Registrierkasse wird ohne den zusätzlichen Unterschrank aus dem früheren Bildausschnitt direkt auf einer durchgehenden 2×1-Tischplatte gezeichnet. Monitor, Tastatur und Kassenlade folgen der Ausrichtung. Die Darstellung ist für 0°, 90°, 180° und 270° geprüft; die physische Zweifeld-Fläche bleibt unverändert.

Eine feste Zeilengrenze ließ die Möbelsteuerung bisher eine Reihe vor der unteren Wand enden. Der Cursor und die Platzierungsprüfung verwenden jetzt die tatsächlichen Raumgrenzen. Der Papierkorb lässt sich damit in alle vier freien Raumecken stellen. Der zweifeldrige Eingang bleibt ausdrücklich freizuhalten. Bei jeder Möbelplatzierung werden jetzt sowohl Kunden- als auch Bedienseite sämtlicher Kassen geprüft. Ablehnungen nennen den konkreten Grund, etwa belegtes Feld, blockierter Eingang oder blockierter Bedienplatz.

Geprüft: Papierkorb per A/D-Pad in allen vier Ecken platzieren und erreichen, kein Geldabzug beim Verschieben, unterste Reihe mit dem Steuerkreuz erreichen, Sperre von Eingang und Kassenbedienplatz, sämtliche Kassendrehungen mit Kundenbetrieb, Produkt-Auswahlraster und Bestandsübernahme. Kassenansichten aller vier Richtungen wurden gerendert und visuell geprüft.

Die dauerhaft gespeicherten Logik-Regressionstests lassen sich mit `node tests/smoke.cjs` ausführen. Sie benötigen keine zusätzlichen Pakete; sie ersetzen keinen vollständigen Browsertest.

## Kassenseiten, vollständige Drehung und Bezahl-Minispiel

Die gesamte Kassengrafik einschließlich Tischplatte und Unterschrank dreht jetzt als eine Einheit. Zuvor blieb die sichtbare Unterschrankfront trotz veränderter Grundfläche nach unten ausgerichtet. Der erste Kunde steht direkt gegenüber dem Bedienplatz am Kassenfeld. Weitere Kunden erhalten getrennte Plätze ausschließlich auf der Kundenseite. Die Schlange rückt nach dem Verkauf oder Weggehen des ersten Kunden nach. Es wird immer der erste wartende Kunde bedient; später angekommene Kunden können ihn nicht überspringen.

A an einer nicht bedienbaren oder unbesetzten Kasse öffnet deren Ausrichtung und die Aktionen „Gesamte Kasse 90° drehen“ und „Kasse verschieben“. Das Vorschau-Hinweisfeld nennt Bedien- und Kundenseite. Seitliches Aufstellen ist mit 90° oder 270° möglich. Grafik, Kollision, Kundenplatz und Personalplatz verwenden dieselbe Drehung. Manuell wird am eigentlichen Bedienplatz kassiert.

Beim manuellen Verkauf startet das Bezahlspiel. Zuerst werden alle Artikel mit A/E gescannt, während ein Zeiger den grünen Bereich durchläuft. Danach folgt je nach Kunde:

- Bargeld: Münzen direkt antippen oder mit links/rechts auswählen und mit A hinzufügen. Sobald das Rückgeld stimmt, bestätigt ein weiterer Druck auf A die Zahlung. Hoch/runter ist zum Weiterkommen nicht erforderlich; runter kann optional eine Münze entfernen. „Leeren“ und „Ausgeben“ sind zusätzlich direkt antippbar. Soll- und Ist-Rückgeld sind sichtbar; geprüft wird in ganzen Cent.
- EC: Zwei weitere grüne Timing-Treffer autorisieren die Zahlung.

Erst die vollständig erfolgreiche Zahlung schreibt den Verkauf gut. Fehlversuche erlauben erneutes Probieren. B/Escape oder ein Menüwechsel bricht ohne Abbuchung ab; der Kunde wartet weiter. Das Spielgeschehen pausiert währenddessen, während das Minispiel läuft. Bei verdecktem Browserfenster pausiert auch dessen Zeiger. Kassenpersonal und SB-Kassen verkaufen weiterhin automatisch.

Die Regressionstests decken die gegenüberliegenden Plätze in allen vier Ausrichtungen, getrennte Warteschlangen und Nachrücken, vollständige Bar-/EC-Abläufe, falsches Rückgeld, Timing-Fehler, Abbruch, doppelte Eingaben sowie den Schutz vor vorzeitiger Gutschrift ab. Alle Kassenausrichtungen wurden erneut als Canvas-Grafiken gerendert und visuell geprüft. Die vollständige Browserprüfung der Minispieloberfläche steht weiterhin aus.

## Korrektur der Bedienseite und einfachere Barzahlung

Bei 90° steht das Personal links und der Kunde rechts. Die anderen Ausrichtungen drehen diese Zuordnung entsprechend mit. Grafik, Bedienprüfung, Personalwege, Warteschlange und Platzierungsprüfung verwenden dieselbe Seitenzuordnung. Bestehende Spielstände bleiben erhalten.

Der Münzcursor wechselt mit links/rechts ausschließlich zwischen Münzen. A fügt die gewählte Münze hinzu und wird bei passendem Rückgeld zu „Bezahlen“. Ein weiterer Druck schließt ab, ohne zuerst „Ausgeben“ anwählen zu müssen. Münzfelder können direkt angetippt werden. Die Tests prüfen die abgebildete Ausrichtung sowie Münzauswahl, Touch-Aktionen und Abschluss über A.
