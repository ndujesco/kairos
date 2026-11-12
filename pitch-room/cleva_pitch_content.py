"""Cleva edition. Shared product facts; independent script and downloads.

Do not edit cleva_content.py to tailor this edition: that legacy filename is
the preserved general/APWEN material and is imported by the native deck.
"""
from copy import deepcopy
import cleva_content as shared

META = dict(shared.META,
            title="Kairos | Cleva Pitch Room",
            event="Cleva × Tether", stage="Future of Payments · Abigail and Miracle",
            version="cleva-office-hours-demo-2026-11-12")
PRESENTERS = deepcopy(shared.PRESENTERS)
DEFAULT_PRESENTER = shared.DEFAULT_PRESENTER
VIDEO_SECONDS = 227.033
SLIDES = [deepcopy(shared.SLIDES[i]) for i in [0, 1, 2, 3, 4]]
for section, key in zip(SLIDES, ["cover", "problem", "solution", "receipt", "prototype"]):
    section["deck_key"] = key

SLIDES[1].update(
    title="A transfer succeeds. The bill may still be unpaid.",
    paragraphs=[
        shared.SLIDES[1]["paragraphs"][0],
        "People wanted to help, but transferring to the fundraiser only proved that an account was credited. It didn't prove the school fee was paid. That is the payment gap; how do we manage to keep money tied to the need it was given for, instead of risking it getting pocketed along the way?",
    ],
    cue="Use the school-fees story, then name the payment gap plainly. The problem is money reaching an account without proof it paid the intended bill.",
    deck={"eyebrow": "THE PAYMENT CHALLENGE",
          "lead": "The missing link is between money collected and the bill it was meant to pay.",
          "cards": [
              {"tag": "01", "title": "A real need", "body": "A school fee or hospital bill is shared with supporters."},
              {"tag": "02", "title": "A transfer succeeds", "body": "The money reaches the fundraiser's account."},
              {"tag": "03", "title": "The bill is still unclear", "body": "Funds can be diverted before the intended provider is paid."}],
          "band": "A successful transfer is not proof that the need was met."},
)
SLIDES[2].update(
    title="Our solution.",
    paragraphs=[
        "Kairos is that trusted middle layer.",
        "Here is how it's designed to work.",
        "First, the cause gets checked. The person raising money proves who they are with their BVN or NIN. Then an AI interviewer takes them through it. What happened, when, which hospital. It builds an itemised budget naming real suppliers, and screens the evidence for reused photos and mismatched dates.",
        "Second, every cause is just an ordinary link shared on social media. Anyone who opens it sees the story, the budget, and the ledger. The money lands in escrow, never a personal account.",
        "Third, funds leave escrow only toward named, verified vendors.",
    ],
    cue="Need and budget, controlled provider payment, personal receipt. Licensed custody and live settlement are planned; today's demo shows the accounting and rules.",
    deck={"eyebrow": "THE SOLUTION",
          "lead": "Connect the contribution, the provider payment and each donor's own proof.",
          "cards": [
              {"tag": "01", "title": "Check the cause", "body": "Identity, AI-assisted intake and an itemised budget naming suppliers."},
              {"tag": "02", "title": "Share one clear link", "body": "Story, budget and public ledger. Donations are intended to stay in escrow."},
              {"tag": "03", "title": "Pay verified vendors", "body": "Release funds to named providers, with a receipt for every donor."}],
          "band": "The prototype demonstrates the flow. Live custody and settlement remain to be integrated."},
)
SLIDES[3]["paragraphs"].append(
    "That is what makes Kairos different: every giver can follow their own part of the payment, even when many people funded the bill."
)
SLIDES[4].update(
    title="What we can show you today.",
    paragraphs=[
        "Here is where we are today. The accounting, budget checks, donor shares, notifications and public history are running in the app.",
        "Bank transfer, Remita settlement and NIN lookup are simulated. CAC, account-name and automated evidence checks are not built, and no real donations have moved.",
        "With Cleva's approval, we could also explore funding from supporters abroad, linking a contribution in dollars or USDT to the same bill and receipt.",
        "We aim to cover running costs through donations and NGO grants. Without that support, our tentative fallback is two percent upkeep, capped at five thousand naira per cause.",
        shared.SLIDES[8]["paragraphs"][0],
    ],
    cue="Show the working app next. The Cleva connection is proposed, not built. NGO support is not secured; the upkeep policy remains tentative. Say all three simulated parts clearly.",
    deck={"eyebrow": "DEMO & PROGRESS",
          "lead": "We can show the accounting, payment controls and personal receipts today.",
          "cards": [
              {"tag": "WORKING", "title": "Application logic", "body": "Accounting, budget checks, donor shares, notifications and public history."},
              {"tag": "SIMULATED", "title": "Money and identity", "body": "Bank transfer, Remita settlement and NIN lookup."},
              {"tag": "NEXT", "title": "Live integrations", "body": "Independent provider and evidence checks, licensed custody and settlement."}],
          "band": "The demo uses seeded data. No real donations have moved."},
)
SLIDES += [
    {"title": "Watch the payment become a receipt.", "deck_key": "demo", "is_demo": True,
     "seconds": 239, "video_seconds": VIDEO_SECONDS,
     "paragraphs": ["Now let us watch a demonstration of how the app works."],
     "cue": "Share computer sound. Play the embedded 3:47 recording once. The Progress section distinguishes working code from the intended checks in the recording. After it ends, move to Team, then Thank You. Do not narrate over the recording."},
    dict(deepcopy(shared.SLIDES[9]), deck_key="team"),
    dict(deepcopy(shared.SLIDES[10]), deck_key="closing"),
]
# Full presentation: 7:50, including the unmodified 3:47 recording.
for section, seconds in zip(SLIDES, [21, 51, 55, 24, 59, 239, 9, 12]):
    section["seconds"] = seconds
