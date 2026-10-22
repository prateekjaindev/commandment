import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { C } from '../theme';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  style?: React.CSSProperties;
};

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  duration = 18,
  y = 20,
  style,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * y}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

type DrawLineProps = {
  delay?: number;
  duration?: number;
  width: number;
  height?: number;
  color?: string;
  vertical?: boolean;
};

export const DrawLine: React.FC<DrawLineProps> = ({
  delay = 0,
  duration = 18,
  width,
  height = 1,
  color = C.line,
  vertical = false,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        width: vertical ? height : width,
        height: vertical ? width : height,
        background: color,
        transform: vertical ? `scaleY(${p})` : `scaleX(${p})`,
        transformOrigin: vertical ? 'top' : 'left',
        opacity: 0.9,
      }}
    />
  );
};
