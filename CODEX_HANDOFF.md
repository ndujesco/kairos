# Kairos website handoff

Updated: 19 November 2026. Workspace: `/Users/ndujekwuugochukwu/Documents/CODE/hackathon/Kairos`; Git repository: its `website/` directory. Live app: https://kairos-community.vercel.app. GitHub: https://github.com/ndujesco/kairos.

## Latest: resynced clean-audio demos with switchable subtitles and organized folders

The user reported a paused-looking department passage, requested removal of the **enhanced-voice** versions, switchable subtitles on the **clean-audio** versions, and clearer subfolders. This supersedes the earlier instruction to preserve every rendered comparison. The user also stopped computer-use tools because of credit cost: **continue with file/media commands; do not use computer controls for this task.**

Current Desktop videos are `~/Desktop/Kairos - Cleva and Faith & Tech/Cleva/01 Demo/kairos-cleva-narrated-clean-audio.mp4` and the equivalent `Faith & Tech/01 Demo/kairos-faith-and-tech-narrated-clean-audio.mp4`. Canonical event copies remain directly in each stage's `demo/`. Retimed only the shared 39.5–55.187-second interview window, making the course/deadline answer visibly type during “other details like her department” and moving into financial circumstances with that narration. Every encoded picture, the clean AAC packets/timing, total lengths, later picture timing and recorded voice speed are preserved. No global speed-up or image/audio re-encoding.

Both MP4s now contain a selectable, non-forced English `mov_text` subtitle track, with matching SRT/VTT sidecars. The English rendering and QuickTime's English/Off options were observed before the user stopped computer controls; do not claim the Off choice was subsequently clicked. Full FFmpeg decoding passed for both videos; extracted embedded captions exactly match the supplied SRT. All four Desktop/event copies match the new hashes.

Desktop event folders are now `01 Demo`, `02 Deck`, `03 Scripts and subtitles`, `04 Preparation`, and `Archive`, with concise READMEs. Individual voice-note transcripts moved to root `Source transcripts/`. Retained original-sound, JCI-tone and previous clean exports are in `Archive`; current stage demos similarly put older files under `demo/Previous versions/` and sidecars under `demo/Subtitles/`. Exactly six named `*-narrated-enhanced-voice.mp4` copies (two each in Desktop, event stages and production renders) were hash-checked and moved to recoverable macOS Trash. Original recordings and processing sources remain intact. The movement/removal manifest records every destination.

Production: `../production/2026-11-19 narrated demos/retime_clean_with_subtitles.py`, `organize_clean_delivery.py`, and `renders/synced-clean-audio/{manifest.json,delivery-and-organization.json}`. Older delivery manifests describe historical locations/hashes; use the new manifest for current files. The organization script is a completed one-time migration, not a routine rebuild. Current presenter metadata/caption downloads now identify the clean-audio version; deck content and native files are unchanged. Changes are local for the user's push; no website opening, deployment or database work.

## Completed codex4 continuation: JCI-style voice, transcripts and decks (19 November)

Resumed the unfinished 04:40 UTC request in codex4's full history below. The user wanted a fresh voice comparison inspired by the JCI demo, transcripts regrouped beyond four parts, and both event decks polished in the JCI finale style. Their explicit subtitle choice was **clean video with separate transcript and subtitle files**. All of this work is complete locally; no push or deployment.

Latest Desktop bundle: `~/Desktop/Kairos - Cleva and Faith & Tech/`, separated into `Cleva/` and `Faith & Tech/`. Each contains:
- `kairos-<event>-clear-voice-jci-style.mp4`, plus matching `.srt` and `.vtt`. Cleva is 4:11.853 with the corrected payment closing. Faith & Tech is 4:06.205 with its wallet insert and trust ending. No burned subtitles, image re-encoding, timing change, synthetic speech or global speed-up.
- Updated `demo-voiceover-*.md` and three-page PDF, and `recorded-narration-latest.md`: the actual recorded narration in nine natural sections. Earlier suggestions are archived under each stage's `archive/2026-11-19-before-jci-polish/`. Original video/transcript versions remain intact.
- Editable `Cleva-Finale-JCI-Style.pptx` / `.pdf` or `Faith-and-Tech-Semis-3min-JCI-Style.pptx` / `.pdf`, pitch scripts and a standalone `*-jci-style-deck.html`. Canonical copies are in the corresponding event stage. Cleva has eight slides, 755 presenter words and a 10:25 plan including the recording. Faith & Tech retains six slides, 328 words and its three-minute pitch, with demo timing left to the user.

