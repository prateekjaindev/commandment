import React from 'react';
import { C, F } from '../theme';

type TerminalProps = {
  width: number;
  height: number;
  title?: string;
  badge?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const Terminal: React.FC<TerminalProps> = ({
  width,
  height,
  title = 'alienctl — zsh',
  badge = 'COMPILED',
  children,
  style,
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 14,
        border: `1px solid ${C.line}`,
        background: 'linear-gradient(180deg, #121715 0%, #0B0F0D 100%)',
        boxShadow: '0 34px 80px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      <div
        style={{
          height: 50,
          borderBottom: `1px solid ${C.lineSoft}`,
          background: 'rgba(242,239,230,0.018)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: 8,
        }}
      >
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#2B322D' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#2B322D' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#2B322D' }} />
        <span
          style={{
            marginLeft: 12,
            fontFamily: F.mono,
            fontSize: 12.5,
            color: C.faint,
          }}
        >
          {title}
        </span>
        <span
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            fontFamily: F.mono,
            fontSize: 10,
            letterSpacing: '0.14em',
            color: C.lime,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: C.lime,
              boxShadow: '0 0 10px rgba(199,244,100,.65)',
            }}
          />
          {badge}
        </span>
      </div>
      <div
        style={{
          padding: '24px 28px',
          fontFamily: F.mono,
          fontSize: 26,
          lineHeight: '46px',
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 2,
          background: `linear-gradient(180deg, ${C.lime}, transparent 58%)`,
          opacity: 0.6,
        }}
      />
    </div>
  );
};

export const Prompt: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: C.lime, marginRight: 14 }}>{'>'}</span>
);
