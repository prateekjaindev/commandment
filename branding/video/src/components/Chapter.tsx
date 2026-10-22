import React from 'react';
import { C, F } from '../theme';

type ChapterProps = {
  index: string;
  label: string;
  style?: React.CSSProperties;
};

export const Chapter: React.FC<ChapterProps> = ({ index, label, style }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 140,
        top: 74,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        fontFamily: F.mono,
        fontSize: 14,
        letterSpacing: '0.18em',
        color: C.faint,
        ...style,
      }}
    >
      <span style={{ width: 7, height: 7, background: C.lime }} />
      <span style={{ color: C.fog }}>{index}</span>
      <span style={{ color: C.faint }}>/</span>
      <span>{label}</span>
    </div>
  );
};