The new voice pass uses gentler spectral noise reduction, reduced excess treble, midrange emphasis, light de-essing/compression and approximately -16 LUFS leveling, modeled on the archived JCI processing. **This is a new comparison, not a direct listening assessment or a guarantee of identical microphone sound.** All earlier delivered videos retain their hashes. The new files preserve all 19,724 encoded source pictures and established picture timing; complete decoding already passed. Delivery hashes, transcript/caption word equality and ordered caption timings were verified again during continuation.

The decks copy the supplied JCI theme, native layouts, logos and portraits, preserving cream/deep green/lime and Helvetica Neue. All 14 new slides and six narration PDF pages were visually inspected. Package and layout checks report no findings; native allocation tables reconcile ₦305,000 gross, ₦5,000 upkeep and ₦300,000 school fees. Native speaker-note paragraphs match the current pitch sources. Artifact Tool/runtime was unavailable on this host, so the existing copied-OOXML builder and LibreOffice exports were retained; do not claim native PowerPoint execution was tested.

Both current presenter rooms and downloads are regenerated, with the Cleva alias matching. Previews now match the new native decks. Cleva's HTML player asks for the accompanying local MP4, and the recording is **separate from the PowerPoint/PDF**. Select it before presenting. Faith & Tech's Demo tab links its transcript/PDF/SRT/VTT. Fixed the incomplete Faith deck preview path and stale Cleva 3:47 cue. All linked local assets and generated JavaScript syntax checked. No browser or website was opened. All 58 protected reference/other-event files retain their hashes; no product or database changes.

Reproduction and QA: `../production/2026-11-19 JCI-style decks/README.md`, `build_decks.py`, `presenter-verification.json`; `../production/2026-11-19 narrated demos/README.md`, `make_jci_style_voice.py`, `update_recorded_scripts.py`, `jci-voice-delivery-manifest.json`, and `reports/jci-final-delivery-verification.json`. Rebuild only `pitch:cleva-finale` and `pitch:faith-and-tech-semis`; preserve the other rooms. Website changes are committed locally for the user's push. Next: the user can compare the new audio by ear and choose any later overall demo speed-up.

Current continuation thread: `01a1f248-27f5-76d0-85ae-04f7583996e6`, history `/Users/ndujekwuugochukwu/.codex/sessions/2026/11/19/rollout-2026-11-19T06-29-37-01a1f248-27f5-76d0-85ae-04f7583996e6.jsonl`. The original codex4 history remains intact at the path below; it was read to recover the pending request. No session migration or deletion was performed.

## Latest media follow-up: corrected closing, noise reduction and clearer voice (19 November)

The user requested **new comparison files, keeping every existing video intact**, then clarified that Cleva needs the supplied corrected closing in both its unfiltered and processed copies. The new pickup is `~/Downloads/WhatsApp Audio 2026-11-19 at 04.31.11.opus`, durably archived as VN 14. Exact recorded words: “That is the payment problem that we solve.” VN 11 is kept through 20.85 seconds, followed by VN 14 source 0.55–3.30 seconds. No generated speech, tempo change or global speed-up.

Latest Desktop deliverables, under `~/Desktop/Kairos - Cleva and Faith & Tech/`:
- `Cleva/kairos-cleva-narrated-corrected.mp4`: corrected closing with original voice-note sound, 4:11.853.
- `Cleva/kairos-cleva-narrated-enhanced-voice.mp4`: corrected closing, noise/click reduction, voice clarity processing and consistent loudness, 4:11.853.
- `Faith & Tech/kairos-faith-and-tech-narrated-enhanced-voice.mp4`: the same voice treatment, retaining the Faith wallet insert and trust ending, 4:06.205. No Cleva payment-problem closing.

