"""Faith & Tech revised ten-slide draft. Edit this source, not generated HTML.

Shared /pitch.html sources remain frozen. Timing is unset.
"""

META = {'title': 'Kairos | Faith & Tech Semi-final',
 'event': 'Faith & Tech Hackathon',
 'stage': 'Semi-final',
 'team': 'Sokenu Abigail · Ndujekwu Ugochukwu',
 'date': '19 November 2026',
 'version': 'faith-and-tech-semis-concise-draft-2026-11-19',
 'demo_url': ''}

PRESENTERS = {'abigail': {'name': 'Abigail',
             'full_name': 'Sokenu Abigail',
             'team_intro': 'Sokenu Abigail is our team lead and product manager, coordinating product '
                           'priorities and the user journey. Ndujekwu Ugochukwu is our software engineer and '
                           'CTO, leading technical implementation and integration work.'},
 'ugochukwu': {'name': 'Ugochukwu',
               'full_name': 'Ndujekwu Ugochukwu',
               'team_intro': 'Sokenu Abigail is our team lead and product manager, coordinating product '
                             'priorities and the user journey. Ndujekwu Ugochukwu is our software engineer '
                             'and CTO, leading technical implementation and integration work.'}}

DEFAULT_PRESENTER = 'ugochukwu'

SLIDES = [{'title': 'Transparent giving for Nigeria',
  'seconds': 0,
  'cue': 'Introduce yourself, then let the promise of traceable giving land.',
  'paragraphs': ['Good evening everyone, my name is Ndujekwu Ugochukwu presenting on behalf of Team Kairos.',
                 'Kairos is a transparent crowdfunding platform for people who want to help but need to know '
                 'what happened to their money. Here, every naira you give can be traced until it reaches '
                 'the need it was given for.'],
  'deck_key': 'cover',
  'shared_slide_number': 1},
 {'title': 'A transfer succeeds. The doubt stays.',
  'seconds': 0,
  'cue': 'Tell the school-fees story in your own voice. Leave a pause before the trusted middle layer.',
  'paragraphs': ["Our school fees went up recently and a final year student who couldn't afford it posted an "
                 "appeal so he wouldn't drop out. People gave. But then more posts appeared and my friends "
                 'and I started to wonder if they were all real, because the screenshots looked identical '
                 'and very easy to edit.',
                 'Because of this skepticism, potential donors hold back and real needs go unmet. The '
                 "missing piece is not compassion. It's a trusted middle layer."],
  'deck_key': 'problem',
  'shared_slide_number': 2},
 {'title': 'From a published budget to a personal receipt.',
  'seconds': 0,
  'cue': 'The case, the provider payment, the receipt. Describe licensed custody as the intended live flow.',
  'paragraphs': ['Kairos is that trusted middle layer.',
                 'First, an AI interviewer helps the organizer explain the need and publish an itemised '
                 'budget naming the school, hospital or supplier.',
                 'Second, the cause is shared as a link, so donors can see the story, budget and payment '
                 'history. The plan is for a licensed partner to hold donations in escrow and pay only those '
                 "verified providers, never the organizer's personal account.",
                 'Third, every donor gets a receipt showing their own share of each payment.'],
  'deck_key': 'solution',
  'shared_slide_number': 3},
 {'title': 'What runs today.',
  'seconds': 0,
  'cue': 'Say all three simulated parts. A seeded balance is not a bank balance.',
  'paragraphs': ['The accounting, donor shares, notifications and public ledger are running.',
                 'Bank transfer, Remita settlement and NIN lookup are simulated. CAC and account-name checks '
                 'are not built. No real donations have moved, and no custody partner is signed.'],
  'deck_key': 'prototype',
  'shared_slide_number': 5},
 {'title': 'Useful to give. Sustainable to run.',
  'seconds': 0,
  'cue': 'NGO donations and grants are intended support, not secured funding. The upkeep is a tentative '
         "fallback; its cap is per cause. The prototype's fee flow does not implement a grant-dependent "
         'switch.',
  'paragraphs': ['Kairos is built to be run, not sold.',
                 'We aim to cover running costs through donations and grants from NGOs. Without that '
                 "support, we'd tentatively take two percent per donation, capped at five thousand naira per "
                 'cause. Donors see the fee before confirming.'],
  'deck_key': 'business',
  'shared_slide_number': 6},
 {'title': 'Start with a bill that can be checked.',
  'seconds': 0,
  'cue': 'This is the launch sequence, not a completed pilot or signed partnership.',
  'paragraphs': ["We start with school fees because they're easy to verify in Nigeria.",
                 'Then we plan to move to hospitals and other service providers.'],
  'deck_key': 'roadmap',
  'shared_slide_number': 7},
 {'title': 'Technical approach and responsible operation',
  'deck_key': 'technical_responsible',
  'seconds': 0,
  'paragraphs': ['Next.js and TypeScript run the app, Anthropic powers the interview, MongoDB stores the '
                 'cause and transaction records, and Cloudinary stores supporting files. The AI structures '
                 'the need and budget. The server checks payment permissions, the available balance and '
                 'budget limits, then calculates each donor’s share.',
                 'Before handling real money, we need licensed custody, live identity and provider checks, '
                 'and confirmed settlement. No custody partnership is signed today.',
                 'In our planned review flow, an expired payment reference pauses the payout. The AI asks '
                 'for a replacement, which must match the same student, institution, bill and outstanding '
                 'amount. Uncertain checks go to a human reviewer, who confirms the evidence and records a '
                 'decision before payment continues.',
                 'Draft evidence is owner-only, but published attachments are public today. Private review, '
                 'redacted public proof, consent and clear access and retention rules are still needed to '
                 'protect donors and recipients.',
                 'For reconciliation, we would match each unique payout reference, amount and destination to '
                 'the provider’s confirmed settlement. Uncertain responses stay pending, repeated '
                 'notifications must not create duplicate payments, and mismatches go to review. Only '
                 'confirmed settlement should produce the final paid status and donor receipt. External '
                 'reconciliation and the dedicated review workflow remain to be built.'],
  'cue': 'Explain the working technical foundation, then the planned review, privacy and reconciliation '
         'controls. Keep their implementation status clear.'},
 {'title': 'Prototype demonstration',
  'deck_key': 'demo',
  'seconds': 216.333008,
  'paragraphs': ['Here is a demonstration of how the app works.'],
  'cue': 'Play the selected original-audio JCI recording in full, then advance to the closing.',
  'suggested_addition': True,
  'is_demo': True,
  'video_seconds': 216.333008},
 {'title': 'Give with proof, not faith',
  'deck_key': 'closing',
  'seconds': 0,
  'paragraphs': ['In short, Kairos turns charitable giving from an act of blind trust into one of complete '
                 "transparency. We don't claim fraud is impossible. We're building Kairos to make it "
                 'visible, traceable, capped and unprofitable.'],
  'cue': 'Deliver the closing, then advance to Meet the team.',
  'suggested_addition': True},
 {'title': 'Meet the team',
  'deck_key': 'team',
  'seconds': 0,
  'paragraphs': ["And this is the team. I'm Ugochukwu, the software engineer and CTO. Abigail is our team "
                 'lead and product manager.'],
  'cue': 'Keep the team introduction succinct. Leave this final slide visible for questions.',
  'suggested_addition': True}]

