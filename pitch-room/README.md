# Kairos presentation rooms

Use the event and stage in every new room name. The original `/pitch.html` remains frozen.

| Canonical room | Content source | Current scope |
| --- | --- | --- |
| `/cleva-finale.html` | `cleva_finale_content.py` | JCI-style native deck and previews, 755 words, 10:25 including the current 4:12 recording; Cleva-focused Q&A |
| `/cleva-preliminary.html` | `cleva_preliminary_content.py` | Archived Office Hours edition, 474 words, 7:50 including the video |
| `/apwen-semi.html` | `apwen_semi_content.py` | Existing ten-slide semi-final, 406 words, 4:50 including the 1:48 Forge cut |
| `/faith-and-tech-semis.html` | `faith_and_tech_semis_content.py` | Expanded 15-slide feedback draft, 1,396 words, no delivery schedule; selected JCI demo before closing and final team slide |

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

The two current rooms use the new native-deck previews through `native_slides`. Their standalone HTML decks contain the same slide images. `build-pitch.py` still supports editable per-slide HTML overrides for other editions. Cleva's local video picker supplies the same recording to the Demo tab and pitch slide without uploading the file. Choose the accompanying MP4 before presenting. Cleva's native export keeps the recording separate. Faith & Tech's new PowerPoint embeds its selected original-audio JCI video; the PDF has a static poster.

Existing preliminary Cleva/APWEN and shared native files remain at their immutable paths. New finale files are isolated under `pitch-assets/cleva-finale/deck/`; their notes follow the current finale script. Only current finale and Faith & Tech pages/downloads changed in the JCI-style update. All older recordings remain intact.

Faith & Tech retains Abigail and Ugochukwu from its submitted application, with Ugochukwu the default presenter. The current expanded draft has no delivery schedule. It preserves the user's exact opening/problem/solution and frozen shared visuals 1, 2, 3, 5, 6 and 7, including the scripts for 5–7. Suggested slides then cover technical approach, human review/expired references, privacy, reconciliation, internal validation and a concrete pilot plan.

Slide 13 uses the selected `kairos-jci-demo-original-audio.mp4`, copied unchanged from the Desktop JCI comparison folder. Slide 14 tells the department president's concern on the closing page. Meet the team is slide 15 and last, with full role descriptions. This is early problem feedback, not a product endorsement or completed pilot. Human review, private evidence/redaction and external reconciliation remain planned.

Current native files and previews are under `pitch-assets/faith-and-tech-semis/feedback-draft/`. The PowerPoint embeds the selected video. The browser room and standalone deck use a local video picker; the PDF is static. Earlier public download paths remain intact. Previous Desktop/event current files are archived separately. Old Faith narration and its subtitle files do not match this JCI recording.

The current Faith builder is `../production/2026-11-19 Faith and Tech feedback draft/build_deck.py` from the Kairos root. Its README and verification/delivery manifests record the copied OOXML fallback, native notes, source equality and protected assets. The old two-event JCI-style builder remains for its historical edition; do not run it over the expanded current Faith deck. Rebuild only this room after content changes. Timing can be set after the user edits the complete content.

Native presentation downloads and historical competition submissions are preserved. The previous Cleva page/script is also archived in `02 Preliminary Pitch/archive/2026-11-17-before-grand-finale-script/`.
