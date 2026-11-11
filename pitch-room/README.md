# Kairos presenter page

The current `/pitch.html` is the Cleva × Tether preliminary-pitch edition.
Its two representatives are **Sokenu Abigail and Omohuma Miracle**. It uses
the latest Faith & Tech deck design and the exact two portraits embedded in
the APWEN team slide. The product remains transparent giving.

Edit `cleva_content.py` for the script, timing, demo guide and 100 questions.
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

Question stars and preparation checkboxes are stored only in the browser.
No account, backend change or donation-data reset is needed for this page.
