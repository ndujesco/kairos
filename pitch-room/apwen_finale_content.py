"""Independent APWEN finale: supplied narration and the new short JCI demo."""
from copy import deepcopy
from pathlib import Path
import json
import apwen_semi_content as semi
import cleva_content as shared

DEMO_INFO = json.loads((Path(__file__).with_name('apwen_finale_demo.json')).read_text())
META = dict(semi.META, title='Kairos | APWEN Finale', stage='Finale',
            date='21 November 2026', version='apwen-finale-2026-11-21-v2', demo_url='')
PRESENTERS = deepcopy(shared.PRESENTERS)
DEFAULT_PRESENTER = 'miracle'


def section(title, key, paragraphs, cue, **extra):
    return dict(title=title, deck_key=key, paragraphs=paragraphs, cue=cue, seconds=0, **extra)


SLIDES = [
    section('Transparent giving for Nigeria', 'cover', [
        'Good day everyone. My name is Omohuma Miracle, presenting on behalf of Team Kairos.',
        'We built Kairos, which is a transparent giving platform where every naira that you give can be watched until it reaches the need it was given for.',
    ], 'Introduce yourself. Keep the opening in the supplied wording.'),
    section('A transfer succeeds. The doubt stays.', 'problem', [
        "Our school fees went up recently and a final year student who couldn't afford it posted an appeal so he wouldn't drop out. People gave. But then more posts appeared and my friends and I started to wonder if they were all real, because the screenshots looked identical and very easy to edit.",
        "Dishonest people have made skepticism the rational response and so potential donors hold back even when the plea is legitimate and real needs go unmet. The missing piece is not compassion. It's a trusted middle layer.",
    ], 'Let the school-fees story and the doubt land before introducing the solution.'),
    section('From a published budget to a personal receipt.', 'solution', [
        'Kairos is that trusted middle layer.',
        'First, an AI interviewer helps the organizer explain the need and publish an itemised budget naming the school, hospital or whomever is to be paid.',
        "Second, the cause is shared as a link, so donors can see the story, budget and payment history. A licensed partner holds donations in escrow and pays only those verified providers, never the organizer's personal account.",
        'Third, every donor gets a receipt showing their own share of each payment.',
    ], 'This is the intended live giving flow. Actual provider payment, custody and independent checks are simulated or unbuilt.'),
    section('Useful to give. Sustainable to run.', 'business', [
        'Kairos is built to be run, not sold.',
        "We aim to cover running costs through donations and grants from NGOs. Without that support, we'd tentatively take two percent per donation, capped at five thousand naira per cause. Donors see the fee before confirming.",
    ], 'NGO support is not secured. Upkeep is tentative and the cap is per cause.'),
    section('Watch the payment become a receipt.', 'demo', [
        'The next slide shows a quick demonstration of how it works',
    ], 'Play the new APWEN finale recording once at normal player speed. Its 1.13x speed is already baked in. The transcript below is the recording, not extra live narration.',
            is_demo=True, video_seconds=DEMO_INFO['duration_seconds'],
            recorded_transcript=DEMO_INFO['transcript_paragraphs']),
    section('Responsible operation', 'responsible', [
        'It is worth reiterating that we store no sensitive data and do not keep any money. Since we are integrating the services with licensed and verified third parties, our product is easily scalable and secure.',
    ], 'Supplied wording is preserved. The audience slide identifies this as the intended operating model. The current prototype uses hosted account/cause/evidence services; partnership does not establish a security guarantee.'),
    section('What runs today.', 'prototype', [
        'The accounting, donor shares, notifications and public ledger are running.',
        'Every integration with third parties is simulated for now.',
    ], 'Distinguish simulated identity, custody and settlement from the actual Claude interview and hosted application/data services.'),
    section('Start with a bill that can be checked.', 'growth', [
        "We start with school fees because they're easy to verify in Nigeria. We have spoken with our department bodies that help raise funds for students and have got very a positive response",
        'Then we plan to move to hospitals and other service providers.',
    ], 'Retain the supplied phrasing. Departmental feedback is qualitative interest, not a completed live-money pilot.'),
    section('Abigail and Miracle.', 'team', [
        "And this is the team. I'm Miracle, the product designer. Abigail is our team lead and product manager.",
    ], 'Introduce both people on the slide. Either Abigail or Miracle can lead this presentation.'),
    section('Give with proof, not faith.', 'closing', [
        "We are not claiming to make fraud impossible. We're building Kairos to make it very difficult, visible, traceable, capped and unprofitable.",
        "In short, Kairos turns charitable giving from an act of blind trust into one of complete transparency. Thank you so much. We're Team Kairos.",
    ], 'Thank them, then stop.'),
]
SLIDES[4]['seconds'] = DEMO_INFO['duration_seconds']


def slides_for_presenter(presenter):
    def spoken(paragraph):
        if presenter == 'abigail':
            paragraph = paragraph.replace('My name is Omohuma Miracle,', 'My name is Sokenu Abigail,')
            paragraph = paragraph.replace("I'm Miracle, the product designer. Abigail is our team lead and product manager.",
                                          "I'm Abigail, the team lead and product manager. Miracle is our product designer.")
        return paragraph
    return [dict(s, speaker=PRESENTERS[presenter]['name'], paragraphs=[spoken(p) for p in s['paragraphs']]) for s in SLIDES]