Identical copies are in the respective event stage `demo/` folders. Earlier `*-narrated.mp4` files and the intermediate `*-narrated-clean-audio.mp4` comparisons are preserved unchanged, with verified hashes. Cleva's new `recorded-narration-corrected.md` follows both corrected versions; old transcripts remain intact. `AUDIO-COMPARISON.md` explains the filenames. The original 13-note transcript is unchanged; the pickup has a separate transcript.

The user additionally asked to research/use suitable tools and make the voice itself clear. Compared the first RNNoise cleanup against DeepFilterNet3, each with/without gentle clarity EQ/compression, on all 14 original notes. Selected each pass with level-matched Microsoft DNSMOS speech/background/overall estimates, then leveled each complete narration to about -16 LUFS with a -1.5 dB true-peak ceiling. Model/processing delays are compensated; the final leveler adds zero measured timing shift. **These are automated comparisons, not a direct listening assessment.** Do not claim that the noise was heard here or that all overlapping noise is removed. Adobe/ElevenLabs/Auphonic were researched; browser access was unavailable and no configured service credential was found in the four relevant project environments. No recording was uploaded to a hosted service. PDFLeader's model could not be verified.

Everything is reproducible in `../production/2026-11-19 narrated demos/`: `audio/cleanup/` holds the first pass and unfiltered correction; `audio/clarity/` holds selected PCM, masters, model weights, primary-source research and selection reports. `enhanced-delivery-manifest.json` records final paths/hashes. New scripts are `clean_audio.py`, `package_clean_deliverables.py`, `clarity_trial.py`, `enhance_narration.py` and `render_enhanced_voice.py`. DeepFilterNet/PyTorch/ONNX use `/private/tmp/kairos-audio-enhance-venv` (Python 3.11); rendering checks use the earlier PyAV environment with the system Python. Read the production README before rebuilding; baseline packaging scripts target the original filenames.

All new files passed complete FFmpeg audio/video decoding. All 19,724 compressed source pictures and the established picture timing are unchanged; track lengths differ by less than 1 ms. Local ASR checked the full enhanced Cleva narration, corrected closing, Faith wallet insert and trust ending. Source files and every earlier delivered video remain byte-identical. No product/deck/public asset changes, database writes, website opening, push or deployment. User can compare the files by ear and apply any final overall speed-up later.

## Original media production: 13 voice notes synced to both event demos (19 November)

Completed two standalone narrated videos from the user's 13 supplied WhatsApp M4As and four `Desktop/Revised` screen recordings. The user explicitly said **the audio rules**, to hold/slow important screens and accelerate unimportant navigation as necessary. Do not optimize the overall runtime or apply a global 1.18x speed-up; the user will do that later.

Final Desktop copies are `~/Desktop/Kairos - Cleva and Faith & Tech/Cleva/kairos-cleva-narrated.mp4` (4:12.273) and `~/Desktop/Kairos - Cleva and Faith & Tech/Faith & Tech/kairos-faith-and-tech-narrated.mp4` (4:06.205). Identical event copies are in Cleva `03 Grand Finale/demo/` and Faith & Tech `03 Semi-final Pitch/demo/`. Each has `recorded-narration.md`. The Desktop bundle also has `voice-notes-transcribed.md`. Earlier written voiceover PDFs remain suggestions, not exact transcripts of these new recordings.

Cleva uses VN 01–11. Faith & Tech uses VN 01–10, inserts VN 12 inside VN 09 after “Pay vendor” and before “As soon as this payment is made”, and ends with VN 13. **VN 11's crowdfunding/payment-problem closing is excluded from Faith & Tech.** For the smooth insertion only, VN 09's quiet source interval 14.2–16.0 seconds is replaced by VN 12. The insert occupies final 3:16.568–3:24.908. The picture holds on the pending wallet payment, then resumes. Normal recorded voice speed throughout, 4 ms fades in quiet joins and uniform -1 dB headroom. Original screen audio is removed.

