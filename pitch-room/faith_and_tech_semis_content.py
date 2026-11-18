"""Proposed Faith & Tech semi-final HTML deck, separate from submitted materials."""
from copy import deepcopy
import cleva_content as shared

META = {
    "title": "Kairos | Faith & Tech Semi-final",
    "event": "Faith & Tech Hackathon",
    "stage": "Semi-final · proposed presentation",
    "team": "Sokenu Abigail · Ndujekwu Ugochukwu",
    "date": "19 November 2026",
    "version": "faith-and-tech-semis-proposal-2026-11-18",
    "demo_url": "pitch-assets/cleva/demo.mp4",
}
PRESENTERS = {
    "abigail": {"name": "Abigail", "full_name": "Sokenu Abigail", "team_intro": "I'm Abigail, the team lead and product manager. Ugochukwu is our software engineer and CTO."},
    "ugochukwu": {"name": "Ugochukwu", "full_name": "Ndujekwu Ugochukwu", "team_intro": "I'm Ugochukwu, the software engineer and CTO. Abigail is our team lead and product manager."},
}
DEFAULT_PRESENTER = "abigail"
VIDEO_SECONDS = 227.033

SLIDES = [
    {"title": "Transparent crowdfunding", "deck_key": "cover", "seconds": 30,
     "paragraphs": [
         "Good day everyone. My name is {presenter_full_name}, presenting on behalf of Team Kairos.",
         "Kairos is a transparent crowdfunding platform created to solve the problem of trust when someone asks for help and several people donate their hard earned money. Every naira you give can be watched until it reaches the need it was given for.",
     ], "cue": "Keep the familiar voice. Introduce the trust problem before the mechanics.",
     "visual": {"kind": "cover", "eyebrow": "FAITH & TECH · SEMI-FINAL", "title": "KAIROS", "lead": "Transparent crowdfunding", "statement": "Follow the money until it pays for the need."}},
    {"title": "A real need. A reason to hesitate.", "deck_key": "problem", "seconds": 40,
     "paragraphs": [
         shared.SLIDES[1]["paragraphs"][0],
         "Even after giving, a transfer only tells you that an account was credited. It doesn't tell you whether the school fee or hospital bill was paid. Honest organisers also need a clear way to show supporters what happened.",
     ], "cue": "Use the original school-fees observation. It is an origin story, not a claim of completed user research.",
     "visual": {"eyebrow": "THE PROBLEM", "title": "What did my gift pay for?", "lead": "An appeal brings people together. The spending still needs an account.", "points": [("Before giving", "Can I understand the need and the bill?"), ("After giving", "Can I follow the payment to its purpose?")]}},
    {"title": "Our solution", "deck_key": "solution", "seconds": 45,
     "paragraphs": [
         "Kairos is that trusted middle layer. Here is how it's designed to work.",
         "First, an AI interviewer helps the organiser explain the need and publish an itemised budget naming the school, hospital or supplier. Supporting documents can be attached now or added later.",
         "People contribute through a shared link. In the intended live flow, a licensed partner holds the money and pays those providers directly, within the budget. The organiser can request payment, but cannot withdraw the money into a personal account.",
     ], "cue": "Separate the running accounting from the intended licensed custody and settlement arrangement.",
     "visual": {"eyebrow": "THE GIVING FLOW", "title": "A clear path from need to payment", "points": [("Publish", "The need, bill and named provider"), ("Fund", "Contributions against one budget"), ("Pay", "The provider, with a record for each donor")], "footnote": "Live custody and settlement require a licensed partner."}},
    {"title": "Every giver sees their own part", "deck_key": "receipt", "seconds": 35,
     "paragraphs": [
         "A donor doesn't just get a thank you, they get a receipt which tells them exactly what their money was used for.",
         "In the school-fee example, Abigail's one hundred and fifty-three thousand naira after upkeep is attributed to the school's three hundred thousand naira payment. She sees her own part, the institution and the payment reference.",
     ], "cue": "This is a worked example from the recorded flow, not evidence of a real institutional settlement.",
     "visual": {"kind": "receipt", "eyebrow": "THE DONOR'S VIEW", "title": "Your own share. Your own record.", "big": "₦153,000", "lead": "of Abigail's net contribution attributed to the school payment", "details": [("Institution", "University of Lagos"), ("Total bill", "₦300,000"), ("Evidence", "Payment reference and donor breakdown")], "footnote": "Worked example. Live provider confirmation remains to be connected."}},
    {"title": "When a check needs another look", "deck_key": "review", "seconds": 40,
     "paragraphs": [
         "An uncertain check should have a clear next step. If a payment reference has expired, the flow we propose pauses payment and lets the AI ask the organiser for a replacement.",
         "The replacement is checked against the same student, institution and bill. A mismatch, or something that cannot be verified, goes to a human reviewer who checks the evidence and records the decision before payment continues.",
     ], "cue": "This is the agreed proposed workflow. It has not been implemented; routine expiry is handled by the AI, with unresolved cases escalated to a person.",
     "visual": {"eyebrow": "PROPOSED EXCEPTION HANDLING", "title": "Pause, clarify, then decide", "points": [("Expired reference", "AI asks for a replacement"), ("Matching bill", "Recheck student, institution and amount"), ("Unresolved mismatch", "Human review with a recorded decision")], "footnote": "Planned workflow; the prototype does not yet implement this review process."}},
    {"title": "Proof with privacy", "deck_key": "privacy", "seconds": 35,
     "paragraphs": [
         "Public proof should not require someone to expose every private detail. The story, budget and payment history help supporters follow the cause. Sensitive identity and financial evidence needs restricted access and suitable public copies.",
         "Today, unpublished uploads are owner-only. Published attachments are viewable from the cause. Private evidence review and redaction are part of the work needed before using sensitive real documents.",
     ], "cue": "Explain the intended access boundary without claiming the current published-document route is confidential.",
     "visual": {"eyebrow": "PRIVACY DESIGN", "title": "A public account, with private evidence", "points": [("Public proof", "Story, budget and payment history"), ("Restricted review at launch", "Sensitive identity and unredacted evidence")], "footnote": "Today: draft uploads are owner-only; published attachments are public."}},
    {"title": "Every amount accounted for", "deck_key": "accounting", "seconds": 55,
     "paragraphs": [
         "Before anyone confirms, they see what they pay, the upkeep and what reaches the cause. Our proposed upkeep is two percent, capped at five thousand naira for the whole cause.",
         "In this example, three hundred and five thousand is paid, five thousand is upkeep and three hundred thousand goes toward the bill. The payment and each donor's receipt refer back to that same record. External provider confirmations would also need to match these records before a live payment is treated as settled.",
         "We aim to cover running costs through donations and NGO grants. Upkeep remains a tentative fallback, and that support is not yet secured.",
     ], "cue": "The table is a worked example of internal accounting. External settlement reconciliation and a grant-dependent fee switch are not implemented.",
     "visual": {"kind": "table", "eyebrow": "FEES AND PAYMENT RECORDS", "title": "From total paid to the school bill", "columns": ["Contributor", "Pays", "Upkeep", "To bill"], "rows": [["Okefe", "₦150,000", "₦3,000", "₦147,000"], ["Abigail", "₦155,000", "₦2,000", "₦153,000"], ["Total", "₦305,000", "₦5,000", "₦300,000"]], "footnote": "Working: internal accounting. Next: matching confirmed provider settlement."}},
    {"title": "What works and what we would test", "deck_key": "progress", "seconds": 30,
     "paragraphs": [
         "The interview, document uploads, accounting, budget checks, donor shares and notifications are running. Bank transfer, Remita settlement and NIN lookup are simulated. Independent verification and licensed custody still need connecting.",
         "We'd start a pilot with school fees and measure bills settled, whether donors understand their receipts and whether they choose to give again. Those are intended outcomes, not results we have already achieved.",
     ], "cue": "Do not invent interview findings or pilot metrics. Add actual dated user findings to the preparation notes when the team supplies them.",
     "visual": {"eyebrow": "PROGRESS AND NEXT STEP", "title": "A working flow. A focused first pilot.", "points": [("Running now", "Intake, uploads, accounting and donor updates"), ("Still to connect", "Live settlement, custody and independent checks"), ("Pilot focus", "School bills settled and donor understanding")]}},
    {"title": "Watch the giving flow", "deck_key": "demo", "seconds": 239, "video_seconds": VIDEO_SECONDS, "is_demo": True,
     "paragraphs": ["Now let us watch a demonstration of how the app works."],
     "cue": "This is the unchanged existing 3:47 recording. The preceding section states its integration limits. Final demo choice depends on the team's confirmed pitch allowance."},
    {"title": "The team", "deck_key": "team", "seconds": 12,
     "paragraphs": ["And this is the team. {presenter_team_intro}"],
     "cue": "Keep the Abigail/Ugochukwu team shown in the submitted Faith & Tech deck. This is independent of Cleva's Abigail/Miracle entry.",
     "visual": {"kind": "people", "eyebrow": "TEAM KAIROS", "title": "The people building Kairos", "people": [
         {"name": "Sokenu Abigail", "role": "Team Lead & Product Manager", "image": "pitch-assets/faith-and-tech-semis/portraits/abigail.jpg"},
         {"name": "Ndujekwu Ugochukwu", "role": "Software Engineer & CTO", "image": "pitch-assets/faith-and-tech-semis/portraits/ugochukwu.jpg"}]}},
    {"title": "Give with proof, not faith", "deck_key": "closing", "seconds": 9,
     "paragraphs": ["Kairos makes crowdfunding transparent by controlling the flow of money, from the need to the provider's payment and each donor's receipt. Thank you so much. We're Team Kairos."],
     "cue": "Thank them, then stop. Keep proposed integrations and review workflows distinct from the working prototype.",
     "visual": {"kind": "closing", "eyebrow": "KAIROS", "title": "Give with proof, not faith.", "lead": "Thank you.", "statement": "A clear account of what every gift helped pay for."}},
]

