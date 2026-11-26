# Kairos presentation rooms

Current delivery policy, confirmed 21 November: keep only the latest presentation files with clean names. Apply requested headings to actual native slides, PDF/slide previews, HTML and full current presenter notes together. Keep the demo embedded in native PowerPoint/Keynote, host those large files in Drive, and link HTML directly to the current files. Replace current Drive files when updating; no visible version suffixes or automatic snapshots. Snapshot support is opt-in via preserve_editions=True. Superseded APWEN finale copies were explicitly authorized for deletion; other competition histories remain separate.

For subsequent editions, the user confirmed that the HTML room should link directly to matching Drive-hosted PowerPoint/Keynote files **with the demo embedded**. Keep large movies/video-bearing decks off Vercel; lightweight previews/scripts/static PDFs may stay public. A standalone movie or a native deck without it does not satisfy that delivery. Validate the native notes/movie and remote hashes/IDs, then link to the exact current edition and retain earlier links.

Use the event and stage in every new room name. The original `/pitch.html` remains frozen.

| Canonical room | Content source | Current scope |
| --- | --- | --- |
| `/cleva-finale.html` | `cleva_finale_content.py` | Nine-slide current room, 741 presenter words, unchanged 10:25 web rehearsal plan; local final demo is 4:37 in Drive |
| `/cleva-preliminary.html` | `cleva_preliminary_content.py` | Archived Office Hours edition, 474 words, 7:50 including the video |
| `/apwen-finale.html` | `apwen_finale_content.py` | Ten slides, 424 live presenter words, full demo transcript on slide 5, 2:39.1 demo; native PPTX/Keynote/PDF |
| `/apwen-semi.html` | `apwen_semi_content.py` | Existing ten-slide semi-final, 406 words, 4:50 including the 1:48 Forge cut |
| `/faith-and-tech-semis.html` | `faith_and_tech_semis_content.py` | Eleven slides, 536 words; concise visual slides 7–9 after Demo 6, with full corrected narration in scripts/notes |

The APWEN finale uses the corrected `Kairos-APWEN-Finale-Demo.mp4` (159.1 seconds). Its opening “Now” is silenced through the actual quiet gap before the name; all video packets, captions and remaining timing are unchanged. Native PowerPoint/Keynote/PDF and web previews use the chosen titles and clean filenames. Only current delivery files are retained. Live phone touch and Start/Pause/Resume/Reset timer checks passed; the existing shared mobile reader and elapsed timer required no code changes.

`/apwen-finale.html` is a separate finale with the supplied APWEN/Faith & Tech script. Its recording transcript is stored independently of live paragraphs, appears under slide 5 in the room/downloads/native notes, and is excluded from live word counts. New native files live in `../hackathons/2026-10 APWEN LASU/03 Finale Pitch/`; the web uses inline native previews/PDF and a local video picker.

## Previous URLs

- `/cleva.html` serves the finale.
- `/cleva-final.html` also serves the finale, matching the requested mobile-room URL.
- `/cleva-pitch.html` serves the preliminary edition, recovered from the archive rather than copied from the finale.
- `/apwen-pitch.html` serves the semi-final.

Aliases are generated from their canonical page. Each stage has separate scripts, Q&A, preparation notes and manifest under `public/pitch-assets/<stage>/`. Canonical metadata identifies the stage. Finale and APWEN retain their prior browser preference keys; the preliminary and Faith & Tech rooms have independent preferences.

## Mobile navigation (21 November)

Current Cleva finale, Faith & Tech semi-final and APWEN semi-final rooms show one script page at a time on phones. Following phone feedback, the picture preview is hidden to give the script more room; the separate Demo tab and Faith's elapsed timer remain available. Swipe left for the next page or right for the previous page, or use the fixed, large arrow buttons and slide counter. Long notes still scroll vertically within the selected page; changing pages starts the new notes at the top. The selected page and reading position survive a visit to Q&A or Prep. Presenter switching keeps the selected page.

Short strokes, quick flicks and modest diagonal thumb movement change pages across the reading area, including its gutters. The script follows the finger and returns smoothly if the gesture is too small or at a boundary. Touch Events handle phone gestures, with Pointer Events for pens and touch browsers without Touch Events.

Navigation only changes visibility in the loaded document. Every slide preview and script is embedded, including Cleva's demo poster; swiping does not fetch data, change the URL or replace the document. Playing a separately selected local video remains a separate action. Gestures on controls, text selections, screen edges and multiple touches do not change pages. Browser vertical scrolling and pinch zoom remain available, and reduced-motion preferences disable the page animation.

