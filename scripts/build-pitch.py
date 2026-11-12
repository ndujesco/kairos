#!/usr/bin/env python3
"""Build the shared presenter page from tracked content, CSS and JavaScript.

No web service or package installation is needed. Slide previews and deck
downloads are exported from the event's Faith & Tech-derived deck builder.
"""
from pathlib import Path
import base64
import html
import importlib.util
import json

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "pitch-room"
PUBLIC = ROOT / "public"
ASSETS = PUBLIC / "pitch-assets"
spec = importlib.util.spec_from_file_location("cleva_content", SOURCE / "cleva_content.py")
content = importlib.util.module_from_spec(spec)
spec.loader.exec_module(content)
e = html.escape


def mmss(s):
    return f"{s//60}:{s%60:02}"


def build():
    ASSETS.mkdir(exist_ok=True)
    elapsed = 0
    slides = []
    for i, source in enumerate(content.SLIDES, 1):
        slide = dict(source, n=i, start=elapsed, end=elapsed + source["seconds"])
        slide["words"] = sum(len(p.split()) for p in source["paragraphs"])
        slides.append(slide)
        elapsed = slide["end"]
    words = sum(s["words"] for s in slides)
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
            + f'</div><div class="cue"><strong>DELIVERY NOTE</strong>{e(s["cue"])}</div></div>'
            + f'<div class="scriptfoot"><span>{s["words"]} spoken words</span>'
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
    checklist = [
        "Confirm both meeting links, start times and the time available for deck, demo and questions.",
        "Check each organiser's email and group updates for selection and presentation instructions.",
        "Abigail leads; Miracle covers the receipt and prototype. Practise both handovers.",
        "Rehearse with the clock. If one speaker presents throughout, read Miracle's sections unchanged.",
        "Open the deck PDF, the presenter page and the prepared demo. Keep local backups available.",
        "Rehearse the demo on seeded data. Know which steps are simulated before screen sharing.",
        "Test audio, screen sharing, internet and the backup hotspot. Join early.",
        "Read the shared priority questions, then the Cleva and APWEN topic groups for each session.",
    ]
    check_html = ''.join(f'<label><input type="checkbox" data-check="c{i}"><span>{e(t)}</span></label>' for i,t in enumerate(checklist,1))
    data = json.dumps({"meta": content.META, "slides": slides, "questions": content.QUESTIONS}, ensure_ascii=False).replace('<', '\\u003c')
    css = (SOURCE / "pitch.css").read_text()
    js = (SOURCE / "pitch.js").read_text()
    short = ''.join(f'<p>{e(p)}</p>' for p in content.SHORT_PITCH)
    event_cards = ''.join(
        f'<section class="prepbox"><p class="kicker">{e(event["focus"])}</p><h2>{e(event["name"])}</h2>'
        + '<ul>' + ''.join(f'<li>{e(line)}</li>' for line in event["schedule"]) + '</ul>'
        + f'<p>{e(event["assess"])}</p><div class="notice"><strong>Optional emphasis for slide 8</strong><br>'
        + 'Use this in place of its first paragraph, rather than adding time to the pitch.</div>'
        + f'<p class="say">{e(event["spoken"])}</p><p>{e(event["follow_up"])}</p></section>'
        for event in content.EVENTS
    )
    document = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(content.META["title"])}</title><meta name="description" content="Kairos shared pitch for Abigail and Miracle: a reusable deck, spoken script, demo guide and {question_count} judge questions.">
