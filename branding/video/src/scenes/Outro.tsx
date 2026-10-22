import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { C, F } from '../theme';
import { Background } from '../components/Background';
import { Lockup } from '../components/Lockup';

const pct = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoIn = spring({
    frame: frame - 8,
    fps,
    config: { damping: 18, mass: 0.9, stiffness: 85 },
  });
  const tagIn = pct(frame, 40, 58);
  const urlIn = pct(frame, 64, 82);
  const chipsIn = pct(frame, 76, 94);
  const glow = 0.55 + 0.45 * Math.sin(frame / 34);

  return (
    <Background glow={0.85}>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 330,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: logoIn,
            transform: `translateY(${(1 - logoIn) * 24}px) scale(${
              0.95 + logoIn * 0.05
            })`,
          }}
        >
          <Lockup markSize={156} />
        </div>

        <div
          style={{
            position: 'absolute',
            top: 540,
            left: 360,
            width: 1200,
            textAlign: 'center',
            fontFamily: F.display,
            fontSize: 48,
            fontWeight: 500,
            letterSpacing: '-0.025em',
            color: C.bone,
            opacity: tagIn,
            transform: `translateY(${(1 - tagIn) * 14}px)`,
          }}
        >
          Declare once.{' '}
          <span style={{ color: C.lime }}>Every surface agrees.</span>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 646,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 12,
            opacity: urlIn,
            transform: `translateY(${(1 - urlIn) * 10}px)`,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              background: C.lime,
              opacity: glow,
            }}
          />
          <span
            style={{
              fontFamily: F.mono,
              fontSize: 21,
              color: C.fog,
              letterSpacing: '-0.01em',
            }}
          >
            github.com/abstractionsinc/commandment
          </span>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 718,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
            opacity: chipsIn,
            transform: `translateY(${(1 - chipsIn) * 10}px)`,
          }}
        >
          {['RC1 COMMUNITY REVIEW', 'GO 1.27', 'APACHE-2.0'].map((chip, i) => (
            <span
              key={chip}
              style={{
                fontFamily: F.mono,
                fontSize: 10.5,
                letterSpacing: '0.13em',
                color: i === 0 ? C.ink : C.fog,
                background: i === 0 ? C.lime : 'rgba(242,239,230,0.025)',
                border: `1px solid ${
                  i === 0 ? C.lime : 'rgba(242,239,230,0.13)'
                }`,
                borderRadius: 999,
                padding: '7px 13px',
              }}
            >
              {chip}
            </span>
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 82,
            textAlign: 'center',
            fontFamily: F.mono,
            fontSize: 11,
            letterSpacing: '0.15em',
            color: C.faint,
            opacity: chipsIn * 0.9,
          }}
        >
          OPEN SOURCE · ISSUES AND API REVIEW WELCOME
        </div>
      </AbsoluteFill>
    </Background>
  );
};
