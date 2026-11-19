# Kairos: Faith & Tech semi-final questions

Sokenu Abigail · Ndujekwu Ugochukwu

Answers distinguish working features from planned exception handling, privacy controls and external settlement.

## The giving flow

### 001. ★ What does Kairos do?

It connects a published need and budget to provider payments and each donor's share. The prototype implements the accounting and updates; live custody and settlement still require integration.

### 002. ★ What stops the organizer withdrawing donations?

The prototype has no personal cash-withdrawal path and checks payment permissions, balance and budget. Live operation needs a licensed custody/payment arrangement that enforces the same restrictions.

### 003. ★ Does the receipt independently prove the school received money?

The current receipt records a simulated application payout. A live settled receipt must be tied to confirmed provider settlement; a locally generated invoice alone is insufficient.

### 004. Can someone give without an account?

Yes. Guest gifts are anonymous and appear in the public cause records. Signed-in donors can receive personal in-app updates; email is optional.


## Review and privacy

### 005. ★ What if a Remita reference expires?

The agreed proposed flow pauses payout, asks the organizer through the AI for a replacement, verifies the same student, institution and bill, then continues. This is not yet implemented.

### 006. ★ When does a human step in?

The proposed workflow escalates a mismatch or an unresolved check. The reviewer checks evidence, records the decision and permits an appropriate next step. A dedicated reviewer workflow is not built.

### 007. ★ Does AI authenticate documents or identify fraud?

It helps structure the need and can discuss consistency. Uploads are accepted supporting material. Independent document authentication, image-reuse checks and live registry checks are not operational.

### 008. ★ Who can view supporting files today?

Unpublished files are owner-only. Files attached to published causes are publicly viewable through the app. Sensitive evidence needs a separate access/redaction design before live use.

### 009. Do you store a donor's or organizer's NIN?

The current identity endpoint stores the simulated verification result and method, not the NIN number. This does not establish that live identity verification or a complete launch privacy program is in place.


## Fees and records

### 010. ★ How does the fee cap work?

The current rule takes 2% of each gross gift until total upkeep reaches ₦5,000 for that cause. It is a per-cause cap. The charge and net cause credit are shown before confirmation.

### 011. ★ How are donor shares calculated?

The allocation uses the donor's net contribution after upkeep. In the full school-fee example, Abigail's ₦155,000 gross payment credits ₦153,000 and that net amount is attributed to the school's recorded payout.

### 012. ★ Have you reconciled real bank payments?

No. Internal balances and payment allocations run in the prototype. External reconciliation needs unique references and a match to confirmed provider settlement, including pending, failed and duplicate events.

### 013. Is NGO funding already secured?

No. Donations and NGO grants are the intended primary support, with tentative capped upkeep as a fallback. The prototype currently applies its upkeep rule; no grant-triggered switch or proven unit economics is claimed.

### 014. Are refunds implemented?

A complete production refund and dispute process is still to be designed and integrated. The prototype does not prove that operation.


## Evidence and launch

### 015. ★ What user research supports this presentation?

The school-fee experience and a conversation with the past president of Ugochukwu’s department support the problem statement. He helps raise fees and reported that existing trust does not always make the details easy to verify. This is qualitative problem feedback, not a completed product test or a live pilot. No donor or institution usability findings have been supplied.

### 016. What would the first pilot measure?

Start with school-fee bills settled, donor understanding of receipts, unresolved payment issues and repeat giving. These are proposed measures, not completed pilot results.

### 017. ★ What remains before live donations?

Licensed custody and live payments, independent verification, appropriate private-evidence controls, external reconciliation and an exception/refund process. No signed custody partnership is claimed.

### 018. How long is this pitch allowed to be?

The organizer’s format is one minute for team introduction, seven minutes for presentation and demo, five minutes for questions and two for scoring/transition. This expanded draft deliberately has no delivery schedule yet. Timing will be decided after the content is edited.

