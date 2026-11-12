"""Cleva edition. Shared product facts; independent script and downloads.

Do not edit cleva_content.py to tailor this edition: that legacy filename is
the preserved general/APWEN material and is imported by the native deck.
"""
from copy import deepcopy
import cleva_content as shared

META = dict(shared.META,
            title="Kairos | Cleva Pitch Room",
            event="Cleva × Tether", stage="Future of Payments · Abigail and Miracle",
            version="cleva-pitch-2026-11-12")
PRESENTERS = deepcopy(shared.PRESENTERS)
DEFAULT_PRESENTER = shared.DEFAULT_PRESENTER
SLIDES = deepcopy(shared.SLIDES)

# Keep the familiar voice and all eleven original slide images. Change only
# the impact/partnership passage and the ask; other spoken sections stay exact.
SLIDES[7].update(
    title="Where Cleva could come in.",
    cue="Connect the supporter abroad to the same bill and receipt. This is a proposed, unbuilt connection; eligibility and access need Cleva's confirmation. Custody needs a separate licensed arrangement.",
    paragraphs=[
        "Nigerians abroad should have that same transparency.",
        "Cleva supports dollar receipts, USDT deposits and conversion to local currency. With Cleva's approval, we'd explore connecting that funding to a named bill in Kairos, right through to each donor's receipt.",
        "That connection is proposed. Licensed custody still needs a separate partner.",
    ],
)
SLIDES[10]["paragraphs"] = [
    "Next, we'd like Cleva's guidance on an eligible funding flow, alongside a licensed custody partner and pilot communities.",
    *SLIDES[10]["paragraphs"],
]
SLIDES[10]["cue"] = "Ask for confirmation of the use case and an integration path, then stop. The demo shows today's prototype, not a Cleva integration."

# Rehearsal timings include pauses. Both presenters use exactly the same plan.
for section, seconds in zip(SLIDES, [22, 30, 34, 13, 17, 20, 10, 27, 10, 9, 18]):
    section["seconds"] = seconds


def slides_for_presenter(presenter):
    return [dict(section, speaker=PRESENTERS[presenter]["name"], paragraphs=[
        shared.paragraph_for_presenter(p, presenter) for p in section["paragraphs"]
    ]) for section in SLIDES]


shared_paragraphs = shared.shared_paragraphs
DEMO = deepcopy(shared.DEMO)
SHORT_PITCH = deepcopy(shared.SHORT_PITCH)
SHORT_PITCH[-1] = (
    "We'd start with school fees. With Cleva's approval, we'd explore a connection for supporters abroad to fund those bills and receive the same personal proof. That integration is proposed, and licensed custody still needs a separate partner."
)

EVENTS = [deepcopy(shared.EVENTS[0])]
EVENTS[0].update(
    spoken="We'd like Cleva's guidance on whether this giving flow is eligible and how an approved funding connection could work.",
    notice="The Cleva connection is already included in slide 8. Do not add another sponsor explanation to the main script.",
    follow_up="First confirm donation-platform eligibility, account structure and integration access with Cleva. No live collection, Cleva API, stablecoin integration or custody partnership is established by this prototype.",
)

