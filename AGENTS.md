# Kairos website continuation

Read `CODEX_HANDOFF.md` first for current work, verification, deployment and the exact session locations. Read `../CLAUDE.md` when present for project boundaries and frozen pitch materials.

- This directory is the Next.js product repository, deployed as `kairos-community` on Vercel. Do not create a second hosted site.
- Keep the handoff current when the user adds requirements or work finishes. Never record environment secret values.
- Use a disposable `kairos_qa_*` database for tests that create accounts, causes, donations or uploads. Never run seed/reset/restore against the live data as a test.
- Keep demo intake between five and seven questions, request a supporting document at least once, accept supplied demonstration details/documents, and leave email optional. Documents can still be added later.
- The face video stays unmounted until a complete NIN and Start face check. Verification must not wait for video loading or completion.
- Do not edit generated pitch HTML, slide decks or competition archives for product UI work.
