# Kairos: Faith & Tech finale rehearsal questions

Sokenu Abigail · Ndujekwu Ugochukwu

Suggested spoken answers informed by the judging feedback and earlier JCI, Forge and Cleva rehearsal banks. Start with the starred questions. Answers distinguish the current prototype from intended operation; pilot plans and policies are proposals, not completed results.

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


## Questions behind the feedback

### 019. ★ Walk us through a human reviewer handling an uncertain check.

Suppose the student name on a replacement bill differs from the original. The proposed response is to pause payout, obtain the original and replacement records, and confirm the discrepancy through an independently established institutional contact. The reviewer records the evidence and decision before payment resumes. The prototype does not yet have that reviewer queue or decision log.

### 020. What if the replacement reference belongs to a different student or bill?

A replacement must not become a way to redirect the donation. In the intended flow we compare student, institution, bill purpose and amount, and independently confirm any discrepancy. An unresolved mismatch keeps the payout paused. The expired-reference replacement workflow remains to be implemented.

### 021. ★ Is your current app already screening documents and asking permission to publish them?

No. The prototype accepts and stores supporting files; unpublished files are owner-only and published attachments are public. Automatic screening, redaction and a separate publication-permission workflow are intended controls. We should not present the described operating model as proof that those controls already run.

### 022. Your script says you store no sensitive data. What about the documents people upload?

Supporting documents are stored, and a document can itself contain sensitive information. Today draft files are owner-only and published attachments are public. The intended model needs to separate private verification evidence from material approved for publication. That distinction, consent and redaction must be completed before handling sensitive live cases.

### 023. What exactly did the departmental feedback validate?

It supports the problem: people who already raise school fees can still find the details difficult to verify, even where there is personal trust. The presenter also reports a positive response from departmental bodies. That is qualitative problem feedback. It is not proof of completed payments, donor adoption or a successful pilot.

### 024. What did you change because of a specific user finding?

The verification concern supports our focus on a named bill, a named provider and a visible payment record. We do not yet have a documented before-and-after usability finding to claim. The next research step is to observe organisers and donors using the flow, record where they struggle, and show the resulting change.

### 025. If you could demonstrate one more feature for the judges, what would it be?

An exception handled from beginning to end: an uncertain or expired reference, payout paused, evidence reviewed, a decision recorded and the correct next action shown to the donor. That would address the feedback more directly than another normal successful payment. It is a proposed next demonstration, not a feature already completed.


## Bills, fraud and exceptions

### 026. Why use Kairos instead of paying the school directly?

If one donor already knows the student, bill and payment channel, direct payment may be enough. Kairos is useful when several people contribute and need one shared budget, a record of what remains unpaid and a clear account of each contribution. We coordinate the giving and the proof around the bill.

### 027. Why start with school fees rather than every kind of need?

School fees give us a narrow starting point with an identifiable student, institution, bill and payment reference. We can test that workflow before taking on less standard situations. This does not mean every school bill is automatically genuine; each still needs appropriate confirmation.

### 028. What if an organiser names themselves or a fake business as the provider?

A typed provider name or uploaded registration is not enough. The live design needs independent checks connecting the institution or business, its receiving account and the actual bill. A suspicious relationship needs review before payment. CAC and account-name verification are not built into the prototype today.

### 029. ★ What if the organiser and a genuine provider collude?

Paying a provider reduces one route for misuse, but it does not eliminate collusion. The proposed response combines independently checked bills, limits on exposure, records and review of unusual activity. A registered identity alone does not prove honest behaviour, and we cannot promise recovery after money has been paid.

### 030. What if someone uses a real bill without the beneficiary knowing?

A real bill does not establish permission to fundraise for that person. The intended process needs to confirm the beneficiary or an authorised representative agrees to the cause, especially before publishing personal information. That consent check is a launch requirement, not something a convincing story can replace.

### 031. What if two causes raise for the same bill?

The live workflow should recognise the institution, beneficiary and bill or reference across causes, then check the outstanding obligation again before payout. If it has already been settled, we must not pay it again. Cross-cause duplicate detection and live bill-status checks are not yet implemented.

### 032. What happens if a relative pays the bill while fundraising is still going on?

That is a reason to check the bill again before releasing funds. If the need has already been met, the proposed process pauses the affected payout and tells donors what happened. Any refund or revised use needs an agreed process; the money should not silently move to another purpose.

### 033. Can the organiser change the budget or receiving account after people donate?

