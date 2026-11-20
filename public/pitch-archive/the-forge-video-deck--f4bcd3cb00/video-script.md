# Kairos - Submission Video Script (target ~4:55, do not trim below 4:30)

> Voice-over for **`deck/kairos-video-deck.pptx`** (17 slides). Slides 5-12 are
> full-page app screenshots, nothing else on them, so the viewer sees the product
> clearly behind you while you speak. One section per slide.
> **Speaker:** Abigail records the whole video.

## How to record (camera in front, slides behind)

- **PowerPoint (easiest):** open the video deck → Record tab → **Record Slide Show** (the "Cameo" feature). Your webcam floats over the slides while you advance them; Export as video when done. Park your camera bubble in a corner so it never covers the receipt card or the chat bubbles.
- **Zoom (works everywhere):** start a meeting alone, share the slides, cameras on, record to computer.
- Face on camera for the open (slide 1) and the close (slide 17) at minimum.
- On the screenshot slides, move your cursor toward the thing you are describing (the Donate button, the budget line, the receipt). It reads like a live demo.

---

## Slide 1 - Title (0:00 - 0:20)

*(on camera)*

> Good day. I'm Sokenu Abigail, team lead of Team Kairos, which is myself and Ndujekwu Ugochukwu.
>
> Kairos is a transparent giving platform where helping is no longer an act of faith, because every naira given can be watched until it arrives at the need it was given for.

## Slide 2 - Problem Statement (0:20 - 0:50)

> Everyone watching this has been here. A WhatsApp appeal lands: someone's sister needs surgery, account number attached. You feel something, then you hesitate. Is the story real? Is the photo recycled? If I send ₦5,000, does it buy medicine, or does it vanish?
>
> Most of us close the message. Not because we don't care, because we can't verify. The missing piece is not compassion. It is a trusted middle layer that verifies needs, safeguards funds, and proves how every naira is spent.

## Slide 3 - Our Solution (0:50 - 1:20)

> Kairos is that middle layer, built on three mechanisms.
>
> One, verified intake: every organizer verifies identity with BVN or NIN, then an AI interviewer collects their story, evidence and an itemized budget, screening for reused photos and inconsistent dates.
>
> Two, escrow with closed-loop spending: donations never enter the organizer's account; money leaves escrow only toward named, verified vendors. There is nothing to run away with.
>
> Three, donor-level receipts: every payment is attributed back to every donor, proportionally and automatically.

## Slide 4 - How It Works (1:20 - 1:35)

> Create a verified cause with the AI's help. Share it as an ordinary link on social media like WhatsApp, anyone who opens it can give in a few taps. And when the organizer pays a vendor, every donor's phone buzzes with their personal share. Let us show you, this is the live product.

## Slide 5 - Screenshot: the feed (1:35 - 1:50)

> This is Kairos running. Causes live in a social feed, every organizer identity-verified, every card showing real progress, vouches from independent people, and a Donate button right there.

## Slide 6 - Screenshot: a cause page (1:50 - 2:05)

> Open a cause and you get the full story, how much has been raised, how much is sitting in escrow, and two buttons: Donate, or copy the link and share it anywhere. Anyone who opens that link sees exactly this, no app required.

## Slide 7 - Screenshot: verification + itemized budget (2:05 - 2:20)

> Scroll down and you find what no other platform shows. The verification panel, every piece of evidence checked. And the itemized budget: corrective surgery, ₦850,000, paid to LUTH directly, vendor verified, account on record.

## Slide 8 - Screenshot: receipts + public ledger (2:20 - 2:35)

> Money already spent leaves a trail: the actual receipt, photo updates from the field, and a public ledger of every naira in and out. All of it inspectable by anyone, donor or not.

## Slide 9 - Screenshot: the AI interview (2:35 - 2:50)

> Creating a cause is not a form, it is an interview, and the AI on the other end is live. Watch it push back: I said my brother needs surgery, and it asks for the specific date, and the full name of the hospital.

## Slide 10 - Screenshot: the fraud screen (2:50 - 3:05)

> When it has the story, the evidence and the budget, it runs a fraud screen: timeline consistency, vendor naming, budget specificity. Nothing goes live until it passes.

## Slide 11 - Screenshot: the organizer's wallet (3:05 - 3:20)

> And here is the heart of Kairos. The organizer's wallet: ₦155,000 held in escrow, and no withdraw button anywhere. The only thing an organizer can do is pay a verified vendor on their published budget.

## Slide 12 - Screenshot: the donor's receipt (3:20 - 3:45)

> The moment that payment goes out, every donor gets this. "₦4,560 of your ₦7,000 was paid to LUTH, Invoice 0042, 65% of your gift."
>
> Nobody wrote that message. The platform computed it for every single donor, the instant the money moved. *(pause a beat, let it land)*

## Slide 13 - Core Innovation (3:45 - 4:00)

> That donor-level attribution is our core innovation. Crowdfunding platforms move money; Kairos moves proof. Giving gets a feedback loop, you see what your own gift did, so you give again.

## Slide 14 - Built for a Low-Trust Market (4:00 - 4:20)

> Every design choice assumes a low-trust market. No cash to steal. One identity, one reputation. Vendors checked before any payout. Newcomers start small, and raise limits grow only through completed, receipted causes. We don't claim fraud is impossible; we make it visible, traceable, capped, and unprofitable.

## Slide 15 - Proof of Work (4:20 - 4:35)

> Everything you just watched is real, running code, built with Next.js and MongoDB, live at kairos-community.vercel.app for anyone to click. Identity lookups and the payment gateway are simulated for now; production swaps in NIBSS, NIMC and Paystack rails, integration tasks, not research problems.

## Slide 16 - Impact & Feasibility (4:35 - 4:50)

> Nigerians are already generous. What is missing is infrastructure that makes generosity toward strangers safe. Every point of hesitation Kairos removes is money reaching hospital bills, prison outreaches, shelters and classrooms, at any scale from a ₦200,000 appeal to a ₦20 million NGO program.

## Slide 17 - Thank You (4:50 - 5:00)

*(on camera)*

> Kairos. Give with proof, not faith. Thank you.

---

## Notes

- Total is ~5:00 at a calm pace. If rehearsal runs long, tighten slides 2 and 3 first, but keep the total at 4:30 minimum.
- Slide 12's narration quotes the exact numbers in that screenshot (₦4,560 of ₦7,000, Invoice #0042, 65%). If you ever retake that screenshot, update the line to match.
- The screenshots are real captures from the deployed app. To retake any of them: reseed (`npm run seed`), sign in as the right persona (password: `password`), and screenshot at 1280×800.
