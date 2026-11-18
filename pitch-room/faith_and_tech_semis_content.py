"""Faith & Tech semifinal: a three-minute pitch with a separate demo.

Edit the slide text here, then rebuild this edition only. Original submissions
and the other competitions are deliberately independent.
"""

META = {'title': 'Kairos | Faith & Tech Semi-final',
 'event': 'Faith & Tech Hackathon',
 'stage': 'Semi-final',
 'team': 'Sokenu Abigail · Ndujekwu Ugochukwu',
 'date': '19 November 2026',
 'version': 'faith-and-tech-semis-3min-2026-11-18',
 'demo_url': ''}

PRESENTERS = {'abigail': {'name': 'Abigail',
             'full_name': 'Sokenu Abigail',
             'team_intro': "I'm Abigail, the team lead and product manager. Ugochukwu is our "
                           'software engineer and CTO.'},
 'ugochukwu': {'name': 'Ugochukwu',
               'full_name': 'Ndujekwu Ugochukwu',
               'team_intro': "I'm Ugochukwu, the software engineer and CTO. Abigail is our team "
                             'lead and product manager.'}}

DEFAULT_PRESENTER = 'abigail'

SLIDES = [{'title': 'Transparent crowdfunding',
  'deck_key': 'cover',
  'seconds': 25,
  'paragraphs': ['Good evening everyone. We are Team Kairos. Kairos is a transparent crowdfunding '
                 'platform created to solve the problem of trust when someone asks for help and '
                 'several people donate their hard earned money. Every naira you give can be '
                 'followed until it reaches the need it was given for.'],
  'cue': 'Introduce Kairos and the trust problem. The separate team introduction is outside this '
         'three-minute pitch.',
  'visual': {'kind': 'cover',
             'eyebrow': 'FAITH & TECH SEMI-FINAL',
             'title': 'KAIROS',
             'lead': 'Transparent crowdfunding',
             'statement': 'Every naira accounted for.'}},
 {'title': 'The trust gap',
  'deck_key': 'problem',
  'seconds': 30,
  'paragraphs': ['Think of a student who needs help with school fees. Someone shares her appeal on '
                 'WhatsApp. You want to help, but you still have questions. Is the bill real? How '
                 'much is actually owed? And after you give, how do you know the fees were paid? '
                 'That hesitation is the problem we are solving.'],
  'cue': 'A familiar scenario, not a claim that this example is a verified real case.',
  'visual': {'eyebrow': 'THE PROBLEM',
             'title': 'What did my gift pay for?',
             'lead': 'An appeal can reach you. A clear account of the spending often does not.',
             'points': [['Before giving', 'Can I understand the need and the bill?'],
                        ['After giving', 'Can I see what my contribution helped pay for?']]}},
 {'title': 'How Kairos works',
  'deck_key': 'solution',
  'seconds': 35,
  'paragraphs': ['How do we do this? An AI interviewer asks about the need, the institution, the '
                 'amount and supporting documents. That becomes a cause with an itemised budget '
                 'naming who should be paid. People contribute to that bill. The organiser can '
                 'request a provider payment, but there is no personal withdrawal. We make that '
                 'possible by controlling the flow of money.'],
  'cue': 'Explain the working application flow. Live custody and settlement need a licensed '
         'partner.',
  'visual': {'eyebrow': 'THE GIVING FLOW',
             'title': 'The need, the bill and the receipt stay connected',
             'points': [['Explain the need', 'AI interview and supporting evidence'],
                        ['Name the expense', 'An itemised budget and the intended provider'],
                        ['Give with a record',
                         'Track contributions, provider payment and donor shares']],
             'footnote': 'The organiser cannot withdraw contributions into a personal account.'}},
 {'title': 'Every giver sees their own part',
  'deck_key': 'receipt',
  'seconds': 35,
  'paragraphs': ["A donor doesn't just get a thank you, they get a receipt which tells them "
                 'exactly what their money was used for. In our school-fee example, each donor '
                 'sees their share of the three hundred thousand naira payment. Before giving, '
                 'they see the upkeep. Our tentative fallback is two percent, capped at five '
                 'thousand naira per cause, while we seek grants and sponsorship.'],
  'cue': 'Worked demo figures, not evidence of real institutional settlement. Grants and '
         'sponsorship are not secured.',
  'visual': {'kind': 'table',
             'eyebrow': "THE DONOR'S RECORD",
             'title': 'Your own share of the bill',
             'columns': ['Contribution', 'Paid', 'Upkeep', 'To bill'],
             'rows': [['Anonymous', '₦150,000', '₦3,000', '₦147,000'],
                      ['Abigail', '₦155,000', '₦2,000', '₦153,000'],
                      ['Total', '₦305,000', '₦5,000', '₦300,000']],
             'footnote': 'Proposed upkeep: 2%, capped at ₦5,000 per cause. Application payment '
                         'record shown.'}},
 {'title': 'Responsible operation',
  'deck_key': 'review',
  'seconds': 35,
  'paragraphs': ['The interview, uploads, ledger and donor alerts work today. Identity checks and '
                 'settlement in this demonstration are simulated. Before live use, we need '
                 'licensed partners, protected sensitive evidence and reconciliation with provider '
                 'confirmations. Published attachments are public today. In our planned flow, an '
                 'expired reference prompts the AI to request a replacement. Unresolved checks go '
                 'to a human reviewer before payment continues.'],
  'cue': 'These exception, private-review and external-reconciliation controls are planned. Do not '
         'imply that an unbuilt reviewer workflow appears in the recording.',
  'visual': {'eyebrow': 'CURRENT WORK AND NEXT CONTROLS',
             'title': 'A clear next step when a check is uncertain',
             'points': [['Working today', 'Live AI interview, document uploads, ledger and alerts'],
                        ['Before live operation',
                         'Licensed custody, private evidence and confirmed settlement'],
                        ['Planned review',
                         'Replacement reference first; human review for unresolved cases']],
             'footnote': 'Identity and settlement are simulated. Published attachments are '
                         'currently public.'}},
 {'title': 'A focused first pilot',
  'deck_key': 'closing',
  'seconds': 20,
  'paragraphs': ['Next, we want to test a small school-fee pilot with students, donors and an '
                 'institution, recording what they need and what we change. Nigerians already '
                 'give. Kairos helps them give with a clear account of what happened next. Thank '
                 'you.'],
  'cue': 'Proposed pilot, not completed research. Stop at three minutes; the demo is separate.',
  'visual': {'kind': 'closing',
             'eyebrow': 'NEXT STEP',
             'title': 'Giving people can follow',
             'lead': 'A small school-fee pilot with students, donors and a school.',
             'statement': 'Sokenu Abigail and Ndujekwu Ugochukwu\nTeam Kairos'}}]

