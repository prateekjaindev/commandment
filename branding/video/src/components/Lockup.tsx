import React from 'react';
import { C, F } from '../theme';
import { Mark } from './Mark';

type LockupProps = {
  markSize?: number;
  color?: string;
  accent?: string;
  textColor?: string;
  gap?: number;
  style?: React.CSSProperties;
};

export const Lockup: React.FC<LockupProps> = ({
  markSize = 120,
  color = C.bone,
  accent = C.lime,
  textColor = C.bone,
  gap = 30,
  style,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap, ...style }}>
      <Mark size={markSize} color={color} accent={accent} />
      <div
        style={{
          fontFamily: F.display,
          fontWeight: 700,
          fontSize: markSize * 0.533,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          color: textColor,
          paddingTop: markSize * 0.012,
        }}
      >
        COMMANDMENT
      </div>
    </div>
  );
};
