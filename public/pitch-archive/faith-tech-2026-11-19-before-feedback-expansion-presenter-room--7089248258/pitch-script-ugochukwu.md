# Faith & Tech · 2026 11 19 before feedback expansion · presenter room

Presenter: ugochukwu

## Slide 1: Transparent crowdfunding

Good evening everyone. We are Team Kairos. Kairos is a transparent crowdfunding platform for people who want to help but need to know what happened to their money. Every donor should be able to follow their contribution.

## Slide 2: The trust gap and our first users

Our first users are students who need help with fees and the people funding those bills. When an appeal arrives on WhatsApp, a donor asks: is the bill real, how much is owed, and will my money actually reach the school? That hesitation is the problem.

## Slide 3: Features that work today

The live AI interview turns the story into a cause with a named provider and an itemised budget. The organiser can upload evidence, and someone can give through the shared link without an account. Contributions update the cause and public ledger. The organiser can request payment against that bill, but has no personal withdrawal path.

## Slide 4: Technical approach and donor accounting

Technically, Next.js handles the app, Anthropic powers the interview, MongoDB stores the records, and Cloudinary stores uploads. The server checks the available balance and budget before recording a payout.

A donor doesn't just get a thank you, they get a receipt which tells them exactly what their money was used for. This table shows each donor's share of the school-fee payment. Upkeep is disclosed before giving.

## Slide 5: Feasibility and responsible innovation

The working code demonstrates the flow. Identity checks and settlement are simulated. Real funds still require a licensed custody partner, live identity checks and provider-confirmed settlement.

Published attachments are public today; sensitive evidence needs private review. Our planned exception flow pauses an expired reference, requests a replacement and escalates unresolved checks to a human. A human should make the final decision on unresolved checks.

## Slide 6: Validation and next steps

So far, validation is internal: guest donations, uploads, budget limits and donor allocations have been tested. Walkthrough feedback helped us improve the interview and verification flow.

Next is a small school-fee pilot with students, donors and an institution, recording what they understand and what we change. Thank you.
