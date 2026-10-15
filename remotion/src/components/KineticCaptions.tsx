import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, springs } from "../theme";

export type Word = { text: string; startMs: number; endMs: number; keyword?: boolean; freeze?: boolean };

/** Group words into pages of up to `maxWords` (hard cut between pages). */
export const paginate = (words: Word[], maxWords = 3, maxChars = 14): Word[][] => {
  const pages: Word[][] = [];
  let cur: Word[] = [];
  for (const w of words) {
    const len = cur.map((x) => x.text).join(" ").length + w.text.length;
    if (cur.length >= maxWords || (cur.length && len > maxChars)) { pages.push(cur); cur = []; }
    cur.push(w);
  }
  if (cur.length) pages.push(cur);
  return pages;
};

export const KineticCaptions: React.FC<{ words: Word[]; y?: number; fontSize?: number; freezeExtraFrames?: number }> = ({
  words, y = 0.62, fontSize = 96, freezeExtraFrames = 12,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const pages = paginate(words);
  const extra = (freezeExtraFrames / fps) * 1000;
  const page = pages.find((p, i) => {
    const start = p[0].startMs;
    const next = pages[i + 1]?.[0].startMs ?? p[p.length - 1].endMs + (p.some((w) => w.freeze) ? extra : 0);
    return ms >= start && ms < next;
  });
  if (!page) return null;
  const pageStartF = Math.round((page[0].startMs / 1000) * fps);
  const hasKeyword = page.some((w) => w.keyword && ms >= w.startMs);
  const flash = page.some((w) => w.keyword && Math.abs(ms - w.startMs) < 1000 / fps) ? 1 : 0;

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center" }}>
      <div style={{ position: "absolute", top: `${y * 100}%`, transform: "translateY(-50%)", width: "100%", padding: "0 80px",
        display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 32px"}}>
        {page.map((w, i) => {
          const local = frame - pageStartF - i * 2; // 2-frame stagger
          const s = spring({ frame: local, fps, config: springs.pop, durationInFrames: 8 });
          const active = ms >= w.startMs && ms < w.endMs;
          const activeF = Math.max(0, frame - Math.round((w.startMs / 1000) * fps));
          const bump = active ? interpolate(activeF, [0, 3, 6], [1, 1.18, 1], { extrapolateRight: "clamp" }) : 1;
          const scale = interpolate(s, [0, 1], [0.6, 1]) * bump;
          return (
            <span key={i} style={{ fontFamily: theme.fontDisplay, fontWeight: 900, fontSize, lineHeight: 1.1, textTransform: "uppercase",
              color: active || (w.keyword && hasKeyword) ? theme.accent : theme.text,
              WebkitTextStroke: `10px ${theme.stroke}`, paintOrder: "stroke fill",
              textShadow: `0 6px 0 rgba(0,0,0,.35)${flash ? ", 0 0 40px #fff" : ""}`,
              transform: `translateY(${interpolate(s, [0, 1], [20, 0])}px) scale(${scale})`, opacity: s > 0.01 ? 1 : 0, display: "inline-block" }}>
              {w.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
