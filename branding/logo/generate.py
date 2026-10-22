#!/usr/bin/env python3
"""Generate Commandment identity SVGs: mark, horizontal lockup, stacked lockup."""
import subprocess
from pathlib import Path

HERE = Path(__file__).resolve().parent
BRANDING = HERE.parent
REPO = BRANDING.parent
OUT = REPO / "assets" / "brand"
OUT.mkdir(parents=True, exist_ok=True)
FONT = BRANDING / "fonts" / "SpaceGrotesk.ttf"

INK = "#0A0C0B"
INK_2 = "#121614"
BONE = "#F2EFE6"
LIME = "#C7F464"

WORD = "COMMANDMENT"
WORD_SIZE = 64
WORD_TRACK = -0.02


def outline(text, size, weight=700, tracking=WORD_TRACK):
    raw = subprocess.check_output(
        ["python3", str(HERE / "outline_text.py"), str(FONT), text, str(size), str(weight), str(tracking)],
        text=True,
    )
    lines = raw.strip().splitlines()
    meta = lines[0]
    path = lines[1]
    import re
    nums = [float(v) for v in re.findall(r"-?\d+\.?\d*", meta)]
    # bbox x0 y0 x1 y1
    bbox = tuple(nums[:4])
    return path, bbox


WORD_PATH, WORD_BBOX = outline(WORD, WORD_SIZE)
WORD_W = WORD_BBOX[2] - WORD_BBOX[0]
CAP_H = WORD_BBOX[3] - WORD_BBOX[1]
print("word bbox", WORD_BBOX, "width", WORD_W, "cap", CAP_H)


def mark(fg, bg, accent=None, with_accent=True, pad=40):
    """Native 280x280 mark. Returns (defs, body, bbox)."""
    tablet = "M40 44 H240 L224 232 H56 Z"
    chevron = "M109 106 L151 142 L109 178"
    cursor = '<rect x="165" y="168" width="27" height="14"/>'
    defs = f'''<mask id="cut" maskUnits="userSpaceOnUse" x="0" y="0" width="280" height="280">
  <rect width="280" height="280" fill="black"/>
  <path d="{tablet}" fill="white"/>
  <path d="{chevron}" fill="none" stroke="black" stroke-width="23" stroke-linecap="square" stroke-linejoin="miter"/>
  {cursor.replace('<rect ', '<rect fill="black" ')}
</mask>'''
    body = [f'<path d="{tablet}" fill="{fg}" mask="url(#cut)"/>']
    if with_accent:
        body.append(f'<rect x="165" y="168" width="27" height="14" fill="{accent or LIME}"/>')
    return defs, "\n  ".join(body)


def svg(w, h, content, bg=None):
    bgr = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
  {bgr}
  {content}
</svg>
'''


# --- mark, 280 square, dark and light, mono ---
for name, fg in [("dark", BONE), ("light", INK)]:
    defs, body = mark(fg, INK if name == "dark" else BONE)
    content = f'<defs>{defs}</defs>\n  {body}'
    (OUT / f"commandment-mark-{name}.svg").write_text(svg(280, 280, content))

defs, body = mark("currentColor", "none", with_accent=False)
content = f'<defs>{defs.replace("id=\"cut\"", "id=\"cut-mono\"")}</defs>\n  {body.replace("url(#cut)", "url(#cut-mono)")}'
(OUT / "commandment-mark-mono.svg").write_text(svg(280, 280, content))

# --- wordmark only ---
WM_PAD = 16
WM_W = WORD_W + WM_PAD * 2
WM_H = CAP_H + WM_PAD * 2
for name, fg in [("dark", BONE), ("light", INK)]:
    content = f'<g transform="translate({WM_PAD - WORD_BBOX[0]:.2f},{WM_PAD - WORD_BBOX[1]:.2f})" fill="{fg}">{WORD_PATH}</g>'
    (OUT / f"commandment-wordmark-{name}.svg").write_text(svg(round(WM_W), round(WM_H), content))

# --- horizontal lockup ---
# artwork bbox of mark is x 40..240, y 44..232 (200 x 188)
SCALE = 0.44
ART_W, ART_H = 200 * SCALE, 188 * SCALE
MARK_CX, MARK_CY = 80.0, 70.0
TX = MARK_CX - ART_W / 2 - 40 * SCALE
TY = MARK_CY - ART_H / 2 - 44 * SCALE
GAP = 34
WX = MARK_CX + ART_W / 2 + GAP
BASELINE = MARK_CY + CAP_H / 2
W = WX + WORD_W + 40
H = 140

for name, fg in [("dark", BONE), ("light", INK)]:
    defs, body = mark(fg, INK if name == "dark" else BONE)
    content = f'''<defs>{defs}</defs>
  <g transform="translate({TX:.2f},{TY:.2f}) scale({SCALE})">
    {body}
  </g>
  <g transform="translate({WX - WORD_BBOX[0]:.2f},{BASELINE:.2f})" fill="{fg}">
    {WORD_PATH}
  </g>'''
    (OUT / f"commandment-lockup-{name}.svg").write_text(svg(round(W), H, content))

# --- stacked lockup (square-ish) ---
ST_SCALE = 0.62
ST_ART_W, ST_ART_H = 200 * ST_SCALE, 188 * ST_SCALE
ST_CX = 280
ST_TOP = 60
ST_TX = ST_CX - ST_ART_W / 2 - 40 * ST_SCALE
ST_TY = ST_TOP - 44 * ST_SCALE
ST_WX = ST_CX - WORD_W / 2 - WORD_BBOX[0]
ST_BASE = ST_TOP + ST_ART_H + 44 + CAP_H
ST_W, ST_H = 560, 330
for name, fg in [("dark", BONE), ("light", INK)]:
    defs, body = mark(fg, INK if name == "dark" else BONE)
    content = f'''<defs>{defs}</defs>
  <g transform="translate({ST_TX:.2f},{ST_TY:.2f}) scale({ST_SCALE})">
    {body}
  </g>
  <g transform="translate({ST_WX:.2f},{ST_BASE:.2f})" fill="{fg}">
    {WORD_PATH}
  </g>'''
    (OUT / f"commandment-stacked-{name}.svg").write_text(svg(ST_W, ST_H, content))

# --- avatar: mark on ink, generous padding ---
AV = 512
AV_SCALE = 1.36
AV_ART = 200 * AV_SCALE
AV_TX = AV / 2 - AV_ART / 2 - 40 * AV_SCALE
AV_TY = AV / 2 - (188 * AV_SCALE) / 2 - 44 * AV_SCALE
defs, body = mark(BONE, INK)
content = f'''<defs>{defs}</defs><rect width="{AV}" height="{AV}" fill="{INK}"/>
  <g transform="translate({AV_TX:.2f},{AV_TY:.2f}) scale({AV_SCALE})">{body}</g>'''
(OUT / "commandment-avatar-dark.svg").write_text(svg(AV, AV, content))

print("wrote", sorted(p.name for p in OUT.glob("commandment-*.svg")))
