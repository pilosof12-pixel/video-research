import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { theme, ease } from "../theme";

export const StatCounter: React.FC<{ to: number; from?: number; prefix?: string; suffix?: string; label?: string; countFrames?: number }> = ({
  to, from = 0, prefix = "", suffix = "", label, countFrames = 15,
}) => {
  const f = useCurrentFrame();
  const v = interpolate(f, [0, countFrames], [from, to], { extrapolateRight: "clamp", easing: ease.out });
  const pop = interpolate(f, [countFrames, countFrames + 3, countFrames + 6], [1, 1.12, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: "30%", width: "100%", textAlign: "center", transform: `scale(${pop})` }}>
      <div style={{ fontFamily: theme.fontDisplay, fontWeight: 900, fontSize: 220, color: theme.accent, WebkitTextStroke: `8px ${theme.stroke}`, paintOrder: "stroke fill" }}>
        {prefix}{Math.round(v).toLocaleString()}{suffix}
      </div>
      {label ? <div style={{ fontFamily: theme.fontBody, fontWeight: 700, fontSize: 56, color: theme.text }}>{label}</div> : null}
    </div>
  );
};
