# Pokermart 3.2 – Möbelansichten

`furniture-directions.png` ist ein transparenter Pixelatlas mit 15 separat gezeichneten Ansichten: Warenregal, Getränkekühlung, Gefriertruhe, SB-Backwarenregal und Kaffeemaschine jeweils von links, hinten und rechts. Die Vorderansichten bleiben im bisherigen Atlas. Die zwei Seitenansichten pro Möbel sind reine orthografische 90°-Profile, ohne sichtbare Vorderfläche und ohne nachträgliche Scherung. Der Renderer wählt den passenden Bildausschnitt; er verformt keine Vorderansicht.

Die Profile wurden mit dem eingebauten Imagegen-Werkzeug erstellt. Die früher erzeugten Dreiviertelansichten wurden verworfen. Ihre separat gezeichneten Rückansichten werden weiterverwendet. Produktionsschritt: transparente Ausschnitte proportional auf höchstens 128 Pixel Höhe (Gefriertruhe 88) skalieren, mit Nearest Neighbor abtasten und ohne Dithering in einen 336 × 720 Pixel großen PNG-Atlas packen. Die Laufzeit zeichnet ohne Bildglättung. Dynamische Ware liegt nur auf sichtbaren Ablagekanten bzw. im von oben sichtbaren Gefrierfach; geschlossene Seiten bleiben undurchsichtig.

## Finaler Prompt für die 90°-Profile

Referenzen: die zuvor erzeugten fünf Möbelfamilien ausschließlich für Material, Farbe und Form. Ihre schräge Kameraperspektive war ausdrücklich keine Vorlage.

```text
Create ONE production PIXEL ART SPRITE ATLAS of EXACT 90-DEGREE SIDE ELEVATIONS, the kind used for CAD orthographic side-view reference, rendered as detailed game pixel art. This corrects previous 45-degree renders. NOT ISOMETRIC, NOT 3/4, NOT 45 DEGREE, NO DIAGONAL EDGES, NO PERSPECTIVE, NO VISIBLE FRONT FACE, NO VISIBLE TOP PLANE. The viewer looks DIRECTLY AT THE FLAT SIDE PANEL of each piece of furniture, exactly perpendicular to it. All outlines and shelf/lid edges are horizontal or vertical. Show only one side surface. Do NOT show front shelving, front glass doors, front cabinet doors, screens or the interiors of trays. This is STRICT PURE SIDE PROFILE. The attached 5 images are references ONLY for material/color/identity, not for their wrong oblique viewing angle.
Layout: a clean 2-COLUMN by 5-ROW atlas on transparent background, exactly ten separate complete objects. Canvas 1024x2048. Left column = pure side elevation with service/front edge pointing LEFT. Right column = pure side elevation with service/front edge pointing RIGHT. Pairs are mirrored elevations. Same fixed profile viewpoint. Each object entirely in its own equal-size cell with large transparent gutters, centered with feet on same row baseline.
Row1: pure SIDE of steel dry-goods supermarket rack, blue-gray narrow end panel with bolts, perforated vertical uprights, four horizontal shelf END edges only, short feet. Cabinet depth ~45% of front width. No visible open front shelves whatsoever.
Row2: pure SIDE of tall beverage refrigerator: plain rectangular dark steel-blue end panel, a lower vent grille, tiny fasteners, cream lid edge, short feet. The glass front doors are completely hidden by this exact side profile. No bottles, no front face.
Row3: pure SIDE of a LOW horizontal chest freezer: low cream rectangular end panel, dark blue-gray trim, flat horizontal edge of glass lid, small lower grille, short feet. No visible lid surface or front face. Keep it short, squat, about half as tall as other objects.
Row4: pure SIDE of honey-oak bakery rack: slatted wooden end frame, steel narrow corner posts, ends of four horizontal trays seen precisely edge-on. No open tray interiors, no bread, no products, no frontal surface.
Row5: pure SIDE of compact black coffee machine attached on top of oak base cabinet: single connected upright profile, black side body with small grille, bean hopper side, an outlet only visible as a small edge silhouette, warm wooden cabinet SIDE panel with grain; no visible touchscreen, no cabinet door faces, no cups.
Style: crisp detailed high-resolution RPG PIXEL ART matching existing sprites, deliberate square pixel clusters, navy outlines, restrained warm oak and blue-gray steel palette, logical 128px asset height for tall items. Transparent background, no shadow/floor, no text, no labels, no props, no outlines around the cells. Main requirement: completely flat 90-degree side silhouettes, ALL faces in true orthographic side elevation, with ZERO foreshortened adjacent faces.
```

## Rückansichten

Gemeinsame Vorgaben der ersten Generierung: eigenes Sprite pro Richtung, feste RPG-Kamera, zusammenhängende Möbelkörper, dunkle Konturen, Blau-Grau und Eichenholz, gleiche Materialdetails wie die vorhandenen Vorderansichten, transparente Hintergründe, leere Auslagen, ohne Beschriftung, Boden oder Schatten. Für die Mitte jeder Dreierserie wurde eine echte Rückansicht mit Servicefläche nach Norden verlangt. Motive: Stahlregal mit Verstrebungen, Kühlschrankrückwand mit Lüftergitter, niedrige Gefriertruhe mit Glasschiebedeckeln, Holzbackwarenregal mit rückwärtigen Streben und Kaffeemaschine samt Holzunterschrank von hinten.

Die Regalrückwand erhielt diese gezielte Korrektur:

```text
Edit this production pixel-art sprite sheet. Change ONLY the CENTER sprite: it must be the true REAR / BACK of this steel supermarket shelf. Replace its open front shelves with a solid blue-gray steel back panel, recessed sheet-metal panels, horizontal reinforcement ribs, small bolts, and short feet. NO visible shelf compartments or cream price strips in the center rear view. Preserve the center sprite size, style, perspective and baseline. Preserve the LEFT and RIGHT directional sprites exactly as they are, pixel for pixel; they are already correct. All three remain isolated separate sprites on genuinely transparent background, in the same three-column sheet with gutters. Crisp detailed RPG pixel art, matching the reference; no text, no products, no floor or shadow.
```

Die Seiten dieser ursprünglichen Dreierserie gehören nicht zum ausgelieferten Atlas.
