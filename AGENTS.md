# AGENTS.md
This repo is a toolkit for pro-level vertical reels (HyperFrames + Remotion). Skills are installed in `.agents/skills` (shared), linked into `.claude/skills` and Cursor by `setup.sh`.

## Video workflow (mandatory, every reel)
1. **Read** `style.md` (brand kit) and the component list in `remotion/src/components/`. Prefer HyperFrames skills (`/hyperframes`, `/hyperframes-animation`, `/hyperframes-registry`) for HTML/GSAP work and Remotion skills for React work. Do not invent a new style; use the spec.
2. **Transcript:** get word-level timestamps (ElevenLabs / Whisper / `npx hyperframes transcribe`) into `captions.json` `{text,startMs,endMs,keyword?,freeze?}`.
3. **Beats table:** write `beats.md`: one row per 1.5-3s: time range | spoken words | visual (component) | transition | SFX. Show it to the user before coding.
4. **Build from reusable components:** KineticCaptions, IconPop, StatCounter, TitleCard, transitions (whip, zoomPunch, glitch, maskWipe). Extend/add a component instead of one-off code. Search the HyperFrames registry/catalog before hand-building.
5. **Render snapshots:** `npx remotion still src/index.ts <Comp> out/fN.png --frame=N` (or `npx hyperframes snapshot`) at the hook, every keyword and every transition midpoint. Make a contact sheet.
6. **Self-critique** each snapshot against `style.md`: safe margins, caption legibility, overlap, easing feel, a change every 1.5-3s, SFX cue present. List concrete defects.
7. **Fix** and repeat steps 5-6 (min 2 rounds).
8. **Final render** `npx remotion render` (or `npx hyperframes render`), then report file path + remaining known issues.

Prompt templates live in `prompts/`. Never commit node_modules, renders or licensed assets without a license note.