The complete reproducible production is `../production/2026-11-19 narrated demos/`: durable copies of all 13 M4As and four MOVs, hashes, two-model ASR results, reviewed transcript, uncompressed narration masters, exact sample sequence and frame timing JSON, render/package scripts and review images/reports. See its README for build commands and Python dependencies. One connective phrase in VN 09 is explicitly uncertain in the text; the original audio is unchanged and authoritative. Do not silently rewrite recorded speech to match the earlier suggested script.

Both outputs retain all 19,724 original H.264 picture packets unchanged at 2560×1664, with timestamp retiming and no image re-encoding, resizing or overlays. Both full videos passed FFmpeg audio/video decoding with `-xerror`; compressed picture hashes match the source sequences. Video/audio track durations match within 1 ms. Sampled screen/speech cues, the shared storyboard, the wallet insert and both endings were visually checked. Final decoded audio peaks stay below 0.902. Source audio, source videos, old demos/decks and public presentation assets are unchanged. No website/browser opening, database writes, push or deployment. Only this handoff changed in website Git.

## Latest presentation work: Faith & Tech three-minute pitch and two voiceovers

19 November narration revision: the user wants both demo scripts to sound as close as possible to the former recorded Ugo narration, adding only the necessary event emphasis. Current opening is “Having created an account, Miracle signs in to the website and goes ahead to create a cause.” Preserve the original “As you can see”, “Notice”, wallet and personal-receipt walkthrough where accurate. Baseline is Cleva Grand Finale `demo-current-voiceover.md`; it remains an unchanged historical transcript. Do not restore its unsupported registry/authentication or university-issued-receipt claims. New spoken lengths: Cleva 506 words, Faith & Tech/general 408. Both remain four parts, with separate three-page PDF copies beside their Markdown and in the Desktop bundle. Superseded drafts/PDFs are archived under each stage's `archive/2026-11-19-before-original-voice/`. Updated the public Faith & Tech narration download to match; other public assets, decks and footage are unchanged. The pitch remains three minutes. All six PDF pages were visually checked.

19 November follow-up: created `demo-voiceover-cleva.pdf` and `demo-voiceover-faith-and-tech-general.pdf` beside their Markdown sources in the competition folders and Desktop bundle. Each has three pages: four spoken parts on pages 1–2, preparation notes on page 3. All source paragraphs are preserved and all six PDF pages were visually inspected. Export masters are in `../output/pdf/`. No website/public files or video changed; these PDF exports are local deliverables, not a deployment.

The user explicitly chose **three minutes for the Faith & Tech pitch** and will decide demo timing. Do not shorten the pitch to fit a video or alter the footage. New organizer email confirms 19 November, 6:30–6:45 p.m. WAT, join by 6:25. Format is one-minute team intro, seven-minute presentation/demo, five-minute Q&A and two-minute scoring. The email copy with private meeting credentials is outside this repo in the event's `03 Semi-final Pitch/brief/`.

Updated only the authorized Faith & Tech semifinal room: six slides, 328 words, a 180-second plan, with matching native PowerPoint speaker notes and PDF downloads under `public/pitch-assets/faith-and-tech-semis/deck/`. `pitch-room/faith_and_tech_semis_content.py` is the current text source. The page builder now permits native downloads alongside HTML slides and a separate narration download. It does not append an empty optional 90-second demo. Rebuild just this room with `npm run pitch:faith-and-tech-semis`.

Canonical artifacts, native OOXML builder, current scripts and the earlier proposal archive are in `../hackathons/2026-10 Faith & Tech Conference/03 Semi-final Pitch/`. The original submitted native deck remains untouched. Two distinct four-part voiceover suggestions match the actual revised clips: Cleva's `03 Grand Finale/demo-voiceover-cleva.md` is longer/payments-focused; Faith & Tech's `03 Semi-final Pitch/demo-voiceover-faith-and-tech-general.md` is shorter/trust-focused and addresses panel feedback. A convenient Desktop copy is in `~/Desktop/Kairos - Cleva and Faith & Tech/`.