DEMO = []

SHORT_PITCH = ['Kairos connects a published need and itemised budget to provider payments and each donor’s own receipt.',
 'The prototype runs the AI interview, uploads, internal accounting and donor updates. Live custody, '
 'external verification and provider-confirmed settlement remain to be integrated.']

EVENTS = [{'name': 'Faith & Tech semi-final',
  'focus': 'Trust, accountability and responsible operation',
  'schedule': ['Thursday 19 November 2026, 6:30–6:45 p.m. WAT. Join by 6:25.',
               'One-minute team introduction, seven-minute presentation and demo, five-minute Q&A, '
               'two-minute scoring/transition.',
               'This revised ten-slide draft has no pitch-duration target. Set timing after rehearsal.'],
  'assess': 'Explain the problem, target users, working features, validation, technical feasibility, '
            'responsible innovation and next steps.',
  'spoken': 'Every donor should be able to follow what their contribution helped pay for.',
  'follow_up': 'Use the unchanged original-audio JCI recording. Technical approach and responsible-operation '
               'controls are combined on slide 7. The demo, closing and short team introduction follow.',
  'notice': 'Confirmed semi-final slot',
  'notice_detail': 'Meeting credentials stay in the private organizer PDF, not the public presenter room.'}]

GROUPS = [('The giving flow',
  [('What does Kairos do?',
    "It connects a published need and budget to provider payments and each donor's share. The prototype "
    'implements the accounting and updates; live custody and settlement still require integration.',
    True),
   ('What stops the organizer withdrawing donations?',
    'The prototype has no personal cash-withdrawal path and checks payment permissions, balance and budget. '
    'Live operation needs a licensed custody/payment arrangement that enforces the same restrictions.',
    True),
   ('Does the receipt independently prove the school received money?',
    'The current receipt records a simulated application payout. A live settled receipt must be tied to '
    'confirmed provider settlement; a locally generated invoice alone is insufficient.',
    True),
   ('Can someone give without an account?',
    'Yes. Guest gifts are anonymous and appear in the public cause records. Signed-in donors can receive '
    'personal in-app updates; email is optional.')]),
 ('Review and privacy',
  [('What if a Remita reference expires?',
    'The agreed proposed flow pauses payout, asks the organizer through the AI for a replacement, verifies '
    'the same student, institution and bill, then continues. This is not yet implemented.',
    True),
   ('When does a human step in?',
    'The proposed workflow escalates a mismatch or an unresolved check. The reviewer checks evidence, '
    'records the decision and permits an appropriate next step. A dedicated reviewer workflow is not built.',
    True),
   ('Does AI authenticate documents or identify fraud?',
    'It helps structure the need and can discuss consistency. Uploads are accepted supporting material. '
    'Independent document authentication, image-reuse checks and live registry checks are not operational.',
    True),
   ('Who can view supporting files today?',
    'Unpublished files are owner-only. Files attached to published causes are publicly viewable through the '
    'app. Sensitive evidence needs a separate access/redaction design before live use.',
    True),
   ("Do you store a donor's or organizer's NIN?",
    'The current identity endpoint stores the simulated verification result and method, not the NIN number. '
    'This does not establish that live identity verification or a complete launch privacy program is in '
    'place.')]),
 ('Fees and records',
  [('How does the fee cap work?',
    'The current rule takes 2% of each gross gift until total upkeep reaches ₦5,000 for that cause. It is a '
    'per-cause cap. The charge and net cause credit are shown before confirmation.',
    True),
   ('How are donor shares calculated?',
    "The allocation uses the donor's net contribution after upkeep. In the full school-fee example, "
    "Abigail's ₦155,000 gross payment credits ₦153,000 and that net amount is attributed to the school's "
    'recorded payout.',
    True),
   ('Have you reconciled real bank payments?',
    'No. Internal balances and payment allocations run in the prototype. External reconciliation needs '
    'unique references and a match to confirmed provider settlement, including pending, failed and duplicate '
    'events.',
    True),
   ('Is NGO funding already secured?',
    'No. Donations and NGO grants are the intended primary support, with tentative capped upkeep as a '
    'fallback. The prototype currently applies its upkeep rule; no grant-triggered switch or proven unit '
    'economics is claimed.'),
   ('Are refunds implemented?',
    'A complete production refund and dispute process is still to be designed and integrated. The prototype '
    'does not prove that operation.')]),
 ('Evidence and launch',
  [('What user research supports this presentation?',
    'The school-fee experience and a conversation with the past president of Ugochukwu’s department support '
    'the problem statement. He helps raise fees and reported that existing trust does not always make the '
    'details easy to verify. This is qualitative problem feedback, not a completed product test or a live '
    'pilot. No donor or institution usability findings have been supplied.',
    True),
   ('What would the first pilot measure?',
    'Start with school-fee bills settled, donor understanding of receipts, unresolved payment issues and '
    'repeat giving. These are proposed measures, not completed pilot results.'),
   ('What remains before live donations?',
    'Licensed custody and live payments, independent verification, appropriate private-evidence controls, '
    'external reconciliation and an exception/refund process. No signed custody partnership is claimed.',
    True),
   ('How long is this pitch allowed to be?',
    'The organizer’s format is one minute for team introduction, seven minutes for presentation and demo, '
    'five minutes for questions and two for scoring/transition. This expanded draft deliberately has no '
    'delivery schedule yet. Timing will be decided after the content is edited.')])]