def shared_paragraphs(slide, markdown=False):
    return list(slide['paragraphs'])


SHORT_PITCH = list(SLIDES[-1]['paragraphs'][1:])
DEMO = []
GROUPS = deepcopy(semi.GROUPS)
QUESTIONS = deepcopy(semi.QUESTIONS)
EVENTS = [dict(semi.EVENTS[0], name='APWEN finale',
               notice='New finale edition with the supplied script and a demo under 2:40.',
               notice_detail='The semi-final edition and its five-minute plan remain separate.',
               schedule=['Confirm the finale date, start time and total pitch allowance with the organiser.',
                         'Demo 5, responsible operation 6, current implementation 7, first use case 8, team 9, closing 10.'],
               spoken='The published budget, named provider payment and personal receipt connect the need to each donor.',
               follow_up='Play the supplied new MP4 at 1x. All speed changes are already in the file.')]
BASE = 'pitch-assets/apwen-finale/deck'
PAGE = dict(
    canonical_path='/apwen-finale.html', native_slides=True, web_deck=True,
    deck_base=BASE, deck_pdf=BASE+'/Kairos-APWEN-Finale.pdf', deck_pptx=None, deck_keynote=None,
    deck_title='Kairos · APWEN finale',
    archive_downloads=[{'label': 'PowerPoint', 'url': 'https://drive.google.com/file/d/1WnZK9Q7qeR66N0WGzTeCXDj-OJwQxoQ0/view'}, {'label': 'Keynote', 'url': 'https://drive.google.com/file/d/1tF7POtF2UNkIsice68eRZEuTuP_2JceH/view'}, {'label': 'Demo · 2:39', 'url': 'https://drive.google.com/file/d/1qiPfJxoMItDH0fDQ1lvzsSPWVryH4GMD/view'}],
    header='APWEN LASU\nFinale · Social Innovation',
    description='Kairos APWEN finale: the supplied script, short recorded demo transcript and native presentation previews.',
    footer='Abigail + Miracle · APWEN finale', hero_kicker='APWEN LASU · Finale',
    hero_title='Transparent giving for Nigeria', hero_status='Finale · new script and demo',
    script_title='Kairos: APWEN finale pitch script',
    script_intro='Ten slides. Default presenter: Miracle. The supplied wording is retained; pasted interface labels and old timings are excluded. The demo transcript is shown at slide 5 and is not extra live narration. No overall pitch schedule is assigned.',
    qa_title='Kairos: APWEN finale rehearsal questions',
    qa_intro=semi.PAGE['qa_intro'], qa_page_intro=semi.PAGE['qa_page_intro'],
    event_title='Kairos: APWEN finale preparation',
    event_intro='Use the new finale files. The APWEN semi-final stays unchanged.',
    prep_kicker='APWEN finale', prep_title='The need, the giving flow and the receipt.',
    prep_intro='Ten visual slides with full narration in the script and native notes. The new recorded demo is below 2:40.',
    event_notice='New APWEN finale edition', event_notice_detail='No inherited five-minute delivery schedule.',
    event_spoken_label='The thread:', event_download_note='Native PowerPoint and Keynote with the embedded demo are delivered locally; the web PDF is a static backup.',
    focus_label='Prototype status:', focus_note='Identity/provider checks, custody and payment settlement are simulated or unbuilt. The AI interview and prototype accounting are functioning.',
    source_note="Built from the user's supplied finale script and existing APWEN/Faith & Tech visual layouts. Historical editions are retained.",
    separate_demo_script='pitch-assets/apwen-finale/demo-transcript.txt',
    separate_demo_subtitles='pitch-assets/apwen-finale/Kairos-APWEN-Finale-Demo.en.srt',
    separate_demo_webvtt='pitch-assets/apwen-finale/Kairos-APWEN-Finale-Demo.en.vtt',
    source_html='', notes_note='The complete supplied narration and recorded demo transcript are in scripts and presenter notes.',
    timing_note='Demo is below 2:40; play at 1x. No overall pitch schedule is assigned.',
    prep_timing_note='Confirm the finale allowance separately. The old semi-final clock is not reused.',
    criteria=[['Problem and solution','Slides 1–3'], ['Sustainability','Slide 4'], ['Demonstration','Slide 5'],
              ['Responsible operation and prototype status','Slides 6–7'], ['First use case','Slide 8'], ['Team and closing','Slides 9–10']],
    checklist=['Use the APWEN finale room and matching native files.', 'Select the new MP4 in the Demo tab before presenting from the website.',
               'Native PPTX/Keynote include the exact new recording. Share computer sound.',
               'Play at normal 1x: 1.13x is already baked in.', 'Keep prototype and intended-operation distinctions clear.',
               'Read the recorded demo transcript in slide 5 when rehearsing.', 'Confirm the total finale slot with the organiser.'],
    shared_presenter_label='Abigail or Miracle', unscheduled=True, elapsed_timer=True,
    local_demo=True, demo_placeholder=False, demo_url='', demo_name=DEMO_INFO['filename'],
    demo_source=DEMO_INFO['local_path'],
)
