"""Standalone slides from native deck previews or editable HTML layouts."""
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
        if kind == "payment_problem":
            content += '<ol class="web-payment-gap">'
            content += ''.join(f'<li><h3>{e(label)}</h3><p>{e(detail)}</p><p class="web-payment-status">{e(status)}</p></li>' for label, detail, status in v["stages"]) + '</ol>'
            content += f'<p class="web-payment-band">{e(v["statement"])}</p>'
        elif kind == "payment_flow":
            content += '<ol class="web-payment-flow">'
            content += ''.join(f'<li><span class="web-payment-number">{i:02}</span><h3>{e(label)}</h3><p>{e(detail)}</p></li>' for i, (label, detail) in enumerate(v["steps"], 1)) + '</ol>'
            content += f'<p class="web-payment-band">{e(v["statement"])}</p>'
        elif kind == "receipt":
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
            + f'<div class="web-slide-brand"><strong>KAIROS</strong><span>{e(v.get("brand_right", "FAITH & TECH · SEMI-FINAL"))}</span></div>'
            + f'<div class="web-slide-content"><p class="web-eyebrow">{e(v.get("eyebrow", ""))}</p>{content}</div>'
            + f'<footer><span>{e(v.get("footer", "TRANSPARENT CROWDFUNDING"))}</span><span>{n:02d} / {total:02d}</span></footer></div></article>')

def write_deck(path, slides, css, read_asset, page):
    if page.get('native_slides'):
        return write_native_deck(path, slides, read_asset, page)
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


def write_native_deck(path, slides, read_asset, page):
    """Self-contained previews of the native deck; local video stays optional."""
    media = []
    for section in slides:
        if section.get('is_demo') and page.get('demo_placeholder'):
            media.append(f'<article class="slidemedia demo-placeholder" data-slide="{section["n"]}" hidden>'
                         '<div><h1>Demo</h1><p>Play the separate video.</p></div></article>')
            continue
        source = f'{page["deck_base"]}/slides/slide{section["n"]:02}.jpg'
        data = 'data:image/jpeg;base64,' + base64.b64encode(read_asset(source)).decode()
        if section.get('is_demo'):
            item = f'<video controls playsinline preload="none" poster="{data}" id="local-demo-video" aria-label="Accompanying demo recording"></video>'
        else:
            item = f'<img src="{data}" alt="Slide {section["n"]}: {e(section["title"])}">'
        media.append(f'<article class="slidemedia" data-slide="{section["n"]}" hidden>{item}</article>')
    picker = ('<label class="picker">Choose demo video<input id="local-demo-file" type="file" accept="video/*" hidden></label>'
              if page.get('local_demo') and not page.get('demo_placeholder') else '')
    title = e(page.get('deck_title', 'Kairos'))
    path.write_text('''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>''' + title + '''</title><style>
*{box-sizing:border-box}body{margin:0;background:#18271e;display:grid;place-items:center;min-height:100dvh;font:13px Arial,sans-serif}.native-deck{width:min(100vw,177.7778dvh)}.slidemedia{aspect-ratio:16/9;background:#000;display:grid;place-items:center}.slidemedia[hidden]{display:none!important}.slidemedia img,.slidemedia video{display:block;width:100%;max-height:100dvh;object-fit:contain}.deck-nav{position:fixed;right:12px;bottom:10px;display:flex;gap:10px;align-items:center;color:white}.deck-nav button,.picker{font:inherit;cursor:pointer;background:#173f2d;color:white;border:1px solid #ffffff66;border-radius:4px;padding:7px 12px}@media print{body{display:block;background:white}.native-deck{width:100%}.slidemedia[hidden]{display:block!important}.slidemedia{break-after:page;break-inside:avoid}.deck-nav{display:none}}
.demo-placeholder{background:#f3f1e5;color:#205635;text-align:center}.demo-placeholder h1{font-size:clamp(48px,8vw,96px);margin:0}.demo-placeholder p{font-size:clamp(16px,2vw,28px);margin:20px 0 0}
</style></head><body><main class="native-deck">''' + ''.join(media) + '''</main><nav class="deck-nav" aria-label="Slide controls">''' + picker + '''<button id="previous" aria-label="Previous slide">←</button><span id="position" aria-live="polite"></span><button id="next" aria-label="Next slide">→</button><button id="fullscreen">Fullscreen</button></nav><script>
const slides=[...document.querySelectorAll('.slidemedia')];let current=0,videoUrl=null;
function show(n){current=Math.max(0,Math.min(n,slides.length-1));slides.forEach((s,i)=>{s.hidden=i!==current;if(i!==current)s.querySelector('video')?.pause()});document.getElementById('position').textContent=(current+1)+' / '+slides.length}
document.getElementById('previous').onclick=()=>show(current-1);document.getElementById('next').onclick=()=>show(current+1);
document.getElementById('fullscreen').onclick=()=>{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen().catch(()=>{})};
document.getElementById('local-demo-file')?.addEventListener('change',e=>{const file=e.target.files?.[0];if(!file)return;if(videoUrl)URL.revokeObjectURL(videoUrl);videoUrl=URL.createObjectURL(file);const video=document.getElementById('local-demo-video');video.src=videoUrl;video.load();e.target.closest('label').childNodes[0].textContent='Demo ready ';});
document.addEventListener('keydown',e=>{if(e.target.tagName==='VIDEO')return;if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();show(current+1)}if(e.key==='ArrowLeft'){e.preventDefault();show(current-1)}});show(0);
</script></body></html>''')
