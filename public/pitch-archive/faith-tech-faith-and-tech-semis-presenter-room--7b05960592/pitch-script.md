# Faith & Tech · faith and tech semis · presenter room

Presenter: abigail

## Slide 1: Transparent giving for Nigeria

Good evening everyone, my name is Sokenu Abigail presenting on behalf of Team Kairos.

Kairos is a transparent crowdfunding platform for people who want to help but need to know what exactly happened to their money. Here, every naira you give can be traced until it reaches the need it was given for.

## Slide 2: A transfer succeeds. The doubt stays.

Our school fees went up recently and a final year student who couldn't afford it posted an appeal so he wouldn't drop out. People gave. But then more posts appeared and my friends and I started to wonder if they were all real, because the screenshots looked identical and very easy to edit.

Dishonest people have made skepticism the rational response and so potential donors hold back even when the plea is legitimate and real needs go unmet. The missing piece is not compassion. It's a trusted middle layer.

## Slide 3: From a published budget to a personal receipt.

Kairos is that trusted middle layer.

First, an AI interviewer helps the organizer explain the need and publish an itemised budget naming the school, hospital or whomever is to be paid.

Second, the cause is shared as a link, so donors can see the story, budget and payment history. A licensed partner holds donations in escrow and pays only those verified providers, never the organizer's personal account.

Third, every donor gets a receipt showing their own share of each payment.

## Slide 4: What runs today.

The accounting, donor shares, notifications and public ledger are running.

Bank transfer, Remita settlement and NIN lookup are simulated for now and no real money has been raised

## Slide 5: Useful to give. Sustainable to run.

Kairos is built to be run, not sold.

We aim to cover running costs through donations and grants from NGOs. Without that support, we'd tentatively take two percent per donation, capped at five thousand naira per cause. Donors see the fee before confirming.

## Slide 6: Prototype demonstration

Here is a demonstration of how the app works.

## Slide 7: Technical approach

The app runs on Next.js and TypeScript. The interview is powered by Claude, and it is also this model that structures the need and budget for the organiser. We use MongoDB and Cloudinary to store the data.

## Slide 8: Responsible operation

It is worth reiterating that we store no sensitive data and do not keep any money. When an organiser supplies documents as proof to support their cause the AI model discerns which is safe to display publicly and only does so with their permission.

When a remita reference has expired at payout, we request a replacement and confirm it is the same student, institution and bill, and then proceed to payout.

Since we are integrating the services with licensed and verified third parties, our product is easily scalable and secure.

In the future, we plan to look into more sophisticated ways to reconcile disputes, especially when we move beyond school fees. We aim to make this as automated as possible while remaining accurate.

## Slide 9: Start with a bill that can be checked.

We start with school fees because they're easy to verify in Nigeria. We have spoken with our department bodies that help raise funds for students and have got very a positive response

Then we plan to move to hospitals and other service providers.

## Slide 10: Give with proof, not faith

In short, Kairos turns charitable giving from an act of blind trust into one of complete transparency. We don't claim to make fraud impossible. We're building Kairos to make it very difficult, visible, traceable, capped and unprofitable.

## Slide 11: Meet the team

And this is the team. I'm Abigail, the team lead and product manager. Ugochukwu is our software engineer and CTO.
