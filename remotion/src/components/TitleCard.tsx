import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme, ease } from "../theme";

/** Mask-reveal title with accent bar. */
export const TitleCard: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  const f = useCurrentFrame();
  const bar = interpolate(f, [0, 8], [0, 1], { extrapolateRight: "clamp", easing: ease.out });
  const rise = interpolate(f, [4, 14], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out });
  const sub = interpolate(f, [10, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", background: theme.bg }}>
      <div style={{ overflow: "hidden", padding: "0 80px" }}>
        <div style={{ transform: `translateY(${rise}%)`, fontFamily: theme.fontDisplay, fontWeight: 900, fontSize: 130, color: theme.text, textAlign: "center", lineHeight: 1 }}>{title}</div>
      </div>
      <div style={{ height: 14, width: 420 * bar, background: theme.accent, marginTop: 30, borderRadius: 7 }} />
      {subtitle ? <div style={{ opacity: sub, marginTop: 30, fontFamily: theme.fontBody, fontSize: 52, color: "#ccc" }}>{subtitle}</div> : null}
    </AbsoluteFill>
  );
};
