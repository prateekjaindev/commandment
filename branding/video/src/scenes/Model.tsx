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

const OUTPUTS = [
  { label: 'run', detail: 'handlers', y: 300 },
  { label: 'help', detail: 'presentation', y: 396 },
  { label: 'completion', detail: 'candidates', y: 492 },
  { label: 'schema', detail: 'static facts', y: 588 },
  { label: 'clitest', detail: 'semantic tests', y: 684, dashed: true },
];

const CARD_X = 1460;
const CARD_W = 380;
const CARD_H = 78;
const APP = { x: 920, y: 360, w: 430, h: 300 };
const APP_RIGHT = APP.x + APP.w;
const APP_CY = APP.y + APP.h / 2;

const pct = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const OutputCard: React.FC<{
  label: string;
  detail: string;
  y: number;
  dashed?: boolean;
  index: number;
  frame: number;
  fps: number;
}> = ({ label, detail, y, dashed, index, frame, fps }) => {
  const delay = 88 + index * 10;
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, mass: 0.8, stiffness: 110 },
  });
  return (
    <div
      style={{
        position: 'absolute',
        left: CARD_X,
        top: y,
        width: CARD_W,
        height: CARD_H,
        borderRadius: 9,
        border: `1px ${dashed ? 'dashed' : 'solid'} ${
          dashed ? 'rgba(199,244,100,0.4)' : C.line
        }`,
        background: dashed
          ? 'rgba(199,244,100,0.035)'
          : 'linear-gradient(180deg, #121715 0%, #0D1110 100%)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '0 22px',
        opacity: s,
        transform: `translateX(${(1 - s) * 18}px)`,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: dashed ? C.lime : C.limeDim,
          opacity: dashed ? 0.9 : 0.65,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: F.mono,
          fontSize: 21,
          color: dashed ? C.lime : C.bone,
          letterSpacing: '-0.02em',
        }}
      >
        {label}
      </span>
      <span
        style={{
          marginLeft: 'auto',
          fontFamily: F.mono,
          fontSize: 13,
          color: C.faint,
          letterSpacing: '0.02em',
        }}
      >
        {detail}
      </span>
    </div>
  );
};

