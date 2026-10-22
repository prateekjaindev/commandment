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
import { Chapter } from '../components/Chapter';
import { Caption } from '../components/Caption';

type Surface = {
  label: string;
  value: string;
  x: number;
  y: number;
  rotate: number;
  delay: number;
};

const SURFACES: Surface[] = [
  { label: 'RUN', value: 'parse(argv)', x: 205, y: 388, rotate: -2, delay: 30 },
  { label: 'HELP', value: 'render text', x: 1355, y: 388, rotate: 2, delay: 42 },
  { label: 'COMPLETE', value: 'shell scripts', x: 160, y: 600, rotate: -1.2, delay: 54 },
  { label: 'SCHEMA', value: 'JSON shape', x: 1400, y: 600, rotate: 1.4, delay: 66 },
  { label: 'TESTS', value: 'assert behavior', x: 780, y: 792, rotate: -0.6, delay: 78 },
];

const CARD_W = 360;
const CARD_H = 104;
const CENTER = { x: 960, y: 596 };

const SurfaceCard: React.FC<{ surface: Surface; frame: number; fps: number }> = ({
  surface,
  frame,
  fps,
}) => {
  const s = spring({
    frame: frame - surface.delay,
    fps,
    config: { damping: 18, mass: 0.8, stiffness: 110 },
  });
  const dim = interpolate(frame, [164, 184], [1, 0.45], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulse = 0.55 + 0.45 * Math.sin((frame + surface.delay) / 13);
  return (
    <div
      style={{
        position: 'absolute',
        left: surface.x,
        top: surface.y,
        width: CARD_W,
        height: CARD_H,
        background: 'linear-gradient(180deg, #121715 0%, #0D1110 100%)',
        border: `1px solid ${C.line}`,
        borderRadius: 10,
        padding: '18px 22px',
        transform: `translateY(${(1 - s) * 14}px) rotate(${surface.rotate}deg) scale(${
          0.96 + s * 0.04
        })`,
        opacity: s * dim,
        boxShadow: '0 18px 40px rgba(0,0,0,0.35)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: F.mono,
          fontSize: 12,
          letterSpacing: '0.16em',
          color: C.faint,
        }}
      >
        <span>{surface.label}</span>
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: C.amber,
            opacity: pulse,
          }}
        />
      </div>
      <div
        style={{
          marginTop: 10,
          fontFamily: F.mono,
          fontSize: 20,
          color: C.bone,
          letterSpacing: '-0.02em',
        }}
      >
        {surface.value}
      </div>
    </div>
  );
};

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const centerIn = spring({
    frame: frame - 20,
    fps,
    config: { damping: 20, mass: 1, stiffness: 80 },
  });
  const settle = interpolate(frame, [150, 176], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lineIn = interpolate(frame, [100, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [222, 240], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Background>
      <AbsoluteFill style={{ opacity: fadeOut }}>
        <Chapter index="01" label="THE PROBLEM" />

        <div
          style={{
            position: 'absolute',
            left: 140,
            top: 150,
            opacity: headIn,
            transform: `translateY(${(1 - headIn) * 18}px)`,
          }}
        >
          <div
            style={{
              fontFamily: F.display,
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 0.98,
              letterSpacing: '-0.035em',
              color: C.bone,
            }}
          >
            One CLI.
            <br />
            <span style={{ color: C.amber }}>Five descriptions.</span>
          </div>
          <div
            style={{
              marginTop: 24,
              fontFamily: F.display,
              fontSize: 24,
              color: C.fog,
              letterSpacing: '-0.005em',
            }}
          >
            Flags, help, completion, schema, and tests all describe the same facts.
          </div>
        </div>

        <svg
          width={1920}
          height={1080}
          style={{ position: 'absolute', inset: 0, opacity: lineIn }}
        >
          {SURFACES.map((s) => {
            const cx = s.x + CARD_W / 2;
            const cy = s.y + CARD_H / 2;
            const settled = interpolate(frame, [160, 190], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <line
                key={s.label}
                x1={cx}
                y1={cy}
                x2={cx + (CENTER.x - cx) * (0.3 + 0.48 * settled)}
                y2={cy + (CENTER.y - cy) * (0.3 + 0.48 * settled)}
                stroke={settled > 0.6 ? C.limeDim : 'rgba(242,239,230,0.16)'}
                strokeWidth={1}
                strokeDasharray="4 9"
              />
            );
          })}
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={104}
            fill="none"
            stroke={settle > 0.4 ? 'rgba(199,244,100,0.55)' : 'rgba(242,239,230,0.18)'}
            strokeWidth={1.4}
            strokeDasharray="5 10"
            opacity={centerIn}
          />
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={118}
            fill="none"
            stroke="rgba(199,244,100,0.12)"
            strokeWidth={1}
            opacity={settle}
          />
        </svg>

        {SURFACES.map((s) => (
          <SurfaceCard key={s.label} surface={s} frame={frame} fps={fps} />
        ))}

        <div
          style={{
            position: 'absolute',
            left: CENTER.x - 104,
            top: CENTER.y - 104,
            width: 208,
            height: 208,
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            opacity: centerIn * (1 - settle * 0.25),
            transform: `scale(${0.9 + centerIn * 0.1})`,
            background:
              'radial-gradient(circle at 50% 40%, rgba(199,244,100,0.075), rgba(10,12,11,0.85) 70%)',
          }}
        >
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 30,
              letterSpacing: '0.06em',
              color: settle > 0.5 ? C.lime : C.bone,
            }}
          >
            CLI
          </div>
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 10.5,
              letterSpacing: '0.16em',
              color: settle > 0.5 ? C.limeDim : C.faint,
            }}
          >
            {settle > 0.5 ? 'ONE OWNER' : 'ONE TRUTH?'}
          </div>
        </div>

        <Caption delay={118}>
          Five surfaces. Five chances to{' '}
          <span style={{ color: C.amber }}>drift apart</span>.
        </Caption>

      </AbsoluteFill>
    </Background>
  );
};
