#!/usr/bin/env python3
"""Build isolated presenter rooms from tracked content, CSS and JavaScript.

No web service or package installation is needed. Slide previews and deck
downloads are exported from the event's Faith & Tech-derived deck builder.
The default build preserves the original shared room and its assets. Explicitly
select ``--edition shared`` to regenerate those legacy files.
"""
from pathlib import Path
import argparse
import base64
import hashlib
import html
import importlib.util
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "pitch-room"
PUBLIC = ROOT / "public"
ASSETS = PUBLIC / "pitch-assets"
e = html.escape


def load_content(filename):
    # Edition modules may import the unchanged shared content for common parts.
    if str(SOURCE) not in sys.path:
        sys.path.insert(0, str(SOURCE))
    spec = importlib.util.spec_from_file_location(Path(filename).stem, SOURCE / filename)
    if spec is None or spec.loader is None:
        raise ImportError(f"Cannot load pitch content: {filename}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def mmss(s):
    return f"{s//60}:{s%60:02}"


def timed_slides(content, presenter):
    elapsed = 0
    slides = []
    for i, source in enumerate(content.slides_for_presenter(presenter), 1):
        slide = dict(source, n=i, start=elapsed, end=elapsed + source["seconds"])
        slide["words"] = sum(len(p.split()) for p in source["paragraphs"])
        slides.append(slide)
        elapsed = slide["end"]
    return slides


def write_script(content, assets, page, slides, presenter=None):
    words = sum(s["words"] for s in slides)
    elapsed = slides[-1]["end"]
    who = content.PRESENTERS[presenter]["name"] if presenter else "Abigail or Miracle"
    script = ["# " + page["script_title"], content.META["team"],
              f"Lead presenter: {who}.",
              f"{len(slides)} slides, {words} spoken words for either presenter. Planning time {mmss(elapsed)}, including pauses.",
              page["script_intro"]]
    for i, s in enumerate(slides):
        paragraphs = s["paragraphs"] if presenter else content.shared_paragraphs(content.SLIDES[i], markdown=True)
        script += [f'## Slide {s["n"]}: {s["title"]}',
                   f'{who} · {mmss(s["start"])} to {mmss(s["end"])}']
        script += paragraphs + [f'Delivery: {s["cue"]}']
    script += ["## Short explanation"] + content.SHORT_PITCH
    script += ["## Optional 90-second demo"]
    for d in content.DEMO:
        script += [f'### {d["title"]} ({d["seconds"]} seconds)', d["say"], "On screen: " + d["action"]]
    filename = f"pitch-script-{presenter}.md" if presenter else "pitch-script.md"
    (assets / filename).write_text('\n\n'.join(script) + '\n')


def page_options(content, cleva=False):
    """PAGE overrides display copy; *_title/intro keys also label downloads.

    Header uses newlines for visual line breaks. source_html is trusted markup;
    all other PAGE values are escaped when inserted into the page.
    """
    question_count = len(content.QUESTIONS)
    priority_count = sum(q["priority"] for q in content.QUESTIONS)
    page = {
        "header": "Shared product pitch\nCleva × Tether · APWEN LASU",
        "description": f"Kairos shared pitch for Abigail and Miracle: a reusable deck, spoken script, demo guide and {question_count} judge questions.",
        "footer": "Abigail + Miracle · Shared product pitch",
        "prep_kicker": "Two sessions · 13 November 2026",
        "prep_title": "One deck. Two rooms.",
        "prep_intro": "The same product, portraits and main script work for both. Each competition's logistics and optional emphasis are kept below.",
        "checklist": [
            "Confirm both meeting links, start times and the time available for deck, demo and questions.",
            "Check each organiser's email and group updates for selection and presentation instructions.",
            "Choose Abigail or Miracle in the Lead presenter menu. Check the opening and team introduction.",
            "Rehearse with the clock and download the selected speaker's script for backup.",
            "Open the deck PDF, the presenter page and the prepared demo. Keep local backups available.",
            "Rehearse the demo on seeded data. Know which steps are simulated before screen sharing.",
            "Test audio, screen sharing, internet and the backup hotspot. Join early.",
            "Read the shared priority questions, then the Cleva and APWEN topic groups for each session.",
        ],
        "script_title": "Kairos: shared pitch script",
        "script_intro": "Either person can present the whole deck. Choose the matching introduction and team introduction; the other sections are identical. The deck and main script are reusable. Timing is a rehearsal estimate; confirm each organiser's limit. The optional demo is separate from this timing.",
        "qa_title": f"Kairos: {question_count} questions for both pitch sessions",
        "qa_intro": "Answers describe the current prototype and intended live flow separately. Rehearse the shared priority questions first, then the event-specific topic groups. The main deck and script are event-neutral; optional funding-rail ideas are roadmap only.",
        "qa_page_intro": f"{question_count} questions across {len(content.GROUPS)} topics. Start with the {priority_count} marked “Rehearse first”, then use the event-specific topic groups.",
        "event_title": "Kairos: separate event notes",
        "event_intro": "Use the same deck and main script for both sessions. If helpful, substitute an event's optional line for slide 8's first paragraph; do not add it to the running time.",
        "event_notice": "Optional emphasis for slide 8",
        "event_notice_detail": "Use this in place of its first paragraph, rather than adding time to the pitch.",
        "event_spoken_label": "Optional spoken emphasis:",
        "event_download_note": "These notes are separate from the shared deck and main script.",
        "source_note": "Prepared from the Cleva invitation, the supplied APWEN stage update, the latest Faith & Tech design, the existing two-person portraits, the JCI scripts and current prototype code.",
        "source_html": getattr(content, "SOURCES_HTML", ""),
        "focus_label": "Shared focus:",
        "focus_note": "the need, direct provider payments and each donor's receipt. Sponsor-specific funding ideas stay in optional notes.",
        "notes_note": "PowerPoint notes include both presenter options.",
        "timing_note": "Choose either presenter for the whole deck. Timing is a rehearsal estimate and excludes the optional demo. Confirm each organiser's limit. Share the PDF or Deck only; keep the script on your own screen.",
        "prep_timing_note": "Neither supplied update confirms the virtual session's exact time limit. Use the shorter explanation if needed; only add the demo when there is a separate slot.",
    }
    if cleva:
        page.update({
            "header": "Cleva × Tether\nFuture of Payments",
            "description": f"Kairos Cleva × Tether pitch for Abigail and Miracle: a dedicated spoken script, demo guide and {question_count} judge questions.",
            "footer": "Abigail + Miracle · Cleva × Tether pitch",
            "prep_kicker": "Cleva × Tether · 13 November 2026",
            "prep_title": "Ready for the Cleva room.",
            "prep_intro": "Rehearse the Cleva funding connection, the working giving prototype and the limits of the proposed live flow.",
            "script_title": "Kairos: Cleva × Tether pitch script",
            "script_intro": "Either person can present the whole Cleva pitch. Choose the matching introduction and team introduction. The proposed Cleva funding connection is not built; eligibility and access need confirmation. Licensed custody and local provider settlement require a separate partner arrangement. Timing is a rehearsal estimate; confirm the organiser's limit. The optional demo is separate from this timing.",
            "qa_title": f"Kairos: {question_count} Cleva × Tether pitch questions",
            "qa_intro": "Answers distinguish the working prototype from the proposed Cleva funding connection. The connection is not built; product eligibility, access and commercial terms need confirmation. Licensed custody and local provider settlement require a separate partner arrangement.",
            "qa_page_intro": f"{question_count} questions across {len(content.GROUPS)} topics. Start with the {priority_count} marked “Rehearse first”, then practise the Cleva funding and implementation questions.",
            "event_title": "Kairos: Cleva × Tether event notes",
            "event_intro": "Use the dedicated Cleva Markdown script. The proposed funding connection is part of this pitch; it is not an optional slide-8 substitute. The existing deck visuals and native PowerPoint notes retain the generic product wording.",
            "event_notice": "Proposed Cleva funding connection",
            "event_notice_detail": "Part of this pitch. Not built; confirm eligibility and access. Licensed custody remains a separate partner arrangement.",
            "event_spoken_label": "Cleva pitch emphasis:",
            "event_download_note": "Use these with the dedicated Cleva Markdown script; native deck notes retain generic wording.",
            "source_note": "Prepared from the Cleva invitation, published product documentation and current prototype code.",
            "source_html": getattr(content, "SOURCES_HTML", '<a href="pitch-assets/cleva/sources.md">Cleva sources and implementation evidence ↗</a>'),
            "focus_label": "Cleva connection:",
            "focus_note": "proposed overseas donor funding through Cleva, subject to eligibility and access confirmation. This is not built; licensed custody and local provider settlement remain separate arrangements.",
            "notes_note": "Use the Cleva Markdown script; native deck notes retain generic wording.",
            "timing_note": "Choose either presenter for the whole Cleva pitch. Timing is a rehearsal estimate and excludes the optional demo. Confirm the organiser's limit. Share the PDF or Deck only; keep the Cleva script on your own screen.",
            "prep_timing_note": "The supplied Cleva invitation does not confirm the session's exact pitch limit. Use the shorter explanation if needed; only add the demo when there is a separate slot.",
        })
        page["checklist"] = list(page["checklist"])
        page["checklist"][0] = "Confirm the Cleva meeting link, start time and time available for the pitch, demo and questions."
        page["checklist"][1] = "Check the Cleva organiser's email and group updates for presentation instructions."
        page["checklist"][-1] = "Rehearse the Cleva priority questions, the proposed funding connection and its unbuilt integration boundaries."
    page.update(getattr(content, "PAGE", {}))
    return page


def build(content, output=PUBLIC / "pitch.html", assets=ASSETS, *,
          assets_base="pitch-assets", storage_prefix=None, cleva=False):
    assets.mkdir(parents=True, exist_ok=True)
    page = page_options(content, cleva=cleva)
    scripts = {}
    for key in content.PRESENTERS:
        variant = timed_slides(content, key)
        scripts[key] = {"slides": variant, "words": sum(s["words"] for s in variant)}
    slides = scripts[content.DEFAULT_PRESENTER]["slides"]
    elapsed = slides[-1]["end"]
    words = sum(s["words"] for s in slides)
    default_name = content.PRESENTERS[content.DEFAULT_PRESENTER]["name"]
    priority_count = sum(q["priority"] for q in content.QUESTIONS)
    question_count = len(content.QUESTIONS)
    script_blocks, images, jump = [], [], []
    for s in slides:
        hidden = "" if s["n"] == 1 else " hidden"
        next_name = slides[s["n"]]["title"] if s["n"] < len(slides) else "Pause, then take questions."
        script_blocks.append(
            f'<article class="scriptblock" data-slide="{s["n"]}"{hidden}>'
            f'<div class="scripthead"><span class="slideindex">{s["n"]:02} / {len(slides):02}</span>'
            f'<span class="subtle">{mmss(s["start"])} to {mmss(s["end"])}</span>'
            f'<span class="speaker">{e(s["speaker"])}</span></div>'
            f'<div class="scriptbody"><h2>{e(s["title"])}</h2><div class="say">'
            + ''.join(f'<p>{e(p)}</p>' for p in s["paragraphs"])
            + f'</div><div class="cue"><strong>DELIVERY NOTE</strong><span class="delivery-note">{e(s["cue"])}</span></div></div>'
            + f'<div class="scriptfoot"><span class="spoken-words">{s["words"]} spoken words</span>'
            + f'<span><strong>{"Next: " if s["n"] < len(slides) else ""}</strong>{e(next_name)}</span></div></article>'
        )
        image_path = ASSETS / "slides" / f'slide{s["n"]:02}.jpg'
        if not image_path.is_file():
            raise FileNotFoundError(f"Export the deck previews first: {image_path}")
        image = base64.b64encode(image_path.read_bytes()).decode()
        images.append(f'<img class="slideimage" data-slide="{s["n"]}" width="1440" height="810" '
                      f'src="data:image/jpeg;base64,{image}" alt="Slide {s["n"]}: {e(s["title"])}"{hidden}>')
        jump.append(f'<button type="button" aria-current="{str(s["n"]==1).lower()}" '
                    f'aria-label="Go to slide {s["n"]}: {e(s["title"])}">'
                    f'<span>{s["n"]:02} · {mmss(s["start"])}</span>{e(s["title"])}</button>')
    question_cards = []
    for q in content.QUESTIONS:
        priority = '<span class="prioritylabel">Rehearse first</span>' if q["priority"] else ''
        question_cards.append(
            f'<article class="qcard" data-id="{q["id"]}"><details><summary>'
            f'<span class="qheading">{e(q["question"])}<span class="qmeta">{priority}'
            f'{q["id"][1:]} · {e(q["category"])}</span></span></summary>'
            f'<p class="qanswer">{e(q["answer"])}</p></details>'
            f'<button type="button" class="star" aria-pressed="false" '
            f'aria-label="Star: {e(q["question"])}">☆</button></article>'
        )
    options = ''.join(f'<option value="{e(name)}">{e(name)} · {len(rows)}</option>' for name, rows in content.GROUPS)
    demo_steps = []
    at = 0
    for i, d in enumerate(content.DEMO, 1):
        demo_steps.append(f'<article class="demostep"><div class="demoheading">'
                          f'<span class="slideindex">0{i}</span><h2>{e(d["title"])}</h2>'
                          f'<span class="demotime">{mmss(at)} to {mmss(at+d["seconds"])}</span></div>'
                          f'<p class="say">{e(d["say"])}</p><p class="democue"><strong>On screen: </strong>{e(d["action"])}</p></article>')
        at += d["seconds"]
    checklist = page["checklist"]
    check_html = ''.join(f'<label><input type="checkbox" data-check="c{i}"><span>{e(t)}</span></label>' for i,t in enumerate(checklist,1))
    page_data = {"meta": content.META, "slides": slides, "scripts": scripts,
                 "presenters": content.PRESENTERS, "defaultPresenter": content.DEFAULT_PRESENTER,
                 "questions": content.QUESTIONS}
    if assets_base != "pitch-assets":
        page_data["assetsBase"] = assets_base
    if storage_prefix:
        page_data["storagePrefix"] = storage_prefix
    data = json.dumps(page_data, ensure_ascii=False).replace('<', '\\u003c')
    presenter_options = ''.join(
        f'<option value="{key}"{" selected" if key == content.DEFAULT_PRESENTER else ""}>{e(person["name"])}</option>'
        for key, person in content.PRESENTERS.items()
    )
    css = (SOURCE / "pitch.css").read_text()
    js = (SOURCE / "pitch.js").read_text()
    short = ''.join(f'<p>{e(p)}</p>' for p in content.SHORT_PITCH)
    event_cards = []
    for event in content.EVENTS:
        notice = event.get("notice", page["event_notice"])
        notice_html = (f'<div class="notice"><strong>{e(notice)}</strong><br>'
                       f'{e(event.get("notice_detail", page["event_notice_detail"]))}</div>') if notice else ''
        event_cards.append(
            f'<section class="prepbox"><p class="kicker">{e(event["focus"])}</p><h2>{e(event["name"])}</h2>'
            + '<ul>' + ''.join(f'<li>{e(line)}</li>' for line in event["schedule"]) + '</ul>'
            + f'<p>{e(event["assess"])}</p>' + notice_html
            + f'<p class="say">{e(event["spoken"])}</p><p>{e(event["follow_up"])}</p></section>'
        )
    event_cards = ''.join(event_cards)
    header = '<br>'.join(e(line) for line in page["header"].split('\n'))
    source_line = e(page["source_note"])
    document = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(content.META["title"])}</title><meta name="description" content="{e(page["description"])}">