PAGE = {'web_deck': True,
 'canonical_path': '/faith-and-tech-semis.html',
 'deck_base': 'pitch-assets/faith-and-tech-semis/concise-draft',
 'header': 'Faith & Tech\nSemi-final',
 'description': 'Kairos Faith & Tech semi-final: ten slides with the preserved opening, combined technical '
                'approach and responsible-operation section, selected JCI demo and concise closing.',
 'footer': 'Abigail + Ugochukwu · Faith & Tech semi-final',
 'hero_kicker': 'Faith & Tech Hackathon · Semi-final',
 'hero_title': 'Transparent crowdfunding. Every naira accounted for.',
 'hero_status': 'Revised draft · timing unset',
 'prep_kicker': '19 November 2026 · 6:30–6:45 p.m. WAT',
 'prep_title': 'Ten slides, ready for rehearsal',
 'prep_intro': 'The first six slides remain unchanged. Technical approach, review, privacy and '
               'reconciliation share one slide. The earlier validation and next-steps slides are removed.',
 'script_title': 'Kairos: Faith & Tech revised draft',
 'script_intro': 'Ten slides. The first six preserve the supplied script and selected shared-deck visuals. '
                 'Slide 7 combines the former 7–10. The demonstration, closing and succinct team '
                 'introduction follow, with Meet the team last. No delivery schedule is set.',
 'qa_title': 'Kairos: Faith & Tech semi-final questions',
 'qa_intro': 'Answers distinguish working features from planned exception handling, privacy controls and '
             'external settlement.',
 'qa_page_intro': 'Questions focused on trust, responsible operation and the judging feedback.',
 'event_title': 'Kairos: Faith & Tech semi-final preparation',
 'event_intro': 'Confirmed slot: Thursday 19 November, 6:30–6:45 p.m. WAT. Join by 6:25. One-minute '
                'introduction, seven-minute pitch and demo, five-minute Q&A, two-minute scoring/transition.',
 'event_notice': 'Revised ten-slide draft',
 'event_notice_detail': 'Timing remains unset. The selected JCI demo is unchanged.',
 'event_spoken_label': 'The thread:',
 'event_download_note': 'Current ten-slide editable PowerPoint, static PDF, standalone deck and matching '
                        'scripts. The earlier expanded edition is archived.',
 'source_note': 'Based on the user’s supplied script, frozen /pitch.html visuals, judging feedback and '
                'current product records. The closing and short team introduction follow the latest supplied '
                'wording.',
 'source_html': '',
 'focus_label': 'User evidence:',
 'focus_note': 'An early department-president conversation supports the need. Internal walkthroughs and '
               'isolated software checks are separate from product testing. No completed external usability '
               'study or live-money pilot is claimed.',
 'notes_note': 'Native speaker notes and browser scripts match. Default presenter: Ugochukwu.',
 'timing_note': 'Timing remains unset. The selected 3:36 demo is slide 8. The closing is slide 9 and Meet '
                'the team is slide 10.',
 'prep_timing_note': 'Set timing after the content is edited. The organizer’s format is retained only as '
                     'preparation context.',
 'criteria': [['Problem, solution and users', 'Slides 1–3, 5–6'],
              ['Working features and proposed upkeep', 'Slides 4–5'],
              ['Technical approach, feasibility and responsible operation', 'Slide 7'],
              ['Demonstration', 'Slide 8'],
              ['Closing', 'Slide 9'],
              ['Team', 'Slide 10']],
 'checklist': ['Test screen sharing and shared computer audio with the selected original-audio video.',
               'Check internet and keep the local PowerPoint, static PDF and original-audio MP4 available.',
               'Choose Ugochukwu or Abigail as lead and review the matching opening and short team '
               'introduction.',
               'Keep the implementation limits clear on slides 4 and 7. Review, private evidence and '
               'external reconciliation remain planned.',
               'Play the demo on slide 8, give the supplied closing on slide 9 and finish with Meet the team '
               'on slide 10.',
               'Set the delivery schedule after rehearsing the revised content.'],
 'shared_presenter_label': 'Abigail or Ugochukwu',
 'deck_pdf': 'pitch-assets/faith-and-tech-semis/concise-draft/Faith-and-Tech-Semis-Concise-Draft.pdf',
 'deck_pptx': 'pitch-assets/faith-and-tech-semis/concise-draft/Faith-and-Tech-Semis-Concise-Draft.pptx',
 'native_slides': True,
 'deck_title': 'Kairos: Faith & Tech semi-final',
 'unscheduled': True,
 'local_demo': True,
 'demo_name': 'kairos-jci-demo-original-audio.mp4',
 'demo_url': '',
 'demo_source': '/Users/ndujekwuugochukwu/Desktop/Kairos - JCI Final Demo/01 '
                'Compare/kairos-jci-demo-original-audio.mp4'}

def paragraph_for_presenter(paragraph, presenter):
    if presenter == 'abigail':
        paragraph = paragraph.replace('my name is Ndujekwu Ugochukwu presenting', 'my name is Sokenu Abigail presenting')
        paragraph = paragraph.replace("And this is the team. I'm Ugochukwu, the software engineer and CTO. Abigail is our team lead and product manager.", "And this is the team. I'm Abigail, the team lead and product manager. Ugochukwu is our software engineer and CTO.")
    return paragraph


def slides_for_presenter(presenter):
    return [dict(s, speaker=PRESENTERS[presenter]['name'],
                 paragraphs=[paragraph_for_presenter(p, presenter) for p in s['paragraphs']]) for s in SLIDES]


def shared_paragraphs(section, markdown=False):
    return list(section['paragraphs'])


QUESTIONS = []
for category, rows in GROUPS:
    for question, answer, *priority in rows:
        QUESTIONS.append(dict(id=f'q{len(QUESTIONS)+1:03d}', category=category,
                              question=question, answer=answer, priority=bool(priority and priority[0])))