The shared CSS/JavaScript and builder supply this behavior to future rooms. It applies below 801px, or on touch devices up to 1100px to include landscape phones. Desktop retains its slide preview, one-slide, Read through, deck-only and printing behavior, including mode restoration after resizing. The frozen shared and preliminary pages are not rebuilt. Latest checks and screenshots: `../production/2026-11-21 mobile script swipe refinement/`; earlier QA: `../production/2026-11-21 mobile swipe presenter/`.

The original `cleva_pitch_content.py` and `apwen_pitch_content.py` filenames are compatibility imports. The frozen `cleva_content.py` is still the general/shared source; do not modify it for event work.

## Build

```sh
npm run pitch:build
npm run pitch:cleva-finale
npm run pitch:cleva-preliminary
npm run pitch:apwen-semi
npm run pitch:apwen-finale
npm run pitch:faith-and-tech-semis
```

The existing `pitch:cleva` command builds both Cleva stages; `pitch:apwen` builds the semi-final. Normal builds protect the agnostic page and shared assets. Use these page commands for HTML work; the old native all-event export helper is not needed for these changes.

## Content boundaries

Cleva finale retains the user's exact slide 1 paragraphs 2–3 and slide 4 paragraph 1. For Cleva only, the script treats a crowdfunding payment as complete when the money reaches its stated need. Slide 2 establishes that problem immediately after the introduction; slide 3 shows collection → holding for the bill → provider payment → donor receipts. Receipt/closing/short-script copy carries the same meaning without naming a sponsor. Other event rooms retain their trust framing. Its tailored question bank is defined in `cleva_finale_qa.py`: 61 entries, 44 priorities. The first 22 are sourced service lists from `cleva_partner_directory.py`, followed by a separate answer on how CAC helps and all 38 original judge questions. The directory has 215 service options across 122 supplier brands and six checking authorities; repeated suppliers can serve several roles. Research candidates are distinguished from the current Claude/Cloudinary/Vercel/MongoDB infrastructure and from registry sources. Retained questions keep their IDs; new ones have separate IDs. The preliminary bank remains the original 110 questions.

The two current rooms use the new native-deck previews through `native_slides`. Their standalone HTML decks contain the same slide images. `build-pitch.py` still supports editable per-slide HTML overrides for other editions. Cleva's local video picker supplies the same recording to the Demo tab and pitch slide without uploading the file. Choose the accompanying MP4 before presenting. Cleva's native export keeps the recording separate. Faith & Tech's new PowerPoint embeds its selected original-audio JCI video; the PDF has a static poster.

Existing preliminary Cleva/APWEN and shared native files remain at their immutable paths. New finale files are isolated under `pitch-assets/cleva-finale/deck/`; their notes follow the current finale script. Only current finale and Faith & Tech pages/downloads changed in the JCI-style update. All older recordings remain intact.

Faith & Tech retains Abigail and Ugochukwu, with Ugochukwu presenting by default. The current version has eleven slides and 536 presenter words. Demo 6 is followed by Technical approach 7, Responsible operation 8 and school fees 9, then closing/team 10–11. The technical/responsible 1:20 budget stays 0:20 + 1:00. Full corrected narration belongs in scripts and notes; audience slides use brief split-panel/card layouts matching the reference. The former full-paragraph slides were a misinterpretation and are archived.

Current public assets are under `pitch-assets/faith-and-tech-semis/visual-deck/`. The web keeps a Demo placeholder and no video player/download bar. Local `Faith-and-Tech-Semis-Visual-Deck.key` includes the original demo and corrected notes, with matching local PPTX/PDF/HTML. Video-bearing files remain outside Git. Current reproduction/QA is `../production/2026-11-19 Faith visual deck correction/`.

The Cleva laptop Read-through fix enables the shared scroll-follow logic on desktop. Preview selection follows the script below the sticky header without moving the page, while manual/deck-only/hidden-tab and mobile behavior stay guarded. Only Cleva finale/alias and Faith current rooms are rebuilt; other room outputs remain frozen. Scroll-follow has no network dependency after page load.

Current production/QA: `../production/2026-11-19 Faith visual deck correction/`. Edit the tracked Faith content source and rebuild only active editions. Older production folders reproduce historical versions.

Native presentation downloads and historical competition submissions are preserved. The previous Cleva page/script is also archived in `02 Preliminary Pitch/archive/2026-11-17-before-grand-finale-script/`.

