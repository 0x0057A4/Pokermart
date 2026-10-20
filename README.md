# Pokermart 3.0

Deutschsprachiges Kiosk- und Supermarktspiel. GitHub Pages startet über `main/index.html`. Die zugehörigen Pixelgrafiken liegen in lokalen Dateien unter `assets/` und werden vor der Spiellogik geladen. Es gibt keine fremden Laufzeit-Abhängigkeiten. Die vollständige Einzeldatei bleibt als separate Download-Fassung verfügbar.

## Backstube und Café

- **Lager-Backofen (480 €):** Fester Einbau im Lager. Brötchen und Croissants in Ladungen mit 6, 12 oder 24 Stück aus bezahlten Rohlingen backen. Backenergie wird sofort berechnet. Die Ofenladung bleibt beim Speichern erhalten; Menüs pausieren die Produktion. Optional beginnt bei weniger als 24 fertigen Stück automatisch eine neue Ladung.
- **SB-Backwarenregal (280 €):** Fertige Backwaren aus dem Lager einräumen und Brötchen oder Croissants im Produkt-Auswahlraster zuordnen. Pixel-Auslage und Produktbild zeigen das angebotene Sortiment.
- **Kaffeemaschine (420 €):** Bis zu 24 Bohnenportionen nachfüllen. Jede Tasse braucht eine Portion, zwei Spielsekunden und 0,10 € Zubereitungskosten. Je Ausbaustufe stehen 6–12 Tassen bereit. Verkauf an der Kasse.
- **Stehtisch (95 €):** Bezahlte Kaffee- und Backwarengäste suchen einen sauberen, freien Tisch. Nach der Pause bleiben Geschirr und Krümel zurück. Am Tisch mit Leertaste abräumen. Belegte Tische lassen sich weder verkaufen noch verschieben.
- **Personal:** Die Lagerkraft nimmt Lieferungen an, füllt Regale und Bohnen nach. Die Reinigungskraft räumt auch Tische ab. Für manuelles Aufwischen von Bodenschmutz bleibt der Besen erforderlich.
- **Fortschritt:** Eigene Aufträge mit Geld und Erfahrung für gebackene Ware, verkauften Kaffee und abgeräumte Tische.
- **Grafik:** Zwölf passende Pixel-Assets für die neuen Möbel, Rohwaren, fertige Produkte und benutztes Geschirr.

Alle neuen Einrichtungen kosten zusammen 1.275 € und passen bereits in den Startkiosk. Vom unveränderten Startkapital von 2.600 € bleiben 1.325 € für Ware und Betrieb übrig. Empfohlene Verkaufspreise: Brötchen 1,20 €, Croissant 1,90 €, Kaffee 2,80 €.

## Automatisch nachkaufen

Im jeweiligen Regal- oder Maschinenmenü einschalten. Alle zwei Spielsekunden wird der gemeinsame Bestand aus Lager, Auslagen, Bohnenreservoirs, Ofenladung und bereits bestellten beziehungsweise angelieferten Kartons geprüft. Bei niedrigem Bestand werden bezahlte Zwölfer-Kartons bestellt. Mehrere Regale erzeugen keine doppelten Bestellungen. Die globale Geldreserve beginnt bei 200 € und lässt sich in 50-€-Schritten ändern.

Für Backwaren bestellt die Automatik Rohlinge, für Kaffee Bohnen. Lieferungen müssen weiterhin angenommen und die Rohwaren verarbeitet werden. Lieferantenfreigaben, Rabatte, Lieferzeiten und die Goldblatt-Beschränkung der bisherigen exklusiven Produkte gelten weiter.

## Bedienung

| Eingabe | Funktion |
| --- | --- |
| WASD / Pfeile | Figur, Möbelcursor oder räumliche Menüauswahl bewegen |
| Leertaste / E / Enter | Interagieren, auswählen, bestätigen |
| B / Escape | Zurück, Preisänderung verwerfen, Möbelmodus abbrechen |
| Q / Tab | Spielmenü öffnen beziehungsweise zurück |
| F / M / R | Möbel kaufen / verschieben / Kasse drehen |
| I / P / C | Lager / Preise / Backstube und Café |
| ↑ ↓ beim Bearbeiten eines Preises | ±0,05 € |
| ← → beim Bearbeiten eines Preises | ±0,50 € |
| Ziffern, Komma, Rücktaste an der Kasse | Rückgeld direkt eingeben |

