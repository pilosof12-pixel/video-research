import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import type { TransitionPresentation, TransitionPresentationComponentProps } from "@remotion/transitions";
import { theme } from "../theme";

/** Custom presentations for @remotion/transitions <TransitionSeries>. Use with linearTiming({durationInFrames: 6-10}). */
type P = Record<string, never>;
const make = (C: React.FC<TransitionPresentationComponentProps<P>>): TransitionPresentation<P> => ({ component: C, props: {} });

// 1) Whip pan with directional blur peaking mid-transition
const Whip: React.FC<TransitionPresentationComponentProps<P>> = ({ children, presentationDirection, presentationProgress: p }) => {
  const x = presentationDirection === "exiting" ? interpolate(p, [0, 1], [0, -100]) : interpolate(p, [0, 1], [100, 0]);
  const blur = interpolate(p, [0, 0.5, 1], [0, 40, 0]);
  return <AbsoluteFill style={{ transform: `translateX(${x}%)`, filter: `blur(${blur / 2}px)` }}>{children}</AbsoluteFill>;
};
export const whip = () => make(Whip);

// 2) Zoom punch + white flash
const Zoom: React.FC<TransitionPresentationComponentProps<P>> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") return <AbsoluteFill style={{ opacity: p < 0.25 ? 1 : 0 }}>{children}</AbsoluteFill>;
  const s = interpolate(p, [0, 1], [1.35, 1], { easing: (t) => 1 - Math.pow(1 - t, 4) });
  const flash = interpolate(p, [0, 0.25, 0.5], [0, 0.3, 0], { extrapolateRight: "clamp" });
  return (<AbsoluteFill style={{ transform: `scale(${s})` }}>{children}<AbsoluteFill style={{ background: "#fff", opacity: flash }} /></AbsoluteFill>);
};
export const zoomPunch = () => make(Zoom);

// 3) Glitch: RGB split + slice offset then hard cut
const Glitch: React.FC<TransitionPresentationComponentProps<P>> = ({ children, presentationDirection, presentationProgress: p }) => {
  const on = presentationDirection === "entering" ? p >= 0.5 : p < 0.5;
  const k = Math.sin(p * Math.PI);
  const off = 12 * k;
  return (
    <AbsoluteFill style={{ opacity: on ? 1 : 0 }}>
      <AbsoluteFill style={{ transform: `translateX(${off}px)`, mixBlendMode: "screen", filter: "drop-shadow(-12px 0 0 rgba(255,0,0,.6))" }}>{children}</AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `inset(${40 + 10 * k}% 0 ${45 - 10 * k}% 0)`, transform: `translateX(${-off * 3}px)` }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
export const glitch = () => make(Glitch);

// 4) Diagonal mask wipe in accent colour
const Mask: React.FC<TransitionPresentationComponentProps<P>> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") return <AbsoluteFill>{children}</AbsoluteFill>;
  const a = interpolate(p, [0, 1], [-30, 130]);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: theme.accent, clipPath: `polygon(0 0, ${a + 20}% 0, ${a}% 100%, 0 100%)` }} />
      <AbsoluteFill style={{ clipPath: `polygon(0 0, ${a - 10}% 0, ${a - 30}% 100%, 0 100%)` }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
export const maskWipe = () => make(Mask);
