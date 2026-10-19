# Pokermart 2.0.1

Ein deutschsprachiges Kiosk- und Supermarktspiel. Das gesamte laufende Spiel steckt in genau einer `index.html`; kein Build, keine externen Skripte und kein Server erforderlich. Für GitHub Pages bleibt `main/index.html` der Einstiegspunkt.

## Version 2.0.1 – Grafikpflege

Saubere Fliesen und einheitliche Wandmaterialien ersetzen die vergrößerten Bodenfugen. Figuren werden proportional und kleiner dargestellt. Verkaufsregale erhalten dunkle Rückwände, gleichmäßig verteilte Waren und Preisleisten. Der Tresen behält beim Drehen seine aufrechte Perspektive; Tastatur sowie Kunden- und Mitarbeiterseite folgen seiner Ausrichtung. Dezente Fußmarkierungen und kleinere Emotes halten den Blick auf das Spiel frei. Farben der Bedienoberfläche passen zu den Raummaterialien.

## Sprite-Sheet

Das Spiel verwendet das vom Nutzer bereitgestellte Supermarkt-Sprite-Sheet. Die Originaldatei wurde ohne Neuzeichnung in 77 Ausschnitte für Figuren, Möbel, Produkte, Lager, Umgebung und Emotes zerlegt. Schwarze Hintergrundflächen wurden am Rand transparent freigestellt. Ein gepackter PNG-Atlas mit 30 Kundenansichten ist direkt in der HTML eingebettet; alle Ausschnittgrenzen werden beim Laden geprüft. Das Spiel benötigt keine zusätzlichen Bilddateien oder Netzwerkzugriffe.

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

Die Sprites bleiben ohne Weichzeichnung. Die 2×1-Kasse besitzt für jede Ausrichtung einen passenden Tresenkörper. Tastatur, Mitarbeiterplatz und gegenüberliegender Kundenplatz folgen der Ausrichtung. Sichtbare Produkte in Verkaufs- und Lagerregalen entsprechen dem Bestand; leere Auslagen sind leer. Kleine Handwerkszeuge werden passend zur Figur dargestellt.

## Spielstände

Der bisherige lokale Speicherschlüssel `pokermart-v1` bleibt bestehen. Alte Spielstände behalten Geld, Möbel, Waren, Ausbau und Personal. Fehlender Karrierefortschritt wird ergänzt; vorhandene Ausbaustufen erhalten einen passenden Mindest-Rang. Beziehungen, Aufträge, Möbelstufen und abgeholte Belohnungen werden gespeichert und beim Import validiert. Export und Import bleiben über Management erreichbar.

## Prüfung

```text
node tests/smoke.cjs
node tests/career.cjs
node tests/atlas.cjs
```

Die zweite Datei führt zusätzlich die bisherigen Tests aus: insgesamt 52 Prüfgruppen zu Kassen, Besen, Platzierung, Warenbestand, Aufträgen, Rängen, Lieferanten, Sonderbestellungen, Upgrades, Ereignissen und Speicherung. Simulationsläufe decken mehrere Spieltage und automatische Verkäufe ab. Raumansichten wurden über die tatsächlichen Canvas-Zeichenbefehle in PNGs gerendert und visuell geprüft. Drei zusätzliche Atlas-Prüfgruppen kontrollieren die eingebettete PNG, sämtliche Ausschnitte und den aktivierten Sprite-Renderer. Das Sprite-Sheet wurde in Raumansichten visuell geprüft. Eine vollständige Prüfung im echten Browser steht noch aus.