A change must not quietly change what donors agreed to fund. In the live design, the affected payout should pause while the reason and replacement bill or payee are checked and donors are informed. A complete budget-change and donor-consent workflow is still to be designed and tested.

### 034. What happens if the cause raises too little or too much?

We need a clear policy for deadlines, usable partial funding and surplus before real collection starts. A school must confirm whether a partial payment can satisfy a genuine part of the bill. Otherwise the proposed options are a properly approved revision or a refund. The prototype is not evidence of a complete surplus or refund process.

### 035. What happens if the organiser disappears?

In the intended custody model, disappearance must not transfer the remaining money to the organiser. We would stop further instructions, establish the status of the bill and use the agreed closure or refund process. The actual custody agreement and exception procedures still need to be established.


## Payments and reconciliation

### 036. ★ Walk us through reconciliation rather than just recording a payout.

For a live payment, match the internal instruction and unique reference to the provider record: amount, destination, bill and final settlement status. Pending or mismatched results go into an exception process, not a paid receipt. The prototype maintains internal accounting; it does not yet reconcile independent bank or institution settlement records.

### 037. What if your server crashes just after instructing a payment?

A retry must first establish what happened to the original instruction. The production design needs a durable instruction record, an idempotency key and a provider-status check so the same obligation is not paid twice. We have not demonstrated that crash-and-retry path against a live payment provider.

### 038. What stops two simultaneous payout requests spending the same balance?

The current endpoint checks the balance and remaining budget, but those checks alone are not a complete concurrency guarantee. Live operation needs an atomic reservation or transaction and a unique payment instruction. That is a technical control to implement and test before real money, not something we should assume from a successful demo.

### 039. What if a provider sends the same confirmation twice?

The planned integration must recognise the same provider event or payment reference and apply it once. It should also handle events arriving late or out of order, rather than treating every message as a new payment. That requires provider integration and reconciliation tests; it is not currently demonstrated.

### 040. Does a successful transfer prove the student can return to school?

It proves only the payment status that has been independently confirmed. A stronger outcome check would confirm the correct student bill was credited and, with consent, whether the student could continue. We must separate money paid, obligation settled and the wider educational outcome.

### 041. Can you give a simple example of a donor share?

Suppose a donor has contributed ₦10,000 net of any upkeep, and the cause has received ₦100,000 net. Their share of that pool is 10%. For a ₦40,000 recorded payout against that pool, the displayed allocation is ₦4,000. That explains attribution; it is not a separate transfer from the donor to the provider.

### 042. ★ What if I donate after an earlier payout has already happened?

Your later gift should not be described as funding a payment made before you gave. A production ledger needs to preserve the funding position at each payout and attribute later funds to later spending. The prototype calculates notifications from contributions recorded at payout time, but the complete late-gift and audit history needs explicit testing.

### 043. Do the displayed donor shares always add up to the last naira?

The current notifications round individual shares to whole naira, so displayed totals can have a rounding difference. Production accounting should calculate in the smallest supported unit, preserve the calculation and allocate any remainder consistently. We should not claim exact last-naira display reconciliation from rounded notifications alone.

### 044. What happens if the custody partner freezes funds or Kairos shuts down?

The partner agreement must establish access to records, responsibility for unresolved payments and how funds are returned or obligations completed. An app balance cannot substitute for that arrangement. We do not have a signed custody agreement to point to today, so continuity and closure procedures remain launch work.


## AI, data and security

### 045. ★ What does Claude actually do in the product?

It interviews the organiser and helps turn the conversation into a structured need and budget. The application then presents that draft for review. The model is not independent evidence that the story is true, and its output should not be authority to release money.

### 046. Why use an AI interview instead of a form?

An organiser may know what happened but struggle to turn it into a clear cause and itemised costs. A conversation can ask for missing details and produce an editable draft. We still need to test whether real users find that easier than a form; the interface choice itself is not validation.

### 047. What if the AI invents a cost, provider or detail?

The organiser needs to review and correct the generated draft. For a live cause, an invented detail must not become a verified bill or payment destination: those need independent evidence. We should keep uncertainty visible and test the interview with incomplete and contradictory answers.

### 048. What if someone puts instructions inside an uploaded document to manipulate the AI?

An uploaded document must be treated as untrusted evidence, not as instructions that can change payment rules. Critical amounts, permissions and payees need server checks and independent verification. Document prompt-injection testing and a robust document-processing pipeline remain work to complete before relying on automated screening.

### 049. What happens when Claude is slow or unavailable?

