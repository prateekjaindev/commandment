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
import { CodeCard, type CodeLine } from '../components/CodeCard';

const V = C.lime;
const I = C.bone;
const M = C.cyan;
const P = C.faint;
const Fg = C.fog;
const S = C.limeDim;
const N = C.amber;
const K = C.violet;

const LINES: CodeLine[] = [
  [
    { text: 'beamStrength', color: V, weight: 600 },
    { text: ' := ', color: P },
    { text: 'abduct', color: Fg },
    { text: '.', color: P },
    { text: 'Values', color: M },
    { text: '.', color: P },
    { text: 'Int', color: M },
    { text: '(', color: P },
  ],
  [
    { text: '    &', color: P },
    { text: 'abduct', color: Fg },
    { text: '.', color: P },
    { text: 'Config', color: M },
    { text: '.', color: P },
    { text: 'BeamStrength', color: I },
    { text: ',', color: P },
  ],
  [{ text: ')', color: P }],
  [],
  [
    { text: 'abduct', color: Fg },
    { text: '.', color: P },
    { text: 'Values', color: M },
    { text: '.', color: P },
    { text: 'Default', color: M },
    { text: '(', color: P },
    { text: 'beamStrength', color: V, weight: 600 },
    { text: ', ', color: P },
    { text: '1', color: N },
    { text: ')', color: P },
  ],
  [
    { text: 'abduct', color: Fg },
    { text: '.', color: P },
    { text: 'Values', color: M },
    { text: '.', color: P },
    { text: 'Environment', color: M },
    { text: '(', color: P },
  ],
  [
    { text: '    beamStrength', color: V, weight: 600 },
    { text: ', ', color: P },
    { text: '"ALIEN_BEAM_STRENGTH"', color: S },
    { text: ',', color: P },
  ],
  [{ text: ')', color: P }],
  [
    { text: 'abduct', color: Fg },
    { text: '.', color: P },
    { text: 'Flags', color: M },
    { text: '.', color: P },
    { text: 'ValueFor', color: M },
    { text: '(', color: P },
    { text: 'beamStrength', color: V, weight: 600 },
    { text: ')', color: P },
    { text: '.', color: P },
  ],
  [
    { text: '    Long', color: M },
    { text: '(', color: P },
    { text: '"beam-strength"', color: S },
    { text: ')', color: P },
  ],
  [],
  [
    { text: 'abduct', color: Fg },
    { text: '.', color: P },
    { text: 'Rule', color: M },
    { text: '.', color: P },
    { text: 'Between', color: M },
    { text: '(', color: P },
    { text: 'beamStrength', color: V, weight: 600 },
    { text: ', ', color: P },
    { text: '1', color: N },
    { text: ', ', color: P },
    { text: '10', color: N },
    { text: ')', color: P },
  ],
];

const pct = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

type SourceRowProps = {
  label: string;
  value: string;
  y: number;
  delay: number;
  frame: number;
  fps: number;
  winner?: boolean;
  fontSize?: number;
  dotDelay: number;
};

