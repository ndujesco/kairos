# Kairos presenter page

The current `/pitch.html` supports both Cleva × Tether and APWEN LASU.
Its two representatives are **Sokenu Abigail and Omohuma Miracle**. It uses
the latest Faith & Tech deck design and the exact two portraits embedded in
the APWEN team slide. The product remains transparent giving.

The exported deck, speaker notes and main script contain no sponsor,
competition, track or event-date references. Separate event notes and the Prep
tab hold the two schedules and optional emphasis. The script is 367 words
for either speaker, with an estimated 3:00 rehearsal plan; the optional demo
is separate. Its length follows the short JCI Grand Finale script, while the
user's supplied JCI virtual script provides the voice and matching phrases.
The original school-fees story opens the problem; current implementation
limits remain explicit.

Use **Lead presenter** to choose Abigail or Miracle. That person can present
all eleven slides. The opening, team introduction, speaker badges and script
download update together, and the choice is remembered in this browser.
Both people and their original portraits stay on the team slide.

Edit `cleva_content.py` for the shared script, timing, event notes, demo guide
and 110 questions. Its original filename is retained for compatibility.
`pitch.css` and `pitch.js` control the page. `scripts/build-pitch.py` generates
`public/pitch.html`, the Markdown downloads and the content manifest. Do not
hand-edit the generated HTML.

```sh
npm run pitch:build
```

The generated HTML embeds all eleven slide previews and has no external font,
JavaScript or image dependency. It can be opened offline. Its PDF, PowerPoint
and Markdown download links work when served with `public/pitch-assets/`.

The full deck builder is kept in the competition's `02 Preliminary Pitch/`:

```sh
python3 '../hackathons/2026-10 Cleva x Tether Future of Payments/02 Preliminary Pitch/build_prepitch.py'
```

Run that from `website/` to rebuild the PowerPoint, PDF, slide previews, script,
Q&A and presenter HTML together. PowerPoint notes include both alternatives
for the opening and team introduction, with shared wording everywhere else.
`pitch-script.md` also includes both alternatives; `pitch-script-abigail.md`
and `pitch-script-miracle.md` are ready to read for the selected presenter.
Rebuilding the HTML alone does not regenerate the exported slide artwork or
PowerPoint notes. The older JCI artifacts remain in the pitch kit and its
historical competition folders.

The deck and video stay in their existing `02 Preliminary Pitch/deck/` folder.
The copied `demo.mp4` remains unchanged. The build does not rewrite it.
An earlier branded draft is retained in the competition's archive directory.

Presenter choice, question stars and preparation checkboxes stay in the browser.
No account, backend change or donation-data reset is needed for this page.
