import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Composition } from 'remotion';
import { TOTAL_FRAMES, FPS, W, H, SCENES } from './theme';
import { ProgressBar } from './components/ProgressBar';
import { Intro } from './scenes/Intro';
import { Problem } from './scenes/Problem';
import { Model } from './scenes/Model';
import { Declaration } from './scenes/Declaration';
import { Run } from './scenes/Run';
import { Surfaces } from './scenes/Surfaces';
import { Outro } from './scenes/Outro';

export const Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#0A0C0B' }}>
      <Sequence from={SCENES.intro.from} durationInFrames={SCENES.intro.duration}>
        <Intro />
      </Sequence>
      <Sequence from={SCENES.problem.from} durationInFrames={SCENES.problem.duration}>
        <Problem />
      </Sequence>
      <Sequence from={SCENES.model.from} durationInFrames={SCENES.model.duration}>
        <Model />
      </Sequence>
      <Sequence from={SCENES.declaration.from} durationInFrames={SCENES.declaration.duration}>
        <Declaration />
      </Sequence>
      <Sequence from={SCENES.run.from} durationInFrames={SCENES.run.duration}>
        <Run />
      </Sequence>
      <Sequence from={SCENES.surfaces.from} durationInFrames={SCENES.surfaces.duration}>
        <Surfaces />
      </Sequence>
      <Sequence from={SCENES.outro.from} durationInFrames={SCENES.outro.duration}>
        <Outro />
      </Sequence>
      <ProgressBar />
    </AbsoluteFill>
  );
};

export const Root: React.FC = () => {
  return (
    <Composition
      id="CommandmentDemo"
      component={Video}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={W}
      height={H}
    />
  );
};
