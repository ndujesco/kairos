"""Native HTML slide rendering for proposed decks without native PPTX exports."""
from pathlib import Path
import base64
import html

e = html.escape

def render_slide(section, total, read_asset, *, hidden=True):
    v = section["visual"]
    kind = v.get("kind", "points")
    n = section["n"]
    content = ""
    if kind == "cover":
        content = f'<p class="web-cover-name">{e(v["title"])}</p><h2>{e(v["lead"])}</h2><p class="web-statement">{e(v["statement"])}</p>'
    else:
        content = f'<h2>{e(v["title"])}</h2>'
        if v.get("lead") and kind != "receipt":
            content += f'<p class="web-lead">{e(v["lead"])}</p>'
        if kind == "receipt":
            content += f'<p class="web-big">{e(v["big"])}</p><p class="web-lead">{e(v["lead"])}</p><dl class="web-details">'
            content += ''.join(f'<div><dt>{e(k)}</dt><dd>{e(value)}</dd></div>' for k, value in v["details"]) + '</dl>'
        elif kind == "table":
            content += '<table class="web-table"><thead><tr>' + ''.join(f'<th>{e(x)}</th>' for x in v["columns"]) + '</tr></thead><tbody>'
            content += ''.join('<tr>' + ''.join(f'<td>{e(x)}</td>' for x in row) + '</tr>' for row in v["rows"]) + '</tbody></table>'
        elif kind == "people":
            content += '<div class="web-people">'
            for person in v["people"]:
                encoded = base64.b64encode(read_asset(person["image"])).decode()
                content += f'<div><img src="data:image/jpeg;base64,{encoded}" alt="{e(person["name"])}"><h3>{e(person["name"])}</h3><p>{e(person["role"])}</p></div>'
            content += '</div>'
        elif kind == "closing":
            content += f'<p class="web-statement">{e(v["statement"])}</p>'
        elif v.get("points"):
            content += '<div class="web-points">' + ''.join(f'<div><h3>{e(label)}</h3><p>{e(text)}</p></div>' for label, text in v["points"]) + '</div>'
    if v.get("footnote"):
        content += f'<p class="web-footnote">{e(v["footnote"])}</p>'
    return (f'<article class="slideimage slidemedia web-slide web-kind-{e(kind)}" data-slide="{n}" role="group" aria-label="Slide {n}: {e(section["title"])}"'
            + (' hidden' if hidden else '') + '><div class="web-slide-inner">'
            + f'<div class="web-slide-brand"><strong>KAIROS</strong><span>FAITH &amp; TECH · SEMI-FINAL</span></div>'
            + f'<div class="web-slide-content"><p class="web-eyebrow">{e(v.get("eyebrow", ""))}</p>{content}</div>'
            + f'<footer><span>TRANSPARENT CROWDFUNDING</span><span>{n:02d} / {total:02d}</span></footer></div></article>')

def write_deck(path, slides, css, read_asset, page):
    media = []
    for s in slides:
        if s.get("is_demo"):
            media.append(f'<article class="slideimage slidemedia web-standalone-video" data-slide="{s["n"]}" hidden><video controls preload="none" playsinline poster="https://kairos-community.vercel.app/{e(page["demo_poster"])}" src="https://kairos-community.vercel.app/{e(page["demo_url"])}" aria-label="Existing prototype walkthrough"></video></article>')
        else:
            media.append(render_slide(s, len(slides), read_asset, hidden=s["n"] != 1))
    path.write_text('''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Kairos · Faith &amp; Tech semi-final deck</title><style>''' + css + '''
*{box-sizing:border-box}body{margin:0;background:#15251b;font-family:Arial,sans-serif;min-height:100dvh;display:grid;place-items:center}.web-deck-stage{width:min(100vw,177.7778dvh)}.web-standalone-video{aspect-ratio:16/9;display:grid;place-items:center;background:#000}.web-standalone-video video{width:100%;max-height:100dvh}.web-standalone-video[hidden]{display:none}.deck-nav{position:fixed;right:12px;bottom:10px;display:flex;align-items:center;gap:10px;font-size:12px;color:white}.deck-nav button{font:inherit;cursor:pointer;border:1px solid #ffffff55;background:#173f2d;color:white;padding:6px 12px;border-radius:4px}@media print{body{display:block;background:white}.web-deck-stage{width:100%}.slidemedia[hidden]{display:block!important}.slidemedia{break-after:page;break-inside:avoid}.deck-nav{display:none}}
</style></head><body><main class="web-deck-stage">''' + ''.join(media) + '''</main><nav class="deck-nav" aria-label="Slide navigation"><button id="previous" aria-label="Previous slide">←</button><span id="position" aria-live="polite"></span><button id="next" aria-label="Next slide">→</button></nav>
<script>const slides=[...document.querySelectorAll('.slidemedia')];let current=0;function show(n){current=Math.max(0,Math.min(n,slides.length-1));slides.forEach((s,i)=>{s.hidden=i!==current;if(i!==current)s.querySelector('video')?.pause()});document.getElementById('position').textContent=(current+1)+' / '+slides.length}document.getElementById('previous').onclick=()=>show(current-1);document.getElementById('next').onclick=()=>show(current+1);document.addEventListener('keydown',e=>{if(e.target.tagName==='VIDEO')return;if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();show(current+1)}if(e.key==='ArrowLeft'){e.preventDefault();show(current-1)}});show(0);</script></body></html>''')
