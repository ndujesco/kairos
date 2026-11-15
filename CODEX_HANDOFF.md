# Kairos website handoff

Updated: 15 November 2026. Workspace: `/Users/ndujekwuugochukwu/Documents/CODE/hackathon/Kairos`; Git repository: its `website/` directory. Live app: https://kairos-community.vercel.app. GitHub: https://github.com/ndujesco/kairos.

## Resume here

This is the continuation of codex3’s **Edit website** conversation. The user asked for a focused review, then implementation; do not repeat the exhaustive document review.

- Source full history (left intact): `/Users/ndujekwuugochukwu/.codex-acc3/sessions/2026/11/15/rollout-2026-11-15T13-07-51-01a1df1b-4f9f-7b32-b90f-11846e43d87c.jsonl`.
- Current full working history, codex4: `/Users/ndujekwuugochukwu/.codex-acc4/sessions/2026/11/15/rollout-2026-11-15T13-15-32-01a1df22-57a8-78d2-bb2c-b53e0cd402df.jsonl`.
- Current task ID: `01a1df22-57a8-78d2-bb2c-b53e0cd402df`, title **Continue website edit**.
- The parent `CLAUDE.md` describes competition boundaries. No slide/deck/pitch changes are part of this task.

## User’s requested behavior

1. All existing accounts use `password`. Reset hashes, without reseeding or changing account identities or financial history.
2. Shared cause links tell signed-out visitors their donation will be anonymous. Guest checkout must actually work and store anonymous gifts server-side. Account holders may also choose anonymity.
3. Keep the familiar Twitter-style social layout; the user also encouraged creativity in the rest of the design. Preserve Kairos branding and working actions.
4. A clear handoff with exact session paths is required.
5. Replace the Anthropic key in **PrinceBooks (CTY), Invoicer and Kairos**, including Vercel. The user saved the replacement directly into Kairos `website/.env.local`. Never print it or put it in this document.
6. Demo AI intake should be fast and ask no more than five questions. Accept explicitly supplied example/demonstration details without mentioning the internal demo context in the assistant’s replies. Documents are accepted without strict identification/content validation. Users can upload during creation and return to add documents after publication.
7. Fix the long wait between identity step 3 and checks step 4. Sample-video playback must not block verification or publication. Show visible errors and allow retry after timeouts.
8. Email stays optional at signup and login. Existing account contacts: `abby` → `sokenuabigail@gmail.com`; `bukky` → `ugondu635@gmail.com`.
9. Face-scan area is blank until the NIN is complete and **Start face check** is pressed. No first-frame face preview before that.

## Implemented and verified so far

- All 13 pre-existing accounts were checked; three password hashes changed. All 13 then verified against `password`. Normal password verification remains in place, and new signups retain the password they choose.
- Abby/Bukky email updates were saved and read back from the current database. `scripts/demo-reset.mjs` preserves these requested demo addresses on future resets. Do not run that reset just to test the site.
- Guest donations have `donor: null` and `anonymous: true`, irrespective of a spoofed client anonymous flag. Registered donor attribution and upkeep are preserved. Payout skips personal notifications for guests; guests follow the public ledger. Personal receipts require a signed-in account.
- Refreshed desktop/mobile navigation, active states, real For you/Latest sorting, giving prompt, actual search, timeline media/category treatment and ledger impact panel. Guests get the same readable cause layout. Brand accent stays green; typography and controls follow the Twitter-style layout.
- File uploads persist in MongoDB `supportingfiles`. Up to 10 files per cause, 3 MB each (fits Vercel request limits). PDF/images/Word/text accepted. Unpublished attachments are owner-only. Published attachments become public. Only owners may attach to an existing cause. HTML/SVG are excluded; files are served with nosniff/sandbox headers. This is storage/attachment support, not real document authentication.
- `src/lib/interview.ts` shares the five-question limit and bounded fallback with browser and server. Haiku has a 10-second timeout, no automatic retries, and a 14-second browser deadline. Initial greeting is local and immediate. Demo instructions and attachment names are included in model context. Live warm checks took ~2.4 seconds for a follow-up and ~5.7 seconds to assemble a complete cause; first structured response can take longer.
- Identity saves in parallel with a short visual step, has a six-second request deadline, and no longer waits for video end or the prior 20-second watchdog. Publication has a 12-second deadline and draft request ID so retrying publication reuses its existing cause. Errors return the creator to an editable/retryable screen. Face media is conditionally mounted only after Start.
- Production build and 19 integration checks passed. Checks ran only on disposable database `kairos_qa_01a1df22` at port 3010, with real inbox addresses removed. Coverage includes optional email, incorrect password rejection, guest anonymity, fee accounting, payouts with guest gifts, upload access before/after publication, owner-only additions, repeat publication, live AI acceptance of demo details, question cap and feed tabs.

