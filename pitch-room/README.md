# Kairos presentation rooms

Use the event and stage in every new room name. The original `/pitch.html` remains frozen.

| Canonical room | Content source | Current scope |
| --- | --- | --- |
| `/cleva-finale.html` | `cleva_finale_content.py` | Nine-slide current room, 741 presenter words, unchanged 10:25 web rehearsal plan; local final demo is 4:37 in Drive |
| `/cleva-preliminary.html` | `cleva_preliminary_content.py` | Archived Office Hours edition, 474 words, 7:50 including the video |
| `/apwen-semi.html` | `apwen_semi_content.py` | Existing ten-slide semi-final, 406 words, 4:50 including the 1:48 Forge cut |
| `/faith-and-tech-semis.html` | `faith_and_tech_semis_content.py` | Eleven slides, 536 words; concise visual slides 7–9 after Demo 6, with full corrected narration in scripts/notes |

`/apwen-finale.html` is reserved for a later request; it is not created by this build.

## Previous URLs

- `/cleva.html` serves the finale.
- `/cleva-pitch.html` serves the preliminary edition, recovered from the archive rather than copied from the finale.
- `/apwen-pitch.html` serves the semi-final.

Aliases are generated from their canonical page. Each stage has separate scripts, Q&A, preparation notes and manifest under `public/pitch-assets/<stage>/`. Canonical metadata identifies the stage. Finale and APWEN retain their prior browser preference keys; the preliminary and Faith & Tech rooms have independent preferences.

The original `cleva_pitch_content.py` and `apwen_pitch_content.py` filenames are compatibility imports. The frozen `cleva_content.py` is still the general/shared source; do not modify it for event work.

## Build

```sh
npm run pitch:build
npm run pitch:cleva-finale
npm run pitch:cleva-preliminary
npm run pitch:apwen-semi
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

`/all.html` lists current rooms and retained HTML/script editions. Run `npm run pitch:catalog` to rebuild the index from `deck-catalog.json`; importing retained local historical sources is an explicit `python3 scripts/build-deck-catalog.py --import-local` operation. The register is append-only for archived editions. Each presenter build snapshots its existing HTML before replacement, preserving slide/script text, removing hosted movie playback/downloads and giving the archive its own browser preferences. Original local sources remain untouched.

Keep demo videos and video-bearing PowerPoint/Keynote files in `~/Documents/Kairos` and the existing Drive `Kairos/Media Archive`, with checksums and original-path mappings. All earlier editions must be retained before replacement. APWEN and Cleva preliminary now use Demo placeholders/PDF-only downloads. Their former four movie-bearing native web downloads and two hosted pitch movies are archived locally. `npm run build` runs the public-media guard. The current Faith/finale/shared room content and all historical local submissions are preserved.


The catalogue now has 47 editions, including earlier NextAI, Meta GITEX, Access Youth Tech Forge, Forge, JCI, APWEN and Faith application decks. Native/PDF galleries retain original visuals and notes where present; related scripts remain available. The July Forge original and later-cover seven-slide PDF are separate. The media archive is complete and checksum-verified in Drive. The local catalogue retains restore IDs; redundant local historical media copies were removed at the user's request. See the latest handoff before restoring media or resuming any transfer.
