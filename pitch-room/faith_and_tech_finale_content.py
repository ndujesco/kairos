"""Tentative Faith & Tech finale, copied from APWEN commit 23d7f4b.

Independent script/metadata: later APWEN edits must not silently alter this room.
The existing Faith rehearsal bank is retained. No movie belongs in web/native files.
"""
from copy import deepcopy
import faith_and_tech_semis_content as faith

META = {'title': 'Kairos | Faith & Tech Finale',
 'event': 'Faith & Tech Hackathon',
 'stage': 'Tentative finale',
 'team': 'Sokenu Abigail · Ndujekwu Ugochukwu',
 'date': 'Date and qualification unconfirmed',
 'version': 'faith-and-tech-finale-current',
 'demo_url': ''}

PRESENTERS = {'abigail': {'name': 'Abigail',
             'full_name': 'Sokenu Abigail',
             'team_intro': 'Sokenu Abigail is our team lead and product manager, coordinating product '
                           'priorities and the user journey. Ndujekwu Ugochukwu is our software '
                           'engineer and CTO, leading technical implementation and integration work.'},
 'ugochukwu': {'name': 'Ugochukwu',
               'full_name': 'Ndujekwu Ugochukwu',
               'team_intro': 'Sokenu Abigail is our team lead and product manager, coordinating product '
                             'priorities and the user journey. Ndujekwu Ugochukwu is our software '
                             'engineer and CTO, leading technical implementation and integration work.'}}

DEFAULT_PRESENTER = 'ugochukwu'

SLIDES = [{'title': 'Transparent giving for Nigeria',
  'deck_key': 'cover',
  'paragraphs': ['Good day, everyone. My name is Ndujekwu Ugochukwu, presenting on behalf of Team '
                 'Kairos.',
                 'We built Kairos, which is a transparent giving platform where every naira that you '
                 'give can be watched until it reaches the need it was given for.'],
  'cue': 'Introduce yourself. Keep the opening in the supplied wording.',
  'seconds': 0},
 {'title': 'A transfer succeeds. The doubt stays.',
  'deck_key': 'problem',
  'paragraphs': ["Our school fees went up recently, and a final year student who couldn't afford it "
                 "posted an appeal so he wouldn't drop out. People gave. But then more posts appeared, "
                 'and my friends and I started to wonder if they were all real, because the screenshots '
                 'looked identical and very easy to edit.',
                 'Dishonest people have made skepticism the rational response, and so potential donors '
                 'hold back even when the plea is legitimate, and real needs go unmet. The missing '
                 "piece is not compassion. It's a trusted middle layer."],
  'cue': 'Let the school-fees story and the doubt land before introducing the solution.',
  'seconds': 0},
 {'title': 'How Kairos works.',
  'deck_key': 'solution',
  'paragraphs': ['Kairos is that trusted middle layer.',
                 'First, an AI interviewer helps the organizer explain the need and publish an itemised '
                 'budget naming the school, hospital or whomever is to be paid.',
                 'Second, the cause is shared as a link, so donors can see the story, budget and '
                 'payment history. A licensed partner holds donations in escrow and pays only those '
                 "verified providers, never the organizer's personal account.",
                 'Third, every donor gets a receipt showing their own share of each payment.'],
  'cue': 'This is the intended live giving flow. Actual provider payment, custody and independent '
         'checks are simulated or unbuilt.',
  'seconds': 0},
 {'title': 'How we keep Kairos running.',
  'deck_key': 'business',
  'paragraphs': ['Kairos is built to be run, not sold.',
                 'We aim to cover running costs through donations and grants from NGOs. Without that '
                 "support, we'd tentatively take two percent per donation, capped at five thousand "
                 'naira per cause. Donors see the fee before confirming.'],
  'cue': 'NGO support is not secured. Upkeep is tentative and the cap is per cause.',
  'seconds': 0},
 {'title': 'Watch the payment become a receipt.',
  'deck_key': 'demo',
  'paragraphs': ['The next slide shows a quick demonstration of how it works.'],
  'cue': 'Demo placeholder only. The tentative recording is kept separately on the laptop; choose '
         'timing and embedding after qualification and the pitch allowance are confirmed.',
  'seconds': 0,
  'is_demo': True,
  'video_seconds': 0},
 {'title': 'Responsible operation',
  'deck_key': 'responsible',
  'paragraphs': ['It is worth reiterating that we store no sensitive data and do not keep any money. '
                 'When an organiser supplies documents as proof to support their cause, the AI model '
                 'discerns which is safe to display publicly and only does so with their permission.',
                 'Since we are integrating the services with licensed and verified third parties, our '
                 'product is easily scalable and secure.'],
  'cue': 'User-supplied wording retained as the intended operating model. The prototype stores '
         'account/cause/evidence data; automated safe-publication review and consent gating remain '
         'planned. Third-party integration does not establish a security guarantee.',
  'seconds': 0},
 {'title': 'What runs today.',
  'deck_key': 'prototype',
  'paragraphs': ['The accounting, donor shares, notifications and public ledger are running.',
                 'Every integration with third parties is simulated for now.'],
  'cue': 'Distinguish simulated identity, custody and settlement from the actual Claude interview and '
         'hosted application/data services.',
  'seconds': 0},
 {'title': 'Where we start. Where we go next.',
  'deck_key': 'growth',
  'paragraphs': ["We start with school fees because they're easy to verify in Nigeria. We have spoken "
                 'with our department bodies that help raise funds for students and have got very a '
                 'positive response.',
                 'Then we plan to move to hospitals and other service providers.'],
  'cue': 'Retain the supplied phrasing. Departmental feedback is qualitative interest, not a completed '
         'live-money pilot.',
  'seconds': 0},
 {'title': 'Abigail and Ugochukwu.',
  'deck_key': 'team',
  'paragraphs': ["And this is the team. I'm Ugochukwu, the software engineer and CTO. Abigail is our "
                 'team lead and product manager.'],
  'cue': 'Introduce Abigail and Ugochukwu. Either presenter can lead this tentative finale.',
  'seconds': 0},
 {'title': 'Give with proof, not faith.',
  'deck_key': 'closing',
  'paragraphs': ['In short, Kairos turns charitable giving from an act of blind trust into one of '
                 'complete transparency.',
                 "We are not claiming to make fraud impossible. We're building Kairos to make it very "
                 'difficult, visible, traceable, capped and unprofitable.',
                 "Thank you so much. We're Team Kairos."],
  'cue': 'Thank them, then stop.',
  'seconds': 0}]