Die Auswahl folgt der sichtbaren Anordnung der Schaltflächen. Leertaste löst eine Aktion einmal aus, auch bei fokussierten HTML-Buttons. Auf Mobiltelefonen bleiben Steuerkreuz, A/B und Menü verfügbar. Barzahlung verlangt nur den Wechselbetrag; bei Karte bezahlt ein Treffer den gesamten Warenkorb.

## Speicherstand

Alte Spielstände mit 160 Produkten werden auf 166 Produkte erweitert. Geld, eigene Preise, Möbel und Waren bleiben erhalten; neue Zutaten starten ohne Gratisbestand. Ofenladung, Nachkauf, Reserve und Geschirr werden gespeichert. Bereits bezahlte Tischgäste erzeugen beim Speichern keine zusätzlichen Produkte. Der lokale Schlüssel bleibt `pokermart-v1`. Export und Import liegen im Management. Ohne geöffnetes Spiel vergeht keine Zeit.

## Prüfen

```sh
node tests/cafe.cjs
```

Die Gesamtsuite umfasst **83 Prüfgruppen**: Kasse in allen Ausrichtungen, Kollisionen, Menüs und Preise, Speicherstände, Richtungsbilder, Fortschritt, Warenflüsse, Produktion, Nachbestellung und Tischgäste. Enthalten sind sechs bezahlte Waren-/Personal-Kampagnen über insgesamt 15 Spieltage und alle vier Ladengrößen sowie ein achtminütiger Café-Dauertest. Bild-Crops werden gegen die echten PNG-Abmessungen geprüft.

---

## Frühere Version 2.2

Ein deutschsprachiges Kiosk- und Supermarktspiel. Das gesamte laufende Spiel steckt in genau einer `index.html`; kein Build, keine externen Skripte und kein Server erforderlich. Für GitHub Pages bleibt `main/index.html` der Einstiegspunkt.

## Version 2.2 – Kunden, Kasse, Beschilderung und Wirtschaft

**20 neue Kundendesigns:** Insgesamt 28 eigenständige Figuren mit 112 Richtungsbildern. Alle Ausgangsbilder sind 128 Pixel hoch. Neue Besucher wählen aus allen 28 Designs; bekannte Kundenprofile kehren bevorzugt mit einem festen Design zurück. Frisur und Kleidung bleiben während des gesamten Einkaufs gleich.

**Barzahlung:** Das auszuzahlende Rückgeld steht groß und mittig mit einem Pixel-Münzsymbol. Einkaufssumme und gegebener Betrag stehen darüber, die eigene Eingabe gesondert darunter. Weiterhin nur den Rückgeldbetrag eingeben und einmal auszahlen; Kartenzahlung bleibt ein Treffer pro Warenkorb.

**Produktbilder:** Regale, Kühlmöbel und Gefriertruhen tragen ein Produktschild mit Bild und kurzer Bezeichnung. Das Schild bleibt bei leerer Auslage sichtbar. Zehn neue Bilder entsprechen den tatsächlichen Grundprodukten und erscheinen auch im Preis- und Einkaufsmenü. Produkte behalten ihr Seitenverhältnis.

### Neue Wirtschaft

Die Preisempfehlungen, Preisakzeptanz, Warenkörbe, Besucherzahl und Kosten sind aufeinander abgestimmt. Grundsortiment (EK-Richtwert / empfohlener VK pro Stück):

| Produkt | EK | VK |
| --- | ---: | ---: |
| Mineralwasser | 0,60 € | 1,90 € |
| Apfelsaft | 1,00 € | 3,20 € |
| Cola | 0,90 € | 2,90 € |
| Milch | 1,10 € | 3,00 € |
| Brot | 1,20 € | 3,90 € |
| Reis | 0,85 € | 2,90 € |
| Nudeln | 0,75 € | 2,60 € |
| Chips | 1,05 € | 3,50 € |
| Vanilleeis | 1,40 € | 4,50 € |
| Tiefkühlpizza | 1,80 € | 5,90 € |

