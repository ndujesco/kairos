#!/usr/bin/env python3
"""Build all.html from an append-only register of decks and script editions.

Normal builds need only this repository. --import-local discovers retained
HTML/script editions in the parent Kairos workspace and snapshots them once.
Snapshots preserve slide/script text while keeping native movies in Drive.
"""
from pathlib import Path
import argparse
import base64
import hashlib
import html
import json
import mimetypes
import re
import shutil
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
REGISTER = ROOT / 'pitch-room/deck-catalog.json'
ARCHIVE = PUBLIC / 'pitch-archive'
BAD_MEDIA = {'.mp4', '.mov', '.m4v', '.webm', '.avi', '.wmv', '.mkv', '.pptx', '.key'}
CURRENT = [
    {'title': 'Faith & Tech · Finale', 'url': '/faith-and-tech-finale.html', 'status': 'Current', 'detail': 'Eleven slides with a brief funding summary, three prize-spending plans, APWEN 2:40 demo and embedded native presentations and 140 rehearsal answers.'},
    {'title': 'APWEN · Finale', 'url': '/apwen-finale.html', 'status': 'Current', 'detail': 'Ten slides, full presenter scripts and the 2:39 demo transcription.'},
    {'title': 'Cleva · Grand Finale', 'url': '/cleva-finale.html', 'status': 'Current', 'detail': 'Nine slides with full presenter scripts and Cleva questions.'},
    {'title': 'Faith & Tech · Semi-final', 'url': '/faith-and-tech-semis.html', 'status': 'Current', 'detail': 'Eleven slides, full presenter scripts and 80 questions.'},
    {'title': 'APWEN · Semi-final', 'url': '/apwen-semi.html', 'status': 'Previous stage', 'detail': 'Ten-slide five-minute edition. Play the archived demo separately.'},
    {'title': 'Cleva · Preliminary', 'url': '/cleva-preliminary.html', 'status': 'Previous stage', 'detail': 'Preserved preliminary script, slides and preparation.'},
    {'title': 'Shared product pitch', 'url': '/pitch.html', 'status': 'Reference', 'detail': 'The preserved event-neutral room and scripts.'},
]

def slug(value):
    return re.sub('[^a-z0-9]+', '-', value.lower()).strip('-')[:100]

def title_for(path):
    s = str(path).lower()
    event = 'Faith & Tech' if 'faith' in s else 'Cleva' if 'cleva' in s else 'APWEN' if 'apwen' in s else 'JCI' if 'jci' in s else 'Shared Kairos'
    revision = next((p for p in path.parts if p.startswith('2026-') and 'before' in p), None)
    detail = revision.replace('-', ' ') if revision else path.stem.replace('-', ' ').replace('_', ' ')
    kind = 'presenter room' if 'pitch-data' in path.read_text(errors='replace') else 'slide deck'
    return event + ' · ' + detail + ' · ' + kind

def resolve_asset(source, value):
    path = unquote(urlsplit(value).path)
    candidates = [source.parent / path, PUBLIC / path.lstrip('/')]
    if '/pitch-assets/' in '/' + path:
        tail = path.split('pitch-assets/', 1)[1]
        pieces = tail.split('/', 1)
        if len(pieces) > 1:
            candidates.insert(0, source.parent / 'presenter-assets' / pieces[1])
            candidates.insert(0, source.parent / 'faith-presenter-assets' / pieces[1])
    # Prefer a sibling historical script over a current website copy.
    candidates.insert(0, source.parent / Path(path).name)
    return next((p for p in candidates if p.is_file()), None)