GROUPS = deepcopy([group for group in shared.GROUPS if group[0] != "APWEN focus"])
GROUPS.append(("Cleva integration", [
    ("Where exactly could Cleva fit?", "We would explore an approved connection for supporters abroad to fund a named Nigerian bill, with currency conversion where needed. Kairos would connect the settled contribution to its budget, provider payment and donor receipt. The proposed connection is unbuilt and eligibility must be confirmed.", True),
    ("Would Cleva hold the escrow?", "We have not established a Cleva escrow service for Kairos. Licensed custody and the release rules need a separate agreed arrangement. An ordinary account balance is not evidence that donated funds are segregated or restricted to a cause.", True),
    ("Have you confirmed that Cleva permits donation platforms?", "No. Its published restrictions contain wording about fundraising and donation platforms. We need Cleva to clarify how that applies to Kairos before planning live collection. We would not use an account to get around those restrictions. The pitch asks for an eligibility discussion, not an exception we already have.", True),
    ("Are you already using Cleva or USDT?", "No. The application answered No to stablecoins, and that remains accurate for the prototype. USDT is a possible future funding option through an approved connection; neither that integration nor a Cleva partnership is built or signed.", True),
    ("Which Cleva API are you integrating?", "We have not confirmed developer access or an API contract. Product availability does not establish API availability. We need to agree account ownership, permitted transaction types, payment references, reliable settlement notifications and reconciliation before selecting an integration approach."),
    ("How would an overseas contribution remain traceable?", "The design needs to connect the incoming payment reference, actual conversion and settled naira amount to one cause and donor. Provider settlement would then feed the existing allocation and receipt flow. That reconciliation is proposed, and a transfer screenshot must not be treated as proof of settled funds."),
    ("Who pays conversion and transfer costs?", "The proposed donor experience would disclose the rate, external charges and Kairos upkeep separately before confirmation. Allocation would use the actual net naira contribution. We have not implemented that foreign-currency quote or agreed partner pricing, so we do not promise a fixed rate or a cheaper transfer."),
    ("Why use USDT if a donor can send dollars?", "It could be another funding option for an eligible supporter who already uses it. The donor still needs the bill, provider payment and personal receipt. We would validate demand and permitted use before building it; stablecoins are not required for Kairos to work."),
    ("What would Cleva gain from working with you?", "A pilot could test a specific reason to fund a payment from abroad: a checkable school or hospital bill with proof returned to the supporter. We would measure completed payments, repeat use, support effort and total cost. We have no agreed commercial terms or transaction-volume forecast."),
    ("What is the first step after this pitch?", "Confirm eligibility and integration access with Cleva, then agree licensed custody and a controlled test. We would first prove reconciliation and provider settlement in a test environment. A small live pilot would follow only after the required approvals, checks, consent and refund process are in place.", True),
]))
QUESTIONS = []
for category, rows in GROUPS:
    for question, answer, *priority in rows:
        QUESTIONS.append(dict(id=f"q{len(QUESTIONS)+1:03d}", category=category,
                              question=question, answer=answer,
                              priority=bool(priority and priority[0])))
assert len(QUESTIONS) == 110

SOURCES_HTML = """<section class="prepbox"><h2>The Cleva connection: basis and open questions</h2>
<p><a href="https://www.getcleva.com/business" target="_blank" rel="noopener">Cleva Business</a>
lists foreign-currency receipts, stablecoin deposits and local-currency conversion.
Using those services for Kairos is a proposal, not an approved integration.</p>
<p><a href="https://www.getcleva.com/legal/global/prohibited-countries-and-activities" target="_blank" rel="noopener">Restricted activities</a>
include wording about fundraising and donation platforms.
<a href="https://www.getcleva.com/legal/us/cleva-tech-terms-of-service" target="_blank" rel="noopener">US terms</a>
also list escrow among unsupported services. Confirm the applicable terms and eligibility directly with Cleva.</p>
<p><a href="https://www.getcleva.com/legal/global/stablecoin-policy" target="_blank" rel="noopener">Stablecoin policy</a>
describes conversion to USD, partner custody and applicable checks. It does not establish a Kairos escrow arrangement.
Integration access, account ownership, settlement evidence, fees and refunds remain to be agreed.</p>
<p><a href="pitch-assets/cleva/sources.md" download>Download research and proposed flow ↓</a></p></section>"""