def slides_for_presenter(presenter):
    def spoken(text):
        if presenter == 'abigail':
            return text.replace('My name is Ndujekwu Ugochukwu,', 'My name is Sokenu Abigail,').replace(
                "I'm Ugochukwu, the software engineer and CTO. Abigail is our team lead and product manager.",
                "I'm Abigail, the team lead and product manager. Ugochukwu is our software engineer and CTO.")
        return text
    return [dict(s, speaker=PRESENTERS[presenter]['name'], paragraphs=[spoken(p) for p in s['paragraphs']]) for s in SLIDES]

def shared_paragraphs(slide, markdown=False):
    return list(slide['paragraphs'])

SHORT_PITCH = list(SLIDES[-1]["paragraphs"])
DEMO = []
GROUPS = deepcopy(faith.GROUPS)
QUESTIONS = deepcopy(faith.QUESTIONS)
EVENTS = [{'name': 'Faith & Tech tentative finale',
  'focus': 'Trust, accountability and responsible operation',
  'schedule': ['Confirm qualification, finale date and pitch allowance with the organiser.'],
  'assess': 'Explain the problem, target users, working features, validation, technical feasibility, '
            'responsible innovation and next steps.',
  'spoken': 'Follow the need through the named provider payment to each donor receipt.',
  'follow_up': 'The demo is kept locally and is not embedded in this tentative delivery.',
  'notice': 'Qualification and pitch allowance unconfirmed.',
  'notice_detail': 'Preparation only. The semi-final remains a separate edition.'}]