const SourceRow: React.FC<SourceRowProps> = ({
  label,
  value,
  y,
  delay,
  frame,
  fps,
  winner,
  fontSize = 19,
  dotDelay,
}) => {
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, mass: 0.8, stiffness: 120 },
  });
  const win = winner ? pct(frame, 150, 168) : 0;
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 56,
          top: y,
          width: 454,
          height: 70,
          borderRadius: 8,
          border: `1px solid ${
            win > 0.5 ? 'rgba(199,244,100,0.55)' : 'rgba(242,239,230,0.1)'
          }`,
          background:
            win > 0.5
              ? 'rgba(199,244,100,0.055)'
              : 'linear-gradient(180deg, #121715 0%, #0D1110 100%)',
          padding: '11px 16px',
          opacity: s,
          transform: `translateY(${(1 - s) * 10}px)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 9.5,
            letterSpacing: '0.18em',
            color: win > 0.5 ? C.lime : C.faint,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize,
            color: win > 0.5 ? C.lime : C.bone,
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </div>
        {winner ? (
          <span
            style={{
              position: 'absolute',
              right: 14,
              top: 12,
              fontFamily: F.mono,
              fontSize: 9,
              letterSpacing: '0.14em',
              color: C.ink,
              background: C.lime,
              borderRadius: 3,
              padding: '3px 6px',
              opacity: win,
              transform: `scale(${0.92 + win * 0.08})`,
            }}
          >
            WINS
          </span>
        ) : null}
      </div>
      <span
        style={{
          position: 'absolute',
          left: 25,
          top: y + 31,
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: win > 0.5 ? C.lime : C.faint,
          opacity: pct(frame, dotDelay, dotDelay + 10),
          boxShadow: win > 0.5 ? '0 0 12px rgba(199,244,100,.6)' : undefined,
        }}
      />
    </>
  );
};

export const Declaration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn = pct(frame, 0, 16);
  const reveal = Math.max(
    0,
    Math.min(LINES.length, Math.floor((frame - 18) / 8) + 1),
  );
  const activeLine =
    frame < 130 ? Math.max(0, reveal - 1) : LINES.length - 1;
  const codeIn = pct(frame, 4, 18);
  const panelIn = pct(frame, 10, 26);
  const rail = pct(frame, 48, 250);
  const resolvedIn = pct(frame, 158, 176);
  const ruleIn = pct(frame, 192, 210);
  const resultIn = pct(frame, 228, 248);
  const captionIn = pct(frame, 278, 298);
  const fadeOut = 1 - pct(frame, 374, 390);
  const glow = pct(frame, 150, 180);

  return (
    <Background>
      <AbsoluteFill style={{ opacity: fadeOut }}>
        <Chapter index="03" label="ONE TYPED DESTINATION" />

        <div
          style={{
            position: 'absolute',
            left: 140,
            top: 144,
            opacity: headIn,
            transform: `translateY(${(1 - headIn) * 16}px)`,
          }}
        >
          <div
            style={{
              fontFamily: F.display,
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.035em',
              color: C.bone,
            }}
          >
            One value. <span style={{ color: C.lime }}>Three inputs.</span>
          </div>
          <div
            style={{
              marginTop: 18,
              fontFamily: F.display,
              fontSize: 23,
              color: C.fog,
            }}
          >
            Static default, environment, and flag all attach to the same typed
            destination.
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 140,
            top: 300,
            opacity: codeIn,
            transform: `translateY(${(1 - codeIn) * 14}px)`,
          }}
        >
          <CodeCard
            file="abduct.go"
            lines={LINES}
            reveal={reveal}
            activeLine={activeLine}
            width={1040}
            height={600}
            fontSize={25}
            lineHeight={1.56}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            left: 1240,
            top: 300,
            width: 540,
            height: 600,
            borderRadius: 13,
            border: `1px solid ${C.line}`,
            background: 'linear-gradient(180deg, #111614 0%, #0B0F0D 100%)',
            boxShadow: '0 28px 70px rgba(0,0,0,0.4)',
            opacity: panelIn,
            transform: `translateY(${(1 - panelIn) * 14}px)`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 24,
              top: 22,
              right: 24,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: F.mono,
                fontSize: 10.5,
                letterSpacing: '0.18em',
                color: C.faint,
              }}
            >
              RESOLUTION
            </span>
            <span
              style={{
                fontFamily: F.mono,
                fontSize: 10,
                letterSpacing: '0.12em',
                color: C.limeDim,
                border: '1px solid rgba(199,244,100,0.24)',
                borderRadius: 3,
                padding: '2px 6px',
              }}
            >
              TYPED
            </span>
          </div>

          <div
            style={{
              position: 'absolute',
              left: 26,
              top: 52,
              fontFamily: F.mono,
              fontSize: 27,
              letterSpacing: '-0.03em',
              color: C.lime,
            }}
          >
            beamStrength
            <span
              style={{
                marginLeft: 10,
                fontSize: 13,
                letterSpacing: '0.06em',
                color: C.faint,
              }}
            >
              int
            </span>
          </div>

          <div
            style={{
              position: 'absolute',
              left: 28,
              top: 118,
              width: 1,
              height: 438,
              background:
                'linear-gradient(180deg, rgba(199,244,100,.45), rgba(242,239,230,.09))',
              transform: `scaleY(${rail})`,
              transformOrigin: 'top',
            }}
          />

          <SourceRow
            label="DEFAULT"
            value="1"
            y={116}
            delay={62}
            dotDelay={52}
            frame={frame}
            fps={fps}
          />
          <SourceRow
            label="ENVIRONMENT"
            value="ALIEN_BEAM_STRENGTH=2"
            y={198}
            delay={94}
            dotDelay={84}
            frame={frame}
            fps={fps}
            fontSize={16}
          />
          <SourceRow
            label="FLAG"
            value="--beam-strength 4"
            y={280}
            delay={126}
            dotDelay={116}
            frame={frame}
            fps={fps}
            winner
          />

          <div
            style={{
              position: 'absolute',
              left: 56,
              top: 372,
              width: 454,
              height: 64,
              borderRadius: 8,
              border: `1px solid ${
                resolvedIn > 0.5 ? 'rgba(199,244,100,0.3)' : C.lineSoft
              }`,
              background: 'rgba(199,244,100,0.035)',
              opacity: resolvedIn,
              transform: `translateY(${(1 - resolvedIn) * 8}px)`,
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
            }}
          >
            <span
              style={{
                fontFamily: F.mono,
                fontSize: 10,
                letterSpacing: '0.16em',
                color: C.faint,
              }}
            >
              RESOLVED
            </span>
            <span
              style={{
                marginLeft: 'auto',
                fontFamily: F.mono,
                fontSize: 12,
                color: C.faint,
                marginRight: 12,
              }}
            >
              flag wins
            </span>
            <span
              style={{
                fontFamily: F.mono,
                fontSize: 30,
                color: C.lime,
                letterSpacing: '-0.03em',
                textShadow: `0 0 ${18 * glow}px rgba(199,244,100,.5)`,
              }}
            >
              4
            </span>
          </div>
          <span
            style={{
              position: 'absolute',
              left: 25,
              top: 400,
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: C.lime,
              opacity: resolvedIn,
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 56,
              top: 454,
              width: 454,
              height: 56,
              borderRadius: 8,
              border: `1px solid rgba(242,239,230,0.1)`,
              background: 'linear-gradient(180deg, #121715 0%, #0D1110 100%)',
              opacity: ruleIn,
              transform: `translateY(${(1 - ruleIn) * 8}px)`,
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              gap: 12,
            }}
          >
            <span
              style={{
                fontFamily: F.mono,
                fontSize: 14,
                color: C.bone,
              }}
            >
              Rule.Between
            </span>
            <span
              style={{
                fontFamily: F.mono,
                fontSize: 13,
                color: C.amber,
              }}
            >
              1 .. 10
            </span>
            <span
              style={{
                marginLeft: 'auto',
                fontFamily: F.mono,
                fontSize: 10,
                letterSpacing: '0.12em',
                color: C.lime,
              }}
            >
              ✓ PASS
            </span>
          </div>
          <span
            style={{
              position: 'absolute',
              left: 25,
              top: 480,
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: C.lime,
              opacity: ruleIn,
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 56,
              top: 528,
              width: 454,
              height: 54,
              borderRadius: 8,
              border: `1px solid rgba(199,244,100,0.28)`,
              background: 'rgba(199,244,100,0.05)',
              opacity: resultIn,
              transform: `translateY(${(1 - resultIn) * 8}px)`,
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
            }}
          >
            <span
              style={{
                fontFamily: F.mono,
                fontSize: 15,
                color: C.fog,
              }}
            >
              cfg.
              <span style={{ color: C.bone }}>BeamStrength</span>
            </span>
            <span
              style={{
                marginLeft: 'auto',
                fontFamily: F.mono,
                fontSize: 24,
                color: C.lime,
              }}
            >
              4
            </span>
          </div>
          <span
            style={{
              position: 'absolute',
              left: 25,
              top: 552,
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: C.lime,
              opacity: resultIn,
              boxShadow: '0 0 12px rgba(199,244,100,.5)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 24,
              right: 24,
              bottom: 14,
              fontFamily: F.mono,
              fontSize: 10,
              color: '#3F4841',
              letterSpacing: '0.04em',
            }}
          >
            resolved before Run
          </div>
        </div>

        <div style={{ opacity: captionIn }}>
          <Caption delay={0}>
            The handler receives{' '}
            <span style={{ color: C.bone }}>cfg.BeamStrength</span> as an int.
            It never parses, reads the environment, or re-checks the rule.
          </Caption>
        </div>
      </AbsoluteFill>
    </Background>
  );
};
