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