DEMO = []

SHORT_PITCH = ['Kairos makes crowdfunding transparent. A published need and itemised budget name the provider to '
 'be paid; each donor can follow their own contribution through the cause records.',
 'The live AI interview, uploads, internal accounting and notifications work. Identity lookup and '
 'settlement in this demonstration are simulated; licensed partners and private evidence review '
 'are still needed.',
 'Our next step is a small school-fee pilot with students, donors and an institution, using actual '
 'findings to improve the flow.']

EVENTS = [{'name': 'Faith & Tech semi-final',
  'focus': 'Trust, accountability and responsible operation',
  'schedule': ['Thursday 19 November 2026, 6:30–6:45 p.m. WAT. Join by 6:25.',
               'One-minute team introduction, seven-minute presentation and demo, five-minute Q&A, '
               'two-minute scoring/transition.',
               'This deck uses a three-minute pitch clock. The presenter will decide the separate '
               'demo timing.'],
  'assess': 'Explain the problem, target users, working features, validation, technical '
            'feasibility, responsible innovation and next steps.',
  'spoken': 'Every donor should be able to follow what their contribution helped pay for.',
  'follow_up': 'Keep the Cleva payments narration separate. Add verified user findings if '
               'available; do not invent them.',
  'notice': 'Confirmed semi-final slot',
  'notice_detail': 'Meeting credentials stay in the private organizer PDF, not the public '
                   'presenter room.'}]

