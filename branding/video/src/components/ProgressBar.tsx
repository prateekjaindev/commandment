import React from 'react';
import { useCurrentFrame } from 'remotion';
import { C, TOTAL_FRAMES } from '../theme';

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const p = Math.max(0, Math.min(1, frame / (TOTAL_FRAMES - 1)));
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 3,
        background: 'rgba(242,239,230,0.06)',
      }}
    >
      <div
        style={{
          width: `${p * 100}%`,
          height: '100%',
          background: C.lime,
          opacity: 0.72,
        }}
      />
    </div>
  );
};
