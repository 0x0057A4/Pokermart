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