<meta name="color-scheme" content="light"><meta name="kairos-pitch-version" content="{e(content.META["version"])}">
<style>{css}</style></head><body><a class="skip" href="#main">Skip to presentation</a>
<header class="top"><div class="shell"><div class="brandrow"><a href="#main" class="brand">KAIROS</a>
<div class="event">Shared product pitch<br>Cleva × Tether · APWEN LASU</div><div class="people">{e(content.META["team"])}</div></div>
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
<p>{len(slides)} slides · {words} spoken words · about {mmss(elapsed)} with pauses · Abigail + Miracle</p></div><span class="statusbadge">Working prototype · simulated settlement</span></div>
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
<p class="timingnote">One deck and main script for both sessions. Timing is a rehearsal estimate and excludes the optional demo. Confirm each organiser's limit. Share the PDF or Deck only; keep the script on your own screen.</p>
</aside></div><details class="shortpitch"><summary>Short on time? The 90-second explanation.</summary>{short}</details>
<p class="sourceline"><a href="pitch-assets/pitch-script.md" download>Download script</a> · Same script is included in the PowerPoint speaker notes.</p></section>
<section class="panel" id="panel-demo" role="tabpanel" aria-labelledby="tab-demo" hidden><div class="intro"><div><p class="kicker">Show one cause, then stop</p>
<h1>The proof is in the receipt.</h1><p>A 90-second demonstration route. Rehearse on the seeded prototype before the call.</p></div>
<div class="controls"><span class="clock" id="demo-clock">0:00</span><button class="button primary" type="button" id="demo-start">Start</button><button class="button" type="button" id="demo-reset">Reset</button></div></div>
<div class="notice">Say this first: “This is a working prototype using demo data. Bank transfer, Remita settlement and NIN lookup are simulated.”</div>
<div class="demosteps">{''.join(demo_steps)}</div><p class="sourceline"><a href="{e(content.META["demo_url"])}" target="_blank" rel="noopener">Existing full demo recording ↗</a> · Older narration includes planned checks. Explain the simulation limits before using it.</p></section>
<section class="panel" id="panel-questions" role="tabpanel" aria-labelledby="tab-questions" hidden><div class="intro"><div><p class="kicker">Direct answers. Then the supporting detail.</p>
<h1>Ready for the follow-up.</h1><p>{question_count} questions across {len(content.GROUPS)} topics. Start with the {priority_count} marked “Rehearse first”, then use the event-specific topic groups.</p></div><a class="button" href="pitch-assets/qa-bank.md" download>Download Q&A ↓</a></div>
<div class="questiontools"><label for="search" class="searchlabel">Search questions and answers</label><div class="searchrow"><div class="searchwrap"><input id="search" type="search" placeholder="Try: stablecoins, escrow, refunds, AI…" autocomplete="off"><button type="button" id="clear-search" class="clearsearch" aria-label="Clear search" hidden>×</button></div><button class="button" type="button" id="expand-answers">Expand answers</button></div>
<div class="filterrow"><select id="category" aria-label="Question topic"><option value="">All topics</option>{options}</select>
<button type="button" class="chip" id="priority-filter" aria-pressed="false">Rehearse first · {priority_count}</button><button type="button" class="chip" id="star-filter" aria-pressed="false">My stars · <span id="star-count">0</span></button>
<button type="button" class="chip" id="clear-filters">Clear filters</button><span class="qcount" id="question-count" role="status">{question_count} of {question_count} questions</span></div></div>
<div class="questionlist">{''.join(question_cards)}</div><p class="empty" id="empty" hidden>No questions match. Try fewer words or clear the filters.</p>
<p class="sourceline">Stars stay in this browser. Answers distinguish working code from launch plans; they do not claim completed legal review, signed partners or live donations.</p></section>
<section class="panel" id="panel-prep" role="tabpanel" aria-labelledby="tab-prep" hidden><div class="intro"><div><p class="kicker">Two sessions · 13 November 2026</p><h1>One deck. Two rooms.</h1><p>The same product, portraits and main script work for both. Each competition's logistics and optional emphasis are kept below.</p></div><button type="button" class="button" id="print">Print preparation pack</button></div>
<div class="prepgrid">{event_cards}</div><p class="sourceline"><a href="pitch-assets/event-notes.md" download>Download event notes ↓</a> · These notes are separate from the shared deck and main script.</p>
<div class="prepgrid"><section class="prepbox"><h2>Before joining</h2><div class="checklist">{check_html}</div></section>
<section class="prepbox"><h2>Where the deck answers them</h2><div class="criterion"><strong>Problem</strong><span>Slide 2</span></div><div class="criterion"><strong>Solution</strong><span>Slides 3 and 4</span></div><div class="criterion"><strong>Prototype</strong><span>Slide 5 + optional demo</span></div><div class="criterion"><strong>Community impact</strong><span>Slide 8</span></div><div class="criterion"><strong>Preparedness and execution</strong><span>Slides 7, 9, 10 and 11 + Q&A</span></div>
<div class="notice">The main script is planned below five minutes. Neither supplied update confirms the virtual session's exact time limit. Use the shorter explanation if needed; only add the demo when there is a separate slot.</div><button type="button" class="button primary" data-priority-link>Practise the priority questions</button></section>
<section class="prepbox"><h2>Keep these distinctions clear</h2><ul><li><strong>Working:</strong> prototype accounting, budget checks, attribution, notifications and public history.</li><li><strong>Simulated:</strong> bank transfer, Remita settlement and NIN lookup.</li><li><strong>Unbuilt:</strong> live CAC and account-name checks, general upload verification and the complete production operating flow.</li><li><strong>Not signed:</strong> licensed custody and payments partnership.</li><li><strong>Shared focus:</strong> the need, direct provider payments and each donor's receipt. Sponsor-specific funding ideas stay in optional notes.</li></ul></section>
<section class="prepbox"><h2>Delivery, in the JCI spirit</h2><ul><li>Start with the familiar WhatsApp moment. Let the hesitation land.</li><li>Explain the three steps before discussing rails or integrations.</li><li>Read the donor's numbers slowly. Leave a beat for the receipt.</li><li>Abigail leads; Miracle takes slides 4 and 5. One lead speaker throughout also works.</li><li>Answer the question first. Add one piece of evidence, then stop.</li><li>If a technical detail is uncertain, check it. Keep the simulated parts explicit.</li></ul></section></div>
<p class="sourceline"><a href="pitch-assets/kairos-pitch-deck.pdf" target="_blank" rel="noopener">Deck PDF ↗</a> · <a href="pitch-assets/kairos-pitch-deck.pptx" download>PowerPoint ↓</a> · <a href="pitch-assets/pitch-script.md" download>Script ↓</a> · <a href="pitch-assets/qa-bank.md" download>{question_count} questions ↓</a></p>
<p class="sourceline">Prepared from the Cleva invitation, the supplied APWEN stage update, the latest Faith & Tech design, the existing two-person portraits, the JCI scripts and current prototype code.</p></section>
</main><footer class="footer"><div class="shell"><span>KAIROS · TRANSPARENT GIVING FOR NIGERIA</span><span>Abigail + Miracle · Shared product pitch</span></div></footer>
<script type="application/json" id="pitch-data">{data}</script><script>{js}</script></body></html>'''
    (PUBLIC / "pitch.html").write_text(document)
    script_md = ["# Kairos: shared pitch script", "", content.META["team"], "",
                 f"{len(slides)} slides, {words} spoken words. Planning time {mmss(elapsed)}, including pauses.",
                 "The deck and main script are reusable. Timing is a rehearsal estimate; confirm each organiser's limit. Abigail leads; Miracle takes slides 4 and 5. A single lead speaker can read every section unchanged. The optional demo is separate from this timing."]
    for s in slides:
        script_md += ["", f'## Slide {s["n"]}: {s["title"]}', "", f'{s["speaker"]} · {mmss(s["start"])} to {mmss(s["end"])}', ""] + s["paragraphs"] + ["", f'Delivery: {s["cue"]}']
    script_md += ["", "## Short explanation", ""] + content.SHORT_PITCH
    script_md += ["", "## Optional 90-second demo", ""]
    for d in content.DEMO:
        script_md += [f'### {d["title"]} ({d["seconds"]} seconds)', "", d["say"], "", "On screen: " + d["action"], ""]
    (ASSETS / "pitch-script.md").write_text('\n\n'.join(p for p in script_md if p) + '\n')
    qa = [f"# Kairos: {question_count} questions for both pitch sessions", "", content.META["team"], "",
          "Answers describe the current prototype and intended live flow separately. Rehearse the shared priority questions first, then the event-specific topic groups. The main deck and script are event-neutral; optional funding-rail ideas are roadmap only."]
    for category, _ in content.GROUPS:
        qa += ["", f"## {category}", ""]
        for q in content.QUESTIONS:
            if q["category"] == category:
                qa += [f'### {q["id"][1:]}. {"★ " if q["priority"] else ""}{q["question"]}', "", q["answer"], ""]
    (ASSETS / "qa-bank.md").write_text('\n'.join(qa) + '\n')
    event_md = ["# Kairos: separate event notes", "", "Use the same deck and main script for both sessions. If helpful, substitute an event's optional line for slide 8's first paragraph; do not add it to the running time."]
    for event in content.EVENTS:
        event_md += ["", "## " + event["name"], "", event["focus"], ""]
        event_md += ["- " + line for line in event["schedule"]]
        event_md += ["", event["assess"], "", "Optional spoken emphasis:", "", event["spoken"], "", event["follow_up"]]
    (ASSETS / "event-notes.md").write_text('\n'.join(event_md) + '\n')
    (ASSETS / "pitch-manifest.json").write_text(json.dumps({"version": content.META["version"], "slides": len(slides), "questions": len(content.QUESTIONS), "priority": priority_count, "words": words, "seconds": elapsed}, indent=2) + '\n')
    print(f"Built pitch.html: {len(slides)} shared slides, {words} words, {mmss(elapsed)} plan, {question_count} questions ({priority_count} priority).")


if __name__ == "__main__":
    build()