def paragraph_for_presenter(paragraph, presenter):
    p = PRESENTERS[presenter]
    return paragraph.format(presenter_full_name=p["full_name"], presenter_team_intro=p["team_intro"])

def slides_for_presenter(presenter):
    return [dict(s, speaker=PRESENTERS[presenter]["name"], paragraphs=[paragraph_for_presenter(p, presenter) for p in s["paragraphs"]]) for s in SLIDES]

def shared_paragraphs(section, markdown=False):
    result = []
    for p in section["paragraphs"]:
        if "{presenter_" in p:
            for key, person in PRESENTERS.items():
                label = f'As {person["name"]}:'
                result.append((f"**{label}** " if markdown else label + " ") + paragraph_for_presenter(p, key))
        else:
            result.append(p)
    return result

DEMO = deepcopy(shared.DEMO)
SHORT_PITCH = [
    "Kairos makes crowdfunding transparent by controlling the flow of money. An organiser publishes a need, a budget and the provider to be paid. Supporters contribute toward that bill, and each donor can follow their own share of the payment.",
    "The prototype demonstrates the interview, uploads, accounting, budget limits and donor receipts. The intended live flow uses licensed custody and direct provider settlement. Real payment and independent verification connections are still to be added.",
    "We would begin with a small school-fee pilot. Proposed exception handling asks for a replacement when a reference expires and escalates unresolved mismatches to a human reviewer. Privacy controls and external settlement reconciliation remain launch work.",
]
EVENTS = [{
    "name": "Faith & Tech semi-final", "focus": "Transparent giving and payment tracking",
    "schedule": ["19 November 2026, 6–8 p.m. WAT via Zoom is the session window.", "The team's assigned slot, joining link and per-team duration are not confirmed in the materials supplied.", "This proposed 9:30 rehearsal includes the current full recording; it is not an organizer-approved allowance."],
    "assess": "Judges praised the trust problem and concept clarity. They asked for practical flows, human handling of uncertainty, privacy, reconciliation, fees and evidence from potential users.",
    "spoken": "The need, the provider payment and each donor's receipt stay connected.",
    "follow_up": "Collect any actual donor/applicant/institution conversations already held. Record what was learned and what changed. No interview counts, quotes or outcomes have been invented in this draft.",
    "notice": "Proposed deck · timing unconfirmed", "notice_detail": "If the assigned slot is shorter, use the short explanation and agree a shorter demo. Preserve the original submission."}]

