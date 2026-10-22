#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

CHROME="${CHROME:-google-chrome-stable}"
FONT_REQUIREMENTS="python3 (fonttools, uharfbuzz), rsvg-convert, $CHROME"

for command in python3 rsvg-convert; do
  if ! command -v "$command" >/dev/null 2>&1; then
    echo "missing required command: $command" >&2
    echo "requirements: $FONT_REQUIREMENTS" >&2
    exit 1
  fi
done
if [[ "${RENDER_VIDEO:-0}" == "1" ]] && ! command -v ffmpeg >/dev/null 2>&1; then
  echo "missing required command: ffmpeg (needed for RENDER_VIDEO=1)" >&2
  exit 1
fi
if ! command -v "$CHROME" >/dev/null 2>&1; then
  echo "missing browser: $CHROME (set CHROME=/path/to/chrome)" >&2
  exit 1
fi

mkdir -p assets/brand assets/demo

echo "==> logo SVGs"
python3 branding/logo/generate.py

echo "==> logo PNGs"
rsvg-convert -w 1024 -h 1024 assets/brand/commandment-avatar-dark.svg -o assets/brand/commandment-avatar-1024.png
rsvg-convert -w 512 -h 512 assets/brand/commandment-avatar-dark.svg -o assets/brand/commandment-avatar-512.png
rsvg-convert -w 128 -h 128 assets/brand/commandment-avatar-dark.svg -o assets/brand/commandment-icon-128.png
rsvg-convert -w 64 -h 64 assets/brand/commandment-avatar-dark.svg -o assets/brand/commandment-icon-64.png
rsvg-convert -w 1024 -h 1024 assets/brand/commandment-mark-dark.svg -o assets/brand/commandment-mark-1024.png
rsvg-convert -w 1024 -h 1024 assets/brand/commandment-mark-light.svg -o assets/brand/commandment-mark-light-1024.png
rsvg-convert -w 1024 -h 1024 assets/brand/commandment-mark-mono.svg -o assets/brand/commandment-mark-mono-1024.png
rsvg-convert -w 2400 assets/brand/commandment-lockup-dark.svg -o assets/brand/commandment-lockup-dark-2400.png
rsvg-convert -w 2400 assets/brand/commandment-lockup-light.svg -o assets/brand/commandment-lockup-light-2400.png
rsvg-convert -w 2400 assets/brand/commandment-wordmark-dark.svg -o assets/brand/commandment-wordmark-dark-2400.png
rsvg-convert -w 2400 assets/brand/commandment-wordmark-light.svg -o assets/brand/commandment-wordmark-light-2400.png

echo "==> banner and social card"
"$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1600,640 \
  --screenshot=assets/brand/commandment-banner.png \
  "file://$PWD/branding/banner/banner.html" >/dev/null 2>&1
"$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --force-device-scale-factor=2 --window-size=1600,640 \
  --screenshot=assets/brand/commandment-banner@2x.png \
  "file://$PWD/branding/banner/banner.html" >/dev/null 2>&1
"$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1280,640 \
  --screenshot=assets/brand/commandment-social.png \
  "file://$PWD/branding/banner/social.html" >/dev/null 2>&1
"$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --force-device-scale-factor=2 --window-size=1280,640 \
  --screenshot=assets/brand/commandment-social@2x.png \
  "file://$PWD/branding/banner/social.html" >/dev/null 2>&1

CHROME_PATH="$(command -v "$CHROME")"

if [[ "${RENDER_VIDEO:-0}" == "1" ]]; then
  echo "==> demo video"
  (
    cd branding/video
    npm ci --no-audit --no-fund
    npx remotion render src/index.ts CommandmentDemo out/commandment-demo.mp4 \
      --browser-executable="$CHROME_PATH" \
      --codec=h264 --crf=18 --pixel-format=yuv420p
  )

  # Remotion writes full-range JPEG-derived video. Convert to standard limited
  # range yuv420p for predictable playback in browsers and editors.
  ffmpeg -y -loglevel error -i branding/video/out/commandment-demo.mp4 \
    -vf "scale=in_range=pc:out_range=tv:flags=lanczos,format=yuv420p" \
    -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -color_range tv \
    -movflags +faststart -an assets/demo/commandment-demo.mp4

  ffmpeg -y -loglevel error -i assets/demo/commandment-demo.mp4 \
    -vf scale=1280:720 -c:v libx264 -crf 20 -preset slow \
    -pix_fmt yuv420p -color_range tv -movflags +faststart -an \
    assets/demo/commandment-demo-720p.mp4

  ffmpeg -y -loglevel error -ss 45.3 -i assets/demo/commandment-demo.mp4 \
    -frames:v 1 assets/demo/commandment-demo-poster.png
  ffmpeg -y -loglevel error -ss 45.3 -i assets/demo/commandment-demo.mp4 \
    -frames:v 1 -vf scale=1280:720 -q:v 2 assets/demo/commandment-demo-poster.jpg

  palette_dir="$(mktemp -d "${TMPDIR:-/tmp}/commandment-gif.XXXXXX")"
  trap 'rm -rf -- "$palette_dir"' EXIT
  ffmpeg -y -loglevel error -ss 38.8 -t 7.0 -i assets/demo/commandment-demo.mp4 \
    -vf "fps=12,scale=800:-1:flags=lanczos,palettegen=stats_mode=diff" \
    "$palette_dir/palette.png"
  ffmpeg -y -loglevel error -ss 38.8 -t 7.0 -i assets/demo/commandment-demo.mp4 \
    -i "$palette_dir/palette.png" \
    -lavfi "fps=12,scale=800:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3" \
    -loop 0 assets/demo/commandment-demo-preview.gif
fi

echo "==> done"
identify assets/brand/commandment-banner.png assets/brand/commandment-social.png 2>/dev/null || true