Varianten skalieren beide Preise um 12 % pro Variantenstufe. Lieferantenrabatte gelten weiter. Empfehlungen werden von allen Profilen bei normalem Bestand akzeptiert; deutlich überhöhte Preise bleiben ablehnbar.

Kunden wünschen normalerweise 3–5 Artikel, nehmen 1–2 Stück je Regalbesuch und verlassen den Einkauf seltener vorzeitig. Der Grundeinlass erfolgt alle fünf Sekunden, verändert durch Ereignisse, Ruf, Sicherheit und Ladengröße. Gleichzeitig können 7 / 11 / 16 / 22 Kunden unterwegs sein.

Löhne je vollständig geöffnetem Spieltag: Kasse 22 €, Lager 20 €, Reinigung 14 €, Sicherheit 18 €. Geschlossene Zeit verursacht keine Löhne. Grundbetrieb: 6 / 10 / 16 / 24 € plus Kühlung, Tiefkühlung und SB-Kassen; geschlossen bleibt 30 % Standby-Betrieb. Ausbauten kosten 1.400 / 3.200 / 6.200 €. Rangvoraussetzungen bleiben erhalten. Neue Spiele erhalten mehr Anfangsvorrat bei weiterhin 2.600 € Startgeld.

**Management:** Tagesumsatz, Wareneinsatz nach EK-Richtwert, laufende Kosten, Gewinn und Handelsgeldfluss werden getrennt angezeigt. Ein 14-Tage-Verlauf bleibt im Spielstand. Wareneinkäufe werden sofort bezahlt; Wareneinsatz dient zur Gewinnanzeige und wird nicht erneut von der Kasse abgezogen. Möbel, Ausbau und Belohnungen gehören nicht zum Handelsgeldfluss.

Unbezahlte Ware abgebrochener Einkäufe kehrt einmalig ins Lager zurück. Gestohlene Ware zählt als Warenschwund. Bisheriges Kapital und Inventar bleiben erhalten. Nur erkannte alte Standardpreise werden migriert; selbst gesetzte Preise bleiben stehen. Im Preismenü lassen sich Empfehlungen ausdrücklich per Button übernehmen.

### Balancing-Nachweis

Sechs deterministische Kampagnen mit insgesamt 15 Spieltagen decken alle vier Ladenstufen ab. Jeder Lauf beginnt mit leeren Auslagen und ohne Vorrat; alle Lieferungen werden bezahlt. Kassen-, Lager- und Reinigungspersonal werden eingestellt und regulär bezahlt. Keine Auftragsbelohnungen werden abgeholt. Alle Kampagnen erzielen positive operative Gewinne und stimmen mit dem tatsächlichen Geldfluss überein. Die drei Kiosk-Läufe gewinnen über drei Tage 417,03 / 639,19 / 418,85 € gegenüber der Kasse nach Einstellungskosten. Die Resultate sind Testfälle und keine garantierten Erträge bei beliebiger Spielweise.

## Frühere Version 2.1.1 – Kunden-Assets

Acht eigenständige Kundendesigns mit verschiedenen Frisuren, Kleidungsstücken, Altersgruppen und Hauttönen besitzen jeweils echte Ansichten von vorn, hinten, links und rechts. Die 32 Ausgangs-Sprites sind 128 Pixel hoch. Jedes der 20 Kundenprofile bleibt fest einem Design zugeordnet; Farbe und Aussehen wechseln beim Richtungswechsel nicht. Bewegung nutzt dieselben Zeichenmaße und Fußpositionen wie der Verkäufer. Kunden mit Waren im Korb tragen einen sichtbaren Einkaufskorb. Grafik und Profilzuordnung ändern keine Waren, Preise oder Spielstände.

## Version 2.1 – Detailreiche Pixel-Assets

