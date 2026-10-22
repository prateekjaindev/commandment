import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { C, F } from '../theme';

type CaptionProps = {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
};

export const Caption: React.FC<CaptionProps> = ({
  children,
  delay = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        left: 140,
        bottom: 72,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 18,
        opacity: p,
        transform: `translateY(${(1 - p) * 10}px)`,
        ...style,
      }}
    >
      <span
        style={{
          display: 'block',
          width: 34,
          height: 2,
          background: C.lime,
          marginTop: 13,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          fontFamily: F.display,
          fontSize: 26,
          lineHeight: 1.45,
          letterSpacing: '-0.01em',
          color: C.fog,
          maxWidth: 1180,
          textWrap: 'balance',
        }}
      >
        {children}
      </div>
    </div>
  );
};
