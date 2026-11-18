# Kairos: 38 questions for the Cleva Grand Finale

Sokenu Abigail · Omohuma Miracle

Rehearse the Cleva payment case first, then the proposed funding connection, external settlement, controls and pilot. Retained questions keep their saved IDs; new questions have independent IDs.

## Cleva judges: start here

### 1. ★ How exactly is Kairos a payment solution?

Kairos addresses a specific type of payment: crowdfunding. For us, that payment is complete when the money reaches the need it was given for. Kairos is designed to control that route from contributors to the school, hospital or supplier, keeping the money tied to the stated bill. We combine existing payment services with budget controls and individual donor receipts, so each person can see what their money paid for.

### 2. ★ What real payment problem are you solving?

Someone sends money toward a school or hospital bill, but a successful transfer to the organizer does not establish that the provider was paid. With several contributors, each person also needs a clear account of their own share. Kairos is designed to coordinate that flow and its evidence.

### 3. ★ What makes your approach different?

The same flow connects a published expense, controlled provider payout and each donor's personal share. We should demonstrate that relationship, rather than claim that nobody else has ever built escrow, crowdfunding or receipts.

### 4. ★ Why not pay the school or hospital directly?

Direct payment is useful. Kairos adds coordination when several people are funding the same bill: one remaining balance, published spending rules and a receipt for every contributor. The first pilot should test whether that coordination saves users effort and improves confidence.

### 5. ★ What have you actually built for this finale?

The deployed app runs intake, document uploads, cause pages, anonymous guest giving, balance and budget checks, donor-share accounting and notifications. Bank transfers, Remita settlement and NIN lookup are simulated. Independent verification, licensed custody and a Cleva or stablecoin connection are not built.

### 6. ★ How is this the future of payments?

Our proposed direction lets supporters in Nigeria and abroad fund the same institutional bill and receive proof of their own share. The current local accounting is the base for that vision. The cross-border funding and external settlement connections remain work to agree and build.

### 7. ★ Why start with school fees?

The first flow has a named student, institution, amount and bill reference. That gives us a focused payment use case to test before broadening the operating model. Live reference validation and institutional settlement still require approved access.

### 8. ★ What do you want from Cleva after the hackathon?

A discussion about whether the use case is eligible, what account and integration model could support it, and whether a controlled test is possible. We would then connect that approved funding flow to licensed custody, provider settlement and reconciliation. No partnership or access has been agreed.


## Cleva and Tether connection

### 9. ★ Where exactly could Cleva fit?

An approved connection could let an eligible supporter abroad fund a Nigerian bill. Kairos would link the settled net naira contribution to the cause, provider payment and donor receipt. Cleva access, transaction eligibility, account ownership and the custody arrangement still need agreement.

### 10. ★ Are you already using Cleva or USDT?

No. Our application answered No to stablecoins, and that is still accurate for the built prototype. The proposed international funding route is a future connection; the current demo does not show Cleva or USDT transactions.

### 11. ★ Would Cleva hold the escrow?

We have not established a Cleva escrow arrangement for Kairos. An ordinary account balance does not itself enforce cause-specific release rules. Licensed custody and the restriction to named expenses need an agreed operating structure.

### 12. ★ Which Cleva API are you integrating?

We have not confirmed developer access or an API contract. Before selecting an approach, we need the permitted flow, account ownership, references, confirmation events, reconciliation and failure rules. A public product feature alone does not establish the integration we need.

### 13. ★ Have you confirmed that Cleva permits donation platforms?

Not yet. We need explicit confirmation of how our proposed flow and account structure fit the applicable terms before any live collection. Hackathon participation does not settle that product-eligibility question.

