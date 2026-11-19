"""Faith & Tech expanded feedback draft. Edit this source, not generated HTML.

Shared /pitch.html sources remain frozen. No delivery schedule is set.
"""

META = {'title': 'Kairos | Faith & Tech Semi-final',
 'event': 'Faith & Tech Hackathon',
 'stage': 'Semi-final',
 'team': 'Sokenu Abigail · Ndujekwu Ugochukwu',
 'date': '19 November 2026',
 'version': 'faith-and-tech-semis-feedback-draft-2026-11-19',
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
 {'title': 'Technical approach and feasibility',
  'deck_key': 'technical',
  'seconds': 0,
  'paragraphs': ['Our technical approach separates collecting the story from controlling a payment. Next.js '
                 'and TypeScript run the web application. Anthropic powers the interview, MongoDB stores the '
                 'cause and transaction records, and Cloudinary stores supporting files.',
                 'The AI helps the organizer explain the need and structure the budget. The server checks '
                 'who can request a payout, the available cause balance and the remaining amount on that '
                 'budget item. It calculates each donor’s share of a recorded payment.',
                 'That gives us a working software foundation. To handle real money, we still need a '
                 'licensed custody arrangement, live identity and provider checks, and a payment integration '
                 'that confirms the institution actually received the money. None of those partnerships is '
                 'signed today.'],
  'cue': 'Explain what runs in the app and what must come from external partners. AI cannot authorize a real '
         'payment.',
  'suggested_addition': True},
 {'title': 'Human review and expired references',
  'deck_key': 'review',
  'seconds': 0,
  'paragraphs': ['Responsible innovation means deciding what happens when the system is uncertain, as well '
                 'as showing the successful journey. For example, a student’s payment reference may expire '
                 'before enough money has been raised.',
                 'Our proposed flow would pause the payout and ask the organizer, through the AI '
                 'interviewer, for a replacement. We would check that it still refers to the same student, '
                 'institution and bill, and confirm the outstanding amount.',
                 'If the details do not match, or an automated check remains uncertain, a human reviewer '
                 'would examine the evidence, contact the institution through independently obtained details '
                 'and record the decision. Payment would remain on hold until the issue is resolved. This '
                 'dedicated exception and review workflow is still to be built.'],
  'cue': 'This is the proposed exception flow, not a feature shown in the recording.',
  'suggested_addition': True},
 {'title': 'Privacy for donors and recipients',
  'deck_key': 'privacy',
  'seconds': 0,
  'paragraphs': ['Transparency should show how the money is used without exposing someone’s private life. In '
                 'the current app, unpublished supporting files are owner-only, but attachments on a '
                 'published cause are publicly viewable. A complete private-review process is not in place '
                 'yet.',
                 'Before a real pilot, we would separate evidence for reviewers from information donors need '
                 'to see. Identity documents, contact details and sensitive student or medical records would '
                 'need restricted access. The public page should show a clear budget, payment status and '
                 'suitable redacted proof, with the beneficiary’s consent.',
                 'We also need clear rules for who can access evidence, how long we retain it and how '
                 'someone requests correction or removal. A donor should be able to understand their '
                 'contribution without seeing another donor’s private contact details.'],
  'cue': 'Be direct about public attachments today. Private evidence, consent and retention controls are '
         'launch work.',
  'suggested_addition': True},
 {'title': 'Reconciliation with the payment provider',
  'deck_key': 'reconciliation',
  'seconds': 0,
  'paragraphs': ['Reconciliation is how we make sure Kairos’s records agree with what happened outside the '
                 'app. A payment entry in our own database is not enough to prove that the school has been '
                 'paid.',
                 'In the live flow, each payout would have a unique reference. We would match the partner’s '
                 'confirmed amount, destination and settlement status to the cause and budget item. A '
                 'delayed response would stay pending while we query its status, and repeated notifications '
                 'must not create a second payout.',
                 'Only a confirmed settlement should produce a final paid status and the donor’s settled '
                 'receipt. A mismatch would go to review with an audit trail. Today, the internal accounting '
                 'and donor allocations work, but settlement is simulated and this external reconciliation '
                 'still needs implementation.'],
  'cue': 'Keep the distinction between an internal application record and independently confirmed settlement '
         'clear.',
  'suggested_addition': True},
 {'title': 'Progress and validation so far',
  'deck_key': 'validation',
  'seconds': 0,
  'paragraphs': ['We have a working web prototype and have checked guest contributions, evidence uploads, '
                 'budget limits and donor allocations in isolated test flows. Our internal walkthroughs also '
                 'helped us improve the depth of the interview and when the face-verification step appears.',
                 'Those checks show that important parts of the software work. They do not tell us whether '
                 'donors understand the receipt, whether applicants can supply the right evidence, or '
                 'whether a school can support the settlement process.',
                 'The next validation step is to put those questions to potential donors, students and an '
                 'institution, then record what they find difficult and what we change. We have not '
                 'completed a live-money pilot. I will share one early conversation about the need after the '
                 'demo.'],
  'cue': 'Describe internal checks as software validation. The department president’s qualitative feedback '
         'comes after the demo.',
  'suggested_addition': True},
 {'title': 'Next steps toward a school-fee pilot',
  'deck_key': 'next_steps',
  'seconds': 0,
  'paragraphs': ['Our next step is a small, clearly defined school-fee pilot. We want to work with students '
                 'who have a verifiable bill, the people willing to support them and an institution that can '
                 'confirm the bill and payment destination.',
                 'Before collecting real donations, we need to agree the custody and settlement arrangement '
                 'with a suitable licensed partner and connect the provider checks. We also need the '
                 'private-evidence controls, human review and reconciliation process I have described, '
                 'including clear ownership of refunds and disputes.',
                 'We would first test the complete process without live funds, then run a consented pilot '
                 'once those conditions are met. We would record whether donors understand their receipts, '
                 'where applicants need help, and whether every payment matches the institution’s '
                 'confirmation. Those findings would guide our changes before we expand to other needs.'],
  'cue': 'This is a proposed pilot and integration sequence. No participants, dates or partnerships have '
         'been secured.',
  'suggested_addition': True},
 {'title': 'Prototype demonstration',
  'deck_key': 'demo',
  'seconds': 216.333008,
  'paragraphs': ['Let me show you how these pieces come together in the prototype: the organizer explains '
                 'the need, donors contribute toward the published budget, and a provider payment creates a '
                 'record of each donor’s share.',
                 'This recording uses demonstration data. Bank transfer, Remita settlement and NIN lookup '
                 'are simulated, and the external checks described in the narration represent the intended '
                 'live flow. The proposed human-review and reconciliation workflows are not shown.'],
  'cue': 'Play the supplied original-audio JCI video in full. Advance to the closing story, then finish on '
         'Meet the team.',
  'suggested_addition': True,
  'is_demo': True,
  'video_seconds': 216.333008},
 {'title': 'We are Team Kairos',
  'deck_key': 'closing',
  'seconds': 0,
  'paragraphs': ['One early conversation that stayed with me was with the past president of my department. '
                 'He helps raise school fees for students and explained that, even though there is already a '
                 'level of trust in the community, he sometimes has a hard time verifying the details behind '
                 'a request.',
                 'That concern is exactly where Kairos could help: giving the person raising support a '
                 'clearer way to check the bill, and giving donors a record they can follow. This is early '
                 'feedback about the problem, and we still need to test the product with people in that '
                 'position.',
                 'We are Team Kairos, and we look forward to working with students, donors and institutions '
                 'to turn that existing willingness to help into support that people can account for. Thank '
                 'you. Let me leave you with the people behind the work.'],
  'cue': 'Tell the department president’s story immediately after the demo, on this closing page. Do not '
         'invent a product endorsement or a pilot result.',
  'suggested_addition': True},
 {'title': 'Meet the team',
  'deck_key': 'team',
  'seconds': 0,
  'paragraphs': ['Sokenu Abigail is our team lead and product manager. Her role is to coordinate the team, '
                 'set product priorities and keep the work connected to the people we are building for. She '
                 'helps translate the problem into a clear user journey and makes sure we are solving the '
                 'right needs as the product develops.',
                 'I am Ndujekwu Ugochukwu, our software engineer and CTO. My role is to lead the technical '
                 'implementation: connecting the AI interview to the application, building the records and '
                 'payment-accounting logic, and developing the integrations needed to take the prototype '
                 'toward a reliable pilot.',
                 'Together, we bring product direction and technical delivery to Kairos. We want to keep '
                 'learning from the communities that already help one another and build a clearer account of '
                 'where that help goes. Thank you.'],
  'cue': 'This is the final slide. Explain both roles fully, then leave the team visible for questions.',
  'suggested_addition': True}]

