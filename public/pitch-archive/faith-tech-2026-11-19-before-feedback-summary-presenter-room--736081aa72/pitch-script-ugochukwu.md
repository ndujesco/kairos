# Faith & Tech · 2026 11 19 before feedback summary · presenter room

Presenter: ugochukwu

## Slide 1: Transparent giving for Nigeria

Good evening everyone, my name is Ndujekwu Ugochukwu presenting on behalf of Team Kairos.

Kairos is a transparent crowdfunding platform for people who want to help but need to know what happened to their money. Here, every naira you give can be traced until it reaches the need it was given for.

## Slide 2: A transfer succeeds. The doubt stays.

Our school fees went up recently and a final year student who couldn't afford it posted an appeal so he wouldn't drop out. People gave. But then more posts appeared and my friends and I started to wonder if they were all real, because the screenshots looked identical and very easy to edit.

Because of this skepticism, potential donors hold back and real needs go unmet. The missing piece is not compassion. It's a trusted middle layer.

## Slide 3: From a published budget to a personal receipt.

Kairos is that trusted middle layer.

First, an AI interviewer helps the organizer explain the need and publish an itemised budget naming the school, hospital or supplier.

Second, the cause is shared as a link, so donors can see the story, budget and payment history. The plan is for a licensed partner to hold donations in escrow and pay only those verified providers, never the organizer's personal account.

Third, every donor gets a receipt showing their own share of each payment.

## Slide 4: What runs today.

The accounting, donor shares, notifications and public ledger are running.

Bank transfer, Remita settlement and NIN lookup are simulated. CAC and account-name checks are not built. No real donations have moved, and no custody partner is signed.

## Slide 5: Useful to give. Sustainable to run.

Kairos is built to be run, not sold.

We aim to cover running costs through donations and grants from NGOs. Without that support, we'd tentatively take two percent per donation, capped at five thousand naira per cause. Donors see the fee before confirming.

## Slide 6: Start with a bill that can be checked.

We start with school fees because they're easy to verify in Nigeria.

Then we plan to move to hospitals and other service providers.

## Slide 7: Technical approach and responsible operation

Next.js and TypeScript run the app, Anthropic powers the interview, MongoDB stores the cause and transaction records, and Cloudinary stores supporting files. The AI structures the need and budget. The server checks payment permissions, the available balance and budget limits, then calculates each donor’s share.

Before handling real money, we need licensed custody, live identity and provider checks, and confirmed settlement. No custody partnership is signed today.

In our planned review flow, an expired payment reference pauses the payout. The AI asks for a replacement, which must match the same student, institution, bill and outstanding amount. Uncertain checks go to a human reviewer, who confirms the evidence and records a decision before payment continues.

Draft evidence is owner-only, but published attachments are public today. Private review, redacted public proof, consent and clear access and retention rules are still needed to protect donors and recipients.

For reconciliation, we would match each unique payout reference, amount and destination to the provider’s confirmed settlement. Uncertain responses stay pending, repeated notifications must not create duplicate payments, and mismatches go to review. Only confirmed settlement should produce the final paid status and donor receipt. External reconciliation and the dedicated review workflow remain to be built.

## Slide 8: Prototype demonstration

Here is a demonstration of how the app works.

## Slide 9: Give with proof, not faith

In short, Kairos turns charitable giving from an act of blind trust into one of complete transparency. We don't claim fraud is impossible. We're building Kairos to make it visible, traceable, capped and unprofitable.

## Slide 10: Meet the team

And this is the team. I'm Ugochukwu, the software engineer and CTO. Abigail is our team lead and product manager.
