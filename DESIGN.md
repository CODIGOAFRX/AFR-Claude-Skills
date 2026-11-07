---
name: AFR · Claude Skills
description: La cinta de skills para Claude Code de Pedro Gómez, grabada como una mixtape con su carátula J-card.
colors:
  negro: "#121314"
  negro-2: "#1b1c1f"
  negro-3: "#26282c"
  pozo: "#0b0b0c"
  blanco: "#ecebef"
  gris: "#a9a7b2"
  naranja: "#ff5a1f"
  naranja-labio: "#a3360f"
  amarillo: "#ffc21a"
  agua: "#2bb3a6"
  piloto: "#e5322d"
  piloto-apagado: "#5a1410"
  papel: "#ece8f4"
  boli: "#2a3b8f"
  tinta-papel: "#19172a"
  tinta-papel-suave: "#545068"
  hueco: "#a8350a"
  cinta: "#8a5a3c"
  ojo-fondo: "#2a2414"
  ojo-tinta: "#e4d9b8"
  dymo-global: "#1f7a4d"
  dymo-proyecto: "#1d4fa8"
  dymo-opcional: "#a84c0c"
  dymo-ideas: "#6b3fa0"
  dymo-radar: "#45474e"
  escena: "#e9e6ef"
typography:
  display:
    fontFamily: "Permanent Marker, Archivo Variable, cursive"
    fontSize: "clamp(40px, 7vw, 92px)"
    fontWeight: 400
    lineHeight: 1
  headline:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(28px, 5.4vw, 64px)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(26px, 2.8vw, 36px)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 118"
  notes:
    fontFamily: "Permanent Marker, Archivo Variable, cursive"
    fontSize: "clamp(36px, 5vw, 60px)"
    fontWeight: 400
    lineHeight: 1.05
  track:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.25
    fontVariation: "'wdth' 106"
  lead:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(16px, 1.4vw, 19px)"
    fontWeight: 500
    lineHeight: 1.55
  body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label-wide:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.08em"
    fontVariation: "'wdth' 125"
  label-narrow:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "0.16em"
    fontVariation: "'wdth' 75"
  biro:
    fontFamily: "Reenie Beanie, Archivo Variable, cursive"
    fontSize: "26px"
    fontWeight: 400
    lineHeight: 1.05
  mono:
    fontFamily: "JetBrains Mono Variable, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.6
    fontFeature: "'tnum' 1"
  code:
    fontFamily: "JetBrains Mono Variable, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  objeto: "10px"
  mando: "6px"
  dymo: "3px"
  ventana: "40px"
  piloto: "50%"
spacing:
  gutter: "clamp(16px, 3.5vw, 40px)"
  ancho: "1240px"
  lomo: "72px"
  lomo-movil: "52px"
  bloque: "clamp(48px, 6vw, 80px)"
  caratula: "clamp(18px, 2.4vw, 28px)"
  pista: "12px 6px"