29 neue Sprite-Ausschnitte ersetzen die sichtbaren Figuren und Möbel: vier Kassenansichten, vier Richtungen für Verkäufer und Kunden, Verkaufs- und Lagerregale, Kühlmöbel, Automaten, Müllbehälter, Pflanze, Besen, Karton, Produkte und Einkaufskorb. Figuren besitzen 96 Pixel hohe Ausgangsbilder; Kundenmäntel erhalten unterschiedliche Farbvarianten. Harte Transparenz entfernt Farbsäume. Die Szene wird mit 2500 × 1600 Pixeln statt 1250 × 800 Pixeln gezeichnet und ohne Weichzeichnung ausgegeben. Die höheren Detailstufen ändern keine Kollisionen oder Spielstände.

## Frühere Grafikpflege

Saubere Fliesen und einheitliche Wandmaterialien ersetzen die vergrößerten Bodenfugen. Figuren werden proportional und kleiner dargestellt. Verkaufsregale erhalten dunkle Rückwände, gleichmäßig verteilte Waren und Preisleisten. Der Tresen behält beim Drehen seine aufrechte Perspektive; Tastatur sowie Kunden- und Mitarbeiterseite folgen seiner Ausrichtung. Dezente Fußmarkierungen und kleinere Emotes halten den Blick auf das Spiel frei. Farben der Bedienoberfläche passen zu den Raummaterialien.

## Sprite-Sheet

Das vom Nutzer bereitgestellte Supermarkt-Sprite-Sheet bleibt als Fallback im Spiel. Die Originaldatei wurde ohne Neuzeichnung in 77 Ausschnitte für Figuren, Möbel, Produkte, Lager, Umgebung und Emotes zerlegt. Schwarze Hintergrundflächen wurden am Rand transparent freigestellt. Dieser gepackte Fallback-PNG-Atlas mit 30 Kundenansichten ist direkt in der HTML eingebettet; alle Ausschnittgrenzen werden beim Laden geprüft. Das Spiel benötigt keine zusätzlichen Bilddateien oder Netzwerkzugriffe.

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
node tests/premium.cjs
node tests/customers.cjs
node tests/balance.cjs
```

Die zweite Datei führt zusätzlich die bisherigen Tests aus: insgesamt 52 Prüfgruppen zu Kassen, Besen, Platzierung, Warenbestand, Aufträgen, Rängen, Lieferanten, Sonderbestellungen, Upgrades, Ereignissen und Speicherung. Simulationsläufe decken mehrere Spieltage und automatische Verkäufe ab. Raumansichten wurden über die tatsächlichen Canvas-Zeichenbefehle in PNGs gerendert und visuell geprüft. Drei zusätzliche Atlas-Prüfgruppen kontrollieren die eingebettete PNG, sämtliche Ausschnitte und den aktivierten Sprite-Renderer. Das Sprite-Sheet wurde in Raumansichten visuell geprüft. Eine vollständige Prüfung im echten Browser steht noch aus.

Drei zusätzliche Prüfgruppen für Version 2.1 prüfen sämtliche 29 neuen Ausschnitte, Richtungsbilder, den Szenenpuffer in doppelter Auflösung, leere Auslagen und den Besen. Zusammen mit den bisherigen Prüfungen bestehen 58 unterschiedliche Prüfgruppen. Native Ansichten von Laden, Lager und allen vier Kassenausrichtungen wurden visuell geprüft; ein vollständiger Browsertest steht aus.

Version 2.1.1 ergänzt drei Prüfgruppen: Vollständigkeit und Grenzen aller 32 Kunden-Sprites, feste Profilzuordnung und Richtungswechsel sowie Darstellung einer gemischten Kundengruppe ohne Spielstandänderung. Insgesamt bestehen 61 unterschiedliche Prüfgruppen. Alle acht Figuren wurden im Laden und an der gedrehten Kasse visuell geprüft. Ein vollständiger Browsertest steht weiterhin aus.

Version 2.2: 68 unterschiedliche Prüfgruppen bestanden. Neue Prüfungen decken Preisakzeptanz, Migration, Kosten und Tagesabschluss, Warenrückgabe, Schwund, die große Rückgeldanzeige, korrekte Produktbilder und die Kampagnen mit bezahltem Warenbestand ab. Kunden und beschilderte Räume wurden über native Canvas-Zeichenbefehle visuell geprüft. Ein vollständiger Browsertest steht aus.

