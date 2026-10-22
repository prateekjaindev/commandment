import React, { useId } from 'react';
import { C } from '../theme';

type MarkProps = {
  size: number;
  color?: string;
  accent?: string;
  style?: React.CSSProperties;
};

/**
 * The keystone mark: a stone tablet with a carved command prompt.
 * The chevron is a true cutout (mask), so it reads on any background.
 */
export const Mark: React.FC<MarkProps> = ({
  size,
  color = C.bone,
  accent = C.lime,
  style,
}) => {
  const raw = useId();
  const id = `cut-${raw.replace(/[:]/g, '')}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 280 280"
      style={{ display: 'block', overflow: 'visible', ...style }}
      aria-hidden
    >
      <defs>
        <mask
          id={id}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="280"
          height="280"
        >
          <rect width="280" height="280" fill="black" />
          <path d="M40 44 H240 L224 232 H56 Z" fill="white" />
          <path
            d="M109 106 L151 142 L109 178"
            fill="none"
            stroke="black"
            strokeWidth="23"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <rect x="165" y="168" width="27" height="14" fill="black" />
        </mask>
      </defs>
      <path d="M40 44 H240 L224 232 H56 Z" fill={color} mask={`url(#${id})`} />
      <rect x="165" y="168" width="27" height="14" fill={accent} />
    </svg>
  );
};
