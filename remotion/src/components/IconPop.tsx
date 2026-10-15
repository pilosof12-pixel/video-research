import React from "react";
import { Lottie, LottieAnimationData } from "@remotion/lottie";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { LucideIcon } from "lucide-react";
import { theme } from "../theme";

/** Anticipation -> overshoot -> settle, idle float, quick exit. Lottie first, Lucide fallback. */
export const IconPop: React.FC<{ lottie?: LottieAnimationData; icon?: LucideIcon; size?: number; durationInFrames: number; label?: string }> = ({
  lottie, icon: Icon, size = 260, durationInFrames, label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = interpolate(frame, [0, 2, 6, 8], [0, 0.9, 1.12, 1], { extrapolateRight: "clamp" });
  const exit = interpolate(frame, [durationInFrames - 5, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const float = Math.sin((frame / 60) * Math.PI * 2) * 6;
  const draw = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 10 });
  return (
    <div style={{ position: "absolute", top: "18%", left: "50%", transform: `translate(-50%, ${float}px) scale(${enter * exit})`,
      padding: 48, borderRadius: 32, background: "rgba(255,255,255,.12)", backdropFilter: "blur(20px)", display: "flex",
      flexDirection: "column", alignItems: "center", gap: 16 }}>
      {lottie ? <Lottie animationData={lottie} style={{ width: size, height: size }} />
        : Icon ? <Icon size={size} color={theme.accent} strokeWidth={2.2} style={{ strokeDasharray: 300, strokeDashoffset: 300 * (1 - draw) }} /> : null}
      {label ? <div style={{ fontFamily: theme.fontDisplay, fontWeight: 800, fontSize: 56, color: theme.text }}>{label}</div> : null}
    </div>
  );
};