PAGE = {'include_presenter_notes': False,'canonical_path': '/faith-and-tech-finale.html',
 'native_slides': True,
 'web_deck': True,
 'deck_base': 'pitch-assets/faith-and-tech-finale/deck',
 'deck_pdf': 'pitch-assets/faith-and-tech-finale/deck/Kairos-Faith-and-Tech-Finale.pdf',
 'deck_pptx': 'pitch-assets/faith-and-tech-finale/deck/Kairos-Faith-and-Tech-Finale.pptx',
 'deck_keynote': 'pitch-assets/faith-and-tech-finale/deck/Kairos-Faith-and-Tech-Finale.key',
 'deck_title': 'Kairos · Faith & Tech tentative finale',
 'archive_downloads': [],
 'header': 'Faith & Tech\nTentative finale',
 'description': 'Tentative Faith & Tech finale, with full presenter scripts and movie-free decks.',
 'footer': 'Abigail + Ugochukwu · Faith & Tech tentative finale',
 'hero_kicker': 'Faith & Tech · Tentative finale',
 'hero_title': 'Transparent giving for Nigeria',
 'hero_status': 'Qualification and pitch allowance unconfirmed',
 'script_title': 'Kairos: Faith & Tech tentative finale pitch script',
 'script_intro': 'Ten slides. Default presenter: Ugochukwu. Qualification and pitch allowance are '
                 'unconfirmed. No delivery schedule is set. Slide 5 is a Demo placeholder; the '
                 'recording stays separate locally.',
 'qa_title': 'Kairos: Faith & Tech finale rehearsal questions',
 'qa_intro': 'Suggested spoken answers informed by the judging feedback and earlier JCI, Forge and '
             'Cleva rehearsal banks. Start with the starred questions. Answers distinguish the current '
             'prototype from intended operation; pilot plans and policies are proposals, not completed '
             'results.',
 'qa_page_intro': '80 questions informed by the judges’ feedback, JCI, The Forge and Cleva. Start with '
                  'Rehearse first. Answers distinguish current features from intended operation.',
 'event_title': 'Kairos: Faith & Tech tentative finale preparation',
 'event_intro': 'Prepare provisionally. Qualification, timing and demo embedding are not confirmed.',
 'prep_kicker': 'Faith & Tech tentative finale',
 'prep_title': 'The need, the giving flow and the receipt.',
 'prep_intro': 'Ten visual slides with separate presenter scripts. The separately prepared local recording '
               'is not embedded.',
 'event_notice': 'Tentative finale preparation',
 'event_notice_detail': 'Await qualification and the confirmed pitch allowance.',
 'event_spoken_label': 'The thread:',
 'event_download_note': 'Movie-free native decks, HTML and PDF. The recording is kept separately on the '
                        'laptop.',
 'focus_label': 'Prototype status:',
 'focus_note': 'Identity/provider checks, custody and payment settlement are simulated or unbuilt. The '
               'AI interview and prototype accounting are functioning.',
 'source_note': 'Adapted from the current APWEN finale with Faith & Tech presenters, the supplied '
                'responsible-operation addition and the requested closing order.',
 'separate_demo_script': None,
 'separate_demo_subtitles': None,
 'separate_demo_webvtt': None,
 'source_html': '',
 'notes_note': 'The complete supplied narration is in the separate presenter scripts.',
 'timing_note': 'No overall pitch schedule is set.',
 'prep_timing_note': 'Await qualification and the pitch allowance before adjusting or embedding the '
                     'recording.',
 'criteria': [['Problem and solution', 'Slides 1–3'],
              ['Sustainability', 'Slide 4'],
              ['Demonstration', 'Slide 5'],
              ['Responsible operation and prototype status', 'Slides 6–7'],
              ['First use case', 'Slide 8'],
              ['Team and closing', 'Slides 9–10']],
 'checklist': ['Confirm qualification and the total finale slot.',
               'Select Abigail or Ugochukwu before rehearsing.',
               'This delivery has a Demo placeholder and no embedded movie.',
               'Keep intended operation and functioning prototype features distinct.',
               'Use the separate local recording at 1x; its speaking pace and four card pauses are '
               'already applied.',
               'Embed and upload the recording only after the user requests the final delivery.'],
 'shared_presenter_label': 'Abigail or Ugochukwu',
 'unscheduled': True,
 'elapsed_timer': True,
 'local_demo': False,
 'demo_placeholder': True,
 'demo_url': '',
 'demo_name': '',
 'demo_source': '',
 'preserve_editions': False}

