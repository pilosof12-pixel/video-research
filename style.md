# Brand Kit / Style Spec (edit me — single source of truth)
Mirrored in code at `remotion/src/theme.ts`. Agents MUST read this before building anything.

## Format
- 1080x1920, 30fps, safe margins 80px sides / 220px top / 320px bottom (IG UI).

## Fonts
- Display: Montserrat 900 (Hebrew fallback: Heebo 900)
- Body: Inter 600/700 (Hebrew: Heebo)

## Palette
| token | value |
|---|---|
| bg | #0B0B0F |
| text | #FFFFFF |
| accent | #FFD400 |
| accent2 | #7C5CFF |
| stroke | #000000 |

## Captions
- 1-3 words/page, max ~14 chars/line, centered at 62% height.
- 96px, UPPERCASE (Latin), white, 10px black stroke, shadow 0 6px 0 rgba(0,0,0,.35).
- Active word -> accent color + scale 1 -> 1.18 -> 1.0 over 6 frames.
- Word entry: scale 0.6->1, y+20->0, 5-8 frames, 2-frame stagger, spring `pop`.
- Page change: HARD CUT. Never fade captions.
- Keyword: accent + 1-frame white glow flash + optional icon pop + `pop` SFX.
- Freeze: hold page +12 frames, background slow zoom 3%.

## Easing / spring library
| name | spec | use |
|---|---|---|
| pop | spring stiffness 300, damping 14, mass 0.6 | captions, icons |
| snappy | spring stiffness 400, damping 30 | UI cards, no overshoot |
| soft | spring stiffness 120, damping 20 | backgrounds |
| out | cubic-bezier(0.16,1,0.3,1) / GSAP expo.out | entries |
| inOut | cubic-bezier(0.87,0,0.13,1) / expo.inOut | whips, wipes |
| back | back.out(2.2) | pops |
Never use linear easing for visible motion. Never use default 0.5s fades.

## Timing rules
- Entry 5-10 frames, exit 4-6 frames, transitions 6-10 frames.
- A visual change every 1.5-3s; nothing static >4s (add float/zoom).
- Cuts land on word boundaries or beats.
- Hook (first 1.5s): title or big caption + motion + SFX.

## SFX mapping (files in assets/sfx/)
| event | file | gain |
|---|---|---|
| keyword pop | pop.wav | -6dB |
| caption page change | click.wav | -12dB |
| whip / mask wipe | whoosh.wav | -4dB |
| zoom punch | impact.wav | -6dB |
| glitch | glitch.wav | -8dB |
| stat count | tick.wav (per 3 frames) | -14dB |
| hook build | riser.wav | -8dB |