The scripts correctly identify an anonymous first donor and Abigail second. Final records show gross ₦305,000, upkeep ₦5,000, net ₦300,000. Part 2's popup briefly disagrees with its final ledger; preparation notes flag this without rewriting the footage. Kairos's invoice is an application record, not independent school settlement proof. Human review, expired-reference replacement, private evidence controls and external reconciliation remain proposed. No actual research findings were provided, so the pilot remains prospective.

Validation: six-slide 16:9 PDF rendered and all slides visually inspected, native notes match spoken text, timing/arithmetic/relationships checked, and protected public files outside the Faith & Tech edition retain their hashes. No product/database/video changes. Artifact runtime was unavailable on this host, so the native deck uses the existing theme with standard editable OOXML and a LibreOffice PDF export. No browser or website was opened. Commit is left for the user's push; do not automatically push/deploy.

## Current state: funded key, real AI interview and completed rotation (18 November)

The user supplied a working funded key after two keys returned insufficient credits. A fresh Haiku request succeeded. **The previous Anthropic credit blocker is resolved.** The public Kairos API now returns `source: live`; the exact “Hi, I am Miracle and I need to pay fees” test received a natural question asking which school and how much, rather than the scripted repeated-need prompt. No test cause or donation was created in production.

Rotated actual configured keys in five private local files: this repository's `.env.local`; `Documents/CODE/personal/ctybooksource/.env.local`; `Documents/CODE/personal/invoicer/.env.local`; `Documents/CODE/personal/LinguaFlow_v2_MMS-TTS/LinguaFlow/.env`; and `Documents/Current Projects/WORKPEG/app/kairos/.env.local`. Tracked example placeholders were preserved. Scanned Documents/Desktop/Downloads for environment uses and the relevant source roots for embedded keys; only these five active files contained configured keys. No secret value belongs in Git, this handoff or history.

Inventoried all 51 projects in the existing personal Vercel team. Four used Anthropic; updated their existing sensitive records without changing targets: Kairos, CTY and Invoicer production+preview, Workpeg production. Redeployed their existing production sources to activate the key:
- kairos-community: `dpl_82FcQav6gk16pBy7USwTKdswxTtU` (READY, production alias assigned).
- ctybooksource: `dpl_AaYNUchaKkobqrVHJ2KfjtYC2JvA` (READY, production alias assigned).
- invoicer: `dpl_FvFg9QzcWfZP7cKabx2nUXiGAzKN` (READY, production alias assigned).
- kairos-workpeg: `dpl_4eAFPz8Rx1c7FUAQnqWME4PujUUv` (READY, production alias assigned).

These redeployments preserve their existing source, including Kairos production commit `f17883b`. The **new code changes below are committed for the user's push**, not included in that key-only redeployment. Do not automatically push.

Removed silent scripted interviewing from both `api/ai/interview` and `CreateWizard`. All successful follow-ups/final assembly now come from Anthropic; no regex-derived facts or local fallback dispatch steer the live prompt. At eight answers, a final structured schema requires completion from the model. On errors, return 503, retain the failed answer for editing/retry and do not count it twice. The opener remains immediate/local, as in the original. Provider timeout is 20 seconds, browser 25; no retries or artificial delays. Legacy fallback helpers/tests remain in `src/lib/interview.ts` but are disconnected from production server/client and must not be reintroduced as an invisible substitute.

Validation: production build and API-route ESLint passed. Actual model checks in isolated `kairos_qa_live_1795020550197` verified the fees opener, contextual ₦300,000/UNILAG follow-up and model finalization at eight answers. A missing-key server returned 503 with no scripted reply. Live public API also confirmed `source: live` after rotation. Both owned preview servers (3010/3011) stopped and the single QA account was cleared. No browser opened. Full wizard ESLint still reports four pre-existing errors in the old stage-preview effect; this task did not change that effect. Document previews, face interval, snapshots, cause deletions and competition materials are unchanged.

## Latest UI fix: account-menu stacking (18 November)

Added `z-30` to the sticky sidebar so its profile/logout menu appears above cause cards. The dropdown already had a z-index, but its sidebar stacking context was behind the feed. Per the user’s explicit request, no build, test or browser check was run. Commit is left for their push.

