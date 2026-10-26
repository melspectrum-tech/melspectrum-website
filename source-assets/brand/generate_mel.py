#!/usr/bin/env python3
"""MEL company logo (2026-10) — rasters for melspectrum.com, built from the official package SVGs in mel/.

  python3 generate_mel.py        # writes ../images/*-mel-202610.* and refreshes the legacy unversioned files
Supersedes the company outputs of generate.py (teal dome). Product marks (PianoTuner, Somnil) are unchanged.
Rule: dark ground -> white ink (#f8f7f4), light ground -> black ink (#111111). Never recolour or redraw the mark.
"""
import os, re, shutil
from PIL import Image
from generate import chrome, uri, text_svg, ASH, SILVER

HERE = os.path.dirname(os.path.abspath(__file__))
MEL = os.path.join(HERE, 'mel'); OUT = os.path.join(HERE, '..', 'images')
INK_DARK, INK_LIGHT, GROUND_DARK = '#111111', '#f8f7f4', '#111111'

def load(name): return open(os.path.join(MEL, name)).read()
def inner(svgtxt): return re.search(r'(<g fill=.*</g>)', svgtxt, re.S).group(1)
MARK_W, MARK_H, LOCK_H = 180.3, 41.9, 73

def tile(size, pad=0.12, bg=GROUND_DARK):
    """Square icon: white MEL mark centred on a dark ground (favicon PNG / apple-touch)."""
    w = size * (1 - 2 * pad); h = w * MARK_H / MARK_W
    return (f'<html><body style="margin:0"><div style="width:{size}px;height:{size}px;background:{bg};display:flex;align-items:center;justify-content:center">'
            f'<img src="{uri(load("MEL-mark-white.svg"))}" width="{w:.2f}" height="{h:.2f}"></div></body></html>')

def favicon_svg():
    """Transparent, square, follows the browser theme: black on light tabs, white on dark tabs."""
    g = inner(load('MEL-mark-black.svg')).replace('fill="#111111"', 'class="m"')
    side = MARK_W + 8; y = -(side - MARK_H) / 2
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 {y:.2f} {side:.1f} {side:.1f}">'
            f'<style>.m{{fill:{INK_DARK}}}@media(prefers-color-scheme:dark){{.m{{fill:{INK_LIGHT}}}}}</style>{g}</svg>')

def logo512():
    """JSON-LD Organization.logo: black lockup on white (search results render it on light ground)."""
    w = 400; h = w * LOCK_H / MARK_W
    return (f'<html><body style="margin:0"><div style="width:512px;height:512px;background:#fff;display:flex;align-items:center;justify-content:center">'
            f'<img src="{uri(load("MEL-lockup-black.svg"))}" width="{w}" height="{h:.2f}"></div></body></html>')

def og():
    """1200x630 share card: same layout as the 2026-09 card, teal dome replaced by the white MEL lockup."""
    lw = 420; lh = lw * LOCK_H / MARK_W
    zh = text_svg('融谱智能科技', 'noto', SILVER, 44, .04)
    tag, en = text_svg('让机器听懂声音', 'noto', '#FAFAFA', 40, .02), text_svg('Teach machines to listen', 'inter-400', ASH, 30)
    return (f'<html><body style="margin:0"><div style="width:1200px;height:630px;background:{GROUND_DARK};position:relative;box-sizing:border-box;padding:70px 90px">'
            f'<div style="margin-top:40px;display:flex;align-items:flex-end;gap:40px"><img src="{uri(load("MEL-lockup-white.svg"))}" width="{lw}" height="{lh:.2f}">'
            f'<img src="{uri(zh)}" height="58" style="margin-bottom:-6px"></div>'
            f'<div style="position:absolute;left:90px;bottom:90px"><img src="{uri(tag)}" height="52"><div style="height:14px"></div><img src="{uri(en)}" height="40"></div>'
            f'<div style="position:absolute;left:90px;right:90px;bottom:200px;border-top:1px dashed #414141"></div></div></body></html>')

def opaque(p):
    Image.open(p).convert('RGB').save(p, optimize=True)

def main():
    os.makedirs(OUT, exist_ok=True)
    o = lambda f: os.path.join(OUT, f)
    open(o('favicon-mel-202610.svg'), 'w').write(favicon_svg())
    for s in (16, 32):
        chrome(tile(s, pad=0.06), s, s, o(f'favicon-{s}-mel-202610.png'), transparent=False); opaque(o(f'favicon-{s}-mel-202610.png'))
    chrome(tile(180), 180, 180, o('apple-touch-icon-mel-202610.png'), transparent=False); opaque(o('apple-touch-icon-mel-202610.png'))
    chrome(logo512(), 512, 512, o('logo-mel-202610.png'), transparent=False); opaque(o('logo-mel-202610.png'))
    chrome(og(), 1200, 630, o('og-mel-202610.png'), transparent=False); opaque(o('og-mel-202610.png'))
    # legacy unversioned URLs (old links / caches) now serve the new logo too
    for new, old in [('favicon-16-mel-202610.png', 'favicon-16.png'), ('favicon-32-mel-202610.png', 'favicon-32.png'),
                     ('apple-touch-icon-mel-202610.png', 'apple-touch-icon.png'), ('logo-mel-202610.png', 'logo.png'),
                     ('og-mel-202610.png', 'og-image.png')]:
        shutil.copyfile(o(new), o(old))
    for f in sorted(os.listdir(OUT)):
        if 'mel-202610' in f: print(' ', f, os.path.getsize(o(f)))

if __name__ == '__main__':
    main()