components:
  rec-grande:
    backgroundColor: "{colors.naranja}"
    textColor: "#1a0d05"
    rounded: "{rounded.mando}"
    padding: "10px 22px 10px 16px"
    height: "52px"
  rec-grande-hover:
    backgroundColor: "#ff7140"
  rec-pequeno:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.negro}"
    rounded: "{rounded.mando}"
    padding: "8px 14px 8px 11px"
    height: "38px"
  rec-pequeno-hover:
    backgroundColor: "#ffffff"
  rec-pirata:
    backgroundColor: "{colors.negro-3}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.mando}"
    padding: "10px 18px 10px 14px"
    height: "44px"
  rec-pirata-hover:
    backgroundColor: "#34373c"
  dymo-global:
    backgroundColor: "{colors.dymo-global}"
    textColor: "#ffffff"
    typography: "{typography.label-narrow}"
    rounded: "{rounded.dymo}"
    padding: "4px 9px"
  dymo-proyecto:
    backgroundColor: "{colors.dymo-proyecto}"
    textColor: "#ffffff"
    typography: "{typography.label-narrow}"
    rounded: "{rounded.dymo}"
    padding: "4px 9px"
  dymo-opcional:
    backgroundColor: "{colors.dymo-opcional}"
    textColor: "#ffffff"
    typography: "{typography.label-narrow}"
    rounded: "{rounded.dymo}"
    padding: "4px 9px"
  dymo-ideas:
    backgroundColor: "{colors.dymo-ideas}"
    textColor: "#ffffff"
    typography: "{typography.label-narrow}"
    rounded: "{rounded.dymo}"
    padding: "4px 9px"
  dymo-radar:
    backgroundColor: "{colors.dymo-radar}"
    textColor: "#ffffff"
    typography: "{typography.label-narrow}"
    rounded: "{rounded.dymo}"
    padding: "4px 9px"
  dymo-filtro:
    backgroundColor: "{colors.negro-3}"
    textColor: "#ffffff"
    typography: "{typography.label-narrow}"
    rounded: "{rounded.dymo}"
    padding: "4px 9px"
    height: "36px"
  casete:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta-papel}"
    rounded: "{rounded.objeto}"
    padding: "clamp(18px, 2.6vw, 30px) clamp(18px, 3vw, 36px) 0"
  cara:
    backgroundColor: "{colors.negro-2}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.objeto}"
    padding: "clamp(18px, 2.2vw, 26px)"
  pirata:
    textColor: "{colors.blanco}"
    rounded: "{rounded.objeto}"
    padding: "16px 20px"
  pista-boton:
    textColor: "{colors.blanco}"
    typography: "{typography.track}"
    rounded: "{rounded.mando}"
    padding: "{spacing.pista}"
  pista-num-activa:
    backgroundColor: "{colors.amarillo}"
    textColor: "{colors.negro}"
    typography: "{typography.mono}"
    rounded: "{rounded.dymo}"
  pletina:
    backgroundColor: "{colors.negro-2}"
    rounded: "{rounded.objeto}"
  pletina-etiqueta:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.boli}"
    rounded: "{rounded.mando}"
    padding: "8px 14px 18px"
  pletina-play:
    backgroundColor: "{colors.negro-3}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.mando}"
    size: "44px"
  buscar:
    backgroundColor: "{colors.negro-2}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.mando}"
    padding: "0 16px"
    height: "48px"
  lomo:
    backgroundColor: "{colors.negro-2}"
    textColor: "{colors.blanco}"
    width: "{spacing.lomo}"
  lomo-contador:
    backgroundColor: "{colors.pozo}"
    textColor: "{colors.amarillo}"
    rounded: "{rounded.mando}"
    padding: "6px 7px"
  mision:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta-papel}"
    rounded: "{rounded.objeto}"
    padding: "clamp(20px, 3vw, 32px)"
  aviso:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta-papel}"
    rounded: "{rounded.mando}"
    padding: "12px 18px"
  escena:
    backgroundColor: "{colors.escena}"
    textColor: "{colors.tinta-papel}"
    rounded: "{rounded.mando}"
---

# Design System: AFR · Claude Skills

## Overview

**Creative North Star: "Cinta de recopilación"**

The shelf is a mixtape Pedro records for the community, and the page is its packaging seen up close. The ground is the black of a J-card insert. On it sit printed and handwritten things: a lilac paper cassette label with the title in marker, two "sides" (Cara A · Pack web, Cara B · Pack backend) with their tracklists and a REC key each, a dubbed bootleg tape for Everything Claude Code, Dymo embossed-tape labels for every skill's state, and, beside each block's tracklist, a tape deck (pletina) where that track's demo plays. A fixed spine (lomo) runs down the left with the title, the block index and a tape counter.

Density is that of a tracklist, not a card gallery: tracks are numbered rows with a provenance line (author, licence, stars) and a Dymo state, expanding in place to Pedro's notes and the record keys. The material vocabulary is physical and limited: paper, marker, biro, embossed plastic tape, brown tape oxide, a red record pilot, and three diagonal bands of orange, yellow and teal that cross the label, cap the spine and sash each side card. Motion is the motion of a tape machine: keys sink, the pilot blinks, reels turn and the counter advances.

Confirmed rejections from the direction contract: the dark directory of identical cards, and the split product sheet repeated zigzag 38 times.

**Key Characteristics:**
- J-card black ground (negro) with paper labels (papel) as the only light surfaces.
- Three bands, always together and always in order: naranja, amarillo, agua.
- Archivo as the cassette's printed type, pushed across its width axis from 75% to 125%; marker and biro for anything "written by hand".
- Every copy action is a REC key with a pilot light; the red pilot means recording and nothing else.
- Each state is an embossed Dymo label in a fixed colour.
- Two radii for the world (10px objects, 6px controls) plus 3px for Dymo tape.
- Demos live inside a deck's stage and are allowed to look like other skills; the frame around them never does.

