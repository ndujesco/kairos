"""Independent APWEN presentation, retaining the existing spoken content.

Adds the existing recording before Team and Thank You. Never rebuild or copy
this output over the agnostic pitch.html.
"""
from copy import deepcopy
import cleva_content as shared

META = dict(shared.META, title="Kairos | APWEN Pitch Room", event="APWEN LASU",
            stage="Social Innovation & Community Development",
            version="apwen-feedback-2026-11-13")
PRESENTERS = deepcopy(shared.PRESENTERS)
DEFAULT_PRESENTER = shared.DEFAULT_PRESENTER
VIDEO_SECONDS = 227.033
SLIDES = deepcopy(shared.SLIDES)
for section, key in zip(SLIDES, ["cover", "problem", "solution", "receipt", "prototype",
                                "model", "growth", "impact", "safeguards", "team", "closing"]):
    section["deck_key"] = key
SLIDES[5]["paragraphs"] = [
    "We aim to cover running costs through donations and grants from NGOs. Without that support, we'd tentatively earn revenue through two percent upkeep per donation, capped at five thousand naira per cause. Donors see the fee before confirming. This revenue is to maintain the app, not to make a profit.",
]
SLIDES[5]["seconds"] = 25
SLIDES[5]["cue"] = "Cost recovery is the intention, not a proven break-even result. NGO support is not secured and the fee is tentative; the cap is per cause."
SLIDES[6]["paragraphs"].insert(1,
    "We'd begin with a few bills confirmed directly with the school, publish the receipts, and earn trust one completed payment at a time.")
SLIDES[6]["seconds"] = 22
SLIDES[6]["cue"] = "These are the proposed first pilot steps, not completed payments or signed school partnerships. Trust starts with independently checkable evidence."
SLIDES.insert(-2, {
    "title": "Watch the payment become a receipt.", "deck_key": "demo", "is_demo": True,
    "seconds": 236, "video_seconds": VIDEO_SECONDS,
    "paragraphs": ["The next slide shows a quick demonstration of how it works"],
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

# Front-load the judges' exact question and its follow-ups. Existing IDs stay
# attached to their questions so saved stars retain their meaning after sorting.
FEEDBACK_CATEGORY = "APWEN judges' feedback"
_original = {q["id"]: q for q in QUESTIONS}
_feedback = [
    dict(id="q111", question="How do you bootstrap trust before you have a track record, and how do you earn revenue?",
         answer="We'd start with a few school-fee bills confirmed directly with the school, then show the school's receipt and each donor's share. People can inspect the evidence before relying on our reputation. For revenue, we aim for NGO donations and grants; without that support, we'd tentatively charge 2%, capped at ₦5,000 per cause, to maintain the app rather than make a profit. The funding and live pilot are planned, not secured."),
    dict(id="q112", question="How will your first donors trust you before you have a track record?",
         answer="We would start small, with school-fee bills confirmed through official school channels rather than relying only on documents supplied by a fundraiser. Donors should be able to check the budget, named destination, independent payment receipt and their own recorded share. Appropriate redaction would protect private details. A few completed, reconciled payments would build the track record. We have not run that live pilot yet."),
    dict(_original["q081"], question="How do you earn revenue to keep Kairos running?",
         answer="Our first aim is donations and grants from NGOs to cover running costs. Without that support, the tentative revenue model is 2% upkeep per donation, capped at ₦5,000 for the whole cause and shown before the donor confirms. The intention is maintaining the app, not making a profit. No NGO funding is secured, and we still need to test the real operating costs. The prototype demonstrates the fee calculation, not a grant-dependent fee switch."),
    dict(_original["q076"], question="How will you address the regulatory exposure of holding donations in escrow?",
         answer="The intended model is custody with an appropriately licensed institution under an agreed arrangement, with Kairos providing the budget controls and records. Calling an account escrow does not establish permission to hold donor funds, and a partner does not automatically remove our own responsibilities. Before live use, we need qualified review of our activity, the partner's actual permissions, safeguarding, KYC/AML, refunds and disputes, with responsibilities agreed in writing. No custody partner is signed and no real donations are being held.",
         sources=[("CBN licence categories and permissible activities", "https://www.cbn.gov.ng/out/2020/ccd/categorization%20of%20psps.pdf"),
                  ("CBN payment service provider categories", "https://www.cbn.gov.ng/PaymentsSystem/PSPs.html")]),
    dict(id="q113", question="How will you manage the cost of verifying counterparties at scale?",
         answer="We would begin with a small set of schools, then a limited set of hospitals. Provider onboarding can be reused for later bills, with fresh checks for changed accounts or risk signals and periodic review. Each invoice and payment still needs its own checks; reuse is not permission to trust a provider forever. Human review would handle exceptions. We have no measured verification cost yet, so the pilot must record checks, review time and partner charges before we expand."),
    dict(_original["q085"], question="Will capped upkeep actually cover verification and running costs?",
         answer="We have not proved that. The cap is a proposed fairness limit, not evidence that every cause will break even. We would measure onboarding cost per provider, checks and review per bill, payment charges and donor-notification costs. NGO support could cover shared costs. If the model falls short, we would reduce the pilot scope or secure support before expanding, rather than quietly reduce verification."),
    dict(_original["q049"], question="Does a payment receipt prove delivery, and are staged releases already enforced?",
         answer="A receipt records a payment; it does not by itself prove treatment or service delivery. The intended flow needs independent evidence and review before later releases where appropriate. The prototype enforces payment permissions, balances and budget-line limits and generates donor receipts, but a complete proof-of-delivery and staged-release operating process is not implemented. We should demonstrate the checks that run today and identify the planned controls separately."),
]
_moved = {q["id"] for q in _feedback}
for q in _feedback:
    q.update(category=FEEDBACK_CATEGORY, priority=True)
QUESTIONS = _feedback + [q for q in QUESTIONS if q["id"] not in _moved]
for number, q in enumerate(QUESTIONS, 1):
    q["display_number"] = f"{number:03}"
GROUPS = [(category, [(q["question"], q["answer"], q["priority"])
                     for q in QUESTIONS if q["category"] == category])
          for category in [FEEDBACK_CATEGORY] + [name for name, _ in shared.GROUPS]]
assert len(QUESTIONS) == 113
assert len({q["id"] for q in QUESTIONS}) == len(QUESTIONS)
assert len({q["question"] for q in QUESTIONS}) == len(QUESTIONS)

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
    "qa_intro": "Start with the APWEN judges' feedback: trust before a track record, revenue, custody permissions and verification costs. The first seven answers address those points. Existing question IDs are retained for saved stars. The funding model is intended cost recovery, not a proven break-even result; current capabilities remain separate from launch plans.",
    "qa_page_intro": "113 questions. The judges' trust-and-revenue question and six related follow-ups come first. Rehearse those before the other topics.",
    "event_title": "Kairos: APWEN preparation notes",
    "event_intro": "Keep this presentation independent of Cleva. The full route is planned at 7:37 including the recorded demonstration; confirm the organiser's allowed time and slide format.",
    "focus_note": "Community giving, direct provider payments and each donor's own receipt. The demonstration uses seeded data and simulated money movement.",
    "source_note": "Prepared from the supplied APWEN notice, existing Kairos script, original two-person portraits and unchanged demo recording.",
    "notes_note": "Read the revised wording from this page or the APWEN script downloads. The separate Keynote and PowerPoint files retain their existing notes.",
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
        "Practise the judges' feedback questions first: trust, revenue, regulatory exposure and verification costs.",
    ],
}
