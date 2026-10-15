import React from "react";
import { Composition } from "remotion";
import { Demo } from "./Demo";
import { FPS, W, H } from "./theme";

// 45*4+60 - (8+8+6+10) = 208 frames
export const Root: React.FC = () => (
  <Composition id="Demo" component={Demo} durationInFrames={208} fps={FPS} width={W} height={H} />
);
