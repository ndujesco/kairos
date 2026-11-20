# Faith & Tech · 2026 11 19 before concise draft · presenter room

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

## Slide 7: Technical approach and feasibility

Our technical approach separates collecting the story from controlling a payment. Next.js and TypeScript run the web application. Anthropic powers the interview, MongoDB stores the cause and transaction records, and Cloudinary stores supporting files.

The AI helps the organizer explain the need and structure the budget. The server checks who can request a payout, the available cause balance and the remaining amount on that budget item. It calculates each donor’s share of a recorded payment.

That gives us a working software foundation. To handle real money, we still need a licensed custody arrangement, live identity and provider checks, and a payment integration that confirms the institution actually received the money. None of those partnerships is signed today.

## Slide 8: Human review and expired references

Responsible innovation means deciding what happens when the system is uncertain, as well as showing the successful journey. For example, a student’s payment reference may expire before enough money has been raised.

Our proposed flow would pause the payout and ask the organizer, through the AI interviewer, for a replacement. We would check that it still refers to the same student, institution and bill, and confirm the outstanding amount.

If the details do not match, or an automated check remains uncertain, a human reviewer would examine the evidence, contact the institution through independently obtained details and record the decision. Payment would remain on hold until the issue is resolved. This dedicated exception and review workflow is still to be built.

## Slide 9: Privacy for donors and recipients

Transparency should show how the money is used without exposing someone’s private life. In the current app, unpublished supporting files are owner-only, but attachments on a published cause are publicly viewable. A complete private-review process is not in place yet.

Before a real pilot, we would separate evidence for reviewers from information donors need to see. Identity documents, contact details and sensitive student or medical records would need restricted access. The public page should show a clear budget, payment status and suitable redacted proof, with the beneficiary’s consent.

We also need clear rules for who can access evidence, how long we retain it and how someone requests correction or removal. A donor should be able to understand their contribution without seeing another donor’s private contact details.

## Slide 10: Reconciliation with the payment provider

Reconciliation is how we make sure Kairos’s records agree with what happened outside the app. A payment entry in our own database is not enough to prove that the school has been paid.

In the live flow, each payout would have a unique reference. We would match the partner’s confirmed amount, destination and settlement status to the cause and budget item. A delayed response would stay pending while we query its status, and repeated notifications must not create a second payout.

Only a confirmed settlement should produce a final paid status and the donor’s settled receipt. A mismatch would go to review with an audit trail. Today, the internal accounting and donor allocations work, but settlement is simulated and this external reconciliation still needs implementation.

## Slide 11: Progress and validation so far

We have a working web prototype and have checked guest contributions, evidence uploads, budget limits and donor allocations in isolated test flows. Our internal walkthroughs also helped us improve the depth of the interview and when the face-verification step appears.

Those checks show that important parts of the software work. They do not tell us whether donors understand the receipt, whether applicants can supply the right evidence, or whether a school can support the settlement process.

The next validation step is to put those questions to potential donors, students and an institution, then record what they find difficult and what we change. We have not completed a live-money pilot. I will share one early conversation about the need after the demo.

## Slide 12: Next steps toward a school-fee pilot

Our next step is a small, clearly defined school-fee pilot. We want to work with students who have a verifiable bill, the people willing to support them and an institution that can confirm the bill and payment destination.

Before collecting real donations, we need to agree the custody and settlement arrangement with a suitable licensed partner and connect the provider checks. We also need the private-evidence controls, human review and reconciliation process I have described, including clear ownership of refunds and disputes.

We would first test the complete process without live funds, then run a consented pilot once those conditions are met. We would record whether donors understand their receipts, where applicants need help, and whether every payment matches the institution’s confirmation. Those findings would guide our changes before we expand to other needs.

## Slide 13: Prototype demonstration

Let me show you how these pieces come together in the prototype: the organizer explains the need, donors contribute toward the published budget, and a provider payment creates a record of each donor’s share.

This recording uses demonstration data. Bank transfer, Remita settlement and NIN lookup are simulated, and the external checks described in the narration represent the intended live flow. The proposed human-review and reconciliation workflows are not shown.

## Slide 14: We are Team Kairos

One early conversation that stayed with me was with the past president of my department. He helps raise school fees for students and explained that, even though there is already a level of trust in the community, he sometimes has a hard time verifying the details behind a request.

That concern is exactly where Kairos could help: giving the person raising support a clearer way to check the bill, and giving donors a record they can follow. This is early feedback about the problem, and we still need to test the product with people in that position.

We are Team Kairos, and we look forward to working with students, donors and institutions to turn that existing willingness to help into support that people can account for. Thank you. Let me leave you with the people behind the work.

## Slide 15: Meet the team

Sokenu Abigail is our team lead and product manager. Her role is to coordinate the team, set product priorities and keep the work connected to the people we are building for. She helps translate the problem into a clear user journey and makes sure we are solving the right needs as the product develops.

I am Ndujekwu Ugochukwu, our software engineer and CTO. My role is to lead the technical implementation: connecting the AI interview to the application, building the records and payment-accounting logic, and developing the integrations needed to take the prototype toward a reliable pilot.

Together, we bring product direction and technical delivery to Kairos. We want to keep learning from the communities that already help one another and build a clearer account of where that help goes. Thank you.
