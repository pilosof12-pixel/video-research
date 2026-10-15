Read style.md and AGENTS.md first. Reuse components in remotion/src/components (or HyperFrames equivalents).

For each beat in beats.md, add one animated visual element (icon, stat, or logo):
- Prefer Lottie from LottieFiles (local .json in /assets/lottie). Fallback: Lucide SVG animated with GSAP (stroke draw-on 10 frames, then scale pop with back.out(3)).
- Entry: 8 frames, anticipation (scale 0.9 for 2 frames, then overshoot 1.12, settle 1.0). Idle: subtle float ±6px sine over 60 frames. Exit: 5 frames scale to 0 with power3.in.
- Numbers count up over 15 frames with an ease-out, ticking SFX.
- Layout: icon in the top third, never overlapping captions; use a rounded-rect card (radius 32, 12% white glass, backdrop blur) behind icons.
- Visual change every 1.5-3s. No element on screen longer than 4s without motion.
Respect style.md (fonts, palette, easings). After building, render a contact sheet of frames every 15 frames and critique it against these rules, then fix.
