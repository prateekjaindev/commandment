import React from 'react';
import { C, F } from '../theme';

export type Token = { text: string; color?: string; weight?: number };
export type CodeLine = Token[];

type CodeCardProps = {
  file: string;
  lines: CodeLine[];
  reveal?: number;
  activeLine?: number;
  width: number;
  height: number;
  fontSize?: number;
  lineHeight?: number;
  style?: React.CSSProperties;
};

export const CodeCard: React.FC<CodeCardProps> = ({
  file,
  lines,
  reveal = 999,
  activeLine = -1,
  width,
  height,
  fontSize = 24,
  lineHeight = 1.62,
  style,
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 13,
        border: `1px solid ${C.line}`,
        background: 'linear-gradient(180deg, #111614 0%, #0B0F0D 100%)',
        overflow: 'hidden',
        boxShadow: '0 28px 70px rgba(0,0,0,0.4)',
        ...style,
      }}
    >
      <div
        style={{
          height: 46,
          borderBottom: `1px solid ${C.lineSoft}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 18px',
          gap: 9,
          background: 'rgba(242,239,230,0.018)',
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2B322D' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2B322D' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2B322D' }} />
        <span
          style={{
            marginLeft: 10,
            fontFamily: F.mono,
            fontSize: 12,
            color: C.faint,
          }}
        >
          {file}
        </span>
        <span
          style={{
            marginLeft: 'auto',
            fontFamily: F.mono,
            fontSize: 10,
            letterSpacing: '0.14em',
            color: C.limeDim,
            border: '1px solid rgba(199,244,100,0.22)',
            borderRadius: 3,
            padding: '2px 6px',
          }}
        >
          GO
        </span>
      </div>
      <div
        style={{
          padding: '22px 24px',
          fontFamily: F.mono,
          fontSize,
          lineHeight,
          letterSpacing: '-0.02em',
          whiteSpace: 'pre',
        }}
      >
        {lines.map((line, i) => {
          const shown = i < reveal;
          const active = i === activeLine;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                opacity: shown ? 1 : 0,
                transform: shown ? 'translateY(0)' : 'translateY(4px)',
                background: active ? 'rgba(199,244,100,0.055)' : 'transparent',
                borderLeft: `2px solid ${active ? C.lime : 'transparent'}`,
                marginLeft: -12,
                paddingLeft: 10,
                transition: 'none',
              }}
            >
              <span
                style={{
                  width: 30,
                  flexShrink: 0,
                  color: active ? C.limeDim : '#3E4640',
                  fontSize: fontSize * 0.62,
                  userSelect: 'none',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>
                {line.map((t, j) => (
                  <span
                    key={j}
                    style={{
                      color: t.color ?? C.bone,
                      fontWeight: t.weight,
                    }}
                  >
                    {t.text}
                  </span>
                ))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
