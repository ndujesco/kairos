# Kairos presentation rooms

The agnostic `/pitch.html` and all its shared downloads remain unchanged.
The event rooms now have independent decks, scripts, assets and video playback:

| Room | Source | Slides | Full rehearsal plan |
| --- | --- | --- | --- |
| `/cleva-pitch.html` | `cleva_pitch_content.py` | 8 | 7:50 |
| `/apwen-pitch.html` | `apwen_pitch_content.py` | 12 | 7:37 |

Both durations include the unchanged 3:47.033 recording, an introduction and
pauses. These are rehearsal plans; neither organiser has confirmed that exact
allowance. The recording is before Team and Thank You in both decks. Only
Abigail and Miracle appear; either can be selected to present the whole script.

Cleva follows the latest Office Hours brief: Problem, Solution, Demo & Progress.
Abigail's voice note informs the payment framing: a transfer can reach an
account without paying the intended bill. The shorter deck connects money given
to a published budget, controlled direct provider payment and donor receipt.
The prototype, simulated parts and proposed Cleva connection stay distinct.
APWEN retains the previous spoken content and original slide subjects, adding
the demonstration before the last two slides. Its format can change separately.

Each `public/pitch-assets/{cleva,apwen}/` contains its own deck PDF/PPTX, slide
previews, `demo.mp4`, scripts, Q&A, event notes and manifest. The PPTX contains
an internal MP4, not just a link. Native `.key` copies open directly in Keynote, with editable objects, notes
and embedded video verified in the app. The PPTX notes-master registration is
repaired for Keynote import too. The demo slide contains only the video; press
Play. PDF copies show a static poster. The browser Demo tab shows only the same video player; press Play. Playback
position is retained between Pitch and Demo, and leaving for Q&A pauses it.

```sh
# Build event pages/scripts from already exported decks; preserve agnostic files
npm run pitch:build
npm run pitch:cleva
npm run pitch:apwen
```

To rebuild native event decks, preview images, notes and both pages together,
run from the Kairos root:

```sh
python3 'hackathons/2026-10 Cleva x Tether Future of Payments/02 Preliminary Pitch/build_prepitch.py'
```

Use `--pages-only` when deck assets are already current. The old agnostic deck
and page are regenerated only with the explicit `--rebuild-shared-deck` flag;
do not use that for event edits. Safe builds hash-check the frozen agnostic
HTML and shared assets. Never hand-edit generated public HTML.

Local bundles:

- Cleva: `hackathons/2026-10 Cleva x Tether Future of Payments/02 Preliminary Pitch/cleva/`.
- APWEN: `hackathons/2026-10 APWEN LASU/02 Virtual Pitch/`.

Each has `deck/`, adjacent `demo.mp4`, Markdown scripts and an offline HTML page
with local relative paths. Leave those files together for offline video playback.
The original deck/demo in the old shared folder remain preserved.

The recording is an earlier prototype walkthrough. Its narration includes
intended verification/custody/settlement claims, so the new spoken introduction
makes the unbuilt and simulated parts explicit. No live donations, approved
Cleva integration or signed custody partner are claimed. The official Cleva
research remains in its own Prep tab and sources download.
