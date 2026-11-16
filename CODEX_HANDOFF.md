# Kairos website handoff

Updated: 16 November 2026. Workspace: `/Users/ndujekwuugochukwu/Documents/CODE/hackathon/Kairos`; Git repository: its `website/` directory. Live app: https://kairos-community.vercel.app. GitHub: https://github.com/ndujesco/kairos.

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
10. Store supporting files in Cloudinary instead of MongoDB. Preserve upload behavior, existing URLs and draft privacy. Credentials were supplied directly in the ignored local environment file; no values belong in this handoff.
11. The product UI should read as a normal live flow: no visible prototype, simulated-settlement, sample-capture or demo labels, and no question-limit caption. The presenters will explain the prototype context verbally. Keep the internal five-question cap, deadlines, demo acceptance and existing operational behavior; do not reintroduce these labels in later edits.

## Implemented and verified so far

- All 13 pre-existing accounts were checked; three password hashes changed. All 13 then verified against `password`. Normal password verification remains in place, and new signups retain the password they choose.
- Abby/Bukky email updates were saved and read back from the current database. `scripts/demo-reset.mjs` preserves these requested demo addresses on future resets. Do not run that reset just to test the site.
- Guest donations have `donor: null` and `anonymous: true`, irrespective of a spoofed client anonymous flag. Registered donor attribution and upkeep are preserved. Payout skips personal notifications for guests; guests follow the public ledger. Personal receipts require a signed-in account.
- Refreshed desktop/mobile navigation, active states, real For you/Latest sorting, giving prompt, actual search, timeline media/category treatment and ledger impact panel. Guests get the same readable cause layout. Brand accent stays green; typography and controls follow the Twitter-style layout.
- File bytes now upload to Cloudinary as authenticated raw assets. MongoDB `supportingfiles` contains only metadata, provider IDs, size/checksum, owner and cause linkage. Up to 10 files per cause, 3 MB each (fits Vercel request limits). PDF/images/Word/text accepted. Unpublished attachments are owner-only. Published attachments become public. Only owners may attach to an existing cause. HTML/SVG are excluded; files are served with nosniff/sandbox headers. This is storage/attachment support, not real document authentication.
- `src/lib/interview.ts` shares the five-question limit and bounded fallback with browser and server. Haiku has a 10-second timeout, no automatic retries, and a 14-second browser deadline. Initial greeting is local and immediate. Demo instructions and attachment names are included in model context. Live warm checks took ~2.4 seconds for a follow-up and ~5.7 seconds to assemble a complete cause; first structured response can take longer.
- Identity saves in parallel with a short visual step, has a six-second request deadline, and no longer waits for video end or the prior 20-second watchdog. Publication has a 12-second deadline and draft request ID so retrying publication reuses its existing cause. Errors return the creator to an editable/retryable screen. Face media is conditionally mounted only after Start.
- Production build and 19 integration checks passed. Checks ran only on disposable database `kairos_qa_01a1df22` at port 3010, with real inbox addresses removed. Coverage includes optional email, incorrect password rejection, guest anonymity, fee accounting, payouts with guest gifts, upload access before/after publication, owner-only additions, repeat publication, live AI acceptance of demo details, question cap and feed tabs.

## Key rotation and deployments

Vercel CLI is authenticated as `ndujesco`. Scope: `ndujescos-projects-c1263a0d` (`team_EBdjPdMA7KgSJj7seAvvCHZo`). Use the existing projects and preserve access/settings.

- Kairos: `kairos-community`, `prj_cMza32245jgZJXRFbkYFwqGqS4EL`.
- Invoicer: `invoicer`, `prj_OT1gtCM0GT2HzRNTT0j1ZB3BVwLe`; https://invoicer-one-azure.vercel.app.
- PrinceBooks: `ctybooksource`, `prj_bzvaAR4lKzuYWFdbdusKu4tDE7uT`; https://ctybooksource.vercel.app.

All three existing ANTHROPIC_API_KEY records were updated as secrets for their existing production+preview targets. Local Kairos and `/Users/ndujekwuugochukwu/Documents/CODE/personal/invoicer/.env.local` match. PrinceBooks was later restored to `/Users/ndujekwuugochukwu/Documents/CODE/personal/ctybooksource`; its ignored local environment now has the same new Anthropic key plus a verified MongoDB connection to `bookDB`. See the root handoff for restoration details.

Invoicer deployment `dpl_CjJruvjhbkmMV4JgszwytAzSxtNQ` is READY and owns its live alias. PrinceBooks deployment `dpl_BHfL1j1wMgv6Fcmw8ZZLpiwR6Whd` is READY and owns its live alias. An earlier PrinceBooks retry failed on a transient Next font build error; retry succeeded. These were redeployments of the existing sources with the new environment.

