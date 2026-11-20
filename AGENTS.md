# Kairos website continuation

Read `CODEX_HANDOFF.md` first for current work, verification, deployment and the exact session locations. Read `../CLAUDE.md` when present for project boundaries and frozen pitch materials.

- This directory is the Next.js product repository, deployed as `kairos-community` on Vercel. Do not create a second hosted site.
- Keep the handoff current when the user adds requirements or work finishes. Never record environment secret values.
- Use a disposable `kairos_qa_*` database for tests that create accounts, causes, donations or uploads. Never run seed/reset/restore against the live data as a test.
- Preserve the depth of the original Ugo demo interview: explore the need, named payee/budget, payment reference, evidence, circumstances and urgency. Cap it at eight questions with no numeric minimum. Do not stop merely after collecting a name, school and amount. Accept supplied demonstration details and documents, allow later uploads, and leave email optional.
- The interview must use real Anthropic replies. Never silently substitute the legacy scripted fallback; preserve the failed answer and offer retry when AI is unavailable. The current funded key resolved the prior credits issue.
- The face video stays unmounted until a complete NIN and Start face check. Verification must not wait for video loading or completion.
- Do not edit generated pitch HTML, slide decks or competition archives for product UI work.
- Preserve old demo/deck/script editions before replacement. Presenter builds snapshot the existing HTML into `public/pitch-archive` and register it in `pitch-room/deck-catalog.json`; `/all.html` lists the editions. Never publish video-bearing PowerPoint/Keynote files or pitch movies. Historical media is verified in the existing Drive `Kairos/Media Archive`; `~/Documents/Kairos` keeps its catalogue and restore records. The user requested removal of redundant archive/upload copies on 20 November: keep the five current videos in `~/Desktop/Kairos - Upload remaining files/01 Current demos`, retain original working/source and presentation files, and do not automatically recreate the full local archive. `npm run build` checks public presentation media. Historical submission links stay intact.
- For subsequent media work, upload raw recordings and superseded/intermediate edits to the same Drive archive, verify checksums, and record IDs and restore locations. Keep finished demos and active editing inputs on the laptop; remove unnecessary local archive copies after verification.