The prototype uses a bounded interview and timeouts, with fallback responses to keep the flow from waiting indefinitely. A fallback does not verify a cause or make guessed facts reliable. For live operation, users need a clear way to review incomplete information and continue without an invented approval.

### 050. Can AI safely decide what personal information to publish?

It can assist review, but we should not treat its judgment as a guarantee. The intended design needs clear public/private fields, explicit publication consent, redaction and a way to handle uncertain documents. Those controls must be built and tested; the current upload feature is not that complete system.

### 051. ★ Does using licensed and verified third parties automatically make Kairos secure?

No. Existing services can reduce the amount we need to build, but our permissions, integrations, document access and accounting can still fail. We must verify the actual service arrangement and test our side of it. The scale-on-existing-rails point is an approach to feasibility, not proof of security.

### 052. Why Next.js, TypeScript, MongoDB and Cloudinary?

Next.js provides the web application and server endpoints, TypeScript helps keep the code consistent, MongoDB stores application records, and Cloudinary stores supporting-file bytes. This stack supports the current prototype. Technology names alone do not prove that the payment operation is secure or ready to scale.

### 053. Is the public ledger impossible for an administrator to alter?

No. Public visibility is not the same as an immutable record, and this is not a blockchain claim. Someone with sufficient database access could alter records. The production design needs restricted administration, change history, backups and reconciliation to independent payment records.

### 054. Why can an API request not simply bypass the interface?

Important rules must be checked on the server. The current payout endpoint checks the signed-in organiser, budget line, verification flag, amount and balance. That flag is part of the prototype workflow, not proof of an independent check. A full security review must also cover concurrency, abuse and administrative access.


## Adoption, sustainability and impact

### 055. Who would bring the first real causes and donors?

Our first route is the departmental bodies and community organisers already helping students raise fees. They have an existing need and audience. We would seek a small, consent-based trial with them; a positive conversation is not yet an agreement to bring causes or donors.

### 056. Why would a school cooperate?

Kairos aims to settle bills through channels the school already uses, rather than asking it to adopt an entirely new fundraising system. But confirmation of the bill, student consent, data access and settlement evidence may still need institutional cooperation. We cannot assume an existing payment channel grants access to all those records.

### 057. Why would donors use Kairos when a WhatsApp transfer is free?

WhatsApp is already where the appeal and trust relationship often start. Kairos adds a shared budget, controlled provider-payment model and records showing what contributions paid for. We need to test whether that extra confidence is valuable enough to justify the added steps and any disclosed fee.

### 058. What makes Kairos different from other crowdfunding services?

Our intended focus is the connection between a named need, a provider payment and each donor’s share of the payment. We should demonstrate that flow rather than claim every other service lacks safeguards. The important comparison for an initial user is often their existing appeal and bank-transfer process.

### 059. What does “capped and unprofitable” mean? Are you guaranteeing fraud cannot pay?

No. We mean reducing the opportunity for misuse by limiting exposure, restricting the intended payment destination and making the records visible. That does not prove collusion is impossible or that every fraud attempt loses money. We still need real limits, monitoring and evidence from operation.

### 060. ★ Can the capped fee sustain the whole business?

We have not established that. The script proposes donations and NGO grants as primary support, with capped upkeep as a fallback. We need to measure checks, AI, messaging, support and payment costs per cause. The current fee rule is implemented, but the funding model and unit economics are still hypotheses.

### 061. Explain the fee cap with numbers.

At 2%, ₦100,000 in gross gifts would produce ₦2,000 upkeep if the cap had not already been reached. At ₦250,000 the cumulative upkeep reaches ₦5,000. Further gifts to that cause do not increase that cap. The fee reduces the net amount credited to the cause, which must be made clear before confirmation.

### 062. What if grants never arrive?

We would need to establish whether the disclosed upkeep can support the actual operating costs, find another suitable source of support, or limit the pilot. We should not collect more real causes than we can service responsibly. No grant commitment or proven break-even point is claimed today.

### 063. How would you measure success beyond money raised?

For an initial trial, we would measure correct bills settled, time to resolve exceptions, donor understanding of receipts and whether organisers and donors return. With appropriate consent, we can also ask whether the funded need was met. These are proposed measures; we do not yet have results to report.


## Team, faith and next steps

### 064. ★ What is the first concrete step after this presentation?

Agree a narrowly scoped school-fee trial with a willing departmental body, establish the payment and verification arrangements, and test the full exception and reconciliation paths before accepting real funds. We would define success and stop conditions in advance. The first step is to secure those conditions, not to announce an unrestricted launch.

