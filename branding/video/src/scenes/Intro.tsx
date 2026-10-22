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
import { Cursor } from '../components/Cursor';

const IntroLine: React.FC = () => {
  const frame = useCurrentFrame();
  const text = '$ commandment';
  const start = 14;
  const count = Math.max(0, Math.min(text.length, Math.floor(frame - start)));
  const done = count >= text.length;
  const fade = interpolate(frame, [52, 64], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 500,
        display: 'flex',
        justifyContent: 'center',
        opacity: fade,
        transform: `translateY(${interpolate(frame, [52, 64], [0, -14], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}px)`,
      }}
    >
      <div
        style={{
          fontFamily: F.mono,
          fontSize: 38,
          letterSpacing: '-0.02em',
          color: C.bone,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span style={{ color: C.lime, marginRight: 14 }}>$</span>
        <span>{text.slice(2, count)}</span>
        <Cursor
          width={16}
          height={38}
          style={{ marginLeft: 3, opacity: done ? undefined : 1 }}
        />
      </div>
    </div>
  );
};

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({
    frame: frame - 56,
    fps,
    config: { damping: 18, mass: 0.9, stiffness: 90 },
  });
  const tagIn = interpolate(frame, [78, 96], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const flash = interpolate(frame, [50, 54, 68], [0, 0.09, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const drift = interpolate(frame, [90, 180], [0, -6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Background>
      <IntroLine />
      <AbsoluteFill
        style={{
          background: C.lime,
          opacity: flash,
          pointerEvents: 'none',
        }}
      />
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateY(${drift}px)`,
        }}
      >
        <div
          style={{
            opacity: logoIn,
            transform: `translateY(${(1 - logoIn) * 22}px) scale(${
              0.94 + logoIn * 0.06
            })`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Lockup markSize={146} />
          <div
            style={{
              marginTop: 30,
              fontFamily: F.display,
              fontSize: 30,
              letterSpacing: '-0.005em',
              color: C.fog,
              opacity: tagIn,
              transform: `translateY(${(1 - tagIn) * 10}px)`,
            }}
          >
            A declarative CLI framework for Go
          </div>
          <div
            style={{
              marginTop: 24,
              width: 44,
              height: 2,
              background: C.lime,
              opacity: tagIn * 0.85,
              transform: `scaleX(${tagIn})`,
            }}
          />
        </div>
      </AbsoluteFill>
    </Background>
  );
};