Kairos release commit `5bfc52d88817f5c6790b4cabe06f72f2db48105f` was pushed to `main` and deployed through the existing GitHub integration. Deployment `dpl_6iSDHhsqyjaC1BiEfNnLjoinzHEK` is READY and owns `kairos-community.vercel.app`. Its deployment URL is https://kairos-community-117ypmle6-ndujescos-projects-c1263a0d.vercel.app. A direct CLI upload had a network fetch error; the GitHub deployment succeeded.

Live checks passed for handle/password login, the guest-anonymity notice on a shared cause, and the unchanged APWEN page. All 13 existing accounts were also authenticated successfully against the live login endpoint. Browser QA confirmed actual PDF upload and rendering, a blank face placeholder before NIN/Start, a readable 360×740 phone layout, and the complete interview → draft → identity → published cause flow with its document attached. Both face video URLs return 200 with the expected video MIME type. Media decode failure cannot block the identity save.

The owned QA server is stopped and only `kairos_qa_01a1df22` was dropped. No fictional test causes/accounts/documents were written to the live database. No outstanding implementation work remains for the requests listed above.

## Files and commands

- UI: `src/app/page.tsx`, `src/app/layout.tsx`, `src/components/{Sidebar,MobileNav,RightRail,CauseCard,NavIcon}.tsx`, `src/app/globals.css`.
- Guest giving: `src/components/DonateModal.tsx`, `src/app/cause/[slug]/{page,CauseActions}.tsx`, `src/app/api/causes/[id]/{donate,disburse}/route.ts`, donation schema in `src/lib/models.ts`.
- Intake and identity: `src/app/create/CreateWizard.tsx`, `src/app/api/ai/interview/route.ts`, `src/lib/interview.ts`.
- Uploads: `src/components/EvidenceUpload.tsx`, `src/lib/cloudinary.ts`, `src/lib/supporting-files.ts`, `src/app/api/evidence/route.ts`, `src/app/api/evidence/[id]/route.ts`, publication route `src/app/api/causes/route.ts`.
- Password reset only: `npm run accounts:passwords` (safe to repeat; updates only differing password hashes).
- Build: `npm run build`. Do not rebuild over a running production preview’s `.next` files; stop/restart the preview after builds.
- Integration checks: `KAIROS_QA_DB=<matching_disposable_db_name> node --env-file=.env.local scripts/verify-demo-flow.mjs`, with a QA-configured server already running on port 3010. Never point that server at the live database. The test creates fictional records in the selected QA database only.
- Old database snapshots intentionally restore old state, including passwords/contacts. Reapply the current requested demo password/contact settings after restoring an old snapshot.

## 16 November Cloudinary change

- Added the official Cloudinary SDK and `src/lib/cloudinary.ts`. Uploads preserve original bytes as `raw`/`authenticated` assets with a `kairos/evidence/` public-ID prefix. No unsigned asset URL or API secret is sent to the browser.
- `/api/evidence/<id>` checks access before streaming a server-signed CDN response. Unpublished uploads remain owner-only; published causes retain public document viewing through the app.
- New file records store provider IDs and SHA-256/size, without MongoDB binary contents. Legacy MongoDB reads remain compatible during rollout.
- `npm run evidence:migrate` (Node 22+) uploads each old binary, verifies its download checksum, then atomically replaces the binary with Cloudinary metadata while keeping the same file ID/links. Initial live check found zero old files to migrate. Check again after deployment in case someone uploaded during rollout.
- Configured `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` locally and as Vercel secrets for production+preview. Authentication, real upload/download byte equality and unsigned-access rejection were verified. Use `CLOUDINARY_UPLOAD_FOLDER=kairos/qa/<run>` only for isolated QA.
- Added `scripts/verify-cloudinary-migration.mjs` to cover PDF bytes/headers, draft access, legacy links and verified migration. Test against a fresh `kairos_qa_*` database at port 3010; remove only that run’s Cloudinary assets before dropping its QA collections.
- A regression check caught Haiku mentioning internal demo context despite the prompt. Added `publicInterviewReply` to suppress those sentences deterministically, with a clean fallback.
- Production build and 20 demo-flow checks passed. Three additional checks passed for PDF delivery, legacy document access and checksum-verified migration. The demo-context response guard has deterministic regression checks as well. Final deployment and cleanup details are recorded in the workspace-root `CODEX_HANDOFF.md` follow-up, so this tracked document does not require another deployment just to record its own deployment ID.

## Next session

16 November UI-copy follow-up: removed prototype/simulation wording from the impact card, right-rail guidance/footer, checkout, document note and identity step. Removed the interview's question counter/limit caption entirely. The AI prompt also keeps question limits and timing details out of replies, cause text and checks. These are presentation changes only; no new bank/registry integrations or verification capabilities were added. Build and final deployment status are recorded in the root handoff after release.

The requested release is complete. Read this file, inspect `git status`, and continue from the user’s next edit request. Do not repeat account resets, key rotation, an exhaustive archive review or destructive demo reset unless a new task requires it. The full histories above remain intact. Later documentation-only commits may follow the application release commit without changing its behavior.
