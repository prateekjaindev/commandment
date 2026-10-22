import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { C, F } from '../theme';
import { Background } from '../components/Background';
import { Chapter } from '../components/Chapter';
import { Caption } from '../components/Caption';
import { Terminal, Prompt } from '../components/Terminal';
import { Cursor } from '../components/Cursor';

type Tok = { text: string; color?: string };

const CMD1: Tok[] = [
  { text: './alienctl' },
  { text: ' --profile', color: C.violet },
  { text: ' survey', color: C.lime },
  { text: ' scan' },
  { text: ' mars', color: C.lime },
];

const CMD2: Tok[] = [
  { text: 'ALIEN_BEAM_STRENGTH', color: C.cyan },
  { text: '=2', color: C.cyan },
  { text: ' ./alienctl' },
  { text: ' --profile', color: C.violet },
  { text: ' field', color: C.lime },
  { text: ' abduct' },
  { text: ' --beam-strength', color: C.violet },
  { text: ' 4', color: C.lime },
  { text: ' cow', color: C.lime },
];

const CMD3: Tok[] = [
  { text: './alienctl' },
  { text: ' abduct' },
  { text: ' --beam-strength', color: C.violet },
  { text: ' 99', color: C.amber },
  { text: ' cow', color: C.lime },
];

const CHAR_W = 15.6;
const LINE = 46;

const flat = (tokens: Tok[]) => tokens.map((t) => t.text).join('');

const CommandLine: React.FC<{
  tokens: Tok[];
  start: number;
  cps?: number;
  frame: number;
  hide?: boolean;
}> = ({ tokens, start, cps = 1.5, frame, hide }) => {
  const text = flat(tokens);
  const chars = Math.max(
    0,
    Math.min(text.length, Math.floor((frame - start) * cps)),
  );
  const visible = frame >= start && !hide;
  const done = chars >= text.length;
  return (
    <div
      style={{
        height: LINE,
        display: 'flex',
        alignItems: 'center',
        opacity: visible ? 1 : 0,
        position: 'relative',
      }}
    >
      <Prompt />
      <div
        style={{
          position: 'relative',
          width: text.length * CHAR_W,
          height: LINE,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            clipPath: `inset(0 ${Math.max(0, 100 - (chars / text.length) * 100)}% 0 0)`,
            whiteSpace: 'nowrap',
          }}
        >
          {tokens.map((t, i) => (
            <span key={i} style={{ color: t.color ?? C.bone }}>
              {t.text}
            </span>
          ))}
        </div>
        {!done && visible ? (
          <span
            style={{
              position: 'absolute',
              left: chars * CHAR_W,
              top: 9,
            }}
          >
            <Cursor width={13} height={27} />
          </span>
        ) : null}
      </div>
    </div>
  );
};

const OutputLine: React.FC<{
  at: number;
  frame: number;
  children: React.ReactNode;
  tone?: string;
}> = ({ at, frame, children, tone }) => {
  const p = interpolate(frame, [at, at + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        height: LINE,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 30,
        color: tone ?? C.fog,
        opacity: p,
        transform: `translateY(${(1 - p) * 4}px)`,
      }}
    >
      <span style={{ whiteSpace: 'pre' }}>{children}</span>
    </div>
  );
};

const Blank: React.FC = () => <div style={{ height: LINE }} />;

export const Run: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const termIn = interpolate(frame, [8, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalPrompt = frame >= 276;
  const captionIn = interpolate(frame, [290, 310], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = 1 - interpolate(frame, [374, 390], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Background>
      <AbsoluteFill style={{ opacity: fadeOut }}>
        <Chapter index="04" label="THE COMMAND LINE" />

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
            The same app. <span style={{ color: C.lime }}>A real terminal.</span>
          </div>
          <div
            style={{
              marginTop: 16,
              fontFamily: F.display,
              fontSize: 23,
              color: C.fog,
            }}
          >
            The compiled Application supplies typed configuration to ordinary Go
            handlers.
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 140,
            top: 300,
            opacity: termIn,
            transform: `translateY(${(1 - termIn) * 14}px)`,
          }}
        >
          <Terminal width={1640} height={580} title="alienctl — zsh">
            <CommandLine tokens={CMD1} start={20} frame={frame} />
            <OutputLine at={56} frame={frame}>
              scanning <span style={{ color: C.bone }}>mars</span> with profile
              survey
            </OutputLine>
            <Blank />

            <CommandLine tokens={CMD2} start={90} frame={frame} />
            <OutputLine at={162} frame={frame}>
              abducting <span style={{ color: C.bone }}>cow</span> with beam
              strength <span style={{ color: C.lime }}>4</span> using profile
              field
            </OutputLine>
            <Blank />

            <CommandLine tokens={CMD3} start={200} frame={frame} />
            <OutputLine at={246} frame={frame} tone={C.amber}>
              commandment: rule-violation
            </OutputLine>
            <Blank />

            <div
              style={{
                height: LINE,
                display: 'flex',
                alignItems: 'center',
                opacity: finalPrompt ? 1 : 0,
              }}
            >
              <Prompt />
              <Cursor width={13} height={27} />
            </div>
          </Terminal>
        </div>

        <div style={{ opacity: captionIn }}>
          <Caption delay={0}>
            The flag wins, the rule passes, and the handler receives an{' '}
            <span style={{ color: C.bone }}>int</span>. An invalid{' '}
            <span style={{ color: C.amber }}>99</span> never gets there.
          </Caption>
        </div>
      </AbsoluteFill>
    </Background>
  );
};
