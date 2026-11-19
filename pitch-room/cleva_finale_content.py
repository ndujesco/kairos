"""Cleva edition. Shared product facts; independent script and downloads.

Do not edit cleva_content.py to tailor this edition: that legacy filename is
the preserved general/APWEN material and is imported by the native deck.
"""
from copy import deepcopy
import cleva_content as shared

META = dict(shared.META,
            title="Kairos | Cleva Grand Finale",
            event="Cleva × Tether", stage="Future of Payments · Grand Finale",
            date="21 November 2026",
            version="cleva-grand-finale-payments-2026-11-18")
PRESENTERS = deepcopy(shared.PRESENTERS)
DEFAULT_PRESENTER = shared.DEFAULT_PRESENTER
VIDEO_SECONDS = 251.853333
PRESENTATION_LIMIT_SECONDS = 12 * 60
SLIDES = [deepcopy(shared.SLIDES[i]) for i in [0, 1, 2, 3, 4]]
for section, key in zip(SLIDES, ["cover", "problem", "solution", "receipt", "prototype"]):
    section["deck_key"] = key

SLIDES[0].update(
    paragraphs=[
        shared.SLIDES[0]["paragraphs"][0],
        "Kairos is a transparent crowdfunding platform created to solve the problem of trust when someone asks for help and several people donate their hard earned money. In Kairos, every naira you give can be watched until it reaches the need it was given for.",
        "We make that possible by controlling the flow of money, from the people giving to the whomever is supposed to be paid.",
        "So for us, a crowdfunding payment is complete when the money reaches the need it was given for.",
    ],
    cue="Keep the familiar introduction. Make the flow of money clear from the start: contributions, provider payment, each donor's receipt.",
)
SLIDES[1].update(
    title="The money arrived. But was the bill paid?",
    paragraphs=[
        shared.SLIDES[1]["paragraphs"][0],
        "People were making separate transfers to help pay one school fee. But those transfers only showed that the fundraiser received money. They didn't show that the school was paid.",
        "The payment we actually care about is the school fee. We need a system that carries those contributions all the way to the school, keeps them tied to that bill, and tells each person what their money covered. That is the payment problem Kairos is solving.",
    ],
    cue="Keep the school-fees story. Emphasise several contributions toward one bill: the account was credited, but donors could not see whether the school was paid. This is the early payment-problem slide.",
    visual={"kind": "payment_problem", "eyebrow": "THE PAYMENT PROBLEM",
            "title": "The money arrived. But was the bill paid?",
            "lead": "Many people contribute toward one school fee.",
            "brand_right": "FUTURE OF PAYMENTS",
            "footer": "KAIROS · TRANSPARENT GIVING FOR NIGERIA",
            "stages": [
                ["Contributors", "Separate transfers", "Money sent"],
                ["Fundraiser", "Personal account", "Money received"],
                ["School", "One fee to settle", "Was the fee paid?"],
            ],
            "statement": "Money collected is one step. The destination is a paid bill."},
    deck={"eyebrow": "THE PAYMENT CHALLENGE",
          "lead": "The missing link is between money collected and the bill it was meant to pay.",
          "cards": [
              {"tag": "01", "title": "A real need", "body": "A school fee or hospital bill is shared with supporters."},
              {"tag": "02", "title": "A transfer succeeds", "body": "The money reaches the fundraiser's account."},
              {"tag": "03", "title": "The bill is still unclear", "body": "Funds can be diverted before the intended provider is paid."}],
          "band": "A successful transfer is not proof that the need was met."},
)
SLIDES[2].update(
    title="Our solution: one bill, every contribution accounted for",
    paragraphs=[
        "Kairos is that trusted middle layer. It is a payment system for crowdfunding, designed to route money safely from the people contributing to the school, hospital or supplier that should be paid.",
        "We bring existing payment services together in one controlled flow: collect contributions, hold them for the stated bill, pay the institution and return each donor's receipt.",
        "How do we do this?",
        "First, the cause gets checked. The person raising money proves who they are. Then an AI interviewer takes them through it. What happened, when, which hospital. It builds an itemised budget naming the school, hospital or supplier that should be paid.",
        "Second, every cause is just an ordinary link shared on social media. Anyone who opens it sees the story, the budget and the ledger. People contribute toward the same bill, and the money is held in escrow with a licensed partner, never in the organiser's personal account. Every contribution is recorded against that cause, so we know what is available to pay out.",
        "Third, funds leave escrow only toward those named, verified providers. The organiser can request a payment, but it must stay within the available balance and what that expense has left. Each payment is matched back to the budget and the contributions behind it, and goes into the public record.",
    ],
    cue="Need and budget, controlled provider payment, personal receipt. Licensed custody and live settlement are planned; today's demo shows the accounting and rules.",
    visual={"kind": "payment_flow", "eyebrow": "OUR SOLUTION",
            "title": "One bill, every contribution accounted for",
            "lead": "A crowdfunding payment is complete when the money reaches the need it was given for.",
            "brand_right": "FUTURE OF PAYMENTS",
            "footer": "KAIROS · TRANSPARENT GIVING FOR NIGERIA",
            "steps": [
                ["Collect contributions", "Each gift is linked to one cause."],
                ["Hold for the stated bill", "Available funds and the budget limit release."],
                ["Pay the institution", "Payment goes to the named provider."],
                ["Send donor receipts", "Each person sees their share of the payment."],
            ],
            "statement": "Route the money to the need. Return proof to every contributor.",
            "footnote": "Designed flow. Live custody and settlement remain to be integrated."},
    deck={"eyebrow": "THE SOLUTION",
          "lead": "Connect the contribution, the provider payment and each donor's own proof.",
          "cards": [
              {"tag": "01", "title": "Check the cause", "body": "Identity, AI-assisted intake and an itemised budget naming suppliers."},
              {"tag": "02", "title": "Share one clear link", "body": "Story, budget and public ledger. Donations are intended to stay in escrow."},
              {"tag": "03", "title": "Pay verified vendors", "body": "Release funds to named providers, with a receipt for every donor."}],
          "band": "The prototype demonstrates the flow. Live custody and settlement remain to be integrated."},
)
SLIDES[3]["paragraphs"][0] = "A donor doesn't just get a thank you, they get a receipt which tells them exactly what their money was used for"
SLIDES[3]["paragraphs"].append(
    "We calculate each donor's share of the payment and attach the receipt. It connects what they gave to the bill it helped pay, so they can see that their money reached the need it was given for."
)
SLIDES[4].update(
    title="What we can show you today.",
    paragraphs=[
        "Here is where we are today. The accounting, budget checks, donor shares, notifications and public history are running in the app. People can also upload supporting documents when creating a cause or come back to add them later.",
        "Bank transfer, Remita settlement and NIN lookup are simulated. CAC, account-name and automated evidence checks are not built, and no real donations have moved.",
        "We'd start with school fees, then hospital bills. And looking ahead, someone abroad should be able to help pay the same bill alongside supporters here in Nigeria, with the institution paid directly and each person getting proof of their share. In time, that could include funding in dollars or stablecoins, while the bill and each donor's share are accounted for in naira.",
        "We aim to cover running costs through donations and NGO grants. Without that support, our tentative fallback is two percent upkeep, capped at five thousand naira per cause.",
        shared.SLIDES[8]["paragraphs"][0],
    ],
    cue="Show the working app next. International funding is proposed, not built. NGO support is not secured; the upkeep policy remains tentative. Say all three simulated parts clearly.",
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
# Rehearsal plan: 10:25, including the separate current 4:12 recording.
# The Grand Finale allows 12 minutes plus a separate five-minute Q&A.
for section, seconds in zip(SLIDES, [40, 60, 90, 30, 100, 264, 12, 29]):
    section["seconds"] = seconds
SLIDES[-1]["paragraphs"] = [
    "Kairos is a payment system for crowdfunding. It routes contributions toward the need they were given for, with a record connecting each donor to the provider's payment.",
    "That is the future we want to build: people can help from wherever they are and see what their money paid for. Thank you so much. We're Team Kairos.",
]
SLIDES[-1]["cue"] = "Thank them, then stop. The demo has already played."


def slides_for_presenter(presenter):
    return [dict(section, speaker=PRESENTERS[presenter]["name"], paragraphs=[
        shared.paragraph_for_presenter(p, presenter) for p in section["paragraphs"]
    ]) for section in SLIDES]


shared_paragraphs = shared.shared_paragraphs
DEMO = deepcopy(shared.DEMO)
SHORT_PITCH = [
    "Kairos is a payment system for crowdfunding. For us, the payment is complete when the money reaches the need it was given for. Think of a school-fee appeal shared on WhatsApp: many people make separate transfers, but the fundraiser receiving money does not tell them that the school was paid.",
    "On Kairos, the organiser publishes an itemised budget naming the school, hospital or supplier. People contribute toward the same bill. In the intended live flow, a licensed partner holds the money and pays only those providers, within the budget. Each donor receives a receipt showing their own share of the payment.",
    "The accounting, budget checks, donor attribution, document uploads and notifications are working. Bank transfer, Remita settlement and NIN lookup are simulated; independent verification and licensed custody still need connecting.",
    "We'd start with school fees. Looking ahead, supporters abroad could help pay the same bill alongside people here in Nigeria, with each person receiving proof of their share. That funding connection is proposed.",
]

EVENTS = [deepcopy(shared.EVENTS[0])]
EVENTS[0].update(
    schedule=[
        "Grand Finale: Saturday, 21 November 2026 at UNILAG. Kairos is one of the final five.",
        "12 minutes to present, followed by five minutes of Q&A. Timing is strict.",
        "Submit the final deck and/or demo links by Friday, 20 November, noon WAT: https://forms.gle/Uns2hbKPQmXq88TL9.",
        "Abigail accepted the spot by email on 17 November at 11:41. All team members are encouraged to attend.",
        "Complete Cleva account verification before the event; referral code UNILAG. Completion is not confirmed in these notes.",
    ],
    assess="The finale asks for the problem, solution, tangible prototype progress and vision. The earlier Office Hours emphasis on practical execution still informs this presentation.",
    spoken="Kairos makes crowdfunding transparent by controlling the flow of money: contributions toward a named bill, provider payments within its budget and a receipt for each donor's own share.",
    notice="Grand Finale: the flow of money is the thread.",
    notice_detail="The 12-minute presentation limit and five-minute Q&A are confirmed. The existing recording is unchanged while the next demo is discussed.",
    follow_up="First confirm donation-platform eligibility, account structure and integration access with Cleva. No live collection, Cleva API, stablecoin integration or custody partnership is established by this prototype.",
)

GROUPS = deepcopy([group for group in shared.GROUPS if group[0] != "APWEN focus"])
# Keep question IDs and saved stars stable while aligning the payment answer.
for _, rows in GROUPS:
    for index, row in enumerate(rows):
        if row[0] == "Why does this belong in a payments hackathon?":
            rows[index] = (row[0], "Kairos controls how a group of contributions becomes a provider payment. It links the published bill and budget to the available balance, restricts recorded payouts to budget items and gives each contributor a receipt for their share. The intended live flow enforces those restrictions through a licensed custody/payment partner. Our prototype demonstrates the accounting and rules; real settlement still needs integration.", *row[2:])
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
<p><a href="https://www.getcleva.com/blog/cleva-and-tether-launch-campus-initiative-to-empower-the-next-generation-with-digital-finance-education" target="_blank" rel="noopener">Official Campus Storm context</a>
connects practical financial innovation with digital finance and global payments. Our proposed overseas funding flow builds on the same bill, payment controls and donor receipt. It is not a completed integration.</p>
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
    "header": "Cleva × Tether\nGrand Finale · Future of Payments",
    "description": "Kairos is a payment system for crowdfunding, designed to route contributions to the stated need and return each donor's receipt. Cleva Grand Finale script for Abigail or Miracle.",
    "hero_kicker": "Crowdfunding payments",
    "hero_title": "The payment is complete when the need is paid for.",
    "hero_status": "Grand Finale · 12 min + 5 min Q&A",
    "footer": "Abigail + Miracle · Cleva Grand Finale",
    "prep_kicker": "Cleva × Tether · 21 November 2026 · UNILAG",
    "prep_title": "Follow the payment all the way to the need.",
    "prep_intro": "Keep the school-fees story. Establish early that receiving contributions is one step: the intended payment ends with the institution paid. Show how Kairos is designed to control that route and return proof to each donor.",
    "script_title": "Kairos: Cleva Grand Finale script",
    "script_intro": "Either presenter can deliver the whole pitch. The current plan is 10:00 including the unchanged 3:47 recording, within the confirmed 12-minute presentation limit. Five minutes of Q&A follow separately. The script keeps the school-fees story and follows contributions through provider payment to each donor's receipt. International funding remains proposed; the demo will be discussed separately.",
    "qa_title": "Kairos: 110 questions for the Cleva pitch",
    "qa_intro": "Start with the priority questions, then the Cleva integration topic. Distinguish the working prototype from the proposed international funding connection. No Cleva approval, API access, stablecoin integration or custody partnership is claimed.",
    "qa_page_intro": "110 questions, including ten on the proposed Cleva connection. Start with those marked Rehearse first, then practise the eligibility, custody and integration questions.",
    "event_title": "Kairos: Cleva Grand Finale preparation",
    "event_intro": "The Grand Finale is at UNILAG on 21 November. The current rehearsal plan is 10:00 including the existing recording, against a strict 12-minute limit plus five minutes Q&A. Materials are due at noon WAT on 20 November. These are preparation notes, not extra spoken sections.",
    "focus_note": "A proposed connection for supporters abroad, subject to Cleva confirming eligibility and access. Licensed custody remains a separate requirement.",
    "source_note": "Prepared from the 17 November finale email, the reported Office Hours feedback, Abigail's voice note and the existing Kairos/JCI script. Campus Storm context was checked on 17 November; integration research remains dated 12 November.",
    "notes_note": "Use this updated browser/Markdown script for the finale. Native deck downloads retain the earlier slides and notes. The recording is unchanged.",
    "timing_note": "10:00 including the existing 3:47 recording. The confirmed limit is 12 minutes, followed by five minutes Q&A. Keep the two-minute margin; the demo is unchanged for now.",
    "prep_timing_note": "Rehearse below the confirmed 12-minute limit. Q&A has its own five-minute slot. The recording is unchanged while the next demonstration is discussed.",
    "demo_kicker": "Evidence of execution",
    "demo_title": "Show the working flow.",
    "demo_intro": "The same 3:47 recording is in slide 6, before Team and Thank You. It demonstrates the existing prototype rather than a Cleva integration.",
    "demo_notice": "Working prototype with demo data. Bank transfer, Remita settlement and NIN lookup are simulated. Independent verification and live custody still need integration.",
    "criteria": [["Problem", "Slide 2"], ["Solution and uniqueness", "Slides 3 and 4"],
                 ["Progress and vision", "Slide 5"], ["Demonstration", "Slide 6"], ["Team and closing", "Slides 7 and 8"]],
    "checklist": [
        "Confirm arrival time and presentation setup at UNILAG for 21 November.",
        "Check event registration and the Cleva KYC instructions from the invitation.",
        "Choose Abigail or Miracle and download that presenter's Cleva script.",
        "Rehearse the 10:00 plan within the 12-minute limit, with five minutes Q&A separate.",
        "Ask whether the giving flow is eligible and what integration access could be available.",
        "Explain that custody needs a separate licensed arrangement and the connection is unbuilt.",
        "Open the Cleva deck, test its embedded video and share computer sound. Keep the MP4 as a backup.",
        "Submit the final presentation by noon WAT on 20 November: https://forms.gle/Uns2hbKPQmXq88TL9.",
        "Practise the payment-solution answer and the proposed overseas funding flow.",
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

# Canonical stage identity. Native previews/video retain their existing immutable paths.
PAGE.update(canonical_path="/cleva-finale.html")
SOURCES_HTML = SOURCES_HTML.replace('pitch-assets/cleva/sources.md', 'pitch-assets/cleva-finale/sources.md')

# Finale-specific questions. Preliminary questions and stage source stay untouched.
from cleva_finale_qa import build_qa
GROUPS, QUESTIONS = build_qa(QUESTIONS)
PAGE.update(
    qa_title=f"Kairos: {len(QUESTIONS)} questions for the Cleva Grand Finale",
    qa_intro="Rehearse the Cleva payment case first, then the proposed funding connection, external settlement, controls and pilot. Retained questions keep their saved IDs; new questions have independent IDs.",
    qa_page_intro=f"{len(QUESTIONS)} questions for the Cleva judges: payments, Cleva/Tether, overseas funding, donor proof and execution. Start with Rehearse first.",
    source_note="Finale logistics and script follow the supplied organizer email and user's wording. Cleva Business, activity restrictions and stablecoin policy were checked on 18 November 2026. Proposed integrations remain unapproved and unbuilt.",
)
SOURCES_HTML = '''<section class="prepbox"><h2>Cleva sources and open integration questions</h2><p><a href="https://www.getcleva.com/business" target="_blank" rel="noopener">Cleva Business</a> describes international account/funding features. Our use case, account model and access still need agreement.</p><p><a href="https://www.getcleva.com/legal/global/stablecoin-policy" target="_blank" rel="noopener">Stablecoin policy</a> describes conversion of approved stablecoin deposits to USD. It does not establish Kairos escrow.</p><p>Clarify the <a href="https://www.getcleva.com/legal/global/prohibited-countries-and-activities" target="_blank" rel="noopener">applicable activity restrictions</a> directly before planning live collection. Competition selection is separate from integration approval.</p><p><a href="pitch-assets/cleva-finale/sources.md" download>Sources and proposed flow ↓</a></p></section>'''
RESEARCH_NOTES = '''# Cleva finale: sources and proposed connection

Checked 18 November 2026. This is preparation, not evidence of a signed or approved integration.

- [Cleva Business](https://www.getcleva.com/business): international account and funding capabilities. Developer access and the proposed use case remain unconfirmed.
- [Stablecoin policy](https://www.getcleva.com/legal/global/stablecoin-policy): approved deposits convert to USD. Do not describe this as Kairos holding an unconverted USDT escrow balance.
- [Activity restrictions](https://www.getcleva.com/legal/global/prohibited-countries-and-activities): clarify applicability to the intended transaction/account model directly.

Proposed flow: permitted overseas funding, actual conversion and net naira credit, cause accounting, licensed provider settlement and the contributor's receipt. Account ownership, custody, references, confirmations, charges, failures and refunds need agreement. The built prototype has no Cleva or stablecoin integration.
'''

# The current native edition follows the JCI finale's visual template. Keep the
# archived preliminary/shared native deck and its recording unchanged.
META['version'] = 'cleva-finale-jci-style-2026-11-19'
SLIDES[5].update(
    video_seconds=VIDEO_SECONDS,
    cue='Share computer sound. Play the accompanying 4:12 clear-voice recording once. The Progress section distinguishes working code from the intended checks in the recording. After it ends, move to Team, then Thank You. Do not narrate over the recording.',
)
PAGE.update(
    web_deck=True,
    native_slides=True,
    deck_base='pitch-assets/cleva-finale/deck',
    deck_pdf='pitch-assets/cleva-finale/deck/Cleva-Finale-JCI-Style.pdf',
    deck_pptx='pitch-assets/cleva-finale/deck/Cleva-Finale-JCI-Style.pptx',
    deck_title='Kairos: Cleva Grand Finale',
    local_demo=True,
    demo_url='',
    demo_name='kairos-cleva-narrated-clean-audio.mp4',
    demo_poster='pitch-assets/cleva-finale/deck/slides/slide06.jpg',
    separate_demo_script='pitch-assets/cleva-finale/demo-voiceover-cleva.md',
    separate_demo_pdf='pitch-assets/cleva-finale/demo-voiceover-cleva.pdf',
    separate_demo_subtitles='pitch-assets/cleva-finale/kairos-cleva-narrated-clean-audio.srt',
    separate_demo_webvtt='pitch-assets/cleva-finale/kairos-cleva-narrated-clean-audio.vtt',
    script_intro="Either presenter can deliver the whole pitch. The current plan is 10:25 including the 4:12 narrated recording, within the 12-minute presentation limit. Five minutes of Q&A follow separately. The familiar school-fees story follows contributions through provider payment to each donor's receipt.",
    notes_note='The JCI-style PowerPoint/PDF and browser previews share the current finale text. Select the accompanying clear-voice MP4 in the Demo tab before presenting.',
    timing_note='10:25 including the 4:12 recording. The confirmed presentation limit is 12 minutes, with five minutes of Q&A separately.',
    prep_timing_note='Rehearse the 10:25 plan below the 12-minute limit. The accompanying recording stays at normal recorded voice speed.',
    event_intro='Grand Finale at UNILAG on 21 November. Current rehearsal plan: 10:25 including the accompanying narrated demo. The strict limit is 12 minutes plus five minutes of Q&A. Materials are due at noon WAT on 20 November.',
    event_download_note='Current JCI-style finale deck and speaker notes. The preliminary deck and earlier recordings remain preserved.',
    demo_title='One bill, from the interview to the receipt',
    demo_intro='Select the accompanying clear-voice MP4, then play it in full on slide 6 before Team and Thank You.',
)
PAGE['checklist'] = [
    text.replace('the 10:00 plan', 'the 10:25 plan').replace(
        'Open the Cleva deck, test its embedded video and share computer sound. Keep the MP4 as a backup.',
        'Open the JCI-style finale deck and select the accompanying clear-voice MP4 in the Demo tab. Test playback and computer sound before presenting.')
    for text in PAGE['checklist']
]