## Colors

A black J-card printed in three saturated band colours, with cool lilac paper and blue biro on top, and one red reserved for recording.

### Primary
- **Banda naranja** (naranja): first band, the face of the two pack REC keys (Cara A, Cara B), and the strike-through on the bootleg strip. Its deeper **labio naranja** (naranja-labio) is only the REC key's bottom lip.
- **Piloto rojo** (piloto): the record light. Lit on the REC key's pilot while copying, on the spine counter (text and dot) while recording, and as the dot of the toast that confirms a copy. **Piloto apagado** (piloto-apagado) is the same lamp unlit, visible at rest on every REC key and on the spine.

### Secondary
- **Banda amarilla** (amarillo): the working accent on black. Focus ring, "Cara A/B" side marks, handwritten side notes, the "Notas de la carátula" marker title, the active track (number chip and name), link and track hovers, GitHub stars, the counter digits, the result line under the search, the search caret, the deck scrub thumb and the disclosure triangles.

### Tertiary
- **Banda agua** (agua): appears only as the third band: the cassette stripes, the spine cap, the side-card sash and the double stripe at the foot of the deck label.

### Neutral
- **Negro J-card** (negro): page ground, theme colour, text on yellow and on white keys.
- **Negro tarjeta** (negro-2): side cards, deck body, spine, search field, track hover.
- **Negro marco** (negro-3): dividers between tracks, the spine border, the bootleg REC key, the deck play key, "Todas" filter, empty-stage ground.
- **Pozo** (pozo): recessed wells: the spine counter window and the prompt preview `pre`.
- **Blanco de cinta** (blanco): body text on black, the small REC keys, the 2px rule under each block heading.
- **Gris de carátula** (gris): secondary text (side descriptions, block mottos, track provenance, spine links, "Cuándo" notes).
- **Papel lila** (papel): cassette label, deck label, mission insert, bootleg strip, toast. The only light surfaces of the frame.
- **Tinta de papel** (tinta-papel): printed text on paper and the inner hairline of the cassette (at 14% alpha); also the dark focus ring used on paper. **Tinta suave** (tinta-papel-suave) is the paper's secondary print: the cassette spec line and the deck's track number.
- **Boli** (boli): blue biro/marker ink, only for handwriting on paper: the cassette title, the deck's track name, the bootleg strip.
- **Óxido de cinta** (cinta): the played portion of the deck's scrub bar; the reels use darker oxide browns (#5a3a28, #3c281c) as one-off illustration fills.
- **Hueco** (hueco): the editable blanks in the mission template, dashed underline in burnt orange on paper.
- **Ojo** (ojo-fondo, ojo-tinta): the "Ojo" caution note under a track, a dim amber slip with cream text.
- **Escena** (escena): the neutral stage ground each demo mounts on before painting its own world.

### Dymo states
Embossed-tape colours, white letters, fixed per state from `ESTADOS`: **Global** (dymo-global, green), **Por proyecto** (dymo-proyecto, blue), **Opcional** (dymo-opcional, rust), **Solo ideas** (dymo-ideas, violet), **En el radar** (dymo-radar, graphite). "Todas" uses negro-3.

### Named Rules
**The Three Bands Rule.** Orange, yellow and teal appear together, in that order, as bands, stripes or a sash. Teal never appears alone as an accent, text colour or fill.

**The Red Means REC Rule.** Piloto red marks recording state only: the REC pilot, the spine counter while recording, the copy-confirmation dot. Errors use grey, never red.

**The Paper Is the Only Light Rule.** On the black frame, every light surface is a paper object (cassette, deck label, mission, bootleg strip, toast). There are no white or light-grey panels.

## Typography

**Display Font:** Permanent Marker (with Archivo Variable, cursive)
**Body Font:** Archivo Variable, width axis 75–125 (with Archivo, system-ui)
**Handwriting Font:** Reenie Beanie (with Archivo Variable, cursive)
**Label/Mono Font:** JetBrains Mono Variable (with ui-monospace)

**Character:** Archivo plays the cassette's printed technical type: heavy, uppercase, stretched wide for headings and squeezed narrow for spine and Dymo labels. Permanent Marker is what Pedro writes on the label; Reenie Beanie is the biro note in the margin. JetBrains Mono only measures and quotes: numbers, counters, slugs, commands and prompts.

