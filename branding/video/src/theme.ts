export const C = {
  ink: '#0A0C0B',
  ink2: '#0E1211',
  panel: '#101513',
  panelHi: '#141A17',
  bone: '#F2EFE6',
  fog: '#98A29A',
  faint: '#5D665F',
  line: 'rgba(242,239,230,0.12)',
  lineSoft: 'rgba(242,239,230,0.07)',
  lime: '#C7F464',
  limeDim: '#8FAE55',
  cyan: '#8FD8CE',
  violet: '#C9B8FF',
  amber: '#F2A65A',
  green: '#7EE787',
  red: '#FF7B72',
} as const;

export const F = {
  display: "'Space Grotesk', sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;

export const W = 1920;
export const H = 1080;
export const FPS = 30;

export const SCENES = {
  intro: { from: 0, duration: 180 },
  problem: { from: 180, duration: 240 },
  model: { from: 420, duration: 240 },
  declaration: { from: 660, duration: 390 },
  run: { from: 1050, duration: 390 },
  surfaces: { from: 1440, duration: 270 },
  outro: { from: 1710, duration: 210 },
} as const;

export const TOTAL_FRAMES = 1920;
