# Kairos presenter page

The current `/pitch.html` supports both Cleva × Tether and APWEN LASU.
Its two representatives are **Sokenu Abigail and Omohuma Miracle**. It uses
the latest Faith & Tech deck design and the exact two portraits embedded in
the APWEN team slide. The product remains transparent giving.

The exported deck, speaker notes and main script contain no sponsor,
competition, track or event-date references. Separate event notes and the Prep
tab hold the two schedules and optional emphasis. The script is 578 words,
with an estimated 4:45 rehearsal plan; the optional demo is separate.

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
Q&A and presenter HTML together. PowerPoint notes use the same spoken script.
Rebuilding the HTML alone does not regenerate the exported slide artwork or
PowerPoint notes. The older JCI artifacts remain in the pitch kit and its
historical competition folders.

The deck and video stay in their existing `02 Preliminary Pitch/deck/` folder.
The copied `demo.mp4` remains unchanged. The build does not rewrite it.
An earlier branded draft is retained in the competition's archive directory.

Question stars and preparation checkboxes are stored only in the browser.
No account, backend change or donation-data reset is needed for this page.
