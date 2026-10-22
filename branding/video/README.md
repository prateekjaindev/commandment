# Commandment demo video

Remotion source for the 64-second Commandment demo.

```sh
npm ci
npm run studio       # interactive preview
npm run render       # renders with Remotion's managed Chrome
npm run render:local # uses /usr/bin/google-chrome-stable
```

The composition is `CommandmentDemo`: 1920 × 1080, 30 fps, 1920 frames. The
timeline lives in [`src/theme.ts`](src/theme.ts); each chapter is a component in
[`src/scenes`](src/scenes). The reusable terminal, code card, mark, lockup, and
background components are in [`src/components`](src/components).

The video is intentionally silent and carries all narration as on-screen
captions. Final exports live in [`assets/demo`](../../assets/demo); use the root
[`branding/render-assets.sh`](../render-assets.sh) to rebuild the poster, 720p
version, and GIF alongside the master.

Fonts are Space Grotesk and JetBrains Mono, both OFL. Their license files are in
[`../../branding/fonts`](../fonts).