Sources: [Applicable activity restrictions to clarify](https://www.getcleva.com/legal/global/prohibited-countries-and-activities)

### 14. Why use USDT if a donor can send dollars?

It could be a useful funding option for a permitted supporter who already uses it. We would validate demand, total cost and the available flow first. The bill, provider payment and donor's proof remain the reason to use Kairos.

### 15. Would a USDT deposit remain held as USDT in Cleva?

Cleva's published deposit policy describes approved stablecoins being converted to USD. We should not describe that as a Kairos USDT escrow balance. The proposed flow would need to record the actual conversions and settled contribution.

Sources: [Cleva stablecoin policy](https://www.getcleva.com/legal/global/stablecoin-policy)

### 16. Does being a finalist mean the integration is approved?

No. Selection confirms our place in the competition. A commercial integration, permitted transaction flow, developer access and custody arrangement each still need explicit agreement.


## Overseas funding and settlement

### 17. ★ How would an overseas contribution remain traceable?

The proposed design links the incoming payment identity, conversion, external charges and actual settled naira amount to one cause and contributor. The subsequent provider confirmation must link back to that same chain. This external reconciliation is not implemented yet.

### 18. ★ When would you credit an international contribution to the cause?

The live design should credit a confirmed settled contribution, not a screenshot or a donor's confirmation click. Pending funds need a separate state until the relevant provider confirms the outcome. The current gateway is simulated.

### 19. What happens if the exchange rate changes?

We would disclose the applicable quote and charges, then allocate the actual net naira amount received. If that leaves the bill short, the remaining balance must stay visible. No foreign-currency quote or conversion flow is currently implemented.

### 20. Who pays conversion and transfer costs?

The proposed experience should disclose external charges separately from Kairos upkeep before confirmation. We have not agreed partner pricing, so we cannot promise a particular total cost, exchange rate or saving.

### 21. Can you promise instant or cheaper cross-border payments?

No measured end-to-end result supports that claim yet. We would test confirmation time, conversion, provider payout, support effort and total cost through the agreed connection before making a comparison.

### 22. Could local and overseas donors fund the same bill?

That is the proposed direction. Each contribution would enter the cause record at its actual settled net naira value. Donor attribution would then use those credited amounts. The international collection and settlement path remains unbuilt.

### 23. What if the bill becomes fully funded while an overseas payment is pending?

The live design needs to reserve or recheck the remaining amount before accepting funds, and define how excess or late arrivals are returned. Current accounting checks the remaining net need, but it does not prove a complete cross-border overpayment/refund process.

### 24. What if Cleva cannot support this use case?

We would respect that decision and assess a suitable permitted funding arrangement. The local bill-payment concept can still be tested with approved partners. We would not route transactions through an unrelated personal account to bypass restrictions.


## Controls and donor proof

### 25. ★ What prevents the organizer paying themselves?

The prototype has no cash-withdrawal path and records payments against published provider budget lines. Independent checks of provider ownership and the live custody/payment controls are still needed before claiming that money cannot be redirected in production.

### 26. What stops a payout before the bill is fully funded?

For the school-fee reference flow, the payment button stays unavailable while the available balance is short of the bill. The payout endpoint also checks available funds and the remaining budget. Those accounting checks can be demonstrated now.

### 27. What if the Remita reference expires?

Our agreed proposed flow pauses payout and lets the AI ask the organizer for a replacement. It must match the same student, institution and bill before proceeding. An unresolved mismatch goes to human review. This replacement workflow is not yet built.

### 28. ★ What exactly does the donor's receipt prove today?

It links the donor's share to a recorded prototype payout, showing the amount, provider and invoice reference. It is not independent evidence of a real bank or institutional settlement. A live settled receipt needs the provider's confirmed outcome.

### 29. What prevents a double payment on retry?

A live payout needs a stable payment identity, atomic accounting updates and reconciliation against the provider's outcome. Those production protections are not complete in the prototype. A timeout cannot safely mean that the earlier payment failed.

### 30. How do guest donations fit the proof of payment?

Guest gifts are anonymous in the public cause records and have no personal account inbox. Signed-in donors can follow their own in-app receipts; email is optional. Guest funds still contribute to the cause's accounting.

### 31. How are private documents protected?

Draft files are owner-only. Published cause attachments are currently public through the app. A live operating model needs appropriate private evidence review, redaction and access controls; storage in authenticated Cloudinary assets alone does not make every published file private.


## Business, pilot and execution

### 32. ★ How does Kairos fund itself?

The intended primary support is donations and NGO grants, with tentative 2% upkeep capped at ₦5,000 per cause as a fallback. That support and the unit economics are unproven. The prototype currently applies the upkeep rule; it has no funding-dependent fee switch.

### 33. ★ Show us how the fee and bill amounts reconcile.

Okefe pays ₦150,000: ₦3,000 upkeep and ₦147,000 credited. Abigail pays ₦155,000: ₦2,000 upkeep and ₦153,000 credited because the cause-wide cap is reached. The ₦305,000 gross total becomes ₦5,000 upkeep and ₦300,000 toward the school bill. External partner charges are not priced into this example.

### 34. Why would Cleva want to work with Kairos?

A permitted pilot could test a concrete reason for overseas funding: a named school or hospital bill with evidence returned to contributors. We would measure completed payments, repeat use, cost and support effort. No transaction-volume forecast or commercial agreement has been established.

### 35. ★ What user validation do you have?

The supplied materials document the school-fee observation behind the idea. No completed interview study or live-payment pilot was provided for this pitch. We should use actual dated conversations and results when available, without turning demo accounts into adoption metrics.

### 36. What would a first pilot look like?

A small set of school-fee cases with an agreed institution, permitted payment/custody partners, traceable references and an exception/refund process. Test settlement and reconciliation before opening the flow more widely. This is a proposal, not a pilot already completed.

### 37. Are refunds and disputes ready?

A complete live process is not implemented. We need to define who handles disputed bills, unused funds, reversals and contribution refunds, and reconcile those actions to the payment partner's records.

### 38. ★ What is the first step after this pitch?

Confirm eligibility and integration access, agree the custody/payment responsibilities and test a complete funding-to-provider flow in an appropriate test environment. A controlled live pilot would follow the required approvals and operating arrangements.