## Latest data cleanup: Omohuma fees cause (18 November)

At the user's explicit request, deleted the completed cause `6afdb5472f0bdf1ee3e53e88`, `help-omohuma-miracle-pay-school-fees-b76n`, and its related application records: two demo donations, one payout, four notifications and two supporting-file records (the linked fee advice plus the identical owner-only copy retained during the earlier reset). No comments existed. Both corresponding Cloudinary raw/authenticated assets were deleted with invalidation and verified absent using the Cloudinary API; no other cause referenced them.

The cause and related MongoDB records were removed in a transaction after matching their backed-up state. Reversed only this cause's completion reward on `omohuma`: trust level 2→1, completed causes 1→0, raise limit ₦1,000,000→₦500,000. The account, login/contact details, identity status and unrelated records remain. Existing `scripts/snapshots/cleva-2026-11-18.json` is retained unchanged (it is now tracked by the user, unlike the earlier untracked state described below). No application or competition assets changed. Live checks confirmed HTTP 404 for the deleted cause and both document URLs.

Recovery bundle: `/Users/ndujekwuugochukwu/Documents/CODE/hackathon/Kairos/.local-backups/omohuma-fees-reset-1795018967242`. It contains the scoped EJSON manifest, original completion stats, result and both PDFs with verified checksums, all private local files. **Restoring the MongoDB snapshot alone does not restore deleted Cloudinary bytes**; to recover its document links, reupload the saved PDFs as raw/authenticated assets under the original public IDs recorded in the manifest as well. Do not erase the user's snapshot or these recovery files during routine cleanup.

## Current intake instruction: restore the original recorded Ugo interview (18 November)

The user's latest clarification supersedes the short “finish after basic fields” flow below: they mean the original roughly four-minute full demo before its 1.1× speed-up, not the recent simplified version. Reviewed the actual `../pitch-kit/demo/kairos-demo-full-1.1x.mp4` frames at 0:23, 0:32, 0:42 and 0:51, alongside Cleva Grand Finale `demo-current-voiceover.md` and the original route at `58e85ba`. Its interview identifies the student/school/amount, asks for the RRR, requests documentary support and then explores studies and urgency even after “No for now” to documents. Preserve this depth.

Restored the original welcoming opener and probing style in the live prompt. Removed the instruction to finish merely after name, institution and amount; the model explores evidence, payment reference, circumstances and urgency. The shared/server/client ceiling is now **eight questions including the opener, with no numeric minimum**. Details supplied up front or explicitly deferred are accepted without repeating them. Documents remain optional/addable later, example details are accepted, and no file/reference authentication or registry lookup is claimed.

The local fallback now covers the same meaningful topics instead of ending after basic fields. It is still deterministic and must not be described as a live model. Also recognizes the recording's “I need to pay 300000”, keeps later amount corrections and prevents year-of-study text replacing the applicant's name. Review previews, six-second face playback and frozen competition materials are unchanged.

Validation: production build, focused ESLint, 20 pure contextual checks and six focused HTTP checks passed. The actual recorded Ugo exchange completes after five answers covering the original topics; an already complete case can finish after one, and thin answers stop at eight. HTTP tests used only `kairos_qa_ugo_1795018213823`, then its records were cleared and the owned port-3010 server stopped. No live data mutations or browser opening. The user's `scripts/snapshots/cleva-2026-11-18.json` remains untouched and untracked; do not add that database snapshot to Git.

A fresh direct Anthropic check still returned HTTP 400, insufficient credits. Live AI interviewing needs the connected Anthropic account topped up; the fallback remains usable meanwhile. No key was changed or exposed. Commit locally and leave pushing/deployment to the user.

## Previous intake instruction: restore the earlier flow, cap at seven (18 November)

The user corrected the preceding request: “the way it was before was perfect, just set limit of 7 questions”. Restored the pre-minimum interview handling from `5823127`: **maximum seven questions, no minimum**, finish when ready. Removed the forced evidence-question schedule, completion gate and filler follow-ups introduced with the five-question minimum. The live prompt still includes evidence in the normal interview, and files remain optional/addable later. Do not reintroduce a minimum or padded follow-ups.

