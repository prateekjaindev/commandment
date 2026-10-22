import React from 'react';
import { useCurrentFrame } from 'remotion';
import { C } from '../theme';

type CursorProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: React.CSSProperties;
  blink?: boolean;
};

export const Cursor: React.FC<CursorProps> = ({
  width = 12,
  height = 26,
  color = C.lime,
  style,
  blink = true,
}) => {
  const frame = useCurrentFrame();
  const visible = !blink || Math.floor(frame / 14) % 2 === 0;
  return (
    <span
      style={{
        display: 'inline-block',
        width,
        height,
        background: color,
        opacity: visible ? 1 : 0,
        verticalAlign: 'text-bottom',
        ...style,
      }}
    />
  );
};
