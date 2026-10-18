# Pokermart 2.0 — Entwicklungsstand

Ein deutschsprachiges Kiosk- und Supermarktspiel. Das gesamte laufende Spiel steckt in genau einer `index.html`; kein Build, keine externen Skripte und kein Server erforderlich. Für GitHub Pages bleibt `main/index.html` der Einstiegspunkt.

## Status dieses Entwurfs

Die Fortschrittssysteme und die überarbeitete Raumdarstellung sind implementiert und automatisiert geprüft. Die vom Nutzer zuletzt gewünschte Supermarkt-Grafik liegt bislang nur als eingeblendete Bildvorschau vor. Ihre tatsächliche PNG-Datei muss noch bereitgestellt werden. Der Ausschnittplan für das 1024×576-Sheet und die Einbindung sind vorbereitet, aber die neuen Originalgrafiken sind **noch nicht angewendet oder visuell geprüft**. Bis dahin bleibt diese Version ein Entwurf; sie ersetzt nicht die laufende GitHub-Pages-Version.

## Spielen

- WASD / Pfeiltasten: laufen oder Möbelcursor bewegen.
- E, Enter oder runde A-Taste: interagieren und Menüs bestätigen.
- Q / Menü-Taste: alle Funktionen öffnen; B / Escape: zurück.
- Barzahlung: nur das Rückgeld eingeben und einmal auszahlen.
- Kartenzahlung: ein Treffer im grünen Bereich bezahlt den ganzen Warenkorb.
- Zum Putzen den Besen im Lager abholen und anschließend dort zurücklegen. Mit Besen hat Putzen auch am Kassenplatz Vorrang.

## Fortschritt

**Ladenbuch:** Acht Ränge und 14 konkrete Aufträge mit Geld- und Erfahrungsbelohnungen. Abgeholte Belohnungen können nicht erneut beansprucht werden. Ausbau und Automatisierung werden durch Rang und vorhandenes Geld freigeschaltet.

**Tagesaufträge und Wochenkalender:** Jeder Spieltag bietet ein Verkaufsziel sowie ein Ereignis. Der siebentägige Zyklus verändert Besuchshäufigkeit, Warenkorbgröße, Preisgrenzen, nachgefragte Warengruppen oder Lieferzeiten. Belohnungen sind einmal pro Spieltag abholbar. Ein Spieltag dauert vier Minuten; außerhalb des geöffneten Spiels vergeht keine Zeit.

**Lieferanten:** Kiez & Korn, Fernhandel Fuchs und Goldblatt unterscheiden sich bei Preis und Lieferzeit. Tatsächlich angenommene Lieferkartons erhöhen die Beziehung. Nach 3, 8, 16 und 30 Lieferungen steigt die Stufe: je 3 % Rabatt und 10 % kürzere Grundlieferzeit. Ein Lieferengpass verlängert regionale Lieferungen. Premium-Editionen benötigen Goldblatt-Stufe 1 und Ladenrang 7 und werden ausschließlich dort bestellt.

**Stammkunden:** Nach drei bezahlten Einkäufen gelten bekannte Profile als Stammkunden. Sauberkeit und erfolgreiche Besuche verbessern die Bindung; unzufriedenes Weggehen senkt sie. Stammkunden kehren gezielter wieder und erhalten eine längere Geduld. Ihre besonderen Bestellungen werden aus dem Lagerbestand erfüllt, verfallen nach einer Frist und zahlen 20 % Auftragsbonus.

**Ausstattung:** Aufgewertete Warenmöbel erhalten tatsächlich 36 bzw. 48 Plätze. Kassen-Upgrades verkürzen die automatische Bedienzeit und verbreitern das grüne Kartenfeld. Kühlmöbel benötigen mit Upgrades weniger Betriebskosten. Möbel behalten beim Aufwerten Position, Produkt und Bestand.

## Räume und Grafik

Die Darstellung läuft über einen gemeinsamen, anschließend ohne Glättung skalierten Szenenpuffer. Lagerregale, Lieferannahme und kleine Besenhalterung ersetzen die übergroßen Raumtexte. Hinweise und genaue Mengen erscheinen in Reichweite bzw. im Lagerbestandsmenü. Lagerregale besitzen tatsächliche Kollision; Besen und Annahme bleiben erreichbar.

Die Ausschnittdaten für das gewünschte neue Sprite-Sheet sind in `SUPERMARKET_CROPS` vorbereitet. Die PNG-Daten werden nach Bereitstellung in `SUPERMARKET_ATLAS_SOURCE` eingebettet. Der automatische Sheet-Test prüft Größe und Seitenverhältnis, anschließend müssen die Ausschnitte am Original visuell kontrolliert werden. Die im Entwurf enthaltenen Pixel-Ersatzgrafiken sind kein Ersatz für diesen noch offenen Assetwechsel.

## Spielstände

Der bisherige lokale Speicherschlüssel `pokermart-v1` bleibt bestehen. Alte Spielstände behalten Geld, Möbel, Waren, Ausbau und Personal. Fehlender Karrierefortschritt wird ergänzt; vorhandene Ausbaustufen erhalten einen passenden Mindest-Rang. Beziehungen, Aufträge, Möbelstufen und abgeholte Belohnungen werden gespeichert und beim Import validiert. Export und Import bleiben über Management erreichbar.

## Prüfung

```text
node tests/smoke.cjs
node tests/career.cjs
```

Die zweite Datei führt zusätzlich die bisherigen Tests aus: insgesamt 52 Prüfgruppen zu Kassen, Besen, Platzierung, Warenbestand, Aufträgen, Rängen, Lieferanten, Sonderbestellungen, Upgrades, Ereignissen und Speicherung. Simulationsläufe decken mehrere Spieltage und automatische Verkäufe ab. Raumansichten wurden über die tatsächlichen Canvas-Zeichenbefehle in PNGs gerendert und visuell geprüft. Das ersetzt keine vollständige Browserprüfung; diese sowie die Prüfung des neuen Sprite-Sheets stehen noch aus.