The screenshot also revealed a genuine parsing bug: “Just the 300000 Tuition” was not recognized, so the fallback repeated the amount question. Fixed unformatted amounts with fee labels and ordinary short amount replies, while excluding identifiers and academic-session dates. Contextual “I will add it later” replies are acknowledged. Existing name/context fixes remain.

Validation: all 19 pure contextual regressions and the production build passed, including the exact repeated-amount screenshot and immediate completion with sufficient facts. No database mutations or browser opening were needed. Document previews, the six-second face interval and the earlier scoped practice-cause deletions are unchanged. Commit locally for the user's push; refresh only after deployment to load the new client fallback. This instruction supersedes the five-to-seven behavior documented below.

## Previous product follow-up: intake, review preview and visible face check (18 November)

This section supersedes the earlier two-answer completion and short face interval below. The user asked to round off and not open the website at delivery. Do not automatically push or deploy; they handle pushing.

- Intake now asks **at least five and at most seven questions**, counting the opener. It explicitly requests supporting evidence within the first three questions, even if the model tries to finish early. Known facts stay in context. Follow-ups cover the deadline, financial shortfall and bill coverage without repeating answered fields. Documents remain optional and can be added later; supplied example documents/details are accepted without claiming authentication. Fixed “I am sick” being mistaken for the beneficiary name.
- The review form immediately after intake now contains `EvidencePreview`: inline PDF/photo preview, a selector for multiple attachments and an Open document link. Other file types retain their attachment/open link. Existing private evidence URLs and access checks are unchanged.
- The face video remains unmounted until complete NIN + Start. It then preloads behind the 600 ms opening panel. Muted MP4 playback is requested explicitly, with a maximum two-second startup wait and **6,200 ms visible interval** before proceeding. Verification runs in parallel with its existing six-second network deadline; no wait for video end. Aborts and media errors are bounded, with a visible unavailable state if playback fails. Silent Omohuma media is unchanged.
- Deleted only the two explicitly requested, empty practice causes: Miracle `6afdacdcdc7f6ae21f2b8d30` (`help-miracle-pay-school-fees-qemi`) and Abby `6afdaf34ad3695d5e2f9dccb` (`help-sick-with-medical-care-98m5`). Both had zero raised/escrow/donors and no donations or payouts; transactional deletion verified those conditions. Accounts/contact information and unrelated causes were untouched. Miracle's supporting file was retained privately with its cause link cleared. Backups are in the workspace root `.local-backups/miracle-cause-1795010223866.json` and `.local-backups/abby-hospital-cause-1795010662805.json` (private local files, not committed).

Validation: production build and all 14 contextual regression checks passed; `git diff --check` passed. Browser login in isolated `kairos_qa_preview_1795010745477` succeeded, but final inline-PDF rendering and six-second playback were **not visually reverified** before the user requested closure. Do not claim this latest UI sequence was watched end to end. Media decoding/orientation checks belong to the earlier media release. The owned port-3010 server was stopped and only that QA database's records were cleared. No frozen presentation/deck/recording files changed.

The connected Anthropic account still needs credits; the improved deterministic backup is active when the provider is unavailable. No keys were changed or exposed. Next action: the user pushes the local commit, then a fresh app load uses the new client code. If a playback issue is reported, verify this exact new sequence before further changes; do not run the broad demo-clean/reset scripts.

## Previous fix: contextual intake, maximum seven questions

The user reported that intake ignored Miracle's name, UNILAG and ₦300,000, then asked for those details again. The exact text was the old fixed fallback, used because Anthropic still returns HTTP 400 for insufficient account credits (checked 18 November). No key was printed or changed. Top up that account to restore live-model responses.

Replaced the fallback's numbered questions with conversation-derived fields in `src/lib/interview.ts`. It remembers the supplied beneficiary, purpose, institution/provider and amount, honors later amount corrections, asks only for missing fields, answers document/payment questions and prefills the review budget. The screenshot's two-answer conversation now completes with Miracle, University of Lagos and ₦300,000. This is a deterministic backup, not a claim that the external model is available or that documents are read/authenticated. Supporting files stay optional.

