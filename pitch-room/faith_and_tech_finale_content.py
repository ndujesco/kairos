"""Faith & Tech finale with APWEN-derived slides and a prize-funding summary.

The separate demo stays unchanged. Narration stays in the browser/scripts;
the current native decks have no presenter notes or embedded movies.
"""
from copy import deepcopy
from pathlib import Path
import json
import faith_and_tech_semis_content as faith

DEMO_INFO = json.loads(Path(__file__).with_name('faith_and_tech_finale_demo.json').read_text())

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
  'cue': 'Play the separate 3:17 recording at 1x. The transcription below is the recorded narration, '
         'not extra live narration. Four marked title cards are silent 3.5-second pauses.',
  'seconds': 0,
  'is_demo': True,
  'video_seconds': 0,
  'recorded_transcript': DEMO_INFO['transcript_paragraphs'],
  'recorded_transcript_pauses': DEMO_INFO['card_pauses']},
 {'title': 'Responsible operation',
  'deck_key': 'responsible',
  'paragraphs': ['It is worth reiterating that we store no sensitive data and do not keep any money. '
                 'Since we are integrating the services with licensed and verified third parties, our '
                 'product is easily scalable and secure.'],
  'cue': 'Supplied wording matches APWEN. The audience slide identifies the intended operating model. '
         'The prototype stores account/cause/evidence data; live safeguards require validation. '
         'Third-party integration does not establish a security guarantee.',
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
  'cue': 'Introduce Abigail and Ugochukwu. Either presenter can lead this finale.',
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

# Funding follows prototype status, preserving the existing demo lead-in.
SLIDES.insert(7, {
 'title': 'Our funding priorities', 'deck_key': 'funding',
 'paragraphs': ['We prioritise user testing, then payment integration and a supervised school-fee '
                'pilot. The detailed spending plans are in our submission to the organising team.'],
 'cue': 'The three prizes are alternative awards. $750 funds validation over eight weeks; $1,500 '
        'funds sandbox testing over twelve; $2,500 prepares a small supervised pilot over twelve, '
        'conditional on partner approval and readiness checks. Submit the spreadsheet by 27 November, '
        '6 p.m. WAT before presenting this line. All figures are targets from receipt of funds.',
 'seconds': 0,
})

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
from faith_and_tech_finale_qa import build_questions
GROUPS, QUESTIONS = build_questions(faith.QUESTIONS)
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


# Finalist update: narration and slide content above are deliberately unchanged.
# The movie remains separate, as requested; only its Drive link is added.
DEMO_DRIVE = 'https://drive.google.com/file/d/1SjmK5i4ySrnldlJK3hxOAtB9UXTxnX6E/view'
META.update(stage='Finale', date='Conference 28 November 2026 · finalist', demo_url=DEMO_DRIVE)
PAGE.update(
    demo_drive_url=DEMO_DRIVE, demo_duration_label='3:17',
    demo_name=DEMO_INFO['filename'], demo_recording_seconds=DEMO_INFO['duration_seconds'],
    separate_demo_script='pitch-assets/faith-and-tech-finale/demo-transcript.txt',
    separate_demo_subtitles='pitch-assets/faith-and-tech-finale/Kairos-Faith-and-Tech-Finale-Demo.en.srt',
    separate_demo_webvtt='pitch-assets/faith-and-tech-finale/Kairos-Faith-and-Tech-Finale-Demo.en.vtt',
    archive_downloads=[{'label':'Demo · 3:17 on Drive', 'url':DEMO_DRIVE}],
    header='Faith & Tech\nFinale',
    description='Faith & Tech finalist preparation: the existing pitch, separate demo and plain-English answers to all judging feedback.',
    hero_kicker='Faith & Tech · Finale', hero_status='One of five finalists · conference 28 November',
    qa_intro='Plain-English spoken answers covering the 15 November and finalist feedback, compliance and identity safeguards, earlier rehearsal topics, and examples of third parties for each role. Start with the starred questions. Current features, simulations and proposed processes are kept separate. Supplier names are research examples, not signed Kairos partnerships.',
    qa_page_intro=f'{len(QUESTIONS)} questions. Finals feedback first, compliance and identity safeguards next, then third-party examples and the earlier topics. Answers explain what works today and what still needs to be built.',
    event_title='Kairos: Faith & Tech finals preparation',
    event_intro='Kairos is one of five finalists. Conference: 28 November. The final pitch allowance is still pending. Slides and spoken wording are preserved.',
    prep_kicker='Faith & Tech finale',
    prep_intro='Use the existing ten slides and presenter script. The separate 3:17 demo is available on Drive; download it before presenting.',
    event_notice='Finalist selection confirmed',
    event_notice_detail='Masterclass: 25 November, 7–8 p.m. WAT on Zoom. Conference: 28 November. Final-stage presentation time is not yet confirmed.',
    event_download_note='The existing native decks remain unchanged. The demo is a separate Drive download.',
    prep_timing_note='Confirm the final pitch allowance; no semi-final timing is inherited.',
    checklist=['Download the separate 3:17 demo from Drive and test it before presenting.',
               'Use the existing slides and select Abigail or Ugochukwu for the spoken script.',
               'Rehearse the starred questions covering both rounds of judging feedback.',
               'Learn the third-party examples and distinguish possible providers from actual integrations.',
               'Explain simulated checks and payment steps, and share computer sound for the recording.',
               'Confirm the final pitch allowance and Zoom details when supplied.'],
)
EVENTS = [dict(
    name='Faith & Tech finale', focus='Trust, accountability and responsible operation',
    schedule=['Selected as one of five finalists.',
              'Masterclass: Wednesday 25 November 2026, 7–8 p.m. WAT, Zoom details pending.',
              'Conference: Saturday 28 November 2026; final pitch allowance pending.'],
    assess='Be ready to explain fund holding, human review, practical verification, privacy, payment matching, fees and actual user feedback.',
    spoken='Follow the need through the named provider payment to each donor receipt.',
    follow_up='The separate 3:17 demo is on Drive. Download it and play at 1x; the pace and four section cards are already in the file.',
    notice='Finalist selection confirmed', notice_detail='The original slides and spoken script are preserved. The semi-final remains separate.'
)]

# Authoritative 26 November logistics and funding update.
PAGE.update(
    deck_title='Kairos · Faith & Tech finale',
    footer='Abigail + Ugochukwu · Faith & Tech finale',
    description='Faith & Tech finale: the current pitch, separate demo, three prize-funding plans and rehearsal questions.',
    script_title='Kairos: Faith & Tech finale pitch script',
    script_intro='Eleven slides. Default presenter: Ugochukwu. Funding follows What runs today at slide 8. The recorded demo transcription is rehearsal material, not additional live narration. The organiser allows five minutes in total; no fitted delivery schedule is assigned.',
    timing_note='Confirmed maximum: five minutes including pitch, demo and funding summary. Rehearse the retained script and separate recording together.',
    event_intro='Kairos is one of five finalists. Finale: 28 November 2026. The organiser confirms five minutes in total. The completed spending spreadsheet for all three prizes is due 27 November, 6 p.m. WAT.',
    prep_intro='Eleven slides. Funding follows prototype status at slide 8. Download the separate 3:17 demo and current files before presenting.',
    event_notice='Five-minute finale pitch',
    event_notice_detail='Submit the spreadsheet for $2,500, $1,500 and $750 by Friday 27 November 2026, 6 p.m. WAT. Finale: Saturday 28 November. The recommended section structure is guidance; the five-minute total is the confirmed limit.',
    event_download_note='Current note-free native decks, separate scripts and the spending-plan spreadsheet are available below. The demo remains separate.',
    prep_timing_note='Maximum five minutes including demonstration. The existing 3:17 recording and retained script need a timed rehearsal; no fitted schedule or shorter recording is claimed.',
    source_note='APWEN-derived pitch with Faith presenters, the requested slide-6 removal and a brief funding summary based on the supplied 26 November guidelines and completed spending plan.',
    criteria=[['Problem and solution', 'Slides 1–3'], ['Sustainability', 'Slide 4'],
              ['Demonstration', 'Slide 5'], ['Responsible operation and prototype status', 'Slides 6–7'],
              ['Funding and impact', 'Slide 8'], ['First use case', 'Slide 9'], ['Team and closing', 'Slides 10–11']],
    checklist=['Submit the completed three-scenario spreadsheet by 27 November, 6 p.m. WAT.',
               'Download the current eleven-slide deck, script and separate 3:17 demo.',
               'Select Abigail or Ugochukwu before presenting.',
               'Rehearse the complete pitch, demo and funding summary within five minutes.',
               'Rehearse the starred questions covering both rounds of feedback.',
               'Explain simulated checks and payments, distinguish possible providers from signed partners, and share computer sound.',
               'Keep funding targets conditional on access, partner approval and readiness checks.'],
)
PAGE['archive_downloads'].append({'label': 'Prize spending plan · Excel',
                                'url': 'pitch-assets/faith-and-tech-finale/Kairos-Prize-Funding-and-Spending-Plan.xlsx'})
EVENTS = [dict(
    name='Faith & Tech finale', focus='Trust, accountability, responsible operation and funding impact',
    schedule=['Selected as one of five finalists.',
              'Spending plan for all three prizes: Friday 27 November 2026, 6 p.m. WAT.',
              'Finale: Saturday 28 November 2026. Maximum five minutes including demo and funding.'],
    assess='Explain the problem, current readiness, evidence and what each prize would enable. The spreadsheet supplies the detailed costs, milestones and impact measures.',
    spoken='Follow the need through the named provider payment to each donor receipt.',
    follow_up='The separate 3:17 demo remains on Drive. Funding follows What runs today at slide 8. The new narration is no longer than the removed sentence.',
    notice='Five-minute finale pitch',
    notice_detail='The current deck has eleven slides. The semi-final and other competitions remain separate.'
)]
