import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C } from '../theme';

type BackgroundProps = {
  glow?: number;
  grid?: number;
  vignette?: number;
  children?: React.ReactNode;
};

export const Background: React.FC<BackgroundProps> = ({
  glow = 1,
  grid = 1,
  vignette = 1,
  children,
}) => {
  const frame = useCurrentFrame();
  const x = 68 + Math.sin(frame / 260) * 4;
  const y = 30 + Math.cos(frame / 310) * 3;

  return (
    <AbsoluteFill style={{ background: C.ink, overflow: 'hidden' }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(1100px 760px at ${x}% ${y}%, rgba(199,244,100,${0.085 * glow}), transparent 62%),
            radial-gradient(900px 700px at 8% 96%, rgba(143,216,206,${0.035 * glow}), transparent 60%),
            linear-gradient(180deg, #0A0C0B 0%, #090B0A 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            'radial-gradient(rgba(242,239,230,0.42) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          opacity: 0.11 * grid,
          maskImage:
            'radial-gradient(1300px 900px at 55% 45%, rgba(0,0,0,0.95), transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(1300px 900px at 55% 45%, rgba(0,0,0,0.95), transparent 78%)',
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(1200px 800px at 50% 48%, transparent 42%, rgba(0,0,0,0.55) 100%)',
          opacity: 0.85 * vignette,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