Faith & Tech Q&A now has 80 questions (21 marked Rehearse first). The original eighteen remain in the edition source; 62 additional rehearsal questions/answers are appended from `faith_and_tech_semis_qa.py`. Preserve existing question IDs when adding entries. This Q&A-only update does not regenerate native decks or change the pitch.


## Deck catalogue and media preservation (20 November)

`/all.html` lists current rooms and retained HTML/script editions. Run `npm run pitch:catalog` to rebuild the index from `deck-catalog.json`; importing retained local historical sources is an explicit `python3 scripts/build-deck-catalog.py --import-local` operation. The register is append-only for archived editions. Snapshots are now opt-in via preserve_editions=True; an explicitly requested snapshot can preserve HTML before replacement, preserving slide/script text, removing hosted movie playback/downloads and giving the archive its own browser preferences. Original local sources remain untouched.

Keep demo videos and video-bearing PowerPoint/Keynote files in `~/Documents/Kairos` and the existing Drive `Kairos/Media Archive`, with checksums and original-path mappings. The latest user instruction is to keep only the current delivery; older competition histories are separate. APWEN and Cleva preliminary now use Demo placeholders/PDF-only downloads. Their former four movie-bearing native web downloads and two hosted pitch movies are archived locally. `npm run build` runs the public-media guard. The current Faith/finale/shared room content and all historical local submissions are preserved.


The catalogue now has 47 editions, including earlier NextAI, Meta GITEX, Access Youth Tech Forge, Forge, JCI, APWEN and Faith application decks. Native/PDF galleries retain original visuals and notes where present; related scripts remain available. The July Forge original and later-cover seven-slide PDF are separate. The media archive is complete and checksum-verified in Drive. The local catalogue retains restore IDs; redundant local historical media copies were removed at the user's request. See the latest handoff before restoring media or resuming any transfer.

## Tentative Faith & Tech finale, 21 November

`faith_and_tech_finale_content.py` independently captures the current APWEN-based ten-slide script, Faith presenters, responsible-operation addition and requested closing order. Build with `npm run pitch:faith-and-tech-finale`. Route `/faith-and-tech-finale.html`; isolated preferences `kairos-faith-and-tech-finale-room-v1`. Qualification, date and pitch allowance are unconfirmed. All HTML/PowerPoint/Keynote/PDF versions have a Demo placeholder and no movie. The 3:17.7 demo stays locally in the sibling Demos/06 Faith and Tech Finale Demo folder by explicit request. Do not embed or upload it until the user supplies qualification/timing and requests final delivery. Production sources and checks are in `../../production/2026-11-21 Faith and Tech tentative finale/`; canonical native files are under the event's 04 Finale Pitch/deck/. No automatic snapshots or publication.

**Native notes, updated 22 November:** The current APWEN and Faith & Tech finale PowerPoint and Keynote decks must have no presenter notes or embedded spoken scripts. Keep narration in the browser and separate script downloads. Preserve the audience slides and embedded movies where applicable. Builders must respect `PAGE["include_presenter_notes"] = False`. This explicitly supersedes the earlier requirement for full native notes for these two finales; other competitions and historical submissions remain separate.

## Faith finale funding update, 26 November

The current finale has eleven slides and 450 live words. Responsible operation matches APWEN after the requested removal; the 24-word funding summary is slide 8, after What runs today. Native decks/PDF/previews and scripts agree, with no native notes or embedded movie. The original three-tab prize workbook is linked in All files. The organiser confirms five minutes in total and a 27 November, 6 p.m. WAT spreadsheet deadline. The full separate 3:17 recording is unchanged; no fitted schedule is claimed. Current production evidence: `../../production/2026-11-26 Faith and Tech funding plan/`. Do not use the earlier ten-slide native builder for this current edition. Other competition editions remain unchanged.


## Faith embedded APWEN demo, 27 November

The selected recording is the exact APWEN 159.1-second cut (displayed as 2:40), embedded on slide 5 in the current Faith PowerPoint and Keynote. Native notes remain empty. The HTML uses the same movie through its local picker, with the APWEN Drive link, fourteen transcript paragraphs, matching subtitles and a visible prize-spending spreadsheet link. Native video-bearing files stay in Drive. Current upload sources and verification are in `../../production/2026-11-27 Faith APWEN demo selection/`. The earlier movie-free Faith instructions are superseded for this edition.