def snapshot(source, entries):
    raw = source.read_bytes(); sha = hashlib.sha256(raw).hexdigest()
    existing = next((e for e in entries if e.get('source_sha256') == sha), None)
    if existing:
        name = str(source.relative_to(ROOT.parent))
        if name not in existing['sources']: existing['sources'].append(name)
        return
    text = raw.decode('utf-8', errors='replace')
    if 'sk-ant-' in text or 'data:video/' in text: raise ValueError('Unexpected secret or embedded movie in ' + str(source))
    title = title_for(source)
    directory = ARCHIVE / (slug(title) + '--' + sha[:10])
    directory.mkdir(parents=True, exist_ok=True)
    match = re.search(r'(<script[^>]*id="pitch-data"[^>]*>)(.*?)(</script>)', text, re.S)
    scripts = []
    if match:
        data = json.loads(match.group(2))
        scripts = list(data.get('scripts', {}).items())
        data.update(demoUrl='', demoPlaceholder=True, localDemo=False, assetsBase='.',
                    storagePrefix='archive-' + sha[:16], canonicalPath='/all.html')
        data.pop('deckKeynote', None)
        text = text[:match.start()] + match.group(1) + json.dumps(data, ensure_ascii=False).replace('<', '\\u003c') + match.group(3) + text[match.end():]
        for presenter, script in scripts:
            rows = ['# ' + title, 'Presenter: ' + presenter]
            for i, slide in enumerate(script['slides'], 1):
                rows += ['## Slide ' + str(i) + ': ' + slide['title'], *slide['paragraphs']]
                if slide.get('recorded_transcript'):
                    rows += ['### Recorded demo transcription', *slide['recorded_transcript']]
            (directory / ('pitch-script-' + presenter + '.md')).write_text('\n\n'.join(rows) + '\n')
        if scripts:
            shutil.copy2(directory / ('pitch-script-' + scripts[0][0] + '.md'), directory / 'pitch-script.md')
    else:
        for p in source.parent.glob('pitch-script*.md'):
            shutil.copy2(p, directory / p.name)

    text = re.sub(r'<video\b.*?</video>', '<div class="archived-demo"><h2>Demo</h2><p>Play the separate video from the Kairos Drive archive.</p></div>', text, flags=re.S|re.I)
    text = re.sub(r'<label\b[^>]*>\s*(?:(?!</label>).)*?<input\b[^>]*type=["\']file["\'][^>]*>(?:(?!</label>).)*?</label>', '', text, flags=re.S|re.I)
    def anchor(m):
        before, quote, url, after, label = m.groups()
        decoded = html.unescape(url)
        ext = Path(urlsplit(decoded).path).suffix.lower()
        if ext in BAD_MEDIA or decoded.startswith(('file:', 'blob:')): return '<span>' + label + '</span>'
        if decoded.startswith(('https:', 'http:', '#', 'mailto:')): return m.group(0)
        name = Path(urlsplit(decoded).path).name
        if name.startswith('pitch-script') and (directory / name).is_file(): target = name
        else:
            asset = resolve_asset(source, decoded)
            if asset and asset.suffix.lower() in {'.md', '.pdf', '.srt', '.vtt', '.txt'}:
                shutil.copy2(asset, directory / asset.name); target = asset.name
            elif asset and asset.suffix.lower() == '.html': return '<span>' + label + '</span>'
            else: return '<span>' + label + '</span>'
        return '<a' + before + 'href=' + quote + html.escape(target, quote=True) + quote + after + '>' + label + '</a>'
    text = re.sub(r'<a\b([^>]*?)href=(["\'])(.*?)["\']([^>]*)>(.*?)</a>', anchor, text, flags=re.S|re.I)
    def image(m):
        quote, url = m.groups()
        if url.startswith(('data:', 'http:', 'https:')): return m.group(0)
        asset = resolve_asset(source, html.unescape(url))
        if not asset: raise ValueError('Missing archived slide image: ' + str(source) + ' :: ' + url)
        mime = mimetypes.guess_type(asset.name)[0] or 'image/jpeg'
        return 'src=' + quote + 'data:' + mime + ';base64,' + base64.b64encode(asset.read_bytes()).decode() + quote
    text = re.sub(r'src=(["\'])(.*?)["\']', image, text, flags=re.I)
    banner = '<aside class="archive-banner"><a href="/all.html">All decks</a> · Archived edition · <a href="https://drive.google.com/drive/folders/16OWDfAKIX7xL7ZTiB3rrPv9DTat1RBwX">Demo archive in Drive</a></aside>'
    text = text.replace('</head>', '<meta name="robots" content="noindex"><style>.archive-banner{position:relative;z-index:20000;width:100%;padding:12px 20px;background:#173f2d;color:#fff;font:14px system-ui;text-align:center}.archive-banner a{color:#fff}.archived-demo{aspect-ratio:16/9;display:grid;place-content:center;background:#f3f1e5;color:#205635;text-align:center}</style></head>', 1)
    text = re.sub(r'(<body\b[^>]*>)', r'\1' + banner, text, count=1)
    (directory / 'index.html').write_text(text)
    entries.append({'title': title, 'url': '/' + str((directory/'index.html').relative_to(PUBLIC)),
                    'status': 'Archived', 'detail': 'Preserved slides' + (' and full presenter scripts.' if scripts or list(directory.glob('pitch-script*.md')) else '.'),
                    'source_sha256': sha, 'sources': [str(source.relative_to(ROOT.parent))]})