DEMO = []

SHORT_PITCH = ['Kairos connects a published need and itemised budget to provider payments and each donor’s own receipt.',
 'The prototype runs the AI interview, uploads, internal accounting and donor updates. Live custody, '
 'external verification and provider-confirmed settlement remain to be integrated.',
 'Our next step is a focused school-fee pilot, informed by students, donors and an institution.']

EVENTS = [{'name': 'Faith & Tech semi-final',
  'focus': 'Trust, accountability and responsible operation',
  'schedule': ['Thursday 19 November 2026, 6:30–6:45 p.m. WAT. Join by 6:25.',
               'One-minute team introduction, seven-minute presentation and demo, five-minute Q&A, '
               'two-minute scoring/transition.',
               'This expanded content draft has no pitch-duration target. Set the delivery plan after '
               'reviewing the complete script.'],
  'assess': 'Explain the problem, target users, working features, validation, technical feasibility, '
            'responsible innovation and next steps.',
  'spoken': 'Every donor should be able to follow what their contribution helped pay for.',
  'follow_up': 'The selected recording is the trimmed JCI original-audio video. Explain its simulated '
               'checks, then tell the department president’s story on the closing slide. Meet the team is '
               'last.',
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
 'deck_base': 'pitch-assets/faith-and-tech-semis/feedback-draft',
 'header': 'Faith & Tech\nSemi-final',
 'description': 'Kairos Faith & Tech semi-final: expanded feedback draft, preserved opening script, working '
                'prototype and proposed safeguards.',
 'footer': 'Abigail + Ugochukwu · Faith & Tech semi-final',
 'hero_kicker': 'Faith & Tech Hackathon · Semi-final',
 'hero_title': 'Transparent crowdfunding. Every naira accounted for.',
 'hero_status': 'Expanded draft · timing to follow',
 'prep_kicker': '19 November 2026 · 6:30–6:45 p.m. WAT',
 'prep_title': 'Complete content, ready for your edits',
 'prep_intro': 'The opening follows the supplied script and selected shared-deck slides. Added sections '
               'cover the remaining judging feedback. Set the delivery plan after editing.',
 'script_title': 'Kairos: Faith & Tech expanded feedback draft',
 'script_intro': 'The first six slides preserve the requested wording and shared-deck selection. The '
                 'remaining sections are suggestions for editing. The supplied JCI original-audio recording '
                 'is followed by the department president’s story on the closing page, then Meet the team. '
                 'No pitch-duration target is set.',
 'qa_title': 'Kairos: Faith & Tech semi-final questions',
 'qa_intro': 'Answers distinguish working features from planned exception handling, privacy controls and '
             'external settlement.',
 'qa_page_intro': 'Questions focused on trust, responsible operation and the judging feedback.',
 'event_title': 'Kairos: Faith & Tech semi-final preparation',
 'event_intro': 'Confirmed slot: Thursday 19 November, 6:30–6:45 p.m. WAT. Join by 6:25. One-minute '
                'introduction, seven-minute pitch and demo, five-minute Q&A, two-minute scoring/transition.',
 'event_notice': 'Expanded content draft',
 'event_notice_detail': 'Review the full material before deciding the delivery schedule.',
 'event_spoken_label': 'The thread:',
 'event_download_note': 'Current editable PowerPoint, PDF, standalone deck and matching notes. Earlier '
                        'editions are archived.',
 'source_note': 'Based on the supplied opening script, selected frozen /pitch.html slides, 15 November '
                'judging feedback, 18 November presentation-details email, current product records and the '
                'user’s account of the department president’s concern.',
 'source_html': '',
 'focus_label': 'User evidence:',
 'focus_note': 'An early department-president conversation supports the need. Internal walkthroughs and '
               'isolated software checks are separate from product testing. No completed external usability '
               'study or live-money pilot is claimed.',
 'notes_note': 'PowerPoint speaker notes and browser scripts match. Default presenter: Ugochukwu.',
 'timing_note': 'No pitch-duration target is set for this expanded draft. The chosen demo is 3:36; the '
                'closing story follows it, and Meet the team is last.',
 'prep_timing_note': 'Set timing after the content is edited. The organizer’s format is retained only as '
                     'preparation context.',
 'criteria': [['Problem, importance and target users', 'Slides 1–3, 5–6'],
              ['Working product and demo', 'Slides 4, 11 and 13'],
              ['Technical approach and feasibility', 'Slide 7'],
              ['Human review and expired references', 'Slide 8'],
              ['Privacy and responsible innovation', 'Slide 9'],
              ['External reconciliation', 'Slide 10'],
              ['Validation and user feedback', 'Slides 11 and 14'],
              ['Pilot and next steps', 'Slide 12'],
              ['Team and roles', 'Slide 15']],
 'checklist': ['Test screen sharing and shared computer audio with the selected original-audio video.',
               'Check internet and keep the local PowerPoint, PDF and demo video available, with screenshots '
               'as a further fallback.',
               'Choose Ugochukwu or Abigail as lead and review the matching opening and team introduction.',
               'Explain the simulated checks before the recording. Planned human review, privacy and '
               'reconciliation controls remain prospective.',
               'After the demo, tell the department president’s story on the closing page. Finish on Meet '
               'the team.',
               'Review the complete content before setting a delivery schedule.'],
 'shared_presenter_label': 'Abigail or Ugochukwu',
 'deck_pdf': 'pitch-assets/faith-and-tech-semis/feedback-draft/Faith-and-Tech-Semis-Feedback-Draft.pdf',
 'deck_pptx': 'pitch-assets/faith-and-tech-semis/feedback-draft/Faith-and-Tech-Semis-Feedback-Draft.pptx',
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
        paragraph = paragraph.replace('the past president of my department', 'the past president of Ugochukwu’s department')
        paragraph = paragraph.replace('I am Ndujekwu Ugochukwu, our software engineer and CTO. My role is', 'Ndujekwu Ugochukwu is our software engineer and CTO. His role is')
        paragraph = paragraph.replace('Sokenu Abigail is our team lead and product manager. Her role is', 'I am Sokenu Abigail, our team lead and product manager. My role is')
        paragraph = paragraph.replace('She helps translate', 'I help translate').replace('and makes sure we are solving', 'and make sure we are solving')
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