GROUPS = [
    ("The giving flow", [
        ("What does Kairos do?", "It connects a published need and budget to provider payments and each donor's share. The prototype implements the accounting and updates; live custody and settlement still require integration.", True),
        ("What stops the organizer withdrawing donations?", "The prototype has no personal cash-withdrawal path and checks payment permissions, balance and budget. Live operation needs a licensed custody/payment arrangement that enforces the same restrictions.", True),
        ("Does the receipt independently prove the school received money?", "The current receipt records a simulated application payout. A live settled receipt must be tied to confirmed provider settlement; a locally generated invoice alone is insufficient.", True),
        ("Can someone give without an account?", "Yes. Guest gifts are anonymous and appear in the public cause records. Signed-in donors can receive personal in-app updates; email is optional."),
    ]),
    ("Review and privacy", [
        ("What if a Remita reference expires?", "The agreed proposed flow pauses payout, asks the organizer through the AI for a replacement, verifies the same student, institution and bill, then continues. This is not yet implemented.", True),
        ("When does a human step in?", "The proposed workflow escalates a mismatch or an unresolved check. The reviewer checks evidence, records the decision and permits an appropriate next step. A dedicated reviewer workflow is not built.", True),
        ("Does AI authenticate documents or identify fraud?", "It helps structure the need and can discuss consistency. Uploads are accepted supporting material. Independent document authentication, image-reuse checks and live registry checks are not operational.", True),
        ("Who can view supporting files today?", "Unpublished files are owner-only. Files attached to published causes are publicly viewable through the app. Sensitive evidence needs a separate access/redaction design before live use.", True),
        ("Do you store a donor's or organizer's NIN?", "The current identity endpoint stores the simulated verification result and method, not the NIN number. This does not establish that live identity verification or a complete launch privacy program is in place."),
    ]),
    ("Fees and records", [
        ("How does the fee cap work?", "The current rule takes 2% of each gross gift until total upkeep reaches ₦5,000 for that cause. It is a per-cause cap. The charge and net cause credit are shown before confirmation.", True),
        ("How are donor shares calculated?", "The allocation uses the donor's net contribution after upkeep. In the full school-fee example, Abigail's ₦155,000 gross payment credits ₦153,000 and that net amount is attributed to the school's recorded payout.", True),
        ("Have you reconciled real bank payments?", "No. Internal balances and payment allocations run in the prototype. External reconciliation needs unique references and a match to confirmed provider settlement, including pending, failed and duplicate events.", True),
        ("Is NGO funding already secured?", "No. Donations and NGO grants are the intended primary support, with tentative capped upkeep as a fallback. The prototype currently applies its upkeep rule; no grant-triggered switch or proven unit economics is claimed."),
        ("Are refunds implemented?", "A complete production refund and dispute process is still to be designed and integrated. The prototype does not prove that operation."),
    ]),
    ("Evidence and launch", [
        ("What user research supports this presentation?", "The supplied materials contain the team's school-fee observation, but no documented interview findings were provided for this draft. The team should add actual dated findings and their design implications before claiming user validation.", True),
        ("What would the first pilot measure?", "Start with school-fee bills settled, donor understanding of receipts, unresolved payment issues and repeat giving. These are proposed measures, not completed pilot results."),
        ("What remains before live donations?", "Licensed custody and live payments, independent verification, appropriate private-evidence controls, external reconciliation and an exception/refund process. No signed custody partnership is claimed.", True),
        ("How long is this pitch allowed to be?", "Only the 6–8 p.m. Zoom session window has been supplied. Per-team duration is unconfirmed. The displayed 9:30 is a proposed rehearsal estimate including the existing recording."),
    ]),
]
QUESTIONS = []
for category, rows in GROUPS:
    for question, answer, *priority in rows:
        QUESTIONS.append(dict(id=f"q{len(QUESTIONS)+1:03d}", category=category, question=question, answer=answer, priority=bool(priority and priority[0])))

