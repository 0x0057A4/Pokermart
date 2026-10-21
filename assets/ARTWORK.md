# HYPERMARKT 3.9 — Originalvorlage und Komposition

## 3.11: Gemini-Spritebogen und Verkäufer

Die zusätzliche Originaldatei `image(20261021-054923).png` liegt bytegleich unter `gemini-source.png`: 1024 × 765 Pixel, SHA-256 `31a4614dcedcb30650bc5f97cd9b120af50d4c5e813bbaa7e7bae0dc5119ef0b`. `hd-renderer.js` schneidet Verkäufer, Warenregal, Kühlschrank und Gefriertruhe auf getrennte Flächen in nativen Pixelmaßen aus. Randverbundener weißer beziehungsweise nahezu schwarzer Hintergrund wird auf diesen Arbeitsflächen freigestellt. Die Quelle wird nicht verändert oder neu komprimiert.

Die blaue Verkäuferfigur ersetzt die bisherige Spielfigur und dient auch als Personal. Links stammt aus dem sauberen Seitenprofil, rechts spiegelt diese Ansicht. Gehschritte versetzen die ausgeschnittenen Fußbereiche um native Pixel. Produkte werden nur innerhalb der ausgewiesenen Regalöffnungen gezeichnet; im leeren Regal bleiben Rahmen und Fachböden ohne eingebrannte Produkte sichtbar. Zusätzliche geschlossene Möbelprofile sind Ergänzungen aus Metall- und Rahmenteilen, da der neue Bogen diese Ansichten nicht vollständig enthält. Die übrige Einrichtung und Kundschaft nutzt weiterhin die bisherigen Quellen.

Quelle: image(9).png, 1587 × 991, SHA-256 c74dc3a3a79176d9fd1c6152ed6accf74e8b2087ac7aff4d07011675ec0b33f0. Die Konzeptaufnahme wurde zuvor mit Imagegen für dieses Projekt erstellt und vom Nutzer als Zielbild vorgegeben. Sie enthält keine übernommenen Pokémon-Spielgrafiken.

Die unveränderten PNG-Bytes liegen in reference-source-*.js. reference-source.json hält Abmessungen, Dateigröße und Prüfsumme fest. reference-renderer.js verwendet diese Quelle direkt für Möbelfronten, Lebensmittel, Ofen, Kaffee, Pflanzen, Tische, Lagerbehälter, Theken, Eingang und Teile der Kasse. Rahmen der Kopf- und Hinweisleiste verwenden Abschnitte aus derselben Quelle. Die Bodenfarben wurden aus den freien Bodenflächen entnommen.

Waren aus der Konzeptaufnahme sind keine echten Inventareinträge: Die Fächer werden in der Laufzeitkomposition geleert und mit dem tatsächlichen Spielbestand bestückt. Produktzuordnungen bleiben an der unteren Leiste erkennbar. Originale Vorderkanten und Materialbereiche werden für ergänzende 90°-Profile und Rückseiten wiederverwendet; diese zusätzlichen Ansichten sind Rekonstruktionen. Andere nicht gezeigte Ausstattung sowie Figuren stammen weiterhin aus den vorhandenen eigenen Atlanten, jetzt mit höherer Abtastauflösung. Ein vollständiger pixelidentischer Szenenvergleich wird damit nicht behauptet.

Das Quelldokument wird nicht überschrieben. Alpha-Freistellung und Fachkomposition erfolgen auf getrennten Laufzeit-Canvasflächen. Keine externen Bildserver, Schrift-CDNs oder laufenden Bildgenerierungsdienste sind erforderlich.

## 3.10: geschlossene Möbel und direkte Kassenansichten

Die unveränderte Originalabdeckung wird für Warenregale und Kühlmöbel vollständig erhalten. Maskiert werden ausschließlich die Warenfächer. Die Fachböden stammen aus einer produktfreien Metallleiste. Dadurch bleibt ein leeres Regal tatsächlich leer. Die Bilder am Sockel entfallen; Produktbilder im Auswahlmenü bleiben bestehen. Die Bäckerei rekonstruiert die vom Personal verdeckte unterste Reihe aus einer sauberen Holzreihe derselben Vorlage. Die Kasse zeichnet ihre Originalfront beziehungsweise ihre gespeicherte Richtungsansicht direkt und besitzt eine sichtbare Ersatzdarstellung während des Ladens.