PAGE = {
    "header": "Cleva × Tether\nFuture of Payments",
    "description": "Kairos pitch for Cleva: transparent giving, a proposed international funding connection, switchable presenters and judge questions.",
    "footer": "Abigail + Miracle · Cleva pitch",
    "prep_kicker": "Cleva × Tether · 13 November 2026",
    "prep_title": "A clear role for Cleva.",
    "prep_intro": "Keep the giving story first. Explain the proposed funding connection, its current limits and what you need to confirm with Cleva.",
    "script_title": "Kairos: Cleva pitch script",
    "script_intro": "Either presenter can deliver the whole pitch. The Cleva funding connection is proposed, subject to eligibility and integration access; licensed custody needs a separate arrangement. The demo is outside this timing. Use this script for the Cleva wording; the original slide files and their notes are unchanged.",
    "qa_title": "Kairos: 110 questions for the Cleva pitch",
    "qa_intro": "Start with the priority questions, then the Cleva integration topic. Distinguish the working prototype from the proposed international funding connection. No Cleva approval, API access, stablecoin integration or custody partnership is claimed.",
    "qa_page_intro": "110 questions, including ten on the proposed Cleva connection. Start with those marked Rehearse first, then practise the eligibility, custody and integration questions.",
    "event_title": "Kairos: Cleva preparation notes",
    "event_intro": "The Cleva role is already part of this 3:30 pitch. These notes support preparation and Q&A; they are not extra spoken sections.",
    "focus_note": "A proposed connection for supporters abroad, subject to Cleva confirming eligibility and access. Licensed custody remains a separate requirement.",
    "source_note": "Prepared from the Cleva invitation, the existing Kairos/JCI script and current prototype, with Cleva's official product and policy pages checked on 12 November 2026.",
    "notes_note": "Use this page or the Cleva script downloads for the tailored wording. The original PowerPoint and its notes are unchanged.",
    "timing_note": "A 3:30 rehearsal plan, excluding the optional demo. Keep the proposed Cleva connection distinct from today's prototype. Share the original PDF or Deck only and keep the script on your own screen.",
    "prep_timing_note": "The main script is planned at 3:30 including pauses; the optional demo is separate. Confirm the organiser's actual slot. Do not add an extra Cleva explanation after slide 8.",
    "checklist": [
        "Confirm the Cleva office-hour booking, meeting link, start time and pitch duration.",
        "Check event registration and the Cleva KYC instructions from the invitation.",
        "Choose Abigail or Miracle and download that presenter's Cleva script.",
        "Rehearse the 3:30 route; keep the school-fees story and receipt numbers natural.",
        "Ask whether the giving flow is eligible and what integration access could be available.",
        "Explain that custody needs a separate licensed arrangement and the connection is unbuilt.",
        "Open the original deck and prepared prototype demo; test screen sharing and backup internet.",
        "Practise the priority questions and the Cleva integration topic.",
    ],
}

RESEARCH_NOTES = """# Kairos: Cleva research and proposed connection

Checked 12 November 2026. These are preparation notes, not evidence of a signed partnership or a permitted account structure.

## Proposed role

With Cleva confirming the use case is permitted, explore funding from supporters abroad and conversion for a named bill. Link the settled net naira amount to its cause and donor, then connect the licensed custody record, provider payment and each donor's receipt. Eligibility, developer access and that reconciliation remain unconfirmed. No live collection or stablecoin handling is implemented in Kairos.

Licensed custody, segregation of donated funds and release controls require their own agreed arrangement. Do not describe an ordinary Cleva account as Kairos escrow.

## Primary sources

- [Cleva Business](https://www.getcleva.com/business): published account and funding capabilities underlying the proposed role.
- [Stablecoin policy](https://www.getcleva.com/legal/global/stablecoin-policy): automatic conversion to USD, partner custody, charges and compliance conditions. Do not promise instant settlement or assume a stablecoin deposit remains held as USDT.
- [Restricted activities](https://www.getcleva.com/legal/global/prohibited-countries-and-activities): contains wording about fundraising and donation platforms. Its application to Kairos needs direct confirmation.
- [US terms](https://www.getcleva.com/legal/us/cleva-tech-terms-of-service): list escrow services among unsupported categories. Which entity and terms would apply needs confirmation.
- [Local bank withdrawals](https://help.getcleva.com/en/articles/10048473-withdrawing-from-your-cleva-account): describes bank recipients in the consumer interface. It does not establish an API for Kairos or eligibility for this use case.

## Questions for Cleva

1. Is this transparent-giving flow eligible under the applicable terms? If not, do not route it through Cleva.
2. What entity and account structure could be supported, and how would the independent custody arrangement connect?
3. Is developer or sandbox access available? What references, settlement notifications and reconciliation information could be supplied?
4. What fees, limits, timing, failed-payment and refund rules would apply?
5. Could a small institutional-bill pilot be reviewed after the permitted flow and operating controls are agreed?

The application previously answered No to stablecoins. That is still true of the built prototype. This edition adds a proposed future connection, not a newly implemented feature.
"""
