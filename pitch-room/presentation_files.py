"""Presentation downloads, using current page links and checksum-matched archive IDs.

These are navigation links only. No decks, recordings or spoken content are
rebuilt. See production/2026-11-25 Mobile presentation files for source proof.
"""
from html import escape as e

DRIVE='https://drive.google.com/file/d/{}/view'
# Missing public links resolved against the retained source's exact SHA256.
EXTRA = {
 '/apwen-semi.html': [
  ('demo','Demo video',DRIVE.format('1ZrsQHjF62AIMa1Te_ABmtvh_dpindol4'),'The recording for this APWEN presentation'),
  ('powerpoint','PowerPoint',DRIVE.format('1pTDB2tJCyBehwsT889dvELXfkfyodiHj'),'Includes the demo video'),
  ('keynote','Keynote',DRIVE.format('1nUHfhrIlvFdX96Necm4xsEluW93wOtEx'),'Includes the demo video'),
 ],
 '/faith-and-tech-semis.html': [
  ('demo','Demo video',DRIVE.format('1l-hnk2TxmFcQX0nqq6jmaOCPVKehZbeD'),'The recording for this semi-final'),
  ('powerpoint','PowerPoint',DRIVE.format('18nFBgqZ9BnssqxXpxDC84YmZgwteAH3e'),'The existing semi-final presentation'),
  ('keynote','Keynote',DRIVE.format('1vDMX3L0jcTeKY3Cq_RE-DU4u7o9YrcFG'),'The existing semi-final presentation'),
 ],
 '/cleva-finale.html': [('demo','Demo video',DRIVE.format('1l3EXPn72CWoHiW6k6AB39wZIy4zl561b'),'Current recording with its section cards')],
 '/cleva-preliminary.html': [('demo','Demo video',DRIVE.format('1MnNj5tzNJz2QSb4AwcZ7lsF9LRVX53Yy'),'The recording for this preliminary presentation')],
}

def presentation_files(page, *, deck_html, deck_pdf, deck_pptx, deck_keynote, assets_base, presenter, presenters):
    records=[]
    def add(kind,label,url,description='',download=False):
        if url and not any(r['kind']==kind for r in records):
            records.append(dict(kind=kind,label=label,url=url,description=description,download=download))
    for item in EXTRA.get(page.get('canonical_path'),[]):add(*item)
    add('demo','Demo video',page.get('demo_drive_url'),'Watch or download on Google Drive')
    for item in page.get('archive_downloads',[]):
        text=item['label'].lower()
        if text.startswith('demo'):add('demo','Demo video',item['url'],item['label'].replace('Demo','Recording',1))
        elif 'powerpoint' in text:add('powerpoint','PowerPoint',item['url'],'Includes the demo video')
        elif 'keynote' in text:add('keynote','Keynote',item['url'],'Includes the demo video')
        elif 'spending plan' in text or item['url'].lower().endswith('.xlsx'):
            add('funding','Prize spending plan',item['url'],'All three prize scenarios: $2,500, $1,500 and $750',item['url'].lower().endswith('.xlsx'))
    # A direct hosted recording is only used if it is already part of the page.
    url=page.get('demo_url')
    if url and not page.get('local_demo') and not page.get('demo_placeholder'):add('demo','Demo video',url,'Watch or download the recording')
    add('powerpoint','PowerPoint',deck_pptx,'The current presentation',True)
    add('keynote','Keynote',deck_keynote,'The current presentation',True)
    add('pdf','Pitch deck PDF',deck_pdf,'View or save a static copy')
    add('html','Open slides',deck_html,'View the slides in your browser')
    add('script','Pitch script',f'{assets_base}/pitch-script-{presenter}.md',f'For {presenters[presenter]["name"]}',True)
    add('both-scripts','Script with both introductions',f'{assets_base}/pitch-script.md','Both presenter options',True)
    add('qa','Questions and answers',f'{assets_base}/qa-bank.md','Save the full rehearsal bank',True)
    add('notes','Preparation notes',f'{assets_base}/event-notes.md','Event details and checklist',True)
    for key,kind,label in [('separate_demo_script','transcript','Demo transcript'),('separate_demo_subtitles','srt','Demo subtitles (SRT)'),('separate_demo_webvtt','vtt','Demo subtitles (VTT)')]:
        add(kind,label,page.get(key),'Save for rehearsal',True)
    by_kind={r['kind']:r for r in records}
    demo=by_kind.get('demo');deck=next((by_kind[k] for k in ['powerpoint','pdf','html','keynote'] if k in by_kind),None)
    def anchor(record, label=None, cls=''):
        attrs=(f' class="{cls}"' if cls else '')+f' href="{e(record["url"])}"'
        if record['download']:attrs+=' download'
        else:attrs+=' target="_blank" rel="noopener"'
        return f'<a{attrs} data-file-kind="{record["kind"]}">{e(label or record["label"])}</a>'
    quick=(anchor(demo,'Demo video','file-shortcut') if demo else '')+(anchor(deck,'Pitch deck','file-shortcut') if deck else '')
    quick += '<button type="button" class="file-shortcut files-open" id="open-presentation-files" aria-haspopup="dialog" aria-controls="presentation-files-dialog">All files</button>'
    tray=f'<nav class="file-shortcuts" aria-label="Presentation files">{quick}</nav>'
    links=[]
    order=['demo','powerpoint','keynote','pdf','html','funding','script','both-scripts','qa','transcript','srt','vtt','notes']
    for kind in order:
        if kind not in by_kind:continue
        r=by_kind[kind]
        attrs=f' href="{e(r["url"])}" data-file-kind="{kind}"'
        attrs+=' download' if r['download'] else ' target="_blank" rel="noopener"'
        if kind=='script':attrs+=' data-file-script'
        sub=(f'<span data-file-script-name>For {e(presenters[presenter]["name"])}</span>' if kind=='script' else f'<span>{e(r["description"])}</span>')
        links.append(f'<a class="presentation-file"{attrs}><strong>{e(r["label"])}</strong>{sub}</a>')
    dialog=('<dialog class="files-dialog" id="presentation-files-dialog" aria-labelledby="presentation-files-title">'
            f'<div class="files-heading"><div><p class="files-kicker">{e(page.get("header", "Presentation downloads").replace(chr(10), " · "))}</p><h2 id="presentation-files-title">Demo, deck and scripts</h2></div>'
            '<button class="files-close" type="button" aria-label="Close presentation files" autofocus>×</button></div>'
            '<div class="files-list">'+''.join(links)+'</div>'
            '<div class="files-footer"><a href="https://kairos-community.vercel.app/all.html" target="_blank" rel="noopener">All presentation editions</a></div></dialog>')
    return tray,dialog,records