GROUPS = [('The giving flow',
  [('What does Kairos do?',
    "It connects a published need and budget to provider payments and each donor's share. The "
    'prototype implements the accounting and updates; live custody and settlement still require '
    'integration.',
    True),
   ('What stops the organizer withdrawing donations?',
    'The prototype has no personal cash-withdrawal path and checks payment permissions, balance '
    'and budget. Live operation needs a licensed custody/payment arrangement that enforces the '
    'same restrictions.',
    True),
   ('Does the receipt independently prove the school received money?',
    'The current receipt records a simulated application payout. A live settled receipt must be '
    'tied to confirmed provider settlement; a locally generated invoice alone is insufficient.',
    True),
   ('Can someone give without an account?',
    'Yes. Guest gifts are anonymous and appear in the public cause records. Signed-in donors can '
    'receive personal in-app updates; email is optional.')]),
 ('Review and privacy',
  [('What if a Remita reference expires?',
    'The agreed proposed flow pauses payout, asks the organizer through the AI for a replacement, '
    'verifies the same student, institution and bill, then continues. This is not yet implemented.',
    True),
   ('When does a human step in?',
    'The proposed workflow escalates a mismatch or an unresolved check. The reviewer checks '
    'evidence, records the decision and permits an appropriate next step. A dedicated reviewer '
    'workflow is not built.',
    True),
   ('Does AI authenticate documents or identify fraud?',
    'It helps structure the need and can discuss consistency. Uploads are accepted supporting '
    'material. Independent document authentication, image-reuse checks and live registry checks '
    'are not operational.',
    True),
   ('Who can view supporting files today?',
    'Unpublished files are owner-only. Files attached to published causes are publicly viewable '
    'through the app. Sensitive evidence needs a separate access/redaction design before live use.',
    True),
   ("Do you store a donor's or organizer's NIN?",
    'The current identity endpoint stores the simulated verification result and method, not the '
    'NIN number. This does not establish that live identity verification or a complete launch '
    'privacy program is in place.')]),
 ('Fees and records',
  [('How does the fee cap work?',
    'The current rule takes 2% of each gross gift until total upkeep reaches ₦5,000 for that '
    'cause. It is a per-cause cap. The charge and net cause credit are shown before confirmation.',
    True),
   ('How are donor shares calculated?',
    "The allocation uses the donor's net contribution after upkeep. In the full school-fee "
    "example, Abigail's ₦155,000 gross payment credits ₦153,000 and that net amount is attributed "
    "to the school's recorded payout.",
    True),
   ('Have you reconciled real bank payments?',
    'No. Internal balances and payment allocations run in the prototype. External reconciliation '
    'needs unique references and a match to confirmed provider settlement, including pending, '
    'failed and duplicate events.',
    True),
   ('Is NGO funding already secured?',
    'No. Donations and NGO grants are the intended primary support, with tentative capped upkeep '
    'as a fallback. The prototype currently applies its upkeep rule; no grant-triggered switch or '
    'proven unit economics is claimed.'),
   ('Are refunds implemented?',
    'A complete production refund and dispute process is still to be designed and integrated. The '
    'prototype does not prove that operation.')]),
 ('Evidence and launch',
  [('What user research supports this presentation?',
    "The supplied materials contain the team's school-fee observation, but no documented interview "
    'findings were provided for this draft. The team should add actual dated findings and their '
    'design implications before claiming user validation.',
    True),
   ('What would the first pilot measure?',
    'Start with school-fee bills settled, donor understanding of receipts, unresolved payment '
    'issues and repeat giving. These are proposed measures, not completed pilot results.'),
   ('What remains before live donations?',
    'Licensed custody and live payments, independent verification, appropriate private-evidence '
    'controls, external reconciliation and an exception/refund process. No signed custody '
    'partnership is claimed.',
    True),
   ('How long is this pitch allowed to be?',
    'The confirmed format is one minute for team introduction, seven minutes for presentation and '
    'demo, five minutes for Q&A and two minutes for scoring/transition. The user has allocated '
    'three minutes to the pitch; demo timing is separate.')])]