At the user's explicit request, the hard ceiling is now **seven questions**, including the opener; finish earlier when the needed details are available. The constant, live prompt, server guard, client fallback, regression check and AGENTS instruction agree. No visible question counter or internal-context label was added. The server uses the signed-in creator's name only when appropriate, and gives a known unavailable provider a one-minute cooldown before retrying.

Validation passed: production build, 13 pure contextual regression checks (`npm run test:interview`) and focused HTTP checks using only `kairos_qa_interview_1795009264798`. HTTP checks covered the exact Miracle conversation, the prefilled budget, seven-answer completion and unauthenticated rejection. The owned QA server was stopped and its test records cleared. No live records or presentation assets changed. Leave pushing to the user; refresh the page after their deployment to load the new client limit.

## Latest artifact: Miracle payment advice

Created the requested dummy school-fee payment advice in `~/Downloads/Miracle-School-Fees-Payment-Advice.pdf`, with a local archive in `hackathons/2026-10 Cleva x Tether Future of Payments/03 Grand Finale/demo-documents/`. Student: OMOHUMA MIRACLE; University of Lagos example; total ₦300,000; dummy RRR `000000000000`; dummy matric `DEMO/MIRACLE/001`. Sample session 2026/2027 and due date 30 November 2026 are illustrative. Fee breakdown sums to ₦300,000. The one-page PDF is explicitly a demonstration copy, outstanding/unpaid and not payable; no official crest/signature is used. Parameters are saved alongside the event copy as `payment-advice-details.json`.

Rendered and visually checked the page; text/amount/name/reference and one-page checks passed. File is 30,527 bytes, within the app's upload limit. Nothing was uploaded, sent, paid or written to MongoDB. Existing Ugo payment-advice files and historical recordings were preserved.

## Latest request: Omohuma demo applicant and new face capture

The next Cleva recording now uses Omohuma (Miracle) as the person raising ₦300,000 for University of Lagos fees. Okefe and Abigail remain the donors and all fee/net amounts are unchanged. Updated the event's `03 Grand Finale/demo-flow.md` throughout, including applicant profile, fee notice/reference, wallet, payment and donor proof. The older plan is archived in `03 Grand Finale/archive/2026-11-18-before-omohuma/`. Existing full video and `demo-current-voiceover.md` remain the older Ugo recording; do not silently rewrite that transcript or claim a new full recording exists.

Replaced the app's default `public/demo/face-check.mp4` and `.webm` from the user-supplied `~/Downloads/IMG_2444.mov`. Both are upright 480×854, 24 fps, approximately 6.792 s and have no audio/data tracks. MP4 is 614,814 bytes; WebM is 905,180 bytes (98.9% and 98.3% smaller than the source). The source remains untouched. See `docs/face-check-media.md` for provenance and encoding settings. A silent MP4 copy is in the Grand Finale folder as `face-check-omohuma.mp4`.

The wizard uses `?v=omohuma-20261118` on both source URLs. Complete-NIN/Start gating, blank initial area, 600 ms opening state and verification/publication deadlines are unchanged. No live accounts, causes or documents were modified for this update. The user still handles pushing.

Validation: production build passed. Both prepared formats fully decode with one video stream and no audio/data. Portrait framing was visually checked, including the app’s 3:4 crop. Source footage checksum is unchanged. The wizard’s logic is identical apart from the media URLs; 64 frozen presentation/media files were preserved. No QA server or test database was needed.

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
- Prior full working history, codex4 (preserved): `/Users/ndujekwuugochukwu/.codex-acc4/sessions/2026/11/15/rollout-2026-11-15T13-15-32-01a1df22-57a8-78d2-bb2c-b53e0cd402df.jsonl`.
- Codex4 task ID: `01a1df22-57a8-78d2-bb2c-b53e0cd402df`, title **Continue website edit**. The current continuation path is recorded at the top of this handoff.
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
