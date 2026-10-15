// Mirrors ../style.md — edit both together.
import { Easing } from "remotion";
export const FPS = 30;
export const W = 1080;
export const H = 1920;
export const theme = {
  fontDisplay: "Montserrat, 'Heebo', 'Arial Black', sans-serif",
  fontBody: "Inter, 'Heebo', Arial, sans-serif",
  bg: "#0B0B0F",
  text: "#FFFFFF",
  accent: "#FFD400",
  accent2: "#7C5CFF",
  stroke: "#000000",
};
export const springs = {
  pop: { stiffness: 300, damping: 14, mass: 0.6 },
  snappy: { stiffness: 400, damping: 30 },
  soft: { stiffness: 120, damping: 20 },
};
export const ease = {
  out: Easing.bezier(0.16, 1, 0.3, 1), // expo-ish out
  inOut: Easing.bezier(0.87, 0, 0.13, 1),
  in: Easing.bezier(0.7, 0, 0.84, 0),
  back: Easing.out(Easing.back(2.2)),
};