<meta name="color-scheme" content="light"><meta name="kairos-pitch-version" content="{e(content.META["version"])}">
<style>{css}</style></head><body><a class="skip" href="#main">Skip to presentation</a>
<header class="top"><div class="shell"><div class="brandrow"><a href="#main" class="brand">KAIROS</a>
<div class="event">{header}</div><div class="people">{e(content.META["team"])}</div></div>
<div class="navrow"><nav class="tabs" role="tablist" aria-label="Presenter tools">
<button type="button" class="tab" role="tab" id="tab-pitch" aria-controls="panel-pitch" aria-selected="true">Pitch & script</button>
<button type="button" class="tab" role="tab" id="tab-demo" aria-controls="panel-demo" aria-selected="false" tabindex="-1">Demo</button>
<button type="button" class="tab" role="tab" id="tab-questions" aria-controls="panel-questions" aria-selected="false" tabindex="-1">Q&A <span class="counter">{question_count}</span></button>
<button type="button" class="tab" role="tab" id="tab-prep" aria-controls="panel-prep" aria-selected="false" tabindex="-1">Prep</button></nav>
<div class="downloads"><a href="pitch-assets/kairos-pitch-deck.pdf" target="_blank" rel="noopener">Deck PDF ↗</a>
<a class="pptx-link" href="pitch-assets/kairos-pitch-deck.pptx" download>PowerPoint ↓</a></div></div></div></header>
<main class="shell" id="main">
<section class="panel" id="panel-pitch" role="tabpanel" aria-labelledby="tab-pitch">
<div class="intro"><div><p class="kicker">The need. The provider. Your own receipt.</p><h1>Give with proof, not faith.</h1>
<p>{len(slides)} slides · <span id="spoken-total">{words}</span> spoken words · about {mmss(elapsed)} with pauses · <span id="presenter-summary">{e(default_name)} presenting</span></p></div><span class="statusbadge">Working prototype · simulated settlement</span></div>
<div class="presenterbar"><div class="presenterfield"><label for="presenter">Lead presenter</label><select id="presenter" aria-describedby="presenter-help">{presenter_options}</select></div>
<p id="presenter-help">Either person can present the whole deck. Your choice is saved in this browser.</p></div>
<div class="stage"><div class="scriptpaper" id="script-paper">{''.join(script_blocks)}</div>
<aside class="deck" id="deck-view" aria-label="Deck and rehearsal controls"><div class="shotwrap">{''.join(images)}</div>
<div class="decktools"><span class="subtle" id="current-label" aria-live="polite">Slide 1 of {len(slides)}</span><div>
<button class="button" type="button" id="deck-mode" aria-pressed="false">Deck only</button>
<button class="button" type="button" id="fullscreen">Fullscreen</button></div></div>
<div class="clockbox"><div class="clockrow"><div><div class="clock" id="clock">0:00</div><div class="clocklabel">planning time {mmss(elapsed)}</div></div>
<div class="controls"><button class="button arrow" id="prev" type="button" aria-label="Previous slide">←</button>
<button class="button arrow" id="next" type="button" aria-label="Next slide">→</button><button class="button primary" id="clock-toggle" type="button">Start</button>
<button class="button" id="clock-reset" type="button">Reset</button></div></div><div class="progress"><i id="meterfill"></i></div>
<div class="clockstatus" id="clock-status" role="status">Ready. Start the clock when you begin speaking.</div></div>
<div class="jump">{''.join(jump)}</div><div class="modes"><button type="button" class="button on" id="one-slide" aria-pressed="true">One slide</button>
<button type="button" class="button" id="read-through" aria-pressed="false">Read through</button><span class="subtle" style="margin:auto 0 auto auto">← → slides · / search</span></div>
<p class="timingnote">{e(page["timing_note"])}</p>
</aside></div><details class="shortpitch"><summary>Short on time? The 90-second explanation.</summary>{short}</details>
<p class="sourceline"><a class="presenter-script" href="{e(assets_base)}/pitch-script-{content.DEFAULT_PRESENTER}.md" download>Download {e(default_name)}’s script ↓</a> · <a href="{e(assets_base)}/pitch-script.md" download>Script with both introductions ↓</a> · {e(page["notes_note"])}</p></section>
<section class="panel" id="panel-demo" role="tabpanel" aria-labelledby="tab-demo" hidden><div class="intro"><div><p class="kicker">Show one cause, then stop</p>
<h1>The proof is in the receipt.</h1><p>A 90-second demonstration route. Rehearse on the seeded prototype before the call.</p></div>
<div class="controls"><span class="clock" id="demo-clock">0:00</span><button class="button primary" type="button" id="demo-start">Start</button><button class="button" type="button" id="demo-reset">Reset</button></div></div>
<div class="notice">Say this first: “This is a working prototype using demo data. Bank transfer, Remita settlement and NIN lookup are simulated.”</div>
<div class="demosteps">{''.join(demo_steps)}</div><p class="sourceline"><a href="{e(content.META["demo_url"])}" target="_blank" rel="noopener">Existing full demo recording ↗</a> · Older narration includes planned checks. Explain the simulation limits before using it.</p></section>
<section class="panel" id="panel-questions" role="tabpanel" aria-labelledby="tab-questions" hidden><div class="intro"><div><p class="kicker">Direct answers. Then the supporting detail.</p>
<h1>Ready for the follow-up.</h1><p>{e(page["qa_page_intro"])}</p></div><a class="button" href="{e(assets_base)}/qa-bank.md" download>Download Q&A ↓</a></div>
<div class="questiontools"><label for="search" class="searchlabel">Search questions and answers</label><div class="searchrow"><div class="searchwrap"><input id="search" type="search" placeholder="Try: stablecoins, escrow, refunds, AI…" autocomplete="off"><button type="button" id="clear-search" class="clearsearch" aria-label="Clear search" hidden>×</button></div><button class="button" type="button" id="expand-answers">Expand answers</button></div>
<div class="filterrow"><select id="category" aria-label="Question topic"><option value="">All topics</option>{options}</select>
<button type="button" class="chip" id="priority-filter" aria-pressed="false">Rehearse first · {priority_count}</button><button type="button" class="chip" id="star-filter" aria-pressed="false">My stars · <span id="star-count">0</span></button>
<button type="button" class="chip" id="clear-filters">Clear filters</button><span class="qcount" id="question-count" role="status">{question_count} of {question_count} questions</span></div></div>
<div class="questionlist">{''.join(question_cards)}</div><p class="empty" id="empty" hidden>No questions match. Try fewer words or clear the filters.</p>
<p class="sourceline">Stars stay in this browser. Answers distinguish working code from launch plans; they do not claim completed legal review, signed partners or live donations.</p></section>
<section class="panel" id="panel-prep" role="tabpanel" aria-labelledby="tab-prep" hidden><div class="intro"><div><p class="kicker">{e(page["prep_kicker"])}</p><h1>{e(page["prep_title"])}</h1><p>{e(page["prep_intro"])}</p></div><button type="button" class="button" id="print">Print preparation pack</button></div>
<div class="prepgrid">{event_cards}</div><p class="sourceline"><a href="{e(assets_base)}/event-notes.md" download>Download event notes ↓</a> · {e(page["event_download_note"])}</p>
<div class="prepgrid"><section class="prepbox"><h2>Before joining</h2><div class="checklist">{check_html}</div></section>
<section class="prepbox"><h2>Where the deck answers them</h2><div class="criterion"><strong>Problem</strong><span>Slide 2</span></div><div class="criterion"><strong>Solution</strong><span>Slides 3 and 4</span></div><div class="criterion"><strong>Prototype</strong><span>Slide 5 + optional demo</span></div><div class="criterion"><strong>Community impact</strong><span>Slide 8</span></div><div class="criterion"><strong>Preparedness and execution</strong><span>Slides 7, 9, 10 and 11 + Q&A</span></div>
<div class="notice">The full script is planned at {mmss(elapsed)}, including the original school-fees story. {e(page["prep_timing_note"])}</div><button type="button" class="button primary" data-priority-link>Practise the priority questions</button></section>
<section class="prepbox"><h2>Keep these distinctions clear</h2><ul><li><strong>Working:</strong> prototype accounting, budget checks, attribution, notifications and public history.</li><li><strong>Simulated:</strong> bank transfer, Remita settlement and NIN lookup.</li><li><strong>Unbuilt:</strong> live CAC and account-name checks, general upload verification and the complete production operating flow.</li><li><strong>Not signed:</strong> licensed custody and payments partnership.</li><li><strong>{e(page["focus_label"])}</strong> {e(page["focus_note"])}</li></ul></section>
<section class="prepbox"><h2>Delivery, in the JCI spirit</h2><ul><li>Use the original school-fees story. Let the hesitation land.</li><li>Explain the case, provider payment and receipt before discussing integrations.</li><li>Read the donor's numbers slowly. Leave a beat for the receipt.</li><li>Choose Abigail or Miracle as lead. The opening and team introduction follow that choice; both remain on the team slide.</li><li>Answer the question first. Add one piece of evidence, then stop.</li><li>If a technical detail is uncertain, check it. Keep the simulated parts explicit.</li></ul></section></div>
<p class="sourceline"><a href="pitch-assets/kairos-pitch-deck.pdf" target="_blank" rel="noopener">Deck PDF ↗</a> · <a href="pitch-assets/kairos-pitch-deck.pptx" download>PowerPoint ↓</a> · <a class="presenter-script" href="{e(assets_base)}/pitch-script-{content.DEFAULT_PRESENTER}.md" download>Download {e(default_name)}’s script ↓</a> · <a href="{e(assets_base)}/qa-bank.md" download>{question_count} questions ↓</a></p>
<p class="sourceline">{source_line}</p>{page["source_html"]}</section>
</main><footer class="footer"><div class="shell"><span>KAIROS · TRANSPARENT GIVING FOR NIGERIA</span><span>{e(page["footer"])}</span></div></footer>
<script type="application/json" id="pitch-data">{data}</script><script>{js}</script></body></html>'''
    output.write_text(document)
    write_script(content, assets, page, slides)
    for presenter, script in scripts.items():
        write_script(content, assets, page, script["slides"], presenter)
    qa = ["# " + page["qa_title"], "", content.META["team"], "", page["qa_intro"]]
    for category, _ in content.GROUPS:
        qa += ["", f"## {category}", ""]
        for q in content.QUESTIONS:
            if q["category"] == category:
                qa += [f'### {q["id"][1:]}. {"★ " if q["priority"] else ""}{q["question"]}', "", q["answer"], ""]
    (assets / "qa-bank.md").write_text('\n'.join(qa) + '\n')
    event_md = ["# " + page["event_title"], "", page["event_intro"]]
    for event in content.EVENTS:
        event_md += ["", "## " + event["name"], "", event["focus"], ""]
        event_md += ["- " + line for line in event["schedule"]]
        event_md += ["", event["assess"], "", page["event_spoken_label"], "", event["spoken"], "", event["follow_up"]]
    (assets / "event-notes.md").write_text('\n'.join(event_md) + '\n')
    manifest = {"version": content.META["version"], "slides": len(slides), "questions": len(content.QUESTIONS), "priority": priority_count, "words": words, "seconds": elapsed,
        "default_presenter": content.DEFAULT_PRESENTER,
        "presenters": {key: {"name": content.PRESENTERS[key]["name"], "words": script["words"],
                              "script": f"pitch-script-{key}.md"} for key, script in scripts.items()}}
    if assets_base != "pitch-assets":
        manifest["assetsBase"] = assets_base
    if storage_prefix:
        manifest["storagePrefix"] = storage_prefix
    (assets / "pitch-manifest.json").write_text(json.dumps(manifest, indent=2) + '\n')
    if cleva and hasattr(content, "RESEARCH_NOTES"):
        (assets / "sources.md").write_text(content.RESEARCH_NOTES.rstrip() + '\n')
    print(f"Built {output.name}: {len(slides)} slides, {words} words, {mmss(elapsed)} plan, {question_count} questions ({priority_count} priority).")


def legacy_fingerprints():
    """Hash the preserved shared room and every asset outside the new edition."""
    files = [PUBLIC / "pitch.html"]
    files += [path for path in ASSETS.rglob("*")
              if path.is_file() and path.relative_to(ASSETS).parts[0] != "cleva"]
    return {str(path.relative_to(PUBLIC)): hashlib.sha256(path.read_bytes()).hexdigest()
            for path in files}


def verify_preserved(before):
    after = legacy_fingerprints()
    changed = sorted(path for path in before.keys() | after.keys()
                     if before.get(path) != after.get(path))
    if changed:
        raise RuntimeError("Preserved pitch files changed during build: " + ", ".join(changed))


def ensure_apwen_copy():
    """Create the exact original page once; an existing APWEN page is protected."""
    destination = PUBLIC / "apwen-pitch.html"
    try:
        with destination.open("xb") as target:
            target.write((PUBLIC / "pitch.html").read_bytes())
    except FileExistsError:
        print("Preserved existing apwen-pitch.html.")
    else:
        print("Created apwen-pitch.html as an exact copy of pitch.html.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--edition", choices=("all", "cleva", "shared"), default="all",
                        help="all (default): preserve shared files, copy APWEN once and build Cleva; cleva: build only Cleva; shared: explicitly regenerate legacy shared files")
    args = parser.parse_args()
    if args.edition == "shared":
        build(load_content("cleva_content.py"))
        return

    before = legacy_fingerprints()
    apwen = PUBLIC / "apwen-pitch.html"
    apwen_before = apwen.read_bytes() if apwen.exists() else None
    try:
        if args.edition == "all":
            ensure_apwen_copy()
        build(load_content("cleva_pitch_content.py"), PUBLIC / "cleva-pitch.html", ASSETS / "cleva",
              assets_base="pitch-assets/cleva", storage_prefix="kairos-cleva-room-v1", cleva=True)
    finally:
        verify_preserved(before)
        if apwen_before is not None and (not apwen.exists() or apwen.read_bytes() != apwen_before):
            raise RuntimeError("Existing apwen-pitch.html changed during build.")


if __name__ == "__main__":
    main()
