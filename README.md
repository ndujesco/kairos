# Kairos ⧖ - Transparent Giving

**Give with proof, not faith.** Kairos is a transparent giving platform for Nigeria: donations are held in escrow and paid directly to verified vendors - never to an organizer's personal account - and every donor automatically receives a receipt showing exactly what *their* naira did.

## How it works

1. **Verified intake** - organizers verify their identity (BVN/NIN) and build their cause through an AI interviewer that collects the story, evidence, and an itemized budget with named vendors, while screening for fraud signals.
2. **Escrow, closed-loop spending** - donated funds sit in a protected wallet. They can only move toward verified vendors on the published budget (the hospital, the caterer, the supplier). There is nothing to run away with.
3. **Donor-level transparency** - every disbursement is attributed proportionally to every donor, who gets an instant alert: *"₦4,900 of your ₦7,000 was paid to St. Mary's Hospital - Invoice #0042."*

An internal trust system caps how much newcomers can raise and unlocks bigger causes as they complete projects honestly, with proof.

## Stack

- **Next.js** (App Router) + **MongoDB** (Mongoose)
- **An LLM API** powers the AI intake interviewer with structured output
- Tailwind CSS, Twitter-style social interface

This is a functioning prototype: escrow accounting, disbursements, per-donor attribution, notifications, vouching, trust levels and the public ledger are real, running code. Identity checks (NIBSS/NIMC), card payments (Paystack/Flutterwave) are simulated, each mapping 1:1 to a production Nigerian API. Supporting files upload to Cloudinary as authenticated assets. MongoDB stores only their metadata and cause links. They can be attached during intake or later by the cause owner, and become viewable through the app when the cause is published.

The intake asks at most five questions, accepts supplied demonstration details, and falls back locally if the model times out. Email is optional; use a handle and password to sign in. Signed-out visitors can donate anonymously and follow the public ledger. Personal receipt notifications require an account.

For current progress, deployment details and exact conversation history paths, read [CODEX_HANDOFF.md](CODEX_HANDOFF.md).

Cloudinary needs server-only `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` in `.env.local` (and the deployed Vercel environment). Draft documents stay owner-only. Files are served through `/api/evidence/<id>`, preserving existing links. To move legacy MongoDB file contents to Cloudinary, run `npm run evidence:migrate` with Node 22+; it verifies the uploaded copy before removing the original binary field.

## Run it

```bash
# prerequisites: Node 20+, MongoDB running locally
npm install

# environment
echo 'MONGODB_URI=mongodb://127.0.0.1:27017/kairos' > .env.local
# optional - enables the live AI interviewer (falls back to a scripted one without it):
# echo 'ANTHROPIC_API_KEY=sk-ant-...' >> .env.local

# demo data (6 personas, 4 causes, full money history)
npm run seed

npm run dev        # → http://localhost:3000
```

To reset existing demo account passwords without changing any profiles, causes or payment history, run `npm run accounts:passwords`. Do not reseed the database for this.

To rewind only Ugo's original JCI school-fees cause to just after Okefe's donation, run `npm run demo:reset:ugo` to preview, then `npm run demo:reset:ugo -- --apply` to apply. This preserves the original ₦150,000 donation (₦147,000 net), removes that cause's subsequent donations/payouts/alerts, and resets its budget spending. Accounts, other causes, comments and evidence remain untouched. A private cause-only recovery snapshot is saved under `../.local-backups/ugo-after-okefe/` before the transactional change. The older `demo:reset`, `demo:clean` and `snapshot:restore` commands change data outside this cause and are unsuitable for this task.

Create an account (mock BVN check), or sign in as a seeded persona - all use password `password` (e.g. `ugo`, `david_outreach`). Try: donate to the **Kirikiri outreach**, then sign in as *david_outreach* → **Escrow Wallet** → pay the caterer - and check your notifications.

## Audio pitch player

The standalone audio player is served directly at [/audio-ptch.html](https://kairos-community.vercel.app/audio-ptch.html), with the original recording at `/pitch.mp3`. The page and recording are exact copies of the sibling `../kairos-audio-pitch/` project, served without the main app's JavaScript or API/database calls.

After every player change, run `npm run audio:sync` here and commit both repositories. `npm run build` also syncs when the sibling source is available. On Vercel, the same step verifies the committed files against `audio-pitch/manifest.json`, so deployment does not need access to the separate player repository. Use `node scripts/sync-audio-pitch.mjs --check` to verify without changing files.

## Team

- **Sokenu Abigail Senume** - Backend Engineer · Product Manager · Team Lead
- **Ndujekwu Peter Ugochukwu** - Software Engineer (Fullstack)

## License

Copyright 2026 Kairos contributors. Licensed under the [Apache License 2.0](LICENSE).
Third-party components retain their own licences and notices.
