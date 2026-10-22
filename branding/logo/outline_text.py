#!/usr/bin/env python3
"""Outline a variable font string to an SVG path using HarfBuzz shaping."""
import sys
import tempfile
from pathlib import Path

import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.misc.transform import Transform


def build(font_path: str, text: str, size: float, weight: float = 700,
          tracking_em: float = 0.0, baseline: float = 0.0):
    font = TTFont(font_path)
    instantiateVariableFont(font, {"wght": weight}, inplace=True)
    inst_path = Path(tempfile.mkdtemp(prefix="commandment-outline-")) / "inst.ttf"
    font.save(inst_path)

    upem = font["head"].unitsPerEm
    data = inst_path.read_bytes()
    face = hb.Face(data)
    hbfont = hb.Font(face)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(hbfont, buf, {"kern": True, "liga": True})

    scale = size / upem
    glyph_order = font.getGlyphOrder()
    glyph_set = font.getGlyphSet()
    paths = []
    bounds = BoundsPen(glyph_set)
    track = tracking_em * size
    pen_x = 0.0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        gid = info.codepoint
        if gid == 0:
            continue
        name = glyph_order[gid]
        gx = pen_x + pos.x_offset * scale
        gy = baseline - pos.y_offset * scale
        transform = Transform(scale, 0, 0, -scale, gx, gy)
        glyph = glyph_set[name]
        svg_pen = SVGPathPen(glyph_set, ntos=lambda v: f"{v:.2f}")
        glyph.draw(TransformPen(svg_pen, transform))
        d = svg_pen.getCommands()
        if d:
            paths.append(d)
        glyph.draw(TransformPen(bounds, transform))
        pen_x += pos.x_advance * scale + track
    b = bounds.bounds or (0, 0, 0, 0)
    return " ".join(paths), b, pen_x - track if text else 0.0


if __name__ == "__main__":
    font_path = sys.argv[1]
    text = sys.argv[2]
    size = float(sys.argv[3])
    weight = float(sys.argv[4]) if len(sys.argv) > 4 else 700
    tracking = float(sys.argv[5]) if len(sys.argv) > 5 else 0.0
    d, b, advance = build(font_path, text, size, weight, tracking, 0)
    print(f"<!-- bbox: {b[0]:.2f} {b[1]:.2f} {b[2]:.2f} {b[3]:.2f}  advance: {advance:.2f} -->")
    print(f'<path d="{d}"/>')
