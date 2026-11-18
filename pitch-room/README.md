# Kairos presentation rooms

Use the event and stage in every new room name. The original `/pitch.html` remains frozen.

| Canonical room | Content source | Current scope |
| --- | --- | --- |
| `/cleva-finale.html` | `cleva_finale_content.py` | User-corrected finale script, 755 words, 10:00 including the existing video; Cleva-focused Q&A |
| `/cleva-preliminary.html` | `cleva_preliminary_content.py` | Archived Office Hours edition, 474 words, 7:50 including the video |
| `/apwen-semi.html` | `apwen_semi_content.py` | Existing ten-slide semi-final, 406 words, 4:50 including the 1:48 Forge cut |
| `/faith-and-tech-semis.html` | `faith_and_tech_semis_content.py` | Six-slide, 328-word, three-minute pitch with native PowerPoint/PDF; demo separate |

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

The Cleva finale browser uses editable HTML visuals for slides 2–3 through the per-slide `visual` field; remaining slides use their existing previews. `build-pitch.py` supports these partial HTML overrides. The fullscreen size is explicit to prevent a zero-width HTML slide.

Existing native Cleva/APWEN PDF, PowerPoint, Keynote, previews and videos remain at their prior immutable asset paths. Stage text downloads are separate. The existing native Cleva notes precede the latest finale script; use the browser/Markdown finale script as the current rehearsal copy. No new demo was recorded or substituted.

Faith & Tech uses native HTML slide elements through `web_deck.py` and `web-deck.css`, with standalone HTML and native PowerPoint/PDF downloads. It retains Abigail and Ugochukwu from its submitted application. The confirmed Kairos slot is 19 November, 6:30–6:45 p.m. WAT, with one minute for introductions, seven minutes for pitch/demo, five for Q&A and two for scoring. The user chose a three-minute pitch and will decide demo timing separately. The Demo tab links the four-part Faith & Tech/general voiceover, rather than the older recording. No user research results have been invented; human review, reference replacement, private evidence and external reconciliation remain proposed. The native builder and event copies are in `hackathons/2026-10 Faith & Tech Conference/03 Semi-final Pitch/` outside this Git repository. Current public deck assets are under `pitch-assets/faith-and-tech-semis/deck/`.

Native presentation downloads and historical competition submissions are preserved. The previous Cleva page/script is also archived in `02 Preliminary Pitch/archive/2026-11-17-before-grand-finale-script/`.
