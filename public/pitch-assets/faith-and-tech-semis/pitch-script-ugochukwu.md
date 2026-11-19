# Kairos: Faith & Tech exact presenter script

Sokenu Abigail · Ndujekwu Ugochukwu

Lead presenter: Ugochukwu.

11 slides, 532 presenter words. No delivery schedule is set.

Eleven slides. Demo 6, Technical approach 7, Responsible operation 8, Start with a bill that can be checked 9, closing 10 and Meet the team 11. The three supplied sections are verbatim. The existing 1:20 budget is allocated as 0:20 technical and 1:00 responsible operation, reflecting their new lengths. The remaining schedule stays unset.

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

Second, the cause is shared as a link, so donors can see the story, budget and payment history. A licensed partner holds donation in escrow and pays only those verified providers, never the organizer's personal account.

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

## Slide 6: Prototype demonstration

Ugochukwu

Here is a demonstration of how the app works.

Delivery: Play the selected original-audio JCI recording in full, then continue with Technical approach.

Play the separate local MP4, then return to the next slide. The recording's narration is not included in the presenter word count.

Recording: kairos-jci-demo-original-audio.mp4 · 3:36. No overall pitch schedule is set.

## Slide 7: Technical approach

Ugochukwu · 0:20 budget

The app runs on Next.js and TypeScript. The interview is powered by Claude, and it is also this model that structures the need and budget for the organiser. We use MongoDB and Cloudinary to store the data.

Delivery: Budget: 0:20. Use the supplied wording verbatim.

## Slide 8: Responsible operation

Ugochukwu · 1:00 budget

It is worth reiterating that we store no sensitive data and do not keep any money. When an organiser supplies documents as proof to support their cause the AI model discerns which is safe to display publicly and only does so with their permission.

When a remita reference has expired at payout, we request a replacement and confirm it is the same student, institution and bill, and then proceed to payout.

In the future, we plan to look into more sophisticated ways to reconcile disputes, especially when we move beyond school fees. We aim to make this as automated as possible while remaining accurate.

Delivery: Budget: 1:00. Presenter-supplied operating-model wording. Current uploads are stored and published attachments are public. Automated publication review and expired-reference recovery remain planned.

## Slide 9: Start with a bill that can be checked.

Ugochukwu

We start with school fees because they're easy to verify in Nigeria. We have spoken with our department bodies that help raise funds for students and have got very a positive response

Then we plan to move to hospitals and other service providers.

Delivery: Use the supplied account of departmental feedback. No measured pilot result is claimed.

## Slide 10: Give with proof, not faith

Ugochukwu

In short, Kairos turns charitable giving from an act of blind trust into one of complete transparency. We don't claim fraud is impossible. We're building Kairos to make it visible, traceable, capped and unprofitable.

Delivery: Deliver the closing, then advance to Meet the team.

## Slide 11: Meet the team

Ugochukwu

And this is the team. I'm Ugochukwu, the software engineer and CTO. Abigail is our team lead and product manager.

Delivery: Keep the team introduction succinct. Leave this final slide visible for questions.

## Short explanation

Kairos connects a published need and itemised budget to provider payments and each donor’s own receipt.

The prototype runs the AI interview, uploads, internal accounting and donor updates. Live custody, external verification and provider-confirmed settlement remain to be integrated.