## Key rotation and deployments

Vercel CLI is authenticated as `ndujesco`. Scope: `ndujescos-projects-c1263a0d` (`team_EBdjPdMA7KgSJj7seAvvCHZo`). Use the existing projects and preserve access/settings.

- Kairos: `kairos-community`, `prj_cMza32245jgZJXRFbkYFwqGqS4EL`.
- Invoicer: `invoicer`, `prj_OT1gtCM0GT2HzRNTT0j1ZB3BVwLe`; https://invoicer-one-azure.vercel.app.
- PrinceBooks: `ctybooksource`, `prj_bzvaAR4lKzuYWFdbdusKu4tDE7uT`; https://ctybooksource.vercel.app.

All three existing ANTHROPIC_API_KEY records were updated as secrets for their existing production+preview targets. Local Kairos and `/Users/ndujekwuugochukwu/Documents/CODE/personal/invoicer/.env.local` match. A local PrinceBooks checkout was not found; its Vercel setting was updated.

Invoicer deployment `dpl_CjJruvjhbkmMV4JgszwytAzSxtNQ` is READY and owns its live alias. PrinceBooks deployment `dpl_BHfL1j1wMgv6Fcmw8ZZLpiwR6Whd` is READY and owns its live alias. An earlier PrinceBooks retry failed on a transient Next font build error; retry succeeded. These were redeployments of the existing sources with the new environment.

Kairos is being published through the existing GitHub/Vercel integration after a direct CLI upload returned a network fetch error. All functional checks passed; browser QA confirmed real PDF preview, the blank face placeholder and a readable 360-pixel phone layout. Final deployment verification remains to be recorded below.

## Files and commands

- UI: `src/app/page.tsx`, `src/app/layout.tsx`, `src/components/{Sidebar,MobileNav,RightRail,CauseCard,NavIcon}.tsx`, `src/app/globals.css`.
- Guest giving: `src/components/DonateModal.tsx`, `src/app/cause/[slug]/{page,CauseActions}.tsx`, `src/app/api/causes/[id]/{donate,disburse}/route.ts`, donation schema in `src/lib/models.ts`.
- Intake and identity: `src/app/create/CreateWizard.tsx`, `src/app/api/ai/interview/route.ts`, `src/lib/interview.ts`.
- Uploads: `src/components/EvidenceUpload.tsx`, `src/lib/supporting-files.ts`, `src/app/api/evidence/route.ts`, `src/app/api/evidence/[id]/route.ts`, publication route `src/app/api/causes/route.ts`.
- Password reset only: `npm run accounts:passwords` (safe to repeat; updates only differing password hashes).
- Build: `npm run build`. Do not rebuild over a running production preview’s `.next` files; stop/restart the preview after builds.
- Integration checks: `KAIROS_QA_DB=<matching_disposable_db_name> node --env-file=.env.local scripts/verify-demo-flow.mjs`, with a QA-configured server already running on port 3010. Never point that server at the live database. The test creates fictional records in the selected QA database only.
- Old database snapshots intentionally restore old state, including passwords/contacts. Reapply the current requested demo password/contact settings after restoring an old snapshot.

## Next actions if interrupted

Finish the blank-face/browser creation check against the final build, including mobile layout. Verify attachments render using an actual PDF. Publish the existing Kairos Vercel project, verify the live result, record its commit/deployment here, stop the QA server and drop only the disposable `kairos_qa_01a1df22` database. Root `HISTORY.md` needs the final outcome entry. No key values belong in any tracked file.