def render(entries):
    cards = []
    for entry in entries:
        cards.append('<article data-status="' + html.escape(entry['status']) + '"><p class="status">' + html.escape(entry['status']) + '</p><h2><a href="' + html.escape(entry['url'], quote=True) + '">' + html.escape(entry['title']) + '</a></h2><p>' + html.escape(entry['detail']) + '</p></article>')
    (PUBLIC / 'all.html').write_text('''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Kairos · All decks and scripts</title><meta name="description" content="Kairos presentation rooms, scripts and preserved deck editions."><style>
:root{font-family:Arial,sans-serif;color:#183e2a;background:#f4f1e7}*{box-sizing:border-box}body{margin:0}main{max-width:1160px;margin:auto;padding:56px 24px 72px}header{max-width:820px;margin-bottom:36px}.brand{letter-spacing:.18em;font-size:16px;font-weight:bold}h1{font-size:clamp(36px,6vw,64px);line-height:1.05;margin:28px 0 20px;letter-spacing:-.04em}p{font-size:17px;line-height:1.55}a{color:inherit;text-underline-offset:4px}.intro{color:#445c4e}nav{display:flex;gap:14px;flex-wrap:wrap;margin:26px 0}nav a{display:inline-block;background:#205635;color:white;padding:12px 18px;border-radius:6px;text-decoration:none}label{display:block;margin-bottom:10px;font-size:16px;font-weight:bold}input,select{font:inherit;padding:14px;border:1px solid #6c806e;border-radius:6px;background:white;color:#183e2a}input{flex:1;min-width:180px}.filters{display:flex;gap:12px}#count{font-size:15px;color:#445c4e}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,310px),1fr));gap:18px}article{background:white;border:1px solid #c6d0c5;border-radius:10px;padding:24px}article[hidden]{display:none}article h2{font-size:22px;line-height:1.3;margin:14px 0}article p{font-size:16px}.status{font-size:14px;font-weight:bold;color:#44624c;margin:0}footer{margin-top:40px;border-top:1px solid #bac9b9;padding-top:20px}a:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #8fae4c;outline-offset:4px}@media(max-width:600px){main{padding:28px 18px}.filters{flex-direction:column}h1{margin-top:20px}}
</style></head><body><main><header><p class="brand">KAIROS</p><h1>Every deck.<br>Every edition.</h1><p class="intro">Presentation rooms, full scripts and earlier versions in one place. Start with the current room, or find a preserved edition below.</p><nav aria-label="Archive links"><a href="https://drive.google.com/drive/folders/16OWDfAKIX7xL7ZTiB3rrPv9DTat1RBwX">Open the demo archive</a><a href="/">Open Kairos</a></nav><p class="intro">Videos and presentations with embedded demos are kept in Drive. The web editions preserve slides and scripts; play the accompanying recording separately.</p></header><section aria-label="Find a deck"><label for="search">Find a deck or edition</label><div class="filters"><input id="search" type="search" placeholder="Search Cleva, Faith & Tech, JCI…"><select id="status" aria-label="Filter editions"><option value="">All editions</option><option>Current</option><option>Previous stage</option><option>Reference</option><option>Archived</option></select></div><p id="count" aria-live="polite"></p><div class="grid">''' + ''.join(cards) + '''</div><p id="empty" hidden>No decks match this search.</p></section><footer><p>Earlier editions are retained when a new version is added. Dates and version labels describe the preserved material.</p></footer></main><script>
const cards=[...document.querySelectorAll('article')],search=document.getElementById('search'),status=document.getElementById('status');function filter(){let count=0;for(const card of cards){card.hidden=!(card.textContent.toLowerCase().includes(search.value.toLowerCase())&&(!status.value||card.dataset.status===status.value));if(!card.hidden)count++}document.getElementById('count').textContent=count+' of '+cards.length+' editions';document.getElementById('empty').hidden=count!==0}search.addEventListener('input',filter);status.addEventListener('change',filter);filter();
</script></body></html>''')

def preserve_existing_page(path):
    """Called before a presenter-room build replaces its existing HTML."""
    if not path.is_file(): return
    entries = json.loads(REGISTER.read_text()) if REGISTER.exists() else list(CURRENT)
    snapshot(path, entries)
    REGISTER.write_text(json.dumps(entries, indent=2, ensure_ascii=False)+'\n')
    render(entries)

def main():
    parser = argparse.ArgumentParser();parser.add_argument('--import-local', action='store_true');args=parser.parse_args()
    entries = json.loads(REGISTER.read_text()) if REGISTER.exists() else []
    entries = CURRENT + [e for e in entries if e['status']=='Archived']
    if args.import_local:
        project = ROOT.parent
        paths = [p for folder in [project/'hackathons', project/'pitch-kit/pitch-room', project/'production'] for p in folder.rglob('*.html')
                 if ('deck' in p.name or 'pitch' in p.name or p.name in {'cleva.html','cleva-finale.html','faith-and-tech-semis.html'})
                 and 'node_modules' not in p.parts and '.build' not in p.parts]
        paths += list(PUBLIC.glob('*.html'))
        for path in sorted(paths):
            if path.name == 'all.html': continue
            snapshot(path, entries)
    REGISTER.write_text(json.dumps(entries, indent=2, ensure_ascii=False)+'\n')
    render(entries)
    print('Built all.html:',len(entries),'editions,',sum(e['status']=='Archived' for e in entries),'preserved snapshots.')

if __name__ == '__main__': main()