export const Model: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn = pct(frame, 0, 16);
  const defIn = spring({
    frame: frame - 14,
    fps,
    config: { damping: 20, mass: 0.9, stiffness: 95 },
  });
  const compileIn = spring({
    frame: frame - 34,
    fps,
    config: { damping: 18, mass: 0.8, stiffness: 120 },
  });
  const appIn = spring({
    frame: frame - 58,
    fps,
    config: { damping: 20, mass: 0.9, stiffness: 90 },
  });
  const pipe1 = pct(frame, 28, 44);
  const pipe2 = pct(frame, 50, 66);
  const bracket = pct(frame, 78, 120);
  const captionIn = pct(frame, 132, 152);
  const pulse = pct(frame, 38, 62);
  const pulse2 = pct(frame, 66, 88);
  const fadeOut = 1 - pct(frame, 224, 240);

  return (
    <Background>
      <AbsoluteFill style={{ opacity: fadeOut }}>
        <Chapter index="02" label="THE MODEL" />

        <div
          style={{
            position: 'absolute',
            left: 140,
            top: 148,
            opacity: headIn,
            transform: `translateY(${(1 - headIn) * 18}px)`,
          }}
        >
          <div
            style={{
              fontFamily: F.display,
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 0.98,
              letterSpacing: '-0.035em',
              color: C.bone,
            }}
          >
            Declare. Compile. Use.
          </div>
          <div
            style={{
              marginTop: 20,
              fontFamily: F.display,
              fontSize: 24,
              color: C.fog,
            }}
          >
            Compilation is the boundary between authoring and use.
          </div>
        </div>

        {/* connectors */}
        <svg
          width={1920}
          height={1080}
          style={{ position: 'absolute', inset: 0 }}
        >
          <line
            x1={570}
            y1={APP_CY}
            x2={670}
            y2={APP_CY}
            stroke={C.lime}
            strokeWidth={1.5}
            opacity={0.55}
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - pipe1}
          />
          <line
            x1={820}
            y1={APP_CY}
            x2={APP.x}
            y2={APP_CY}
            stroke={C.lime}
            strokeWidth={1.5}
            opacity={0.55}
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - pipe2}
          />
          {OUTPUTS.map((o, i) => {
            const cy = o.y + CARD_H / 2;
            const local = pct(frame, 84 + i * 6, 126 + i * 6);
            return (
              <path
                key={o.label}
                d={`M${APP_RIGHT} ${APP_CY} H1400 V${cy} H${CARD_X}`}
                fill="none"
                stroke={o.dashed ? C.limeDim : 'rgba(242,239,230,0.22)'}
                strokeWidth={1.2}
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={1 - local}
              />
            );
          })}
          <circle
            cx={APP_RIGHT}
            cy={APP_CY}
            r={3.5}
            fill={C.lime}
            opacity={bracket}
          />
        </svg>

        {/* pulse along the pipeline */}
        <div
          style={{
            position: 'absolute',
            left: 570 + pulse * 100 - 4,
            top: APP_CY - 4,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: C.lime,
            boxShadow: '0 0 14px rgba(199,244,100,.8)',
            opacity: pulse > 0 && pulse < 1 ? 1 : 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 820 + pulse2 * 100 - 4,
            top: APP_CY - 4,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: C.lime,
            boxShadow: '0 0 14px rgba(199,244,100,.8)',
            opacity: pulse2 > 0 && pulse2 < 1 ? 1 : 0,
          }}
        />

        {/* Definition */}
        <div
          style={{
            position: 'absolute',
            left: 140,
            top: 380,
            width: 430,
            height: 260,
            borderRadius: 12,
            border: `1px solid ${C.line}`,
            background: 'linear-gradient(180deg, #121715 0%, #0D1110 100%)',
            padding: '26px 28px',
            opacity: defIn,
            transform: `translateY(${(1 - defIn) * 16}px)`,
          }}
        >
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 11.5,
              letterSpacing: '0.17em',
              color: C.faint,
            }}
          >
            AUTHORING
          </div>
          <div
            style={{
              marginTop: 18,
              fontFamily: F.mono,
              fontSize: 28,
              letterSpacing: '-0.03em',
              color: C.bone,
            }}
          >
            cli.Definition[T]
          </div>
          <div
            style={{
              marginTop: 22,
              fontFamily: F.mono,
              fontSize: 15.5,
              lineHeight: 1.8,
              color: C.faint,
            }}
          >
            <div>
              <span style={{ color: C.cyan }}>Declare</span>
              <span>(</span>
              <span style={{ color: C.violet }}>*CommandBuilder</span>
              <span>)</span>
            </div>
            <div>
              <span style={{ color: C.cyan }}>Command</span>
              <span>[T]</span>
              <span style={{ color: C.faint }}> ...</span>
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              left: 28,
              bottom: 22,
              fontFamily: F.mono,
              fontSize: 12,
              letterSpacing: '0.1em',
              color: C.faint,
            }}
          >
            ORDINARY GO
          </div>
        </div>

        {/* Compile */}
        <div
          style={{
            position: 'absolute',
            left: 670,
            top: 470,
            width: 150,
            height: 80,
            borderRadius: 999,
            border: `1px solid rgba(199,244,100,0.42)`,
            background: 'rgba(199,244,100,0.07)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            opacity: compileIn,
            transform: `scale(${0.9 + compileIn * 0.1})`,
            boxShadow: '0 0 46px rgba(199,244,100,0.08)',
          }}
        >
          <span
            style={{
              fontFamily: F.mono,
              fontSize: 19,
              color: C.lime,
              letterSpacing: '-0.02em',
            }}
          >
            Compile
          </span>
          <span
            style={{
              fontFamily: F.mono,
              fontSize: 9.5,
              letterSpacing: '0.16em',
              color: C.limeDim,
            }}
          >
            VALIDATE
          </span>
        </div>

        {/* Application */}
        <div
          style={{
            position: 'absolute',
            left: APP.x,
            top: APP.y,
            width: APP.w,
            height: APP.h,
            borderRadius: 12,
            border: '1px solid rgba(199,244,100,0.45)',
            background:
              'linear-gradient(180deg, rgba(199,244,100,0.075) 0%, rgba(14,18,17,0.96) 42%)',
            padding: '28px 30px',
            opacity: appIn,
            transform: `scale(${0.96 + appIn * 0.04})`,
            boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontFamily: F.mono,
                fontSize: 11.5,
                letterSpacing: '0.17em',
                color: C.lime,
              }}
            >
              IMMUTABLE APPLICATION
            </span>
            <span
              style={{
                fontFamily: F.mono,
                fontSize: 10,
                letterSpacing: '0.1em',
                color: C.limeDim,
                border: '1px solid rgba(199,244,100,0.28)',
                borderRadius: 3,
                padding: '3px 6px',
              }}
            >
              COMPILED ONCE
            </span>
          </div>
          <div
            style={{
              marginTop: 20,
              fontFamily: F.mono,
              fontSize: 28,
              letterSpacing: '-0.03em',
              color: C.bone,
            }}
          >
            cli.Application
          </div>
          <div
            style={{
              marginTop: 26,
              display: 'flex',
              flexDirection: 'column',
              gap: 11,
              fontFamily: F.mono,
              fontSize: 14,
              color: C.fog,
            }}
          >
            {[
              ['RunFromProcess', 'execution'],
              ['Help / Complete', 'presentation'],
              ['Schema / Reference', 'observation'],
            ].map(([left, right]) => (
              <div
                key={left}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <span>{left}</span>
                <span style={{ color: C.faint }}>{right}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              position: 'absolute',
              left: 30,
              right: 30,
              bottom: 22,
              height: 1,
              background:
                'linear-gradient(90deg, rgba(199,244,100,.5), rgba(199,244,100,0))',
              opacity: bracket,
            }}
          />
        </div>

        {OUTPUTS.map((o, i) => (
          <OutputCard
            key={o.label}
            {...o}
            index={i}
            frame={frame}
            fps={fps}
          />
        ))}

        <div
          style={{
            position: 'absolute',
            left: 140,
            top: 790,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            opacity: captionIn,
          }}
        >
          <span style={{ width: 28, height: 2, background: C.lime }} />
          <span
            style={{
              fontFamily: F.display,
              fontSize: 27,
              color: C.bone,
              letterSpacing: '-0.01em',
            }}
          >
            One compiled application.{' '}
            <span style={{ color: C.fog }}>Every surface reads the same facts.</span>
          </span>
        </div>

      </AbsoluteFill>
    </Background>
  );
};
