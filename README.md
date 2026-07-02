# Kairos ⧖ - Transparent Giving

**Give with proof, not faith.** Kairos is a transparent giving platform for Nigeria: donations are held in escrow and paid directly to verified vendors - never to an organizer's personal account - and every donor automatically receives a receipt showing exactly what *their* naira did.

## How it works

1. **Verified intake** - organizers verify their identity (BVN/NIN) and build their cause through an AI interviewer that collects the story, evidence, and an itemized budget with named vendors, while screening for fraud signals.
2. **Escrow, closed-loop spending** - donated funds sit in a protected wallet. They can only move toward verified vendors on the published budget (the hospital, the caterer, the supplier). There is nothing to run away with.
3. **Donor-level transparency** - every disbursement is attributed proportionally to every donor, who gets an instant alert: *"₦4,900 of your ₦7,000 was paid to St. Mary's Hospital - Invoice #0042."*

An internal trust system caps how much newcomers can raise and unlocks bigger causes as they complete projects honestly, with proof.

## Stack

- **Next.js** (App Router) + **MongoDB** (Mongoose)
- **Claude (Anthropic API)** powers the AI intake interviewer with structured output
- Tailwind CSS, Twitter-style social interface

This is a functioning prototype: escrow accounting, disbursements, per-donor attribution, notifications, vouching, trust levels and the public ledger are real, running code. Identity checks (NIBSS/NIMC), card payments (Paystack/Flutterwave) and file uploads are simulated, each mapping 1:1 to a production Nigerian API.

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

Create an account (mock BVN check), or sign in as a seeded persona - all use password `password` (e.g. `ugo`, `david_outreach`). Try: donate to the **Kirikiri outreach**, then sign in as *david_outreach* → **Escrow Wallet** → pay the caterer - and check your notifications.

## Team

- **Sokenu Abigail Senume** - Backend Engineer · Product Manager · Team Lead
- **Ndujekwu Peter Ugochukwu** - Software Engineer (Fullstack)