### Hierarchy
- **Display** (Permanent Marker 400, clamp(40px, 7vw, 92px), 1; 36px under 700px): the cassette title, boli on paper, rotated -1.2deg, balanced wrap.
- **Notes** (Permanent Marker 400, clamp(36px, 5vw, 60px), 1.05): "Notas de la carátula" in amarillo on black, rotated -1deg. The same voice at 22px names the track on the deck label.
- **Headline** (Archivo 800, clamp(28px, 5.4vw, 64px), 0.95, width 125%, -0.02em, uppercase): block headings, with a 2px blanco rule beneath.
- **Title** (Archivo 800, clamp(26px, 2.8vw, 36px), 1, width 118%, -0.01em, uppercase): side card headings; the bootleg title uses it at 20px.
- **Track** (Archivo 700, 18px, 1.25, width 106%): track names in the tracklist.
- **Lead** (Archivo 500, clamp(16px, 1.4vw, 19px)): the printed line under the cassette title, max 34em.
- **Body** (Archivo 400, 16px, 1.55): all running text; notes cap at 62ch, mottos at 62ch, side descriptions at 46ch.
- **Label wide** (Archivo 700, 12px, width 125%, 0.08em, uppercase): the cassette's spec line ("38 pistas · vol. 1 · revisada el…"); the search label uses it at 13px/118%/0.06em.
- **Label narrow** (Archivo 700–800, 11–13px, width 75%, 0.14–0.16em, uppercase): spine index, Dymo labels and filters, tracklist disclosure.
- **Biro** (Reenie Beanie 400, 24–28px, ~1.05): side notes in amarillo, the "Cuándo"/"Ojo" lead words, the bootleg strip text, the empty-stage message.
- **Mono** (JetBrains Mono 600, 13–15px, tabular figures): track numbers, the spine counter, filter counts, repo slugs. **Code** (400, 12px/1.6) for prompt previews; the mission template is mono 15px/1.9 on paper.

### Named Rules
**The Width Axis Rule.** Archivo carries hierarchy through its width axis as much as its weight: wide (118–125%) for headings and printed spec lines, near-normal (106–112%) for track names and keys, narrow (75%) for spine and Dymo tape. Never substitute a second sans.

**The Hand Is for Paper and Margins Rule.** Permanent Marker titles a label; Reenie Beanie annotates in a line or two. Neither sets paragraphs, buttons or data.

**The Mono Measures Rule.** JetBrains Mono is for numbers, counts, slugs, commands and prompts only, never for headings, labels or prose.

## Layout

A fixed spine plus a centred column. The spine (lomo) is 72px wide, fixed to the left edge, and `main` and the footer are offset by it; content runs in a 1240px max column with a fluid gutter (clamp(16px, 3.5vw, 40px)). Under 900px the spine becomes a 52px fixed top bar (stripe cap, title, horizontally scrolling block index, counter) and the repo link drops.

The first viewport is the carátula: the full-width cassette label on top (label text left, reel window right; the window floats top-right over the title under 700px), then the insert with the two sides, asymmetric 1.35fr / 1fr from 1000px and stacked below, and the bootleg tape as a separate dashed band underneath. Below 1000px the side tracklists start folded.

Each block is a headline with motto and optional pack row, then a two-column body from 1000px: tracklist 5fr, deck 6fr, with the deck sticky at 24px from the top. Below 1000px the deck moves above the tracklist. Blocks are spaced clamp(48px, 6vw, 80px) apart; track rows use 12px 6px padding with a 2.6em number column. Breakpoints in use: 600, 700, 900 and 1000px.

## Elevation & Depth

Depth is physical and shallow: objects cast one soft drop shadow downward as if lying on the J-card, recessed parts (counter, reel window) are inset, and pressable transport keys have a solid lip that collapses when pressed. There is no glass, blur or glow except the lit pilot.

