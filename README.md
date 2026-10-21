# HYPERMARKT 3.10

Über index.html ohne Build-Schritt spielbar. Bestehende Spielstände, Kapital, Waren, Preise, Ausbau und Personal bleiben erhalten.

Die Eingangstür und die Blumen bleiben die Grafikvorlage. Warenregale und Kühlmöbel verwenden jetzt vollständige Originalrahmen mit geschlossener Abdeckung, Pfosten und Sockel. Nur die Warenfächer werden neu befüllt; ihre Fachböden enthalten keine fest eingebrannten Produkte. Die Bäckereiauslage verwendet saubere hölzerne Fächer ohne die im Konzept davorstehende Figur. Produktbilder am Sockel und unter den Schränken sind entfernt. Die Produktwahl im Regalmenü bleibt bebildert.

Die Kasse wird direkt in jeder der vier Ausrichtungen gezeichnet. Falls ein Bild noch nicht bereitsteht, bleibt eine sichtbare Ersatzdarstellung vorhanden. Der Bedienplatz, der zweifeldrige Grundriss, Kundenwarteschlange und Bezahlung bleiben an die gespeicherte Ausrichtung gebunden.

Die unveränderte Konzeptaufnahme ist die Quelle der sichtbaren Frontmaterialien. Quelle und Prüfsumme stehen in assets/reference-source.json. Eine vollständige pixelidentische Kopie der gesamten Konzeptszene wird damit nicht behauptet; Positionen, Ausbau und Warenmengen folgen dem Spielstand, ergänzte Richtungsansichten bleiben notwendig.

WASD/Pfeile bewegen, E/Leertaste interagieren, M verschiebt, R dreht, Q öffnet das Menü, Esc schließt oder bricht ab. Touchgeräte behalten das Steuerkreuz und die A/B-Tasten.

Validierung: 71 gezielte Integrationsgruppen sowie Browserprüfungen für die erhaltenen Originalabdeckungen, entfernte Sockelbilder, sichtbare Kassen in vier Richtungen, Ersatzdarstellung, Verschieben/Abbrechen/Speichern/Neuladen und Mobilansicht. Die vorhandenen Browserprüfungen für Bewegung, Möbelbedienung, Regalmenü und Barzahlung wurden ebenfalls ausgeführt. Der umfassende historische Testsatz lässt sich mit node tests/reference.cjs starten.