PAGE = {'web_deck': True,
 'canonical_path': '/faith-and-tech-semis.html',
 'deck_base': 'pitch-assets/faith-and-tech-semis',
 'header': 'Faith & Tech\nSemi-final',
 'description': 'Kairos Faith & Tech semi-final: a three-minute pitch about trust, transparent '
                'giving and responsible operation.',
 'footer': 'Abigail + Ugochukwu · Faith & Tech semi-final',
 'hero_kicker': 'Faith & Tech Hackathon · Semi-final',
 'hero_title': 'Transparent crowdfunding. Every naira accounted for.',
 'hero_status': 'Three-minute pitch · separate demo',
 'prep_kicker': '19 November 2026 · 6:30–6:45 p.m. WAT',
 'prep_title': 'Three minutes for the pitch.',
 'prep_intro': 'The user has allocated three minutes to the pitch and will determine the demo '
               'timing separately. The organizers allow seven minutes for presentation and demo '
               'combined.',
 'script_title': 'Kairos: Faith & Tech three-minute pitch',
 'script_intro': 'Six slides, three-minute delivery plan. The demo is separate and is not included '
                 'in this pitch clock. Use the separate four-part Faith & Tech/general narration '
                 'as a suggestion. Team introduction has its own one-minute slot.',
 'qa_title': 'Kairos: Faith & Tech semi-final questions',
 'qa_intro': 'Answers distinguish working features from planned exception handling, privacy '
             'controls and external settlement.',
 'qa_page_intro': 'Questions focused on trust, responsible operation and the judging feedback.',
 'event_title': 'Kairos: Faith & Tech semi-final preparation',
 'event_intro': 'Confirmed slot: Thursday 19 November, 6:30–6:45 p.m. WAT. Join by 6:25. '
                'One-minute introduction, seven-minute pitch and demo, five-minute Q&A, two-minute '
                'scoring/transition.',
 'event_notice': 'Three-minute pitch',
 'event_notice_detail': 'Demo timing remains with the presenter. The pitch clock excludes the '
                        'video.',
 'event_spoken_label': 'The thread:',
 'event_download_note': 'The current native PowerPoint/PDF and scripts are the three-minute '
                        'semi-final edition. The original application deck is preserved.',
 'source_note': 'Prepared from the 18 November presentation-details email, the 15 November panel '
                'feedback, the original submitted Faith & Tech deck, current product status and '
                'the four revised demo clips. No user research results have been invented.',
 'source_html': '',
 'focus_label': 'User evidence:',
 'focus_note': 'Add an actual dated donor, student or institution finding if available. The '
               'current pilot is a proposal; do not describe it as completed validation.',
 'notes_note': 'PowerPoint speaker notes and the browser script use the same six-slide text.',
 'timing_note': 'Three-minute pitch. Demo is separate.',
 'prep_timing_note': 'The user will decide the demo timing. The organizer’s combined seven-minute '
                     'allowance is recorded here for preparation.',
 'criteria': [['Problem and target users', 'Slides 1–2'],
              ['Working flow and donor proof', 'Slides 3–4'],
              ['Feasibility and responsible operation', 'Slide 5'],
              ['Validation and next step', 'Slide 6']],
 'checklist': ['Join the assigned Zoom waiting room by 6:25 p.m. WAT.',
               'Use the three-minute pitch; manage demo timing separately.',
               'Confirm screen sharing, sound and backup playback before the slot.',
               'Use the Faith & Tech/general four-part voiceover, rather than the longer payments '
               'version.',
               'Keep planned human review, reference replacement and private evidence controls '
               'clearly prospective.',
               'Use only real user findings if adding a validation claim.'],
 'shared_presenter_label': 'Abigail or Ugochukwu',
 'deck_pdf': 'pitch-assets/faith-and-tech-semis/deck/Faith-and-Tech-Semis-3min.pdf',
 'deck_pptx': 'pitch-assets/faith-and-tech-semis/deck/Faith-and-Tech-Semis-3min.pptx',
 'separate_demo_script': 'pitch-assets/faith-and-tech-semis/demo-voiceover-faith-and-tech-general.md'}

def paragraph_for_presenter(paragraph, presenter):
    return paragraph


def slides_for_presenter(presenter):
    return [dict(s, speaker=PRESENTERS[presenter]["name"],
                 paragraphs=list(s["paragraphs"])) for s in SLIDES]


def shared_paragraphs(section, markdown=False):
    return list(section["paragraphs"])


QUESTIONS = []
for category, rows in GROUPS:
    for question, answer, *priority in rows:
        QUESTIONS.append(dict(
            id=f"q{len(QUESTIONS)+1:03d}", category=category,
            question=question, answer=answer, priority=bool(priority and priority[0]),
        ))