### Shadow Vocabulary
- **Objeto sobre la carátula** (`box-shadow: 0 1px 0 #ffffff80 inset, 0 18px 40px -18px #000`): the paper cassette. The deck uses the darker variant `0 1px 0 #ffffff12 inset, 0 20px 40px -24px #000`.
- **Recorrido de tecla** (`box-shadow: 0 3px 0 #a3360f, 0 6px 14px -6px #000`): REC key at rest (lip #77757f on small keys, #000 on the bootleg and deck play keys). Pressed or recording: `0 0 0 <lip>` with `translateY(3px)`.
- **Pozo** (`box-shadow: inset 0 1px 3px #000c`): the spine counter window; the reel window uses `inset 0 2px 8px #000`.
- **Piloto encendido** (`box-shadow: 0 0 0 3px #e5322d40, 0 0 12px #e5322d`): the only glow, on a lit pilot.
- **Aviso** (`box-shadow: 0 10px 30px -10px #000`): the paper toast.

### Named Rules
**The Key Travel Rule.** A solid offset lip belongs only to pressable transport keys (REC, deck play) and must collapse to zero with a 3px sink when pressed. It is a key's side, not a decorative shadow, and never goes on cards, labels or panels.

## Shapes

Two radii plus tape. Objects (cassette, side cards, bootleg band, deck, mission insert) are 10px; controls and small slips (REC keys, play key, search field, track row hover, deck label, caution note, prompt preview, toast, stage) are 6px; Dymo tape and the track number chip are 3px. Native round parts keep their own geometry: the reel window is a 40px capsule, pilots and reels are circles, the scrub track is a 10px pill with an 18×26px yellow 4px-rounded thumb.

Recurring silhouettes: the cassette's inner hairline frame inset 8px; the three bands crossing the label at -3deg and bleeding past its edges; a 45deg tricolour sash clipped in each side card's top-right corner; a 135deg striped cap on the spine; the bootleg band drawn with a dashed 1px border; dashed hairlines between side-card tracks.

## Components

### REC key (Grabar)
Tactile and loud: the record button of a deck, used for every copy action.
- **Shape:** 6px corners, inline pilot lamp (12px circle) before the label, min 44px tall.
- **Grande (pack sides A/B):** naranja face, near-black text, 800 weight at 112% width, 52px tall, 17px.
- **Pequeño (track command/prompt, whole block pack, mission):** blanco face, negro text, 38px tall, 14px, grey lip.
- **Pirata (bootleg):** negro-3 face, blanco text, black lip.
- **Hover:** face lightens (#ff7140, #fff, #34373c).
- **Press / recording:** sinks 3px as the lip collapses (0.08s); the pilot lights red and blinks three times (`steps(2)`, 0.4s). Recording also spins the cassette reels fast and lights the spine counter, then the toast confirms. State clears after 1.6s.
- **Focus:** 2px amarillo outline, 3px offset.

### Lomo (spine)
Fixed left strip on negro-2 with a striped band cap, the title set vertically (Archivo 800, 13px, 112%), the block index vertically in narrow caps (gris, hover to blanco on negro-3, 6px), the tape counter in a recessed well (mono 15px, amarillo, three digits 000–999 tracking scroll progress) with an unlit pilot dot that lights while recording, and a vertical "Código" link. Becomes a 52px top bar under 900px.

### Casete (cassette label)
The hero object: papel, 10px, inner 8px hairline frame, marker title in boli, printed lead line and spec line, a dark capsule window with two SVG reels (tape oxide and teeth) joined by a tape run, and the three bands crossing the foot. Reels rotate with scroll; while recording they spin continuously.

### Caras (side cards) and pirata
Side cards are negro-2 panels at 10px with the tricolour sash in the corner: heading ("Cara A" in amarillo + pack name), the big REC key, the description, the numbered tracklist in two columns (mono numbers, dashed dividers, yellow on hover; folded under 1000px), an optional biro note in amarillo, and a "Ver lo que se graba" disclosure revealing the prompt in a pozo well. The bootleg (pirata) is a transparent band with a dashed border, a crossed-out paper strip in biro ("copia de una copia…"), its title, notes and the dark REC key.

### Dymo labels and filters
Embossed plastic tape: 3px corners, white narrow caps at 75% width and 0.16em tracking, one colour per state. Filters are the same tape as buttons (36px tall, with a mono count); the pressed filter gets a 2px amarillo outline and underline; hover brightens 15%.

### Pistas (track rows)
A full-width row button: two-digit mono number, track name, provenance ticket (author, licence, stars in amarillo) and the Dymo state on the right. Hover fills negro-2 at 6px. The active track turns its number into an amarillo chip and its name amarillo, and expands in place: what it does, a "Cuándo" line led by a biro word, an optional "Ojo" caution slip, and the actions (small REC keys and a "Repo" link with an inline arrow SVG).

### Pletina (deck) and transport
A negro-2 body at 10px. On top a papel label inset 12px carrying the mono track number and the marker track name, underlined by a yellow and a teal stripe. Then the demo stage, then the transport: a 44px dark play/pause key with key travel (sinks and turns amarillo while playing) and a scrub bar styled as tape, oxide brown up to the playhead, with a yellow thumb. Tape-mode demos auto-play once over 6s and can be scrubbed; loop-mode demos hide the scrub bar and the key pauses or resumes the loop; static demos hide the transport. Tracks without their own demo show a dark empty stage with a biro message. The deck wakes with the block's first demo track when the block scrolls into view.

### Demo stage (boundary)
`.escena` is the container every demo mounts in: 6px corners, escena ground, isolated stacking, min 340px (420px from 1000px). Inside it, `demos.css` and `demos.ts` deliberately imitate other skills' styles (EB Garamond, gradients, pills, kickers, their own palettes) and inherit only `--mono` from the frame. Those interiors are not part of this design system; the frame only owns the stage edge, its focus ring (dark ring with yellow halo) and the shared pill toggle (`mini-botones`) offered to demos.

### Buscador (search)
Label in wide caps (gris), a 48px negro-2 field at 6px with a negro-3 border, 17px text and amarillo caret; focus swaps the border for a 2px amarillo outline. Dymo filters follow; a live result line in amarillo reports matches or the empty state.

### Notas de la carátula (liner notes)
Marker title in amarillo, a gris line, then the mission template on a papel insert (10px, mono 15px/1.9) whose bracketed blanks are editable inline in hueco orange with a dashed underline, and a small REC key to record it.

### Aviso (toast)
A papel slip at 6px, bottom-centre, with a lit red pilot dot and bold text ("Grabado. Pégalo en Claude Code."). Rises 20px and fades in over 0.25s (`cubic-bezier(0.2, 0.8, 0.2, 1)`), stays 1.6s. On failure the dot is grey and the text points to the manual copy. Announced through a polite live region.

### Motion and reduced motion
Key press 0.08s; key face 0.2s; disclosure triangle rotates 0.2s; pilot blink 0.4s `steps(2)` ×3; reels spin 0.5s linear while recording and otherwise rotate 0.4deg per scrolled pixel; counter maps scroll progress to 000–999; deck tape plays linearly over 6s. With `prefers-reduced-motion: reduce`, every animation and transition is removed globally, smooth scroll is off, reels do not follow scroll, the deck opens tape demos on their final frame without auto-play and loops stay paused until played. The counter still updates and REC still lights its pilot, statically.

## Do's and Don'ts

### Do:
- **Do** keep the frame on negro J-card black and make every light surface a papel object (cassette, deck label, mission insert, bootleg strip, toast).
- **Do** use the three bands together and in order (naranja, amarillo, agua) as stripes, a cap or a sash.
- **Do** use 10px for objects, 6px for controls and slips, 3px for Dymo tape; keep native circles and the reel-window capsule as they are.
- **Do** make every copy action a REC key with a pilot lamp: naranja only for the two pack sides, blanco for track and block keys, negro-3 for the bootleg.
- **Do** give pressable transport keys the 3px lip that collapses on press, and nothing else.
- **Do** show every state as a Dymo label in its fixed colour, white narrow caps.
- **Do** number tracks with two-digit tabular mono and keep provenance (author, licence, stars) on the row.
- **Do** write labels by hand on paper: the title in Permanent Marker boli, side notes and margin words in Reenie Beanie amarillo.
- **Do** mount every new demo in a deck's stage so the transport, label and empty state stay consistent.
- **Do** use the dark ring with yellow halo for focus on paper and inside the demo stage, and the 2px amarillo outline everywhere else.
- **Do** honour reduced motion: still reels, no auto-play, final frame shown.

### Don't:
- **Don't** use piloto red for anything but recording; errors use grey.
- **Don't** use agua on its own as an accent, text or fill.
- **Don't** set headings, labels or prose in JetBrains Mono, or numbers and prompts in Archivo.
- **Don't** set paragraphs, buttons or data in Permanent Marker or Reenie Beanie.
- **Don't** add a second sans or a serif to the frame; EB Garamond belongs to the demo stage only.
- **Don't** let demo-stage styling (gradients, pills, kickers, serif display) leak into the frame, or restyle demo interiors from frame tokens beyond `--mono`.
- **Don't** turn tracks into a grid of equal cards; tracks are numbered rows in a list.
- **Don't** put solid offset shadows on cards, labels or panels; depth there is the soft drop shadow only.
- **Don't** introduce radii outside 10, 6 and 3px for new objects or controls.
- **Don't** use the yellow focus outline on paper, where it disappears.
