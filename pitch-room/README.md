# Kairos presentation rooms

Use the event and stage in every new room name. The original `/pitch.html` remains frozen.

| Canonical room | Content source | Current scope |
| --- | --- | --- |
| `/cleva-finale.html` | `cleva_finale_content.py` | JCI-style native deck and previews, 755 words, 10:25 including the current 4:12 recording; Cleva-focused Q&A |
| `/cleva-preliminary.html` | `cleva_preliminary_content.py` | Archived Office Hours edition, 474 words, 7:50 including the video |
| `/apwen-semi.html` | `apwen_semi_content.py` | Existing ten-slide semi-final, 406 words, 4:50 including the 1:48 Forge cut |
| `/faith-and-tech-semis.html` | `faith_and_tech_semis_content.py` | JCI-style six-slide native deck and previews, 316 words, 3:20 pitch; demo separate |

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

Cleva finale retains the user's exact slide 1 paragraphs 2–3 and slide 4 paragraph 1. For Cleva only, the script treats a crowdfunding payment as complete when the money reaches its stated need. Slide 2 establishes that problem immediately after the introduction; slide 3 shows collection → holding for the bill → provider payment → donor receipts. Receipt/closing/short-script copy carries the same meaning without naming a sponsor. Other event rooms retain their trust framing. Its tailored question bank is defined in `cleva_finale_qa.py`: 38 questions, 21 priorities. Retained questions keep their IDs; new ones have separate IDs. The preliminary bank remains the original 110 questions.

The two current rooms use the new native-deck previews through `native_slides`. Their standalone HTML decks contain the same slide images. `build-pitch.py` still supports editable per-slide HTML overrides for other editions. Cleva's local video picker supplies the same recording to the Demo tab and pitch slide without uploading the file. Choose the accompanying MP4 before presenting; native PowerPoint/PDF exports do not embed the video.

Existing preliminary Cleva/APWEN and shared native files remain at their immutable paths. New finale files are isolated under `pitch-assets/cleva-finale/deck/`; their notes follow the current finale script. Only current finale and Faith & Tech pages/downloads changed in the JCI-style update. All older recordings remain intact.

Faith & Tech retains Abigail and Ugochukwu from its submitted application. The confirmed Kairos slot is 19 November, 6:30–6:45 p.m. WAT, with one minute for introductions, seven minutes for pitch/demo, five for Q&A and two for scoring. The user chose a three-minute pitch and will decide demo timing separately. Both current rooms link recorded narration in nine natural sections, PDF and separate SRT/VTT subtitles. The video has no burned subtitles. No research results have been invented; human review, reference replacement, private evidence and external reconciliation remain proposed. Current public Faith & Tech deck assets remain under `pitch-assets/faith-and-tech-semis/deck/` with new `-JCI-Style` names.

The copied-template builder for both new native decks is `../production/2026-11-19 JCI-style decks/build_decks.py` from the Kairos root, outside this Git repository. Read its README for the source template, LibreOffice export, validation and delivery locations. The older Faith & Tech builder and its original three-minute native exports remain available separately.

The latest Faith & Tech revision supersedes the three-minute plan above with 3:20. Its native filenames contain `3m20s-JCI-Style`, current notes match the 316-word script, and 40/45 seconds are reserved for technical approach and feasibility/responsible innovation. Validation is explicitly internal testing, with a proposed external pilot. Earlier three-minute exports remain preserved. Rebuild only this room for further Faith & Tech edits.

Native presentation downloads and historical competition submissions are preserved. The previous Cleva page/script is also archived in `02 Preliminary Pitch/archive/2026-11-17-before-grand-finale-script/`.
