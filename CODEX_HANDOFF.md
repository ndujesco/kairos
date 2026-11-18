# Kairos website handoff

Updated: 18 November 2026. Workspace: `/Users/ndujekwuugochukwu/Documents/CODE/hackathon/Kairos`; Git repository: its `website/` directory. Live app: https://kairos-community.vercel.app. GitHub: https://github.com/ndujesco/kairos.

## Current follow-up: Cleva crowdfunding payments, 18 November

Latest slide 3 correction: inserted “How do we do this?” as a separate paragraph between the controlled-payment-flow explanation and “First, the cause gets checked.” Both presenter downloads and local Grand Finale copies agree. Current script: 755 words, same 10:00 plan.

Latest wording correction: Cleva finale slide 1 now begins “Kairos is a transparent crowdfunding platform…” instead of “Which is…”, for both presenters and script downloads. Other rooms are unchanged; the word count remains 750.

The user explicitly limited this change to Cleva; other competitions keep their trust-focused framing. Their central point is now carried throughout the Cleva script: a crowdfunding payment is complete when the money reaches the need it was given for. Kairos is described as the system designed to control that route from contributors to the named institution, with receipts linking the outcome to each donor.

Slide 2, immediately after the introduction, is “The money arrived. But was the bill paid?” It preserves the school-fees story, then explains separate transfers versus the intended school payment. Slide 3 has an editable browser flow: collect contributions → hold for the stated bill → pay the institution → send donor receipts. Introduction, receipt, closing, short explanation and first Q&A answer reinforce this meaning. The user's exact prior introduction paragraphs and receipt sentence are preserved. The spoken script remains sponsor-free.

Only the finale page/alias and its downloads are regenerated: eight slides, 755 words, unchanged 10:00 rehearsal plan and 3:47 recording. Browser slides 2–3 use per-slide `visual` overrides in `cleva_finale_content.py`, rendered by `web_deck.py`; other slide previews and all native PDF/PPTX/Keynote files remain their earlier edition. Do not describe those native downloads as updated. Preliminary, APWEN, Faith & Tech and general rooms/media were preserved by hashes. No product code or live data changed. The user is still handling pushing.

Validation: generator and JavaScript checks passed; both presenter scripts are 755 words with the same 10:00 plan. Canonical/legacy finale pages agree. Exact user paragraphs, unchanged sections, Q&A IDs and 66 protected files were checked. Native Edge review verified the early problem and four-step flow at presentation size, including the corrected fullscreen layout. The owned static preview is stopped. No database tests were needed for this presentation-only change. Commit this follow-up locally and leave pushing to the user.

## Previous follow-up: stage rooms and camera-opening transition

The user requested explicit event/stage URLs. Canonical pages are `/cleva-finale.html`, `/cleva-preliminary.html`, `/apwen-semi.html` and the proposed `/faith-and-tech-semis.html`. Legacy `/cleva.html` stays on the finale; `/cleva-pitch.html` now serves the recovered preliminary edition; `/apwen-pitch.html` serves the semi-final. APWEN finale is reserved, not created.

Read `pitch-room/README.md` for the source and build map. Stage downloads and preferences are isolated. Existing APWEN script, native decks and recordings are preserved; the preliminary script is recovered from the 17 November archive. Faith & Tech is a new HTML deck with Abigail/Ugochukwu, an unconfirmed 9:30 rehearsal plan and no invented research. The user confirmed no per-team limit has arrived.

The latest spoken finale script is 750 words, retaining the 10:00 plan and the user’s exact slide 1/4 wording. A light payments pass adds per-cause contribution accounting, matching payouts to their budget and donor shares. It contains no sponsor name, including the short explanation; event metadata and the specifically requested Cleva Q&A remain event-specific. The demo remains unchanged.

The user additionally requested Cleva-specific finale Q&A. `cleva_finale_qa.py` supplies 38 questions (21 priorities) about the payments case, Cleva/Tether funding, external settlement, controls and execution. Question 1 is “How exactly is Kairos a payment solution?” and explains crowdfunding as the specific payment use case, combining existing services with budget/payment controls and donor receipts. The preliminary bank stays historical. Primary Cleva sources were checked on 18 November.

The user took over pushing: initial page work was committed/pushed by them as `7d05e75`. Do not automatically push subsequent work unless they ask again. Finish and commit remaining changes for them to push. Pitch follow-up is committed as `5b692d7`. The separately requested camera-opening transition is now implemented: a plain black panel and spinner for 600 ms after complete NIN + Start, then the existing clip. The video remains unmounted before that sequence; the six-second verification timeout and video-independent publishing are preserved. NIN editing is disabled during the check. Cause headings/tooltips now say Comments, with matching input/empty-state copy. Status and next action are kept in the root handoff.

Production build passed. Native Edge QA verified empty/incomplete NIN gating, readiness without a face preview, the opening panel, subsequent video/confirmed state and a complete interview → structure → identity → published cause. Mutations used only `kairos_qa_face_1794988960057`; test records were cleared and both owned preview servers stopped. Empty QA collections remain because this database user cannot drop a database. No live records were changed.

External issue found during QA: the configured Anthropic key returns HTTP 400 because its account credit balance is too low. Intake still completes via the existing five-question fallback. The user needs to top up that Anthropic account before expecting live model responses; no key value was printed or changed.

## Previous release: 17 November Cleva Grand Finale presenter page

The user authorized updating `/cleva.html`, keeping their conversational voice
and making payments the thread: transparent crowdfunding through control of
contributions, provider payouts and each donor's receipt. The demo is explicitly
deferred for later brainstorming and remains unchanged.

- Content source: `pitch-room/cleva_pitch_content.py`; regenerate with `npm run pitch:cleva`.
- `/cleva.html` and `/cleva-pitch.html` serve identical generated content with the same presenter preferences. Eight existing visual sections remain; the updated script has 608 words for Abigail or Miracle and a 10:00 rehearsal plan including the existing recording. The confirmed finale allowance is 12 minutes plus five minutes Q&A.
- Kept the school-fees story, conversational structure, receipt example, NGO/grant-first funding model, tentative capped upkeep, fraud ambition and team. Added payment-flow language and the proposed overseas bill-funding vision. Current document uploads are acknowledged; independent verification and international settlement remain unbuilt.
- Exact follow-up wording from the user is applied to slide 1 paragraphs 2–3 and slide 4 paragraph 1 for both presenters. Every other slide field, including the demo, is unchanged.
- Main page, presenter-specific Markdown scripts and preparation text agree. Only the payment-hackathon answer changed in the existing 110-question bank; question IDs and saved-star behavior remain stable.
- Demo slide content, 239-second section, 227.033-second video, player code, video bytes and native PDF/PPTX/Keynote decks are unchanged. The page says native downloads retain their previous slides/notes; the browser/Markdown script is the current finale text. General/APWEN pages, shared source and assets were fingerprinted and preserved.
- The previous page/source/scripts are preserved in the event's `02 Preliminary Pitch/archive/2026-11-17-before-grand-finale-script/`. Do not overwrite the earlier submission/recording while continuing the finale work.
- Browser preview access was unavailable. Source, generated-content, preservation checks and the production build are used for this release; final deployment and live-check results are recorded in the workspace-root handoff.

Continue from the user's next presentation/demo direction; do not revise the
demo recording, rebuild native decks or alter other event rooms as a side effect.

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