PAGE = {
    "web_deck": True,
    "canonical_path": "/faith-and-tech-semis.html",
    "deck_base": "pitch-assets/faith-and-tech-semis",
    "demo_url": "pitch-assets/cleva/demo.mp4",
    "demo_poster": "pitch-assets/cleva/deck/slides/slide06.jpg",
    "header": "Faith & Tech\\nSemi-final · proposed deck".replace("\\n", "\n"),
    "description": "Proposed Kairos Faith & Tech semi-final deck: the giving flow, review of uncertain checks, privacy, fees, reconciliation and pilot plans.",
    "footer": "Abigail + Ugochukwu · Faith & Tech semi-final",
    "hero_kicker": "Faith & Tech Hackathon · Semi-final",
    "hero_title": "Transparent crowdfunding, from the need to the receipt.",
    "hero_status": "Proposed deck · timing unconfirmed",
    "prep_kicker": "19 November 2026 · Zoom",
    "prep_title": "A clear flow, supported by evidence.",
    "prep_intro": "This proposed deck responds to the panel's feedback. The per-team duration and final demo choice remain open.",
    "script_title": "Kairos: proposed Faith & Tech semi-final script",
    "script_intro": "Proposed 9:30 rehearsal including the unchanged 3:47 recording; the organizer has not supplied a per-team limit in the materials available. Presenter/team options follow the submitted Faith & Tech deck: Abigail and Ugochukwu. New review, privacy and reconciliation designs are proposals, not completed capabilities.",
    "qa_title": "Kairos: Faith & Tech semi-final questions",
    "qa_intro": "Rehearse the feedback topics. Distinguish current accounting and uploads from proposed review/privacy operations and future external settlement.",
    "qa_page_intro": "Questions tailored to the panel's feedback on practical operation, human review, privacy, payment records and user evidence.",
    "event_title": "Kairos: Faith & Tech semi-final preparation",
    "event_intro": "Proposed deck only. The organizer's email confirms the session, not the duration of an individual pitch. The submitted application and original deck remain preserved.",
    "event_notice": "Proposed semi-final deck", "event_notice_detail": "Confirm the team's slot and adjust the recording before rehearsal.",
    "event_spoken_label": "The thread:",
    "event_download_note": "The HTML deck and Markdown scripts belong to this semi-final proposal.",
    "source_note": "Prepared from the submitted 02 Application, original two-person Faith & Tech deck, 15 November organizer feedback and current implementation notes. No user interview findings or pilot outcomes were supplied.",
    "source_html": "",
    "focus_label": "User evidence:",
    "focus_note": "Still to add: actual dated conversations with donors, applicants or institutions and the resulting design choices. Do not present hypothetical findings as research.",
    "notes_note": "This is an HTML deck with a matching script. The submitted PDF/PPTX are separate historical materials.",
    "timing_note": "Proposed 9:30 including the existing recording. This is not a confirmed pitch allowance; shorten the route after receiving the team's slot.",
    "prep_timing_note": "The session is 6–8 p.m. WAT. Individual duration is unconfirmed. Keep the existing recording as a reference until the final demo is agreed.",
    "criteria": [["Problem and giving flow", "Slides 2–4"], ["Human review and privacy", "Slides 5–6"], ["Fees and reconciliation", "Slide 7"], ["Progress and pilot", "Slide 8"], ["Demo", "Slide 9"]],
    "checklist": [
        "Confirm the assigned Zoom slot, joining link, presentation length and Q&A allowance.",
        "Collect actual dated user-conversation findings and record what they changed in Kairos.",
        "Choose Abigail or Ugochukwu and download the matching script.",
        "Keep the expired-reference AI and human-review workflow labelled as planned until implemented.",
        "Use documents appropriate for public display; published attachments are currently public.",
        "Explain the gross contribution, upkeep and net cause credit using the same worked example.",
        "Agree the final demo length after the timing guidelines arrive; preserve the submitted recording.",
    ],
}
