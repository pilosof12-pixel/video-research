Read style.md and AGENTS.md first. Reuse components in remotion/src/components (or HyperFrames equivalents).

Use /hyperframes (or Remotion skills). Build a reusable KineticCaptions component for 1080x1920 @30fps from word-level timestamps in captions.json.
Style spec (follow exactly):
- Show 1-3 words per page, max 12 chars per line, centered at 62% height, safe margins 80px.
- Font: Montserrat 900 (or brand font), 96px, white fill, 10px black stroke + soft drop shadow (0 6px 0 rgba(0,0,0,.35)).
- Active word: scale 1 -> 1.18 -> 1.0 with spring (stiffness 300, damping 14, ~6 frames overshoot), color switches to #FFD400.
- Page in: each word pops from scale 0.6 + translateY 20px to 1.0 over 5 frames, staggered 2 frames, easing back.out(2.2).
- Page out: hard cut (0 frames) on the next page; NO fades.
- Keywords listed in keywords.json: emoji/icon pops above the word (Lottie if available), plus 1-frame white flash on the caption.
- Freeze emphasis: on words tagged "freeze", hold the page 12 frames longer with a 3% slow zoom on the background.
- Emit sfx cues (pop.wav on keyword, click.wav on page change at -6dB) into the audio track.
Then render snapshots at 5 keyword timestamps, inspect them, and fix anything that is off-spec before final render.