### 065. How long will a live launch take?

We do not have a validated launch date. Partner access, verification, privacy controls and settlement testing determine the critical path, not just building another screen. We can give milestones and report progress against them; a date without those dependencies would be a guess.

### 066. Why move to hospitals later rather than immediately?

Healthcare adds difficult questions about patient consent, sensitive documents, changing treatment bills and what happens when the planned care changes. Starting with school fees lets us test a narrower bill-payment workflow. Expansion should follow evidence that we can handle those new responsibilities.

### 067. How does Kairos reflect the faith-and-technology theme?

It applies stewardship, honesty and care for people to a practical giving problem. Donors deserve an account of entrusted money, and people asking for help deserve dignity and privacy. Those values need to appear in how the product operates, not only in how we describe it.

### 068. Is Kairos only for Christians or faith organisations?

The giving problem is not limited to one faith. The intended service should be open to people with eligible needs and willing donors, with consistent verification and treatment. Faith communities can be useful early partners without making religious membership a condition for receiving help.

### 069. What are your team’s responsibilities?

Abigail is the team lead and product manager, responsible for product direction and the user journey. Ugochukwu is the software engineer and CTO, responsible for technical implementation and integrations. The pitch should distinguish those current responsibilities from any future specialist roles in review, operations or compliance.

### 070. What useful help are you asking the judges or organisers for?

Introductions to a suitable payment/custody partner and institutions willing to validate a narrow school-fee trial would help most. We also need critical feedback on exception handling, privacy and whether donors understand the records. These are requests for support, not claims that a partnership or funding has already been secured.


## Hard follow-ups and inclusion

### 071. What if AI wrongly flags an honest applicant or treats some people unfairly?

A model flag should not become an unchallengeable finding of dishonesty. The intended process needs a clear explanation, a chance to correct information and human review of unresolved cases. We also need to test different language styles and circumstances. We have not completed a fairness evaluation or built a dedicated appeal workflow.

### 072. What if someone has a genuine need but cannot pass the identity checks?

A failed or unavailable check is not automatically evidence of fraud. We would need an agreed alternative-evidence and review route that still protects donors. Until we can support that route responsibly, we should be clear about the pilot’s eligibility rather than promise access we cannot deliver.

### 073. How would people with limited English, connectivity or smartphone access use it?

The first prototype is a web flow, not proof of universal access. We would test assisted use through trusted community organisers, simpler language and what happens on a weak connection. We should not claim local-language, offline or accessibility support that has not been implemented and tested.

### 074. Must someone make their hardship public to receive help?

They should not have to publish unnecessary personal information to prove a bill exists. The intended model separates the public fundraising explanation from private evidence used for checks, with beneficiary agreement. The current published-attachment behaviour needs to change before it can support that distinction safely.

### 075. How would someone report a suspicious cause without publicly accusing the beneficiary?

The intended process should accept a private report, assess the evidence and pause affected activity where appropriate. The organiser needs an opportunity to respond, and a suspicion should not be published as a proven fact. We have not yet built the complete reporting, investigation and appeal workflow.

### 076. What prevents an inflated bill from a real provider?

Confirming that a provider exists does not prove its price is reasonable. We would check the underlying obligation and investigate unusual amounts, using appropriate comparisons where available. Automatic price benchmarking and a complete overcharging-review process are not current features, especially for future healthcare cases.

### 077. Could overseas donors contribute, and is Cleva already connected?

That is a possible extension, not a current integration. We would need confirmed provider support for the use case, verified receipt of funds, clear conversion costs and attribution to the same cause before crediting it. Participation in a competition does not establish API access, custody approval or a signed partnership.

### 078. What would you do if a private document were accidentally published?

The response needs to stop public access, establish what was exposed, protect affected people and follow the applicable notification process with appropriate advice. We must also fix the cause of the exposure. That is why consent, access controls and incident procedures need to be in place before sensitive live cases.

### 079. How long would you keep documents, and can someone ask for deletion?

We have not established a complete retention and deletion policy. The live design should minimise what is collected, set clear retention periods and explain how requests interact with necessary payment records. We should not promise that deleting a public post automatically removes every stored copy or third-party record.

### 080. What would make you stop or narrow the first pilot?

We would define stop conditions before collection begins, such as unexplained balance differences, unresolved payee mismatches or a privacy-control failure. The response should be to pause the affected operation and resolve it, rather than keep growing through an unexplained problem. Those are proposed pilot controls, not completed trial results.

