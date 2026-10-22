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

const pct = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const MiniLine: React.FC<{ children: React.ReactNode; indent?: number }> = ({
  children,
  indent = 0,
}) => (
  <div style={{ whiteSpace: 'pre', marginLeft: indent }}>{children}</div>
);

const Card: React.FC<{
  index: string;
  label: string;
  aside: string;
  x: number;
  delay: number;
  frame: number;
  fps: number;
  resultDelay: number;
  result: React.ReactNode;
  children: React.ReactNode;
}> = ({ index, label, aside, x, delay, frame, fps, resultDelay, result, children }) => {
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 19, mass: 0.9, stiffness: 95 },
  });
  const r = pct(frame, resultDelay, resultDelay + 14);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: 320,
        width: 520,
        height: 520,
        borderRadius: 13,
        border: `1px solid ${C.line}`,
        background: 'linear-gradient(180deg, #121715 0%, #0C100E 100%)',
        boxShadow: '0 28px 70px rgba(0,0,0,0.4)',
        opacity: s,
        transform: `translateY(${(1 - s) * 22}px)`,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: 62,
          borderBottom: `1px solid ${C.lineSoft}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: 13,
        }}
      >
        <span
          style={{
            fontFamily: F.mono,
            fontSize: 11,
            color: C.lime,
            letterSpacing: '0.08em',
          }}
        >
          {index}
        </span>
        <span
          style={{
            fontFamily: F.mono,
            fontSize: 11.5,
            letterSpacing: '0.17em',
            color: C.fog,
          }}
        >
          {label}
        </span>
        <span
          style={{
            marginLeft: 'auto',
            fontFamily: F.mono,
            fontSize: 11,
            color: C.faint,
            letterSpacing: '0.02em',
          }}
        >
          {aside}
        </span>
      </div>

      <div
        style={{
          padding: '22px 24px 0',
          fontFamily: F.mono,
          fontSize: 15.5,
          lineHeight: 1.62,
          letterSpacing: '-0.02em',
          color: C.bone,
          height: 350,
        }}
      >
        {children}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 108,
          borderTop: `1px solid ${C.lineSoft}`,
          background: 'rgba(199,244,100,0.035)',
          padding: '14px 24px',
          opacity: r,
          transform: `translateY(${(1 - r) * 8}px)`,
        }}
      >
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 9,
            letterSpacing: '0.18em',
            color: C.faint,
            marginBottom: 8,
          }}
        >
          RESULT
        </div>
        {result}
      </div>
    </div>
  );
};

export const Surfaces: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headIn = pct(frame, 0, 16);
  const capIn = pct(frame, 190, 210);
  const fadeOut = 1 - pct(frame, 254, 270);

  return (
    <Background>
      <AbsoluteFill style={{ opacity: fadeOut }}>
        <Chapter index="05" label="EVERY SURFACE" />

        <div
          style={{
            position: 'absolute',
            left: 140,
            top: 142,
            opacity: headIn,
            transform: `translateY(${(1 - headIn) * 16}px)`,
          }}
        >
          <div
            style={{
              fontFamily: F.display,
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.035em',
              color: C.bone,
            }}
          >
            Different representations.{' '}
            <span style={{ color: C.lime }}>One authority.</span>
          </div>
          <div
            style={{
              marginTop: 16,
              fontFamily: F.display,
              fontSize: 23,
              color: C.fog,
            }}
          >
            The same compiled application, answering as code, as data, and as a
            test.
          </div>
        </div>

        <Card
          index="01"
          label="COMPLETION"
          aside="app.Complete"
          x={140}
          delay={22}
          frame={frame}
          fps={fps}
          resultDelay={100}
          result={
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                style={{
                  fontFamily: F.mono,
                  fontSize: 22,
                  color: C.ink,
                  background: C.lime,
                  padding: '2px 9px',
                  borderRadius: 3,
                }}
              >
                abduct
              </span>
              <span
                style={{
                  fontFamily: F.mono,
                  fontSize: 12,
                  color: C.lime,
                }}
              >
                ← prefix "ab"
              </span>
            </div>
          }
        >
          <MiniLine>
            <span style={{ color: C.cyan }}>result</span>, _ := app.
            <span style={{ color: C.cyan }}>Complete</span>(
          </MiniLine>
          <MiniLine indent={22}>ctx,</MiniLine>
          <MiniLine indent={22}>
            cli.<span style={{ color: C.bone }}>CompletionRequest</span>{'{'}
          </MiniLine>
          <MiniLine indent={44}>
            Args: []<span style={{ color: C.violet }}>string</span>
            {'{"ab"},'}
          </MiniLine>
          <MiniLine indent={44}>
            Cursor: cli.<span style={{ color: C.bone }}>CompletionCursor</span>
            {'{'}
          </MiniLine>
          <MiniLine indent={66}>
            Argument: <span style={{ color: C.amber }}>0</span>, Byte:{' '}
            <span style={{ color: C.amber }}>2</span>,
          </MiniLine>
          <MiniLine indent={44}>{'},'}</MiniLine>
          <MiniLine indent={22}>{'},'}</MiniLine>
          <MiniLine indent={0}>{')'}</MiniLine>
        </Card>

        <Card
          index="02"
          label="SCHEMA"
          aside="app.Schema"
          x={700}
          delay={36}
          frame={frame}
          fps={fps}
          resultDelay={118}
          result={
            <div
              style={{
                fontFamily: F.mono,
                fontSize: 14,
                color: C.lime,
                lineHeight: 1.5,
              }}
            >
              abduct owns ALIEN_BEAM_STRENGTH,
              <br />
              <span style={{ color: C.fog }}>default=true</span>
            </div>
          }
        >
          <MiniLine>
            <span style={{ color: C.violet }}>for</span> _, input := range
          </MiniLine>
          <MiniLine indent={22}>
            schema.<span style={{ color: C.cyan }}>EnvironmentInputs</span>{' '}
            {'{'}
          </MiniLine>
          <MiniLine indent={44}>
            <span style={{ color: C.violet }}>if</span> input.Name ==
          </MiniLine>
          <MiniLine indent={66}>
            <span style={{ color: C.limeDim }}>"ALIEN_BEAM_STRENGTH"</span>{' '}
            {'{'}
          </MiniLine>
          <MiniLine indent={66}>
            value := schema.
            <span style={{ color: C.cyan }}>Values</span>[input.Destination]
          </MiniLine>
          <MiniLine indent={66}>
            cmd := schema.<span style={{ color: C.cyan }}>Commands</span>
            [value.Command]
          </MiniLine>
          <MiniLine indent={44}>{'}'}</MiniLine>
          <MiniLine indent={22}>{'}'}</MiniLine>
        </Card>

        <Card
          index="03"
          label="CLITEST"
          aside="clitest.Inspect"
          x={1260}
          delay={50}
          frame={frame}
          fps={fps}
          resultDelay={136}
          result={
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  fontFamily: F.mono,
                  fontSize: 20,
                  color: C.ink,
                  background: C.lime,
                  borderRadius: 3,
                  padding: '2px 9px',
                }}
              >
                PASS
              </span>
              <span style={{ fontFamily: F.mono, fontSize: 12, color: C.fog }}>
                text "4" · flag
              </span>
            </div>
          }
        >
          <MiniLine>
            clitest.<span style={{ color: C.cyan }}>Inspect</span>(
          </MiniLine>
          <MiniLine indent={22}>t.Context(), app, request,</MiniLine>
          <MiniLine indent={0}>{').Require(t,'}</MiniLine>
          <MiniLine indent={22}>
            beamStrength.<span style={{ color: C.cyan }}>Text</span>(
            <span style={{ color: C.limeDim }}>"4"</span>),
          </MiniLine>
          <MiniLine indent={22}>
            beamStrength.<span style={{ color: C.cyan }}>ContributedBy</span>(
          </MiniLine>
          <MiniLine indent={44}>
            cli.<span style={{ color: C.violet }}>ValueProducerKindFlag</span>,
          </MiniLine>
          <MiniLine indent={22}>{'),'}</MiniLine>
          <MiniLine indent={0}>{')'}</MiniLine>
        </Card>

        <div style={{ opacity: capIn }}>
          <Caption delay={0}>
            Help, completion, tooling, and tests never re-derive the facts.
          </Caption>
        </div>
      </AbsoluteFill>
    </Background>
  );
};
