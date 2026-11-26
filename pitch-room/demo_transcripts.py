"""Paragraphs follow the narration's topics; silent cards stay delivery cues."""
PARAGRAPH_STARTS = (
    "As you can see, he doesn't just fill a form.",
    "You can see it asks for the Remita reference",
    "And then out comes the published itemised budget,",
    "He then proves who he is,",
    "And this is where it runs the fraud check.",
    "Now, we see a donor named Okefe,",
    "While signing up on Kairos is very easy,",
    "Anyone who sees this link can click on it",
    "Now, on the left is Ugochukwu's account,",
    "Now as you can see, a hundred",
    "Before she agrees to pay, notice",
    "Notice also that as soon as she gives this money,",
    "Now, let's look at Ugo's wallet.",
    "He clicks on Pay fees,",
    "As soon as this payment is made,",
)


def group_paragraphs(text):
    """Only change whitespace; keep every recorded word and its punctuation."""
    text = ' '.join(text.split())
    starts = sorted(text.index(start) for start in PARAGRAPH_STARTS if start in text)
    boundaries = [0] + starts + [len(text)]
    paragraphs = [text[a:b].strip() for a, b in zip(boundaries, boundaries[1:])]
    assert ' '.join(paragraphs) == text
    return paragraphs


def timestamp(seconds):
    minutes, ticks = divmod(round(seconds * 10), 600)
    return f'{minutes}:{ticks // 10:02}.{ticks % 10}'


def title_card_pauses(paragraphs, intervals, titles):
    starts = (paragraphs[0], 'Now, we see a donor named Okefe,',
              'While signing up on Kairos is very easy,', "Now, on the left is Ugochukwu's account,")
    assert len(intervals) == len(titles) == len(starts)
    return [dict(before_paragraph=next(i for i, p in enumerate(paragraphs) if p.startswith(start)),
                 start=interval[0], end=interval[1], seconds=interval[1] - interval[0], title=title)
            for start, interval, title in zip(starts, intervals, titles)]


def transcript_items(slide):
    """Yield spoken paragraphs and explicitly separate silent title-card cues."""
    pauses = {p['before_paragraph']: p for p in slide.get('recorded_transcript_pauses', [])}
    for index, paragraph in enumerate(slide.get('recorded_transcript', [])):
        if index in pauses:
            pause = pauses[index]
            label = (f'Silent title card · {timestamp(pause["start"])}–{timestamp(pause["end"])}'
                     f' · Pause {pause["seconds"]:g} seconds: {pause["title"]}')
            yield 'pause', label
        yield 'spoken', paragraph