SLIDES[-1]["cue"] = "Thank them, then stop. The demo has already played."


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
    assess="The latest organiser message prioritises Problem, Solution and Demo & Progress. It says a lengthy PowerPoint is unnecessary and practical execution matters more than polished slides. It does not confirm a ten-minute slot.",
    spoken="We solve the gap between sending help and knowing it paid for the need. Kairos connects a contribution to a published budget, a controlled provider payment and each donor's receipt.",
    notice="Use the eight-slide route with the integrated demo. The Cleva connection is a short future option in Progress, not the central payment problem.",
    follow_up="First confirm donation-platform eligibility, account structure and integration access with Cleva. No live collection, Cleva API, stablecoin integration or custody partnership is established by this prototype.",
)
EVENTS[0]["schedule"].append("Latest update: the top five teams will be notified by EOD Monday 16 November and invited to pitch on stage.")

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
    "deck_base": "pitch-assets/cleva/deck",
    "demo_url": "pitch-assets/cleva/demo.mp4",
    "header": "Cleva × Tether\nFuture of Payments",
    "description": "Kairos pitch for Cleva: transparent giving, a proposed international funding connection, switchable presenters and judge questions.",
    "footer": "Abigail + Miracle · Cleva pitch",
    "prep_kicker": "Cleva × Tether · 13 November 2026",
    "prep_title": "Problem. Solution. Working demo.",
    "prep_intro": "Answer the three questions in the organiser's latest message. Keep the payment gap clear, show the existing flow, and let the demo carry the evidence.",
    "script_title": "Kairos: Cleva pitch script",
    "script_intro": "Either presenter can deliver the whole pitch. The 7:50 rehearsal plan includes the full 3:47 recording and handover. This eight-slide deck focuses on the payment problem, solution and practical progress. The organiser has not confirmed a ten-minute slot. The possible Cleva funding connection remains unbuilt and subject to approval.",
    "qa_title": "Kairos: 110 questions for the Cleva pitch",
    "qa_intro": "Start with the priority questions, then the Cleva integration topic. Distinguish the working prototype from the proposed international funding connection. No Cleva approval, API access, stablecoin integration or custody partnership is claimed.",
    "qa_page_intro": "110 questions, including ten on the proposed Cleva connection. Start with those marked Rehearse first, then practise the eligibility, custody and integration questions.",
    "event_title": "Kairos: Cleva preparation notes",
    "event_intro": "The latest Office Hours brief prioritises Problem, Solution and Demo & Progress over a lengthy PowerPoint. The eight-slide route is planned at 7:50 including the 3:47 recording. Confirm the actual slot; these notes are not extra spoken sections.",
    "focus_note": "A proposed connection for supporters abroad, subject to Cleva confirming eligibility and access. Licensed custody remains a separate requirement.",
    "source_note": "Prepared from Abigail's voice note, the latest Office Hours message, the existing Kairos/JCI script and working prototype. Official Cleva sources were checked on 12 November 2026.",
    "notes_note": "This Cleva PowerPoint has matching speaker notes and an embedded video. The PDF shows a poster; use the PowerPoint or presenter page for playback.",
    "timing_note": "7:50 including the full 3:47 recording. Play the demo before Team and Thank You, with computer sound shared. The organiser's exact allowance is not confirmed.",
    "prep_timing_note": "The eight-slide route is planned at 7:50 including the recording. The organiser asks for a concise explanation and evidence of progress, not a lengthy PowerPoint. Confirm the actual time allowance.",
    "demo_kicker": "Evidence of execution",
    "demo_title": "Show the working flow.",
    "demo_intro": "The same 3:47 recording is in slide 6, before Team and Thank You. It demonstrates the existing prototype rather than a Cleva integration.",
    "demo_notice": "Working prototype with demo data. Bank transfer, Remita settlement and NIN lookup are simulated. Independent verification and live custody still need integration.",
    "criteria": [["Problem", "Slide 2"], ["Solution and uniqueness", "Slides 3 and 4"],
                 ["Demo & Progress", "Slides 5 and 6"], ["Team and closing", "Slides 7 and 8"]],
    "checklist": [
        "Confirm the Cleva office-hour booking, meeting link, start time and pitch duration.",
        "Check event registration and the Cleva KYC instructions from the invitation.",
        "Choose Abigail or Miracle and download that presenter's Cleva script.",
        "Rehearse the 7:50 route including the recording; confirm the organiser's actual allowance.",
        "Ask whether the giving flow is eligible and what integration access could be available.",
        "Explain that custody needs a separate licensed arrangement and the connection is unbuilt.",
        "Open the Cleva deck, test its embedded video and share computer sound. Keep the MP4 as a backup.",
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
