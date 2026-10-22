# Commandment brand

> One definition. Every surface.

Commandment is a declarative CLI framework for Go. The identity is built around
one structural idea: a **keystone**. A keystone holds an arch together; the
compiled application holds every CLI surface together.

## The mark

The mark is a stone keystone with a command prompt carved into it.

- The **keystone** is the single structural stone: one semantic authority.
- The **chevron and cursor** are the command line.
- The **lime cursor block** is the resolved value: live, typed, and ready.

The chevron is a true cutout, and the cursor is either lime (color versions) or
a cutout (monochrome). The mark therefore works on any background, including
photography and video. Use the supplied variants; do not rebuild the cutout with
a background-colored shape.

## Asset map

### Logo

| File | Use |
| --- | --- |
| [`commandment-lockup-dark.svg`](../assets/brand/commandment-lockup-dark.svg) | Primary horizontal lockup for dark backgrounds |
| [`commandment-lockup-light.svg`](../assets/brand/commandment-lockup-light.svg) | Horizontal lockup for light backgrounds |
| [`commandment-mark-dark.svg`](../assets/brand/commandment-mark-dark.svg) | Mark only, bone, transparent |
| [`commandment-mark-light.svg`](../assets/brand/commandment-mark-light.svg) | Mark only, ink, transparent |
| [`commandment-mark-mono.svg`](../assets/brand/commandment-mark-mono.svg) | One-color mark using `currentColor` |
| [`commandment-wordmark-dark.svg`](../assets/brand/commandment-wordmark-dark.svg) | Wordmark only, bone |
| [`commandment-wordmark-light.svg`](../assets/brand/commandment-wordmark-light.svg) | Wordmark only, ink |
| [`commandment-avatar-1024.png`](../assets/brand/commandment-avatar-1024.png) | GitHub organization avatar / app icon |
| [`commandment-stacked-dark.svg`](../assets/brand/commandment-stacked-dark.svg) | Stacked lockup for square placements (light variant beside it) |

PNG exports at 1024, 2400, 512, 128, and 64 pixels are beside the SVGs in
[`assets/brand`](../assets/brand).

### Banner and social

| File | Dimensions | Use |
| --- | --- | --- |
| [`commandment-banner.png`](../assets/brand/commandment-banner.png) | 1600 × 640 | README / repository banner |
| [`commandment-banner@2x.png`](../assets/brand/commandment-banner@2x.png) | 3200 × 1280 | Retina banner |
| [`commandment-social.png`](../assets/brand/commandment-social.png) | 1280 × 640 | GitHub social preview / Open Graph |
| [`commandment-social@2x.png`](../assets/brand/commandment-social@2x.png) | 2560 × 1280 | Retina social card |

### Demo

| File | Use |
| --- | --- |
| [`commandment-demo.mp4`](../assets/demo/commandment-demo.mp4) | 64-second, 1080p demo |
| [`commandment-demo.gif`](../assets/demo/commandment-demo.gif) | Full 64-second demo as a 1280 × 720, 10 fps GIF for inline README playback |
| [`commandment-demo-720p.mp4`](../assets/demo/commandment-demo-720p.mp4) | Lighter web version |
| [`commandment-demo-poster.jpg`](../assets/demo/commandment-demo-poster.jpg) | Video poster / README thumbnail |
| [`commandment-demo-preview.gif`](../assets/demo/commandment-demo-preview.gif) | Silent looping terminal preview |

All demo assets are silent with on-screen captions, so they autoplay well.

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| Ink | `#0A0C0B` | Primary background |
| Bone | `#F2EFE6` | Primary text and mark |
| Lime | `#C7F464` | Accent, cursor, resolved value, success |
| Fog | `#98A29A` | Secondary text |
| Faint | `#5D665F` | Tertiary text and rules |
| Amber | `#F2A65A` | Problems and errors only |
| Violet | `#C9B8FF` | Go keywords in code |
| Cyan | `#8FD8CE` | Go methods and identifiers in code |

Amber is deliberately scarce: it belongs to the problem and error states. Violet
and cyan are syntax colors inside code, not general-purpose brand accents.

## Typography

- **Space Grotesk** — wordmark, headlines, and product copy. The wordmark is
  Space Grotesk 700 with approximately `-2%` tracking. It is outlined to paths in
  the supplied SVGs so it renders consistently without the font installed.
- **JetBrains Mono** — terminal output, code, labels, and metadata. Small labels
  use uppercase with `+12%` to `+18%` tracking.

Both families are licensed under the SIL Open Font License. License files are in
[`fonts`](fonts).

## Usage

- Keep clear space of at least **one quarter of the mark's height** on every side.
- Minimum mark size: **24 px**. Minimum lockup width: **140 px**.
- On dark backgrounds use the bone mark and wordmark. On light backgrounds use
  ink. Keep the cursor lime in both.
- Use the monochrome mark when color reproduction is limited.
- Do not rotate, stretch, outline, add shadows, or apply gradients to the mark.
- Do not re-set the wordmark in another typeface or change its tracking.
- Do not place the lime cursor on a lime background; use the monochrome mark
  there.

## Voice

Precise, calm, declarative. The product makes strong structural claims, so the
copy does not need exclamation marks or hype.

**Primary tagline**

> One definition. Every surface.

**Supporting lines**

> Declare once. Every surface agrees.

> A declarative CLI framework for Go.

Keep the periods. The two-sentence rhythm is part of the identity.

## Rebuild

The checked-in SVGs and PNGs are generated. From the repository root:

```sh
# Logo SVGs and PNG exports, banner, and social card
./branding/render-assets.sh

# Demo video (optional; renders the Remotion project and derivatives)
RENDER_VIDEO=1 ./branding/render-assets.sh
```

The script uses `python3` (with `fonttools` and `uharfbuzz`), `rsvg-convert`,
Chrome or Chromium, and `ffmpeg`. Set `CHROME=/path/to/chrome` if the binary is
not `google-chrome-stable`. `gifsicle` is optional but recommended: it shrinks
the full-length GIF substantially.

To work on the video interactively:

```sh
cd branding/video
npm ci
npm run studio
```

The video is a Remotion project. Scene timelines live in `src/theme.ts` and each
scene file.

## Demo storyboard

| Time | Chapter | Beat |
| --- | --- | --- |
| 0:00 | Intro | The prompt types; the keystone lockup resolves |
| 0:06 | The problem | Five surfaces describe the same CLI separately |
| 0:14 | The model | Definition → Compile → immutable Application → every surface |
| 0:22 | One typed destination | Default, environment, flag, and rule attach to one `int` |
| 0:35 | The command line | Real `alienctl` output, including a rejected rule |
| 0:48 | Every surface | Completion, schema, and `clitest` answer from the same app |
| 0:57 | Close | Tagline, repository, RC1 status |

## License

The brand assets and demo video are part of the Commandment project and are
licensed under the Apache License 2.0, the same as the source. The bundled fonts
are licensed under the SIL Open Font License; see
[`fonts/LICENSE-SpaceGrotesk.txt`](fonts/LICENSE-SpaceGrotesk.txt) and
[`fonts/LICENSE-JetBrainsMono.txt`](fonts/LICENSE-JetBrainsMono.txt).
