# Kairos: Faith & Tech revised draft

Sokenu Abigail · Ndujekwu Ugochukwu

Lead presenter: Ugochukwu.

10 slides, 576 presenter words. No delivery schedule is set.

Ten slides. The first six preserve the supplied script and selected shared-deck visuals. Slide 7 combines the former 7–10. The demonstration, closing and succinct team introduction follow, with Meet the team last. No delivery schedule is set.

## Slide 1: Transparent giving for Nigeria

Ugochukwu

Good evening everyone, my name is Ndujekwu Ugochukwu presenting on behalf of Team Kairos.

Kairos is a transparent crowdfunding platform for people who want to help but need to know what happened to their money. Here, every naira you give can be traced until it reaches the need it was given for.

Delivery: Introduce yourself, then let the promise of traceable giving land.

## Slide 2: A transfer succeeds. The doubt stays.

Ugochukwu

Our school fees went up recently and a final year student who couldn't afford it posted an appeal so he wouldn't drop out. People gave. But then more posts appeared and my friends and I started to wonder if they were all real, because the screenshots looked identical and very easy to edit.

Because of this skepticism, potential donors hold back and real needs go unmet. The missing piece is not compassion. It's a trusted middle layer.

Delivery: Tell the school-fees story in your own voice. Leave a pause before the trusted middle layer.

## Slide 3: From a published budget to a personal receipt.

Ugochukwu

Kairos is that trusted middle layer.

First, an AI interviewer helps the organizer explain the need and publish an itemised budget naming the school, hospital or supplier.

Second, the cause is shared as a link, so donors can see the story, budget and payment history. The plan is for a licensed partner to hold donations in escrow and pay only those verified providers, never the organizer's personal account.

Third, every donor gets a receipt showing their own share of each payment.

Delivery: The case, the provider payment, the receipt. Describe licensed custody as the intended live flow.

## Slide 4: What runs today.

Ugochukwu

The accounting, donor shares, notifications and public ledger are running.

Bank transfer, Remita settlement and NIN lookup are simulated. CAC and account-name checks are not built. No real donations have moved, and no custody partner is signed.

Delivery: Say all three simulated parts. A seeded balance is not a bank balance.

## Slide 5: Useful to give. Sustainable to run.

Ugochukwu

Kairos is built to be run, not sold.

We aim to cover running costs through donations and grants from NGOs. Without that support, we'd tentatively take two percent per donation, capped at five thousand naira per cause. Donors see the fee before confirming.

Delivery: NGO donations and grants are intended support, not secured funding. The upkeep is a tentative fallback; its cap is per cause. The prototype's fee flow does not implement a grant-dependent switch.

## Slide 6: Start with a bill that can be checked.

Ugochukwu

We start with school fees because they're easy to verify in Nigeria.

Then we plan to move to hospitals and other service providers.

Delivery: This is the launch sequence, not a completed pilot or signed partnership.

## Slide 7: Technical approach and responsible operation

Ugochukwu

Next.js and TypeScript run the app, Anthropic powers the interview, MongoDB stores the cause and transaction records, and Cloudinary stores supporting files. The AI structures the need and budget. The server checks payment permissions, the available balance and budget limits, then calculates each donor’s share.

Before handling real money, we need licensed custody, live identity and provider checks, and confirmed settlement. No custody partnership is signed today.

In our planned review flow, an expired payment reference pauses the payout. The AI asks for a replacement, which must match the same student, institution, bill and outstanding amount. Uncertain checks go to a human reviewer, who confirms the evidence and records a decision before payment continues.

Draft evidence is owner-only, but published attachments are public today. Private review, redacted public proof, consent and clear access and retention rules are still needed to protect donors and recipients.

For reconciliation, we would match each unique payout reference, amount and destination to the provider’s confirmed settlement. Uncertain responses stay pending, repeated notifications must not create duplicate payments, and mismatches go to review. Only confirmed settlement should produce the final paid status and donor receipt. External reconciliation and the dedicated review workflow remain to be built.

Delivery: Explain the working technical foundation, then the planned review, privacy and reconciliation controls. Keep their implementation status clear.

## Slide 8: Prototype demonstration

Ugochukwu

Here is a demonstration of how the app works.

Delivery: Play the selected original-audio JCI recording in full, then advance to the closing.

Select the accompanying MP4 in the Demo tab, play it in full, then advance manually to the next slide. The recording's narration is not included in the presenter word count.

Recording: kairos-jci-demo-original-audio.mp4 · 3:36. No overall pitch schedule is set.

## Slide 9: Give with proof, not faith

Ugochukwu

In short, Kairos turns charitable giving from an act of blind trust into one of complete transparency. We don't claim fraud is impossible. We're building Kairos to make it visible, traceable, capped and unprofitable.

Delivery: Deliver the closing, then advance to Meet the team.

## Slide 10: Meet the team

Ugochukwu

And this is the team. I'm Ugochukwu, the software engineer and CTO. Abigail is our team lead and product manager.

Delivery: Keep the team introduction succinct. Leave this final slide visible for questions.

## Short explanation

Kairos connects a published need and itemised budget to provider payments and each donor’s own receipt.

The prototype runs the AI interview, uploads, internal accounting and donor updates. Live custody, external verification and provider-confirmed settlement remain to be integrated.
