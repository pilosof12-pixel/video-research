import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { Rocket, Zap } from "lucide-react";
import { KineticCaptions, Word } from "./components/KineticCaptions";
import { IconPop } from "./components/IconPop";
import { StatCounter } from "./components/StatCounter";
import { TitleCard } from "./components/TitleCard";
import { whip, zoomPunch, glitch, maskWipe } from "./components/transitions";
import { theme } from "./theme";

// Replace with real word-level transcript (Whisper / ElevenLabs / @remotion/install-whisper-cpp).
const words: Word[] = [
  ["This", 0], ["is", 250], ["how", 450], ["pros", 700, true], ["edit", 1000], ["reels", 1300, true],
  ["with", 1900], ["pure", 2100], ["code", 2400, true], ["and", 3000], ["zero", 3300], ["timeline", 3600, false, true],
  ["10x", 4800, true], ["faster", 5200], ["output", 5600],
].map(([text, s, keyword, freeze], i, a) => ({ text: text as string, startMs: s as number, endMs: (a[i + 1]?.[1] as number) ?? 6500, keyword: !!keyword, freeze: !!freeze }));

const Bg: React.FC<{ c: string; children?: React.ReactNode }> = ({ c, children }) => (
  <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 30%, ${c}, ${theme.bg} 70%)` }}>{children}</AbsoluteFill>
);

export const Demo: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={45}><TitleCard title="PRO REELS" subtitle="built in code" /></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={whip()} timing={linearTiming({ durationInFrames: 8 })} />
      <TransitionSeries.Sequence durationInFrames={45}><Bg c="#2a1f66"><IconPop icon={Rocket} durationInFrames={45} label="Launch" /></Bg></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={zoomPunch()} timing={linearTiming({ durationInFrames: 8 })} />
      <TransitionSeries.Sequence durationInFrames={45}><Bg c="#3d2a00"><StatCounter to={10} suffix="x" label="faster" /></Bg></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={glitch()} timing={linearTiming({ durationInFrames: 6 })} />
      <TransitionSeries.Sequence durationInFrames={45}><Bg c="#003d33"><IconPop icon={Zap} durationInFrames={45} /></Bg></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={maskWipe()} timing={linearTiming({ durationInFrames: 10 })} />
      <TransitionSeries.Sequence durationInFrames={60}><Bg c="#40102a" /></TransitionSeries.Sequence>
    </TransitionSeries>
    <Sequence from={0}><KineticCaptions words={words} /></Sequence>
  </AbsoluteFill>
);
