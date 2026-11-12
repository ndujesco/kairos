# Kairos pitch rooms

Three independent URLs now serve the presentation:

- `/pitch.html`: the original general page, preserved exactly.
- `/apwen-pitch.html`: an exact copy of that page for APWEN, preserved separately.
- `/cleva-pitch.html`: the Cleva edition, with its own script, preparation notes,
  questions and downloads under `pitch-assets/cleva/`.

All rooms retain the original eleven slide images and only Abigail and Miracle's
portraits. The native PDF, PowerPoint, existing notes and demo video are unchanged.
The general/APWEN script is 410 words with a 3:27 rehearsal plan. Cleva is
428 words with a 3:30 plan, excluding the optional demo.

The Cleva edition keeps the original spoken text except the slide 8 passage. It explores funding from supporters abroad,
using Cleva only if the giving use case and integration access are confirmed.
Licensed custody needs a separate arrangement. No Cleva or stablecoin integration,
approved donation collection, API access or signed partnership is claimed.
The Prep tab and `sources.md` link the official product and policy sources.

`cleva_content.py` is the legacy filename for the general content. Native deck
tooling still imports it. Leave it alone when tailoring Cleva; edit
`cleva_pitch_content.py` instead. CSS and JS remain shared source, but each
published HTML embeds its own copy. Updating Cleva does not regenerate the two
preserved HTML files. Cleva's presenter choice, stars and checkboxes use separate
browser storage, and its presenter switch retains Cleva download URLs.

```sh
# Safe default: create APWEN if missing; build Cleva without rewriting originals
npm run pitch:build

# Cleva only
npm run pitch:cleva

# Explicitly regenerate the original general page, only when requested
npm run pitch:shared
```

The safe commands check hashes before and after building. Existing APWEN HTML
is never overwritten. `scripts/build-pitch.py` generates Cleva HTML and all its
Markdown downloads from tracked source; do not hand-edit generated HTML.
Both Cleva presenter scripts use identical timings and update the opening and
team introduction. All images/fonts/scripts needed for presenting are embedded;
HTTP downloads require the accompanying `pitch-assets/` directory.

To build the rooms and copy the Cleva materials into the existing prep folder,
run from the Kairos root:

```sh
python3 'hackathons/2026-10 Cleva x Tether Future of Payments/02 Preliminary Pitch/build_prepitch.py'
```

That command now preserves the native deck by default. Its explicit
`--rebuild-shared-deck` option also rebuilds the original native deck/notes and
general page; use it only for an authorised shared-deck revision. It does not
rewrite the existing APWEN HTML snapshot. Those rooms still reference common
deck assets, so a deliberate shared-deck change affects their deck downloads.

The latest general solution expansion was script-only, so the native notes
retain their older wording. Use each room's page or Markdown script for its
current spoken text. Historical JCI artifacts remain untouched.

The later authorised common edit restores the fraud line as an aim on all three
pages. Team and Thank You remain the last two main sections. The general page
was deliberately regenerated and copied to APWEN for that edit; routine builds
continue to preserve both files. Other general spoken sections are unchanged.
