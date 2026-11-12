"""Independent APWEN presentation, retaining the existing spoken content.

Adds the existing recording before Team and Thank You. Never rebuild or copy
this output over the agnostic pitch.html.
"""
from copy import deepcopy
import cleva_content as shared

META = dict(shared.META, title="Kairos | APWEN Pitch Room", event="APWEN LASU",
            stage="Social Innovation & Community Development",
            version="apwen-embedded-demo-2026-11-12")
PRESENTERS = deepcopy(shared.PRESENTERS)
DEFAULT_PRESENTER = shared.DEFAULT_PRESENTER
VIDEO_SECONDS = 227.033
SLIDES = deepcopy(shared.SLIDES)
for section, key in zip(SLIDES, ["cover", "problem", "solution", "receipt", "prototype",
                                "model", "growth", "impact", "safeguards", "team", "closing"]):
    section["deck_key"] = key
SLIDES.insert(-2, {
    "title": "Watch the payment become a receipt.", "deck_key": "demo", "is_demo": True,
    "seconds": 250, "video_seconds": VIDEO_SECONDS,
    "paragraphs": ["This slide shows a quick demonstration of how it works"],
    "cue": "Share computer sound. Play the embedded 3:47 recording once, then move to Team and Thank You. The original recording mentions planned checks; it is not evidence of live settlement or independent verification.",
})
SLIDES[-1]["cue"] = "Thank them, then stop. The demo has already played."


def slides_for_presenter(presenter):
    return [dict(section, speaker=PRESENTERS[presenter]["name"], paragraphs=[
        shared.paragraph_for_presenter(p, presenter) for p in section["paragraphs"]
    ]) for section in SLIDES]


shared_paragraphs = shared.shared_paragraphs
SHORT_PITCH = deepcopy(shared.SHORT_PITCH)
DEMO = deepcopy(shared.DEMO)
GROUPS = deepcopy(shared.GROUPS)
QUESTIONS = deepcopy(shared.QUESTIONS)
EVENTS = [deepcopy(shared.EVENTS[1])]
EVENTS[0].update(
    notice="The existing script is retained, with the 3:47 recording added before Team and Thank You. Confirm APWEN's actual time allowance before presenting the full route.",
    spoken="The social innovation is knowing what your help paid for, so genuine needs can earn support and organisers can account for it.",
    follow_up="APWEN's final slide requirements remain unconfirmed. This deck and page are independent of Cleva, so changes can be made here without changing either other room.",
)

PAGE = {
    "deck_base": "pitch-assets/apwen/deck",
    "demo_url": "pitch-assets/apwen/demo.mp4",
    "header": "APWEN LASU\nSocial Innovation & Community Development",
    "description": "Kairos APWEN presentation with its own deck, script and embedded demonstration before Team and Thank You.",
    "footer": "Abigail + Miracle · APWEN pitch",
    "prep_kicker": "APWEN LASU · 13 November 2026",
    "prep_title": "Ready for APWEN.",
    "prep_intro": "The existing pitch is retained with the demo before the last two slides. This room and deck are independent of Cleva and the agnostic page.",
    "script_title": "Kairos: APWEN pitch script",
    "script_intro": "Either presenter can deliver the whole pitch. Total planning time is 7:37, including the full 3:47 recording and handover. The existing spoken sections are retained. Confirm APWEN's time limit and any new slide requirements; this duration is a rehearsal plan, not an announced competition allowance.",
    "qa_title": "Kairos: APWEN question bank",
    "qa_intro": "Rehearse the priority questions and APWEN focus topic. Answers distinguish the working prototype, simulated parts and launch plans.",
    "qa_page_intro": "110 questions from the existing preparation. Start with Rehearse first and the APWEN focus topic.",
    "event_title": "Kairos: APWEN preparation notes",
    "event_intro": "Keep this presentation independent of Cleva. The full route is planned at 7:37 including the recorded demonstration; confirm the organiser's allowed time and slide format.",
    "focus_note": "Community giving, direct provider payments and each donor's own receipt. The demonstration uses seeded data and simulated money movement.",
    "source_note": "Prepared from the supplied APWEN notice, existing Kairos script, original two-person portraits and unchanged demo recording.",
    "notes_note": "This APWEN PowerPoint has its own matching speaker notes and embedded video. The PDF shows a poster; use the PowerPoint or presenter page for playback.",
    "timing_note": "7:37 including the 3:47 recording. Demo is before Team and Thank You. Confirm APWEN's actual allowance and format. Share computer sound when playing the video.",
    "prep_timing_note": "The full route is 7:37 including the recording. No supplied APWEN notice confirms the virtual presentation duration. Use the shorter explanation and a separate demo if the confirmed slot requires it.",
    "demo_kicker": "Embedded in the main presentation",
    "demo_title": "The payment and the receipt.",
    "demo_intro": "The same 3:47 recording is in slide 10 of this deck, immediately before Team and Thank You.",
    "demo_notice": "Working prototype with demo data. Bank transfer, Remita settlement and NIN lookup are simulated; the recording is not proof of live provider verification.",
    "criteria": [["Problem", "Slide 2"], ["Solution and uniqueness", "Slides 3 and 4"],
                 ["Prototype", "Slide 5"], ["Community impact", "Slide 8"],
                 ["Recorded demo", "Slide 10"], ["Team and closing", "Slides 11 and 12"]],
    "checklist": [
        "Confirm APWEN's start time, meeting link, time allowance and slide requirements.",
        "Choose Abigail or Miracle and download that presenter's APWEN script.",
        "Use the APWEN PowerPoint or page, not the Cleva or agnostic deck.",
        "Test the embedded recording and computer-sound sharing before joining.",
        "Keep the local MP4 beside the deck as a playback backup.",
        "State that bank transfer, Remita settlement and NIN lookup are simulated.",
        "Play the recording before Team and Thank You; do not add a second demo.",
        "Practise the priority questions and APWEN focus topic.",
    ],
}
