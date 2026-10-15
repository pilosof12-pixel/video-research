Read style.md and AGENTS.md first. Reuse components in remotion/src/components (or HyperFrames equivalents).

Create a transitions library with 4 transitions, each 6-10 frames at 30fps:
1) Whip pan: outgoing scene translateX -100% with motion blur (directional blur 40px peak at mid), incoming from +100%, easing expo.inOut, whoosh.wav synced to the midpoint.
2) Zoom punch: incoming scale 1.35 -> 1.0, 8 frames, power4.out, plus a 2-frame white flash at 30% opacity.
3) Glitch cut: 3 frames of RGB split (±12px) + horizontal slice offset, then hard cut.
4) Mask wipe: diagonal shape wipe in brand accent color, 8 frames, then reveal.
Rules: never use crossfade longer than 4 frames. Every transition lands on a beat or word boundary from captions.json. Use @remotion/transitions or HyperFrames shader-transitions where available. Expose as props so I can choose a transition per cut.
