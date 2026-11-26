# Kairos: Faith & Tech finale rehearsal questions

Sokenu Abigail · Ndujekwu Ugochukwu

Plain-English spoken answers covering the 15 November and finalist feedback, compliance and identity safeguards, earlier rehearsal topics, and examples of third parties for each role. Start with the starred questions. Current features, simulations and proposed processes are kept separate. Supplier names are research examples, not signed Kairos partnerships.

## Finals feedback: rehearse first

### 1. ★ What are the judges asking you to strengthen for the finals?

They want us to explain who holds the funds, who handles uncertain decisions and how identity, organisations and beneficiaries are checked. They also want a focused example from the checks through to the donor’s receipt. We can demonstrate the application work already done while identifying the partnerships and processes still needed. Their email does not require us to finish every suggested feature before the finals.

### 2. ★ Walk us through exactly where a real donation would go.

In the proposed live arrangement, a donor pays through the agreed collection channel and the approved financial institution holds the money under the agreed rules. Kairos records the contribution and permits a payment request only for the checked provider and budget item. The financial partner executes the payment. We then match its result to our records and show the donor their share. The holding and settlement arrangement is not live yet.

### 3. ★ Which institution is already holding money for Kairos?

None is established in our current prototype or presentation materials. We have examples of banks, trustees and payment providers to approach, but we must confirm the exact service, permissions and agreement before collecting real funds. A payment gateway account alone would not establish the intended holding-and-release arrangement. We should state the dependency plainly rather than invent a signed partner.

### 4. ★ What would you confirm with a financial partner before launch?

We would explain the donation use case and confirm who holds the funds, who can approve a payment, which recipients are allowed and how fees, refunds and disputes work. We would also agree how we receive payment results and compare our records. The provider must support the particular arrangement we need. A general statement that it is licensed is not enough to answer those operational questions.

### 5. ★ Who requests, approves and actually sends the payment?

The organiser would request a payment for the published budget item. Our rules and any required authorised review would check the bill, provider, amount and remaining funds. The institution holding or processing the money would execute an approved instruction under the agreed arrangement. We need clear separation of those responsibilities. The prototype currently demonstrates organiser permissions and checks, rather than a complete independent approval operation.

### 6. ★ What if the account is debited but the school says it received nothing?

We would keep the payment under investigation and compare the reference and result with the provider and school. We should not assume failure and send it again while the outcome is unknown. The donor should see that it is pending or being checked, rather than a false success message. Once the outcome is established, the agreed retry, reversal or dispute process would apply. This is a live-operation requirement still to build.

### 7. ★ Who would the human reviewer be, and how would they work?

We need to assign an authorised person with a clear procedure before a live pilot. They would see only the evidence needed, check it through an independently obtained institutional contact and record what they decided and why. The organiser should not approve their own exception. We have not hired or demonstrated a complete review team, so this is a responsibility to establish, not an operation we can already claim.

### 8. ★ What if a legitimate applicant disagrees with the reviewer?

They should receive an understandable reason and a way to supply corrected or additional information. A different authorised person should review a contested decision where possible, with any conflict of interest declared. The records should show what changed and why. We have not built that full appeal route or promised a response time; we need a workable procedure for the size of the first pilot.

### 9. ★ Can a human reviewer simply override a failed check and release money?

Human review should resolve the underlying issue, not switch off the payment rules. For example, the reviewer could confirm why the student’s initials differ from the school record and document that evidence. The provider, amount and budget limits must still be checked. A reviewer should not label an unresolved transfer as paid or direct the money to a new personal account. Those permissions and records need to be implemented.

### 10. ★ What is the difference between identity, organisation, beneficiary and provider checks?

Identity asks who is organising the appeal. Organisation checks ask whether an institution or business exists and whether the person can act for it. Beneficiary checks ask whether the named person has the stated need and agrees to the appeal. Provider checks establish who should receive payment and whether the bill and receiving details belong together. Passing one check does not automatically answer the other three.

### 11. ★ What would verification look like for one school-fee case?

We would confirm the organiser’s identity and relationship to the student, the student’s agreement, the fee evidence and what is still owed. We would check the school and its official payment destination through a trusted route, then validate the reference and check for an already-paid or duplicate bill. After payment, we would confirm the correct bill was credited. The demo illustrates the intended flow; independent external checks are still simulated or unbuilt.

### 12. ★ How does CAC verification help, and what does it not prove?

CAC records can help us compare a registered organisation’s name and registration details with the provider being named. We still need to check that the organiser is authorised, the receiving account belongs to the right institution and the bill is genuine. Registration does not prove honest conduct or a medical or education licence. A public institution may need its establishing law or relevant official register instead. Live CAC checking is not built in Kairos yet.

### 13. ★ What does a verified badge in the current demo actually mean?

Some verification results are demonstration states. The current identity endpoint records a positive result without calling a live identity provider, and cause creation marks provider checks as passed for the demo. Those badges should not be offered as independent proof of a person or business. The live application logic around them works, but trusted results need a connected checking service and tested handling of failures.

### 14. ★ Your script says every third-party integration is simulated. Is that accurate?

That sentence needs its scope explained. Claude, hosted application and database services, file storage and the email-sending path are actual services used by the prototype. Identity checks, licensed funds holding and external payment settlement are the intended integrations that are simulated or not built. We should name that distinction when asked rather than imply that the AI interview or hosting is also a mock.


## Compliance and identity safeguards

### 15. ★ Are you already licensed and fully compliant?

We are presenting a prototype, not claiming a financial licence or completed compliance approval. Real identity verification, funds holding and external payments are not connected. Before taking real donations, we need to confirm the legal model, agree responsibilities with suitable partners and put the necessary privacy, review and complaints processes in place. A working demo is not permission to operate a live financial service.

Sources: [CBN payment licence categories](https://www.cbn.gov.ng/out/2020/ccd/categorization%20of%20psps.pdf) · [NDPC implementation guidance, 2025](https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf)

### 16. ★ If Kairos does not hold the money, does that mean it needs no licence?

We cannot assume that. What matters is the activity Kairos actually performs and controls, including collecting donations, instructing payments and setting release conditions. We need the proposed arrangement reviewed against the applicable rules and the partner's permissions before launch. Saying that a partner holds the funds does not, by itself, establish that Kairos needs no authorisation.

Sources: [CBN payment licence categories](https://www.cbn.gov.ng/out/2020/ccd/categorization%20of%20psps.pdf)

### 17. ★ How would you know a financial partner is allowed to hold these donations?

We would check the exact legal entity and its current permissions, then confirm in writing that it supports this donation and release model. A payment gateway connection is not automatically an escrow arrangement. We need to know who holds the money, whose account it is in, how it is kept separate from operating money, who can authorise releases and what happens in a dispute or provider failure. No such Kairos agreement is claimed today.

Sources: [CBN payment licence categories](https://www.cbn.gov.ng/out/2020/ccd/categorization%20of%20psps.pdf)

### 18. Does using licensed third parties make all compliance their responsibility?

No. The partner has responsibilities for its own service, while Kairos still has responsibilities for the information it collects, its published claims, access controls, budget rules and treatment of users. We would write down who performs each check, investigates concerns, answers complaints and handles incidents. We also need to verify the partner's actual service and permissions instead of treating a recognised company name as blanket approval.

Sources: [CBN payment licence categories](https://www.cbn.gov.ng/out/2020/ccd/categorization%20of%20psps.pdf) · [NDPC implementation guidance, 2025](https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf)

### 19. ★ How would you deal with money laundering, sanctions or suspicious donations?

Before live payments, we would agree the required checks and escalation route with the financial partner and qualified advisers. That includes who reviews unusual donations, confirms relevant identities and makes any required reports. Donating to a charitable cause does not remove financial-crime risks. A warning needs investigation; it should not automatically become a fraud finding. Live screening, reporting arrangements and a staffed compliance operation are not implemented today.

Sources: [CBN financial-institution AML/CFT/CPF regulations](https://www.cbn.gov.ng/Out/2022/FPRD/AML%20CIRCULAR%20AND%20REGULATIONS%20MERGED.pdf)

### 20. Would every donor have to provide a NIN, including an anonymous donor?

We should not collect a NIN from everyone just because it is available. The checks should reflect the person's role, the risk and the financial partner's applicable requirements. Public anonymity means other viewers do not see the donor's identity; it does not promise that a payment partner will perform no checks. The current guest-donation demo is not a final live-payment identity policy.

Sources: [Nigeria Data Protection Act 2023](https://ndpc.gov.ng/wp-content/uploads/2024/03/Nigeria_Data_Protection_Act_2023.pdf)

### 21. ★ Can you truthfully say Kairos stores no sensitive data?

We should not make that blanket claim. Kairos already stores account and cause information, and uploaded evidence could contain private details. Our goal should be to collect less, keep unnecessary identity documents out of Kairos and strictly control what becomes public. A protected identity token and a restriction record would still be data we retain. The present prototype does not yet provide a complete private-evidence and retention process.

Sources: [Nigeria Data Protection Act 2023](https://ndpc.gov.ng/wp-content/uploads/2024/03/Nigeria_Data_Protection_Act_2023.pdf) · [NDPC implementation guidance, 2025](https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf)

### 22. ★ What would justify keeping identity information for fraud prevention?

We need a documented lawful basis for that particular use, a clear explanation to users and evidence that the information is necessary. Fraud prevention is a purpose, not automatic permission to collect or retain everything. If relying on legitimate interests, we would assess necessity and the effect on people's rights. We should not assume that one consent checkbox covers every check, future use or retention period. This assessment is still to be completed.

Sources: [Nigeria Data Protection Act 2023](https://ndpc.gov.ng/wp-content/uploads/2024/03/Nigeria_Data_Protection_Act_2023.pdf) · [NDPC implementation guidance, 2025](https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf)

### 23. ★ How can you recognise a restricted person returning with a new name or account without storing their raw NIN?

We would first verify that the identity belongs to the applicant, then look up a stable private identity token directly. We would not filter by full name: names can change or belong to different people. A suitable verification provider could issue the token, or we could consider HMAC-SHA-256 with a secret key protected separately from the database, instead of an ordinary NIN hash. The same verified NIN would then match despite a new name or email. We would retain only justified restriction information, including the reason, necessary evidence, reviewer and review date, with an appeal route. The token is still personal data, so it needs a lawful purpose, protection and a retention policy. An AI flag alone would not establish fraud. This cannot prevent every stolen-identity or accomplice attempt, and it is a proposed safeguard, not a feature already built.

Sources: [ENISA: pseudonymisation techniques and risks](https://www.enisa.europa.eu/publications/pseudonymisation-techniques-and-best-practices) · [NIST: pairwise pseudonymous identifiers](https://pages.nist.gov/800-63-4/sp800-63c.html) · [Nigeria Data Protection Act 2023](https://ndpc.gov.ng/wp-content/uploads/2024/03/Nigeria_Data_Protection_Act_2023.pdf) · [NDPC implementation guidance, 2025](https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf)

### 24. ★ Should you compare full names before comparing the identity token?

No. Different people can share a full name, and a person's name can change. A name filter could miss the same person returning or draw attention to an unrelated person. Once identity has been properly verified, we would look up the stable token directly. Names may help a reviewer understand a case, but they should not be the key for matching a returning identity or deciding that someone is dishonest.

### 25. ★ Is storing an ordinary hash of someone's NIN safe enough?

An ordinary hash is a poor choice here because someone with a leaked database could test possible NIN values against it. One proposed alternative is HMAC-SHA-256, which creates a repeatable token using a secret key kept separately from the database and used only on the server. A provider-issued private identifier may avoid handling the NIN ourselves, if it remains stable for the same verified person. A temporary verification reference is not that identifier.

Sources: [ENISA: pseudonymisation techniques and risks](https://www.enisa.europa.eu/publications/pseudonymisation-techniques-and-best-practices) · [NIST: pairwise pseudonymous identifiers](https://pages.nist.gov/800-63-4/sp800-63c.html)

### 26. ★ What stops someone entering another person's NIN and getting that person restricted?

A typed NIN is not proof that the applicant owns that identity. Before using an identity token for restrictions, the verification process must establish that the applicant is the person represented, using the authorised provider's appropriate checks. We must also consider account takeover and identity theft when investigating an incident. We should never turn an unverified number or a failed lookup into a permanent restriction on its real owner. Today's NIN check is simulated.

### 27. What would you retain instead of the raw NIN or a simple fraud flag?

A proposed minimum is the protected identity token, restriction status, a clear reason, a reference to necessary evidence, the decision date, who reviewed it and the next review or deletion date. Evidence itself needs limited access and its own retention rules. We should distinguish a temporary restriction from an upheld finding and an overturned decision. Retaining the full NIN or all uploaded documents indefinitely is not necessary just to recognise the same verified identity.

Sources: [NDPC implementation guidance, 2025](https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf)

### 28. ★ Who decides someone committed fraud, and what if the decision is wrong?

An AI flag, a failed verification or an unsuccessful payment should not be treated as proof of fraud. An authorised person would review evidence, record the reason for any restriction and give the affected person a way to respond and appeal. A reviewer must be able to correct or overturn the decision. We should describe a platform restriction accurately rather than imply a criminal conviction. The full case-review and appeal process is still proposed.

Sources: [Nigeria Data Protection Act 2023](https://ndpc.gov.ng/wp-content/uploads/2024/03/Nigeria_Data_Protection_Act_2023.pdf) · [NDPC implementation guidance, 2025](https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf)

### 29. ★ Could a restricted user delete their account and demand that you forget the restriction?

Account deletion and retention of a justified restriction record are separate decisions. We would assess the request, the applicable rights and whether a limited record still has a lawful and necessary purpose. We cannot promise to erase every record immediately, or to keep every restriction forever. The policy must explain what remains, why, for how long and how the decision can be challenged. That policy has not yet been finalised.

Sources: [Nigeria Data Protection Act 2023](https://ndpc.gov.ng/wp-content/uploads/2024/03/Nigeria_Data_Protection_Act_2023.pdf) · [NDPC implementation guidance, 2025](https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf)

### 30. ★ If you store only a hash or token, is it still personal data?

Yes, we would treat it as personal data. Its purpose is to recognise the same person and connect them to an account or restriction. Hiding the original NIN reduces exposure, but it does not make that record anonymous or automatically lawful. Access should be limited, retention justified and the record protected. We should say that we aim to avoid retaining raw NINs, rather than claim that no personal data is stored.

Sources: [ENISA: pseudonymisation techniques and risks](https://www.enisa.europa.eu/publications/pseudonymisation-techniques-and-best-practices) · [Nigeria Data Protection Act 2023](https://ndpc.gov.ng/wp-content/uploads/2024/03/Nigeria_Data_Protection_Act_2023.pdf)

### 31. What happens if the HMAC key or identity provider changes?

We would need a migration plan before relying on the token. A new HMAC key produces a different token, so discarding the old key immediately could stop old restrictions from matching. If raw NINs are not retained, old tokens cannot simply be converted into new ones. Key versions, protected transition checks and re-verification may be needed. A new provider may also issue different identifiers. These are design requirements, not completed safeguards.

Sources: [ENISA: pseudonymisation techniques and risks](https://www.enisa.europa.eu/publications/pseudonymisation-techniques-and-best-practices)

### 32. How would you protect children, students and people sharing medical information?

We would ask only for what is needed, keep private evidence separate from the public story and establish the appropriate authority and permissions to act for the beneficiary. A student is not necessarily an adult, and a medical document may reveal particularly private information. Someone's need for help should not become permission to publish everything about them. Applicable safeguards and any guardian involvement must be assessed before a live pilot; these processes are not complete today.

Sources: [Nigeria Data Protection Act 2023](https://ndpc.gov.ng/wp-content/uploads/2024/03/Nigeria_Data_Protection_Act_2023.pdf) · [NDPC implementation guidance, 2025](https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf)

### 33. Can identity documents and cause information be sent to AI or overseas cloud providers?

We cannot assume that using a familiar cloud or AI provider settles the privacy questions. We need to check what information each service receives, its purpose, where it is processed, who can access it and how deletion works. Contracts and any required transfer safeguards need review. Raw NINs and unnecessary private documents should not be sent to the AI interview. Current use of Claude, Cloudinary, MongoDB Atlas and Vercel is not a completed privacy assessment.

Sources: [Nigeria Data Protection Act 2023](https://ndpc.gov.ng/wp-content/uploads/2024/03/Nigeria_Data_Protection_Act_2023.pdf) · [NDPC implementation guidance, 2025](https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf)

### 34. Do you need NDPC registration, a privacy officer or a data-protection impact assessment?

We need to assess the applicable requirements against Kairos's actual activities, data and risks. We should not assume an early-stage prototype is automatically exempt. Registration as a controller or processor of major importance, a data-protection officer and an impact assessment each have their own triggers. Identity matching, sensitive evidence and decisions affecting access deserve particular attention. We are not claiming that Kairos has completed registration, appointed a qualified officer or passed an impact assessment.

Sources: [NDPC implementation guidance, 2025](https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf)

### 35. What would happen if private documents or identity tokens leaked?

We would contain the exposure, protect affected accounts, establish what was accessed and preserve the information needed to investigate. The incident must be assessed for any required notices to the regulator and affected people within the applicable deadlines. A leaked HMAC key needs a separate response because it undermines the token's protection. We still need assigned responsibilities, tested response steps and a way for users to report a concern before live use.

Sources: [Nigeria Data Protection Act 2023](https://ndpc.gov.ng/wp-content/uploads/2024/03/Nigeria_Data_Protection_Act_2023.pdf) · [NDPC implementation guidance, 2025](https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf) · [ENISA: pseudonymisation techniques and risks](https://www.enisa.europa.eu/publications/pseudonymisation-techniques-and-best-practices)

### 36. What compliance questions remain around refunds and complaints?

Before accepting real donations, donors should understand the charges, permitted use of their money and what happens if a bill changes, a cause closes or a payment fails. We need an accessible complaints route and agreed responsibilities for refunds, reversals and unresolved disputes. Kairos should not silently divert restricted donations to another purpose. These rules must match what the financial partner can actually do; a refund button or a draft policy would not be enough.

### 37. How can you minimise personal data while keeping trustworthy payment records?

Different records have different purposes. A payment reference, amount, recipient, status and donor allocation may need to be retained separately from an identity document. We should define the necessary fields, access and retention for each, taking account of applicable requirements and partner responsibilities. Deleting a public cause should not silently destroy evidence needed to resolve a payment dispute. Equally, keeping financial records does not justify retaining every personal attachment forever.

Sources: [NDPC implementation guidance, 2025](https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf)

### 38. ★ What would you put in place before inviting real donations?

We would confirm the legal and funds-holding arrangement, test a real verification-to-receipt path with the partner, limit access to private evidence and assign people to reviews, complaints and incidents. We would also document data use and retention, test failed payments and refunds, and agree when the pilot must pause. Each safeguard needs evidence that it works. We have not completed those steps, so the present walkthrough should remain a demonstration using simulated funds.


## Third parties: examples for each role

### 39. Who could provide NIN and BVN identity checks?

These are examples to investigate for checking identity details such as NIN or BVN. A lookup of an identity record, a comparison with a selfie and a check that a real person is present are different jobs. We must confirm access, permission and Nigeria coverage. Kairos’s current identity check is simulated.

- [Prembly / IdentityPass](https://docs.prembly.com/api-reference): NIN, BVN and NIN-with-face APIs.
- [Dojah](https://support.dojah.io/articles/what-does-dojah-do): NIN and BVN lookup / onboarding.
- [Youverify](https://youverify.co/en/ng): Nigerian identity and compliance checks.
- [Smile ID](https://docs.usesmileid.com/): ID-number and biometric KYC; check Nigeria coverage.
- [VerifyMe / QoreID](https://docs.qoreid.com/docs/our-service-availability): NIN, BVN, NIN-face and NIN-liveness services.
- [Seamfix Verify](https://seamfix.com/product/weve-made-changes-to-our-nin-verification-service-in-nigeria/): official NIN verification.
- [Sumsub](https://docs.sumsub.com/docs/non-doc-identity-verification): document-free Nigeria NIN / BVN checks.
- [Mono](https://docs.mono.co/docs/lookup/nin-lookup): Nigeria NIN lookup.
- [MetaMap](https://docs.metamap.com/reference/govchecks-nigeria-nin-1): Nigeria NIN GovChecks endpoint.
- [NIMC / NINAuth](https://ninauth.nimc.gov.ng/): authoritative NIN authentication route; access approval required.

### 40. Who could provide selfie matching and face liveness checks?

These providers offer different kinds of face comparison or checks that someone is present rather than a photograph. A face-check tool does not automatically give access to a Nigerian identity record. We would test the relevant phones and conditions before choosing a service. The demo does not establish a live face-verification connection.

- [Prembly / IdentityPass](https://docs.prembly.com/guides/products/biometrics/channels): face comparison and liveness.
- [Dojah](https://checkin.dojah.io/liveness-check): selfie / government-ID matching and liveness.
- [Smile ID](https://docs.usesmileid.com/): biometric onboarding / SmartSelfie.
- [VerifyMe / QoreID](https://docs.qoreid.com/docs/our-service-availability): NIN face matching and liveness.
- [Youverify](https://youverify.co/en/ng): biometric identity verification.
- [Sumsub](https://docs.sumsub.com/docs/identity-verification): liveness and face match.
- [iProov](https://www.iproov.com/): global biometric presence and identity checks.
- [FaceTec](https://www.facetec.com/): global 3D liveness and face matching.
- [Veriff](https://www.veriff.com/product/liveness): global biometric liveness.
- [Persona](https://withpersona.com/product/verifications/selfie-recognition/): global selfie recognition and liveness.
- [Incode](https://www.incode.com/): global liveness and biometric verification.
- [Entrust / Onfido](https://www.entrust.com/products/identity-verification): global document and biometric verification.
- [Shufti](https://shuftipro.com/): global identity and biometric checks.
- [Amazon Web Services](https://aws.amazon.com/rekognition/face-liveness/): Amazon Rekognition Face Liveness; separate NIN source.

### 41. Who could verify CAC registration, businesses and provider ownership?

These are examples for checking registered organisations and their ownership details. We would compare the legal record with the named provider, its official contacts and separately checked account. Registration alone does not prove a bill is real or that the organiser can act for that institution. Live organisation checking is not built.

- [Prembly / IdentityPass](https://docs.prembly.com/api-reference): CAC basic / advanced business verification.
- [Dojah](https://dojah.io/business-verification): CAC, TIN and company-data checks.
- [Youverify](https://youverify.co/en/ng): business and beneficial-owner verification.
- [VerifyMe / QoreID](https://docs.qoreid.com/docs/our-service-availability): CAC verification.
- [Mono](https://docs.mono.co/docs/lookup/cac-lookup): CAC company profile, directors / ownership and status-report lookup.
- [Regfyl](https://regfyl.com/kyb): entity registration, beneficial owners and director screening.
- [Smile ID](https://www.youtube.com/watch?v=3yabLKa4GMA): business verification; confirm current Nigeria product access.
- [Sumsub](https://docs.sumsub.com/docs/business-verification): global KYB; confirm Nigeria coverage.
- [Trulioo](https://developer.trulioo.com/reference/guide-business-verification): global business / ownership verification; confirm Nigeria data.
- [Corporate Affairs Commission (CAC)](https://www.cac.gov.ng/services/company-search): official company-search evidence source; not a signed partner.

### 42. Who could check a bank account name before paying a provider?

These are examples for checking a receiving account’s details. Looking up the name associated with an account helps us spot a mismatch, but we must still establish that it is the intended provider and that the bill belongs to this cause. A matching name does not establish the organiser’s authority.

- [Paystack](https://paystack.com/docs/api/verification/): Nigerian account resolution.
- [Flutterwave](https://developer.flutterwave.com/docs/payout-outflow/introduction): Nigerian beneficiary verification.
- [Monnify / Moniepoint](https://developers.monnify.com/): bank-account detail verification.
- [Prembly / IdentityPass](https://docs.prembly.com/api-reference): bank-account basic and comparison APIs.
- [VerifyMe / QoreID](https://docs.qoreid.com/docs/our-service-availability): NUBAN regular / BVN-data checks.
- [Dojah](https://docs.dojah.io/api-reference/endpoint/general_service/resolve_nuban): NUBAN account-name resolution.
- [Mono](https://support.mono.co/en/articles/8394537-how-to-use-lookup-on-the-dashboard): bank-account Lookup; confirm required ownership data.
- [Safe Haven Microfinance Bank](https://safehavenmfb.readme.io/reference/name-enquiry): bank-account name-enquiry endpoint.

### 43. Which banks or trustees could we approach for escrow and custody?

These are institutions to approach about holding money and releasing it under agreed rules. Some explicitly describe escrow services; others are leads for a discussion about trust or charitable funds. We must confirm suitability, permissions and donation eligibility. None is being claimed as a signed Kairos custody partner.

- [Stanbic IBTC Bank](https://www.stanbicibtcbank.com/nigeriabank/corporate-and-investment/transaction-banking/Escrow-services): explicit bank escrow and conditional release service.
- [FirstBank / FirstEscrow](https://firstescrow.firstbanknigeria.com/): FirstEscrow; confirm suitability for pooled donations.
- [Access Bank](https://www.accessbankplc.com/corporate/corporate-sector/access-investor-services): escrow within Access Investor Services.
- [United Capital Trustees](https://unitedcapitalplcgroup.com/faq/): corporate escrow and trustee services.
- [Coronation Trustees](https://coronation.ng/institutional/products-solutions/asset-management/corporate-trust/corporate-client-services/): corporate-trust escrow service.
- [First Trustees](https://firsttrustees.com/solutions/corporate-trust/): corporate trustee; bespoke donation-custody / escrow fit unconfirmed.
- [STL Trustees](https://stltrustees.com/corporate-trust/): corporate trustee; bespoke donation-custody / escrow fit unconfirmed.
- [Quantum Zenith Trustees & Investments](https://quantumzenithtrustees.com.ng/): charitable trust / structured giving; escrow/API fit unconfirmed.

### 44. Which escrow technology companies could we also investigate?

These companies describe escrow-related technology. We would need to establish which institution actually holds the money, how it is protected and how releases, disagreements and refunds work. A website advertising escrow is not proof of an agreed or approved Kairos arrangement.

- [Vesicash](https://vesicash.com/terms/): published escrow terms and integration history; current site emphasizes merchant-of-record services.
- [Trustcrow](https://gotrustcrow.gitbook.io/trustcrow-api-v1): API for funding, holding and releasing escrow transactions.
- [EscrowLock](https://www.escrowlock.com/): Nigeria escrow service; confirm API and charity use case.

### 45. Who could collect local donations and process checkout payments?

These are examples of services that could accept donations through supported payment channels. We would confirm that they permit the use case, what they charge and how they confirm a payment. Collecting a payment and holding donations under our intended release rules are separate responsibilities.

- [Paystack](https://paystack.com/docs/payments/accept-payments/): cards, transfers and checkout.
- [Flutterwave](https://developer.flutterwave.com/docs): payment collection and checkout.
- [Monnify / Moniepoint](https://developers.monnify.com/): bank-transfer and card collections.
- [Squad / GTCO HabariPay](https://docs.squadco.com/): online collection and payment APIs; current docs may require access.
- [Interswitch / Quickteller](https://developer.interswitchng.com/): Webpay / Quickteller payment acceptance.
- [Remita / SystemSpecs](https://api.remita.net/): multichannel collections and biller references.
- [Fincra](https://docs.fincra.com/docs/payin-overview): checkout and pay-ins.
- [Kora](https://www.korahq.com/): pay-ins and payment infrastructure.
- [Nomba](https://developer.nomba.com/docs/introduction/welcome-to-nomba): online payments and collection APIs.
- [Payaza](https://payaza.africa/faq/): collections and payment links.
- [SeerBit](https://www.seerbit.com/contact-us/get-started): online payment collection.
- [Paga](https://www.mypaga.com/home/business.html): payment gateway and business collections.
- [eTranzact](https://www.etranzact.com/): electronic-payment infrastructure; confirm selected product.
- [Xpress Payment Solutions](https://xpresspayments.com/business): payment collections / eCashier.

### 46. Who could supply virtual accounts or embedded banking infrastructure?

A dedicated collection account or reference can help us identify which cause an incoming transfer belongs to. These providers are examples to investigate. An account number does not by itself establish who may hold the funds or which payments are allowed. The financial arrangement still needs to be agreed.

- [Anchor](https://docs.getanchor.co/docs/developer-onboarding-to-anchor-api): deposit accounts, incoming payments and transfers.
- [Safe Haven Microfinance Bank](https://safehavenmfb.readme.io/reference/create-virtual-account): virtual accounts and collection callbacks.
- [9 Payment Service Bank (9PSB)](https://9psb.com.ng/): virtual accounts and payout infrastructure.
- [ProvidusUnity Bank](https://www.providusbank.com/banking-apis/corporate): digital collection service / virtual accounts.
- [Sterling Bank](https://sterling.ng/corporate/sme/spay/): sPay open API banking; agree required account structure.
- [Monnify / Moniepoint](https://developers.monnify.com/): reserved collection accounts.
- [Squad / GTCO HabariPay](https://docs.squadco.com/): reserved / dynamic virtual accounts.
- [Paystack](https://paystack.com/docs/payments/accept-payments/): dedicated virtual accounts.
- [Fincra](https://fincra.com/): virtual-account products.
- [Payaza](https://payaza.africa/faq/): virtual-account collection products.

### 47. Who could send the money to schools, hospitals and suppliers?

These are examples of services that could send approved payments to a provider. We would check recipient details, payment references, result updates, delays and safe retries. The agreed institution holding the funds must also support the restrictions on where money may go. Kairos has not connected live payouts.

- [Paystack](https://paystack.com/docs/transfers/single-transfers/): bank transfer API.
- [Flutterwave](https://developer.flutterwave.com/v4.0.0/docs/bank-transfer): bank-account payouts.
- [Monnify / Moniepoint](https://developers.monnify.com/): Nigerian-bank transfers / payouts.
- [Fincra](https://docs.fincra.com/docs/payout-overview): payout API.
- [Kora](https://www.korahq.com/): payout infrastructure.
- [Nomba](https://developer.nomba.com/docs/introduction/welcome-to-nomba): transfer APIs.
- [Payaza](https://payaza.africa/faq/): business payouts.
- [Paga](https://www.mypaga.com/home/business.html): bank / Paga disbursements.
- [Remita / SystemSpecs](https://api.remita.net/): funds-transfer APIs.
- [Xpress Payment Solutions](https://xpresspayments.com/business): fund disbursements.
- [Anchor](https://docs.getanchor.co/docs/developer-onboarding-to-anchor-api): bank-transfer infrastructure.
- [Safe Haven Microfinance Bank](https://safehavenmfb.readme.io/reference/introduction): transfers and beneficiary management.
- [9 Payment Service Bank (9PSB)](https://9psb.com.ng/): Nigeria payout infrastructure.
- [ProvidusUnity Bank](https://www.providusbank.com/banking-apis/corporate): corporate transfer APIs.

### 48. Who could validate bill references and settle school or hospital bills?

The school or hospital must support the actual bill-payment method. Remita is the relevant example for a Remita Retrieval Reference. Another provider’s bill API cannot automatically be treated as a way to validate that reference. We still need to confirm the beneficiary, amount, outstanding bill and institution’s acknowledgement.

- [Remita / SystemSpecs](https://api.remita.net/): RRR generation / lookup, collections and bill settlement.
- [Wema Bank / ALAT](https://playground.alat.ng/product-remita-product): ALAT Remita Payment Service: catalogue, validation and RRR generation.
- [Interswitch / Quickteller](https://docs.interswitchgroup.com/docs/quickteller-business): Quickteller / biller integration; institution availability varies.
- [Flutterwave](https://developer.flutterwave.com/api): Tuition and payment APIs; confirm the specific institution and access.
- [eTranzact](https://www.etranzact.com/): institutional payment integration; confirm school's active channel.
- [Xpress Payment Solutions](https://xpresspayments.com/business): Xpress Biller Services / institutional collections.
- [Paga](https://developer-docs.paga.com/docs/business-rest-api-operations): biller and registered-merchant payments.
- [Monnify / Moniepoint](https://developers.monnify.com/): bills APIs; confirm catalogue instead of assuming school/RRR coverage.

### 49. Who could support overseas funding, currency conversion and naira settlement?

These are possible options for later overseas contributions. We would need permission for the donation use case, supported donor countries and clear conversion charges and naira amounts before recording a contribution. An ordinary foreign-currency business account is not automatically a donation-platform integration. None of these is connected for this purpose today.

- [Cleva](https://www.getcleva.com/business): priority event conversation: overseas funding; eligibility and integration unconfirmed.
- [Fincra](https://fincra.com/): cross-currency pay-in / payout infrastructure.
- [Flutterwave](https://developer.flutterwave.com/docs): international collection and payout products.
- [Verto](https://verto.co/): business FX, international payments and APIs.
- [Leatherback](https://leatherback.co/): multicurrency accounts and international transfers.
- [Klasha](https://www.klasha.com/): cross-border payment collection and APIs.
- [Raenest](https://www.raenest.com/): business foreign-currency accounts; platform/donation API fit unconfirmed.
- [Grey Business](https://grey.co/business): business multicurrency accounts; platform/donation API fit unconfirmed.
- [Thunes](https://www.thunes.com/): global bank / wallet payment network; corridor access to confirm.
- [TerraPay](https://www.terrapay.com/): global wallet / bank transfer infrastructure; corridor access to confirm.
- [Nium](https://www.nium.com/): enterprise FX / global payouts; Nigeria flow to confirm.
- [dLocal](https://www.dlocal.com/): emerging-market pay-ins and payouts, including Nigeria coverage.

### 50. Who could handle future stablecoin funding, conversion or custody?

These are optional future examples for different jobs around digital currencies, conversion or wallet technology. Their services are not interchangeable, and this is not required for our first school-fee case. We would need to confirm supported assets, countries, permissions and who holds the funds. No stablecoin funding or custody integration is claimed.

- [Cleva](https://www.getcleva.com/legal/global/stablecoin-policy): approved stablecoin deposits convert to USD; no Kairos USDT escrow.
- [Yellow Card](https://yellowcard.io/): Africa stablecoin / local-currency infrastructure; Nigeria listed.
- [Bridge](https://www.bridge.xyz/): stablecoin orchestration, wallets and conversion APIs.
- [BVNK](https://www.bvnk.com/): enterprise fiat / stablecoin payment infrastructure.
- [zerohash](https://zerohash.com/): crypto / stablecoin infrastructure and custody products.
- [Circle](https://www.circle.com/): USDC and payments infrastructure; not the issuer of USDT.
- [Fireblocks](https://www.fireblocks.com/): wallet, policy and asset-transfer infrastructure; custody structure separate.
- [BitGo](https://www.bitgo.com/): institutional digital-asset custody / wallet services.
- [Grey Business](https://grey.co/business): business USDC deposits / payouts; confirm Nigeria and donation eligibility.
- [Nium](https://www.nium.com/): USDC funding / global payout products; eligibility to confirm.

### 51. Who could screen sanctions, politically exposed persons and money-laundering risks?

These services can help check restricted-person lists or other financial-risk information. Those checks are different from proving that a student owes school fees. We would follow the agreed financial partner’s requirements and have a person review uncertain results. This provider list is research, not an operating Kairos compliance service.

- [Youverify](https://youverify.co/en/ng): Nigeria AML / fraud, screening and monitoring.
- [Prembly / IdentityPass](https://docs.prembly.com/api-reference): AML, PEP, sanctions and transaction-screening endpoints.
- [Dojah](https://support.dojah.io/articles/what-does-dojah-do): identity, compliance and fraud services.
- [Smile ID](https://docs.usesmileid.com/): AML screening; confirm purchased product.
- [Sumsub](https://docs.sumsub.com/docs/identity-verification): AML screening and transaction monitoring.
- [ComplyAdvantage](https://complyadvantage.com/): sanctions / watchlists, payment screening and monitoring.
- [LSEG World-Check](https://www.lseg.com/en/risk-intelligence/screening-solutions/world-check-kyc-screening): World-Check KYC / sanctions risk intelligence.
- [LexisNexis Risk Solutions](https://www.lexisnexis.com/en-us/products/bridger-insight.page): Bridger Insight screening and due diligence.
- [Moody's](https://www.moodys.com/web/en/us/kyc.html): KYC data and Grid screening.
- [SEON](https://seon.io/): fraud and AML tools.
- [Sardine](https://www.sardine.ai/): fraud and AML operations.
- [Unit21](https://www.unit21.ai/): sanctions, AML and investigation workflows.
- [Regfyl](https://regfyl.com/kyb): entity, UBO, director and sanctions / PEP screening.

### 52. Who could help monitor suspicious activity, devices and payment fraud?

These are examples of tools that look for unusual activity, suspicious devices or payment patterns. A warning is a reason to investigate, not proof that a particular appeal is false. We would need to test the tool and handle mistakes fairly. No tool makes the whole product automatically secure.

- [Youverify](https://youverify.co/en/ng): fraud and transaction monitoring.
- [Prembly / IdentityPass](https://docs.prembly.com/api-reference): Fraud Lens and transaction screening.
- [VerifyMe / QoreID](https://docs.qoreid.com/docs/our-service-availability): fraud-prevention products.
- [SEON](https://seon.io/): device / digital-footprint and fraud signals.
- [Sardine](https://www.sardine.ai/): device, behavior and payment-fraud checks.
- [Feedzai](https://www.feedzai.com/): payment fraud and financial-crime monitoring.
- [Unit21](https://www.unit21.ai/): fraud monitoring and case investigation.
- [Fingerprint](https://fingerprint.com/): device identification and abuse signals.

### 53. Who could independently check providers, addresses and supporting evidence?

Some examples below are verification businesses; public bodies are authoritative information sources rather than proposed commercial partners. We would still contact the school’s fees office or the hospital’s finance office through an independently obtained route to confirm the actual bill. A registered organisation alone does not prove this beneficiary’s need.

- [VerifyMe / QoreID](https://docs.qoreid.com/docs/our-service-availability): background / business-address verification; agree evidence-review scope.
- [Prembly / IdentityPass](https://docs.prembly.com/api-reference): background-check products; agree institution-specific scope.
- [Youverify](https://youverify.co/en/ng): entity, ownership and due-diligence checks.
- [Dojah](https://support.dojah.io/articles/what-does-dojah-do): business / identity checks; confirm physical-review scope.
- [Corporate Affairs Commission (CAC)](https://www.cac.gov.ng/services/company-search): source only: registered company / NGO entity details.
- [National Universities Commission (NUC)](https://www.nuc.edu.ng/): source only: university recognition / accreditation, not student bills.
- [HEFAMAA, Lagos](https://hefamaa.lagosstate.gov.ng/): source only: Lagos health-facility registration / accreditation.
- [Medical and Dental Council of Nigeria (MDCN)](https://www.mdcn.gov.ng/): source only: medical/dental professional registration, not hospital invoices.
- [Pharmacy Council of Nigeria (PCN)](https://pcn.gov.ng/): source only: pharmacy / professional registration, not invoice truth.

### 54. Who could read invoices and receipts or detect document tampering?

Some tools read text and amounts from invoices; others look for possible alterations. These are different tasks. Neither automatically proves that a Nigerian school or hospital issued the document or is still owed money. We would check with the issuer where needed and keep a person involved when the evidence is uncertain.

- [Amazon Web Services](https://aws.amazon.com/textract/): Textract: OCR, forms, invoices and receipts.
- [Google Cloud / Gemini](https://cloud.google.com/document-ai): Document AI: extraction, classification and splitting.
- [Microsoft Azure](https://azure.microsoft.com/en-us/products/ai-foundry/tools/document-intelligence): Document Intelligence: forms / invoice extraction.
- [Mindee](https://www.mindee.com/): document extraction API.
- [Veryfi](https://www.veryfi.com/): invoice / receipt OCR and fraud products.
- [Doxis / Klippa](https://www.klippa.com/en/home-en/): document automation / extraction.
- [Rossum](https://rossum.ai/): transactional document-processing workflows.
- [Ocrolus](https://www.ocrolus.com/): financial-document analysis / fraud checks; document support to confirm.
- [Resistant AI](https://resistant.ai/): tampered / synthetic document detection.
- [Inscribe](https://www.inscribe.ai/): document-fraud detection.

### 55. Who could help reconcile payments, refunds and the money ledger?

These examples could help compare our records with payment-provider records. The essential job is to match the amount, recipient, reference and outcome, including refunds or reversals. General record-matching tools do not become Nigerian funds-holding partners. Kairos remains responsible for its budget rules and donor-share calculations.

- [Paystack](https://paystack.com/docs/payments/accept-payments/): payment verification, transfers, refunds and transaction records.
- [Flutterwave](https://developer.flutterwave.com/docs): payment records, settlements, transfers and refunds.
- [Monnify / Moniepoint](https://developers.monnify.com/): collection / transfer status and transaction records.
- [Fincra](https://fincra.com/): pay-in and payout records.
- [ReconArt](https://www.reconart.com/): financial / transaction reconciliation software.
- [AutoRek](https://autorek.com/): payment and ledger reconciliation.
- [Duco](https://du.co/): cash / transaction reconciliation.
- [Solvexia](https://www.solvexia.com/): finance-data matching and reconciliation.
- [Modern Treasury](https://www.moderntreasury.com/): payment operations and ledgers; Nigeria connectivity unconfirmed.
- [Fragment](https://fragment.dev/): ledger infrastructure / idempotency.
- [Formance](https://www.formance.com/): programmable ledger and money-movement infrastructure.

### 56. Who supplies the AI interview and budget structuring?

Claude is the AI service currently used for the interview and cause details. The other names are alternatives to investigate, not integrations already in Kairos. We would compare answer quality, cost, reliability and data handling. An AI interview is separate from independently checking identity, bills or payments.

- [Anthropic / Claude](https://platform.claude.com/docs/en/intro): CURRENT: Claude interview and structured cause/budget generation.
- [OpenAI](https://developers.openai.com/api/docs): alternative language-model / structured-output APIs.
- [Google Cloud / Gemini](https://ai.google.dev/gemini-api/docs): alternative Gemini API.
- [Mistral AI](https://docs.mistral.ai/): alternative model and document-processing APIs.
- [Cohere](https://docs.cohere.com/): alternative enterprise language-model APIs.
- [Groq](https://console.groq.com/docs/overview): alternative hosted model inference.
- [Amazon Web Services](https://aws.amazon.com/bedrock/): Bedrock: managed model access; model support varies.

### 57. Who could store uploaded supporting documents and receipts?

Cloudinary currently stores supporting files. The other names are storage alternatives. We would still have to decide who can see a file, what may be published and how long information is kept. Today draft files are owner-only and published attachments can be viewed publicly through Kairos. Storage does not establish document authenticity.

- [Cloudinary](https://cloudinary.com/documentation/upload_parameters): CURRENT: supporting-file uploads / delivery.
- [Amazon Web Services](https://aws.amazon.com/s3/): S3 object storage.
- [Google Cloud / Gemini](https://cloud.google.com/storage): Cloud Storage.
- [Microsoft Azure](https://azure.microsoft.com/en-us/products/storage/blobs): Blob Storage.
- [Cloudflare](https://www.cloudflare.com/products/r2/): R2 object storage.
- [Backblaze](https://www.backblaze.com/cloud-storage): B2 object storage.
- [Supabase](https://supabase.com/storage): Storage with access policies.
- [DigitalOcean](https://www.digitalocean.com/products/spaces): Spaces object storage.
- [Uploadcare](https://uploadcare.com/): file upload, storage and delivery.

### 58. Who could deliver donor receipts and email notifications?

These are examples of companies that deliver application emails. Kairos uses Nodemailer, which is a sending library rather than a delivery company. We have not named one of these as our current delivery provider here. Email is optional, and sending a receipt does not by itself prove a school received payment.

- [Twilio / SendGrid](https://www.twilio.com/en-us/sendgrid): SendGrid Email API / SMTP.
- [Amazon Web Services](https://aws.amazon.com/ses/): Amazon SES.
- [Postmark](https://postmarkapp.com/): transactional email / SMTP.
- [Resend](https://resend.com/): email API and delivery events.
- [Sinch / Mailgun](https://www.mailgun.com/): Mailgun transactional email API.
- [Brevo](https://www.brevo.com/products/transactional-email/): transactional email.
- [Zoho CPaaS (formerly ZeptoMail)](https://www.zoho.com/cpaas/): transactional email; formerly ZeptoMail.
- [SMTP2GO](https://www.smtp2go.com/): SMTP and email API.

### 59. Who could deliver SMS, OTP or WhatsApp updates?

These are possible services for SMS, one-time codes or WhatsApp updates. They are optional future channels, not existing Kairos messaging integrations. Sharing a normal cause link on WhatsApp is different from connecting its business-messaging service. Delivery support and permission to send the message would need to be checked.

- [Termii](https://termii.com/): Nigeria-focused SMS, OTP and messaging.
- [Africa's Talking](https://help.africastalking.com/en/articles/2241664-does-africa-s-talking-support-sending-of-sms-to-dnd-numbers-in-nigeria): SMS APIs with Nigerian-network support.
- [Twilio / SendGrid](https://www.twilio.com/en-us/messaging): SMS / WhatsApp / verification APIs.
- [Infobip](https://www.infobip.com/): SMS, WhatsApp and omnichannel messaging.
- [Bird (formerly MessageBird)](https://bird.com/): SMS, WhatsApp and verification.
- [Vonage](https://www.vonage.com/communications-apis/): SMS, messaging and verification APIs.
- [Sinch / Mailgun](https://sinch.com/): messaging and verification APIs.
- [Meta / WhatsApp Business Platform](https://developers.facebook.com/documentation/business-messaging/whatsapp/about-the-platform): direct WhatsApp Business Platform access.
- [Gupshup](https://www.gupshup.ai/): WhatsApp and business-messaging platform.

### 60. Which third parties support hosting, databases and scaling?

Vercel and MongoDB Atlas are already used for the application and database. The other examples are alternatives, not extra financial partners. Hosting can help us run the product, but we still have to control access, protect information, keep backups and check payment records. A cloud account does not solve those jobs automatically.

- [Vercel](https://vercel.com/docs): CURRENT: Next.js app hosting / deployment.
- [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database): CURRENT: hosted MongoDB database.
- [Amazon Web Services](https://aws.amazon.com/): compute, managed data and security infrastructure.
- [Google Cloud / Gemini](https://cloud.google.com/): cloud compute and managed data.
- [Microsoft Azure](https://azure.microsoft.com/): cloud compute and managed data.
- [Cloudflare](https://developers.cloudflare.com/): edge, Workers and application-security products.
- [Supabase](https://supabase.com/database): managed PostgreSQL alternative; migration required.
- [Neon](https://neon.com/): managed PostgreSQL alternative; migration required.
- [Render](https://render.com/): application / data hosting alternative.
- [Railway](https://railway.com/): application / data hosting alternative.


## The giving flow

### 61. ★ What does Kairos do?

Kairos helps people raise money for a clear need and shows donors what their money paid for. The organiser names the school, hospital or supplier and publishes a budget. Our intended live model pays that provider directly and gives each donor a record of their share. The prototype already runs the budget, records and updates; real money holding and payment still need the right partner arrangement.

### 62. ★ What stops the organizer withdrawing donations?

There is no button for an organiser to withdraw donations into a personal account. Our payment code checks who is making the request, the named provider, the available balance and what remains in the budget. Those checks run on demo money today. Before live use, the institution holding the funds must also enforce the agreed payment restrictions.

### 63. ★ Does the receipt independently prove the school received money?

The current receipt records a payment made inside the demonstration. It does not independently prove that a school received real money. For a live receipt, we would match our payment record to the payment partner’s confirmation and the relevant school bill. A document generated by Kairos alone is not enough proof of external payment.

### 64. Can someone give without an account?

Yes. A guest can give without opening an account, and the contribution appears anonymously in the cause’s records. A signed-in donor can receive personal updates in the app and, if they provide an email address, by email. Anonymous guest giving does not currently provide a personal account inbox or a private email receipt.


## Review and privacy

### 65. ★ What if a Remita reference expires?

If a reference has expired, our proposed response is to pause the payment and ask for a replacement reference. We would confirm that it is for the same student, institution and bill, and check the amount and whether the bill has already been paid. A mismatch would go to a reviewer. The replacement-reference process is not built yet, so we should explain it as the next step.

### 66. ★ When does a human step in?

A person should step in when a check is unclear, details disagree, someone challenges a decision or a payment’s outcome cannot be confirmed. The reviewer would ask for what is missing, check it through a trusted source and record the reason for the decision. We have not built a complete review queue and decision record yet.

### 67. ★ Does AI authenticate documents or identify fraud?

Claude currently helps the organiser explain the need and turn that conversation into cause details and a budget. It does not independently certify a document, a person’s identity or a payment. We still need checks against the institution or an appropriate verification service. A convincing story or an uploaded document is supporting information, not a guarantee that the claim is true.

### 68. ★ Who can view supporting files today?

Draft attachments are available to their owner. Once attached to a published cause, they can be viewed publicly through the app. That means we need a separate place for private evidence, a way to remove personal details and clear permission before publication. Those additional protections must be completed before we use sensitive documents in real cases.

### 69. Do you store a donor's or organizer's NIN?

The current verification endpoint records a result and the type of check, rather than saving the NIN number. But that result is simulated today; it has not come from a live identity service. Also, a person could put identity details in an uploaded document. We therefore cannot turn this one design choice into a claim that no sensitive information is ever stored.


## Fees and records

### 70. ★ How does the fee cap work?

The current rule takes two percent of a donation, but total upkeep stops at five thousand naira for that cause. The cap is for the whole cause, not each donation or donor. The donor sees the charge and what will reach the cause before confirming. In our intended funding model, NGO support and grants are the preferred way to cover running costs.

### 71. ★ How are donor shares calculated?

We use the amount that reached the cause after any upkeep. For example, if your net contribution is one tenth of the cause’s funded amount, the displayed allocation for a payment from that pool is one tenth of that payment. This is a record of how pooled money was used, not a separate bank transfer from every donor. Later donations and rounding also need careful accounting.

### 72. ★ Have you reconciled real bank payments?

No real bank payments have been matched to our records yet. The prototype maintains its own balances and payment records. For live use, we would compare those records with the payment partner’s confirmations using the payment reference, amount, destination and status. We also need to handle delays, failures and repeated messages without recording the same payment twice.

### 73. Is NGO funding already secured?

No. Donations and grants from NGOs are our intended main support, but none is secured in the material we have presented. The prototype applies the capped upkeep rule. We should not claim a funded operating budget, a working grant-based switch or proven running costs yet.

### 74. Are refunds implemented?

A complete real-money refund process is not implemented. We need to agree with the financial partner who can approve a refund, how it returns to the original donor and what happens to fees and already-spent money. Those rules must be shown before people give real funds. A proposed policy is not the same as a tested refund service.


## Evidence and launch

### 75. ★ What user research supports this presentation?

Our own school-fee experience and a conversation with a past departmental president support the need we describe. He helps raise students’ fees and said personal trust does not always make the details easy to verify. We have also reported a positive response from departmental bodies. That is useful early feedback, but we have not presented a completed usability study or a real-money pilot.

### 76. What would the first pilot measure?

We would start with a small number of school-fee cases. We would check whether the correct bills were settled, whether donors understood their receipts, how often a person had to resolve a problem and what it cost to handle each case. We would also ask organisers and donors where the process was confusing. These are proposed measures, not results we already have.

### 77. ★ What remains before live donations?

We need an agreed institution to hold and release the funds, connected payment and identity checks, private handling of evidence and a way to resolve mistakes, failed payments and refunds. We must also test that the records match the money and that a repeated request cannot pay twice. No signed custody partnership or live-money launch is being claimed.

### 78. How long is this pitch allowed to be?

The organiser's 26 November guidelines confirm a maximum of five minutes for the whole pitch, including the demonstration and funding plan. The current separate recording is two minutes forty seconds, so we need to rehearse the complete delivery against that total. The suggested section timings are guidance. Our page keeps an elapsed clock; it does not claim the retained script and unchanged recording already fit.


## Questions behind the feedback

### 79. ★ Walk us through a human reviewer handling an uncertain check.

Suppose a school bill uses a student’s initials while the identity record uses the full name. We would pause the affected payment, explain the mismatch and ask for supporting details. An authorised reviewer would check with an independently contacted school office and record the decision. A real student should have a chance to correct a mismatch. This review process is proposed, not an existing feature.

### 80. What if the replacement reference belongs to a different student or bill?

We would not use the new reference until we had checked who and what it pays for. The student, institution, purpose and amount should agree with the cause, and the outstanding bill must be confirmed. If the replacement is for a different person or obligation, the payment stays paused while the issue is resolved. Automatic reference replacement is not implemented.

### 81. ★ Is your current app already screening documents and asking permission to publish them?

No. File upload and storage work, but automatic screening, removal of private details and a separate permission step for publication are still planned. Draft files are owner-only; attachments on published causes are public. We need to change that handling before presenting private-document review as an operational safeguard.

### 82. Your script says you store no sensitive data. What about the documents people upload?

An uploaded document can contain sensitive details, so that phrase needs qualification. We do store account information, cause details and supporting files. Our intended approach is to keep identity checks with the right verification provider, keep private evidence separate and publish only material approved for that purpose. We have not finished the private-evidence, permission and redaction processes yet.

### 83. What exactly did the departmental feedback validate?

It supports the problem we are solving: even people who know a student can struggle to confirm an appeal and follow the money. The positive response is encouraging interest. It does not prove that people will use the product repeatedly, that the process is easy or that a real school bill has been paid through Kairos. We still need observed tests and a carefully prepared pilot.

### 84. What did you change because of a specific user finding?

The concern about checking appeals helped focus the idea on a named bill, a named provider and visible payment records. We do not have a documented product test showing a specific before-and-after improvement to claim. Our next step is to watch people use the flow, record their difficulties and show what we changed because of those findings.

### 85. If you could demonstrate one more feature for the judges, what would it be?

I would show one uncertain case being resolved: a mismatch is explained, the affected payment is paused, evidence is checked and the reason for the decision is recorded. That would answer the judges’ concern about what happens when the ordinary flow breaks. It is a proposed next feature; we should not pretend the existing demo already shows it.


## Bills, fraud and exceptions

### 86. Why use Kairos instead of paying the school directly?

If you already know the student, the bill and the school’s payment channel, paying the school directly can be enough. Kairos helps when several people contribute and need a shared record of the bill, what remains unpaid and how their contributions were used. The value is making that shared process easier to check and follow.

### 87. Why start with school fees rather than every kind of need?

A school-fee case gives us a specific student, institution, fee and payment reference to investigate. That is a manageable starting point for testing the process. It does not make every fee appeal genuine. We would still confirm the student’s connection to the bill, the outstanding amount and the correct destination before payment.

### 88. What if an organiser names themselves or a fake business as the provider?

A typed business name is not enough. We would check that the provider exists, that the receiving details belong to it and that the bill is genuine. An unusual connection between the organiser and provider would need review. The prototype currently uses simulated provider checks, so it cannot be presented as having already ruled out fake providers.

### 89. ★ What if the organiser and a genuine provider collude?

A genuine provider could still cooperate with a dishonest organiser. Direct payment makes one kind of misuse harder, but it cannot remove every form of fraud. We would need independent bill checks, limits on the amount at risk and review of suspicious activity. We should not promise that registration guarantees honesty or that we can always recover money after it has been paid.

### 90. What if someone uses a real bill without the beneficiary knowing?

We would need to confirm that the beneficiary, or an appropriate representative, agrees to the fundraising and the information being published. A genuine bill does not give anyone permission to tell that person’s story publicly. The consent process is a requirement for live use and is not replaced by a convincing document.

### 91. What if two causes raise for the same bill?

Before real payouts, we would compare the institution, student and bill or reference across causes and check what remains owed. If the same bill has already been funded or paid, we must not pay it again. The prototype does not yet provide complete duplicate-bill detection across causes or live checks of whether an institution has received payment.

### 92. What happens if a relative pays the bill while fundraising is still going on?

We would check the bill again before releasing money. If someone else has already settled it, the affected payment should pause and donors should be told. The remaining funds would follow the agreed refund or change-of-purpose rules. They should not quietly move to another need just because the organiser asks. Those live procedures are still to be built.

### 93. Can the organiser change the budget or receiving account after people donate?

A change after donations could change what people agreed to support. Our proposed response is to pause the affected payment, check the reason and the replacement details, and obtain any permission required under the published rules. The review and change should be visible in the records. A complete budget-change and donor-consent process is not implemented yet.

### 94. What happens if the cause raises too little or too much?

We need rules for deadlines, partial funding and money that is no longer needed before collection begins. A school would need to confirm whether a partial payment is useful and accepted. If it is not, a refund or an agreed change may be needed. The prototype caps donations against its goal, but that alone is not a complete real-money closure and refund process.

### 95. What happens if the organiser disappears?

In our intended arrangement, the remaining money would stay with the institution holding it. We would stop accepting instructions from the missing organiser, establish whether the bill still needs payment and follow the agreed closure or refund process. That depends on a real partner agreement and clear responsibilities, which are not secured yet.


## Payments and reconciliation

### 96. ★ Walk us through reconciliation rather than just recording a payout.

It means checking that our records agree with the outside payment records. For each payment, we would match the reference, amount, recipient and result, then confirm the right bill was credited where needed. A disagreement stays unresolved until investigated. Our current app keeps an internal ledger; it is not yet connected to independent bank or school records.

### 97. What if your server crashes just after instructing a payment?

We must first find out whether the original payment happened. Each instruction needs a saved, unique reference so a retry can find the same payment instead of creating a second one. If the result is unknown, we should check with the provider before trying again. We have not yet tested that failure-and-recovery process with a live payment partner.

### 98. What stops two simultaneous payout requests spending the same balance?

Checking the balance twice is not enough if both requests arrive at the same moment. Before live use, the money for one instruction must be reserved in a single protected database operation, so the second request cannot spend it again. Each payment also needs a unique reference. The current checks are useful, but they do not establish that full guarantee.

### 99. What if a provider sends the same confirmation twice?

We would recognise the payment or message reference and apply its effect once. Receiving the same confirmation twice must not reduce the balance twice or send two paid receipts. Late messages also need to be compared with the latest known result. This needs provider integration and testing; the current demonstration does not prove that handling is complete.

### 100. Does a successful transfer prove the student can return to school?

Not by itself. A provider may confirm processing before the receiving bank credits the money. We should report exactly what has been confirmed, then check that the correct student’s obligation was settled where necessary. Whether the student actually returned to school is a further outcome that would need its own evidence and appropriate permission.

### 101. Can you give a simple example of a donor share?

Suppose you give ten thousand naira after upkeep and the cause receives one hundred thousand naira in total. Your contribution is ten percent of that pool. If forty thousand naira is paid from it, the displayed allocation to you is four thousand naira. It explains your share of a pooled payment; it is not a second bank transfer.

### 102. ★ What if I donate after an earlier payout has already happened?

A later donation should never be described as paying for something that happened before it was given. We need to preserve which contributions were available for each payout and assign later donations to later spending. The prototype generates shares using the contributions recorded when it makes a payout. The full history for repeated payouts and later gifts still needs more testing before real money.

### 103. Do the displayed donor shares always add up to the last naira?

Not necessarily in the displayed messages, because the current app rounds individual shares to whole naira. That can leave a small difference when the messages are added together. For live accounting, we need to record the smallest supported currency unit and distribute any rounding remainder consistently. We should not claim perfect last-naira reconciliation from the current rounded messages.

### 104. What happens if the custody partner freezes funds or Kairos shuts down?

The agreement with the institution holding the funds must explain what happens to the money and who can access the necessary records if Kairos stops operating or funds are frozen. We cannot promise a recovery route before that agreement exists. This is one of the questions we must settle before inviting people to donate real money.


## AI, data and security

### 105. ★ What does Claude actually do in the product?

Claude asks follow-up questions and helps turn the organiser’s answers into a story, named provider and budget. Our own code applies the payment and budget rules. Claude is not the institution holding the money and does not certify a bank transfer or identity check. The live Claude connection works today; the financial and identity checks shown in the demo are simulated.

### 106. Why use an AI interview instead of a form?

People do not always arrive with a neatly written appeal. A conversation can ask about a missing bill, provider, amount or deadline and help them explain the situation. We still need to test whether it helps people more than a simple form. The model’s job is to organise the information, not make an unsupported story true.

### 107. What if the AI invents a cost, provider or detail?

The organiser should check the summary and budget before publishing, and a live payment should depend on checked provider and bill details. A model’s suggestion must not become proof of a price or permission to pay. Our code checks the output’s structure, but that does not establish that every generated detail is correct.

### 108. What if someone puts instructions inside an uploaded document to manipulate the AI?

Text inside an uploaded document should be treated as material to inspect, not as instructions that can change the rules. Payment permission and approval should remain in controlled application code. We would need to test attempts to trick the model before claiming protection against them. The prototype does not establish that this whole class of attack has been solved.

### 109. What happens when Claude is slow or unavailable?

The app keeps the organiser’s answer and offers a retry when the AI service fails. It should not silently replace Claude with a scripted reply and make that look like a real AI answer. Before wider use, we would also need to test interruptions, recovery and what support people need if the service stays unavailable.

### 110. Can AI safely decide what personal information to publish?

AI may help identify details that need attention, but a model’s judgement should not be our only reason to publish someone’s private information. The intended process needs private evidence handling, removal of unnecessary details, clear permission and a person to resolve uncertain cases. That automatic publication-review process is not built in the current app.

### 111. ★ Does using licensed and verified third parties automatically make Kairos secure?

No. A provider may perform one task well while Kairos still exposes a document, accepts the wrong payment instruction or gives someone too much access. We remain responsible for our own permissions, data handling and matching payment records. Each partner also needs to support our specific use case. A third-party connection is not a security guarantee for the whole product.

### 112. Why Next.js, TypeScript, MongoDB and Cloudinary?

Next.js and TypeScript support the web application. MongoDB stores the cause, donation and payment records. Cloudinary stores uploaded files, and Claude helps with the interview. These services let us build and test the flow without building every piece of infrastructure ourselves. They do not replace the financial partner or the missing review and verification processes.

### 113. Is the public ledger impossible for an administrator to alter?

No. The public history makes activity visible, but it is still stored in our application database. We have not demonstrated a record that an administrator could never change. Live operation would need controlled access, records of changes and comparison with the financial partner’s records. We should describe the actual visibility we provide without claiming an unchangeable ledger.

### 114. Why can an API request not simply bypass the interface?

The server must check requests even if someone avoids the normal screen. Our payout route checks sign-in, cause ownership, the vendor flag, the amount, balance and remaining budget. However, the identity and vendor checks behind some flags are simulated. Real verification and stronger payment controls are still needed before those flags can be trusted for live money.


## Adoption, sustainability and impact

### 115. Who would bring the first real causes and donors?

A sensible starting point is the departmental bodies and community organisers who already help students raise fees. We have early interest, not a confirmed stream of causes or donors. We would first agree a small test with a willing institution and recruit people who understand what is being tested. We should not present those conversations as signed pilot commitments.

### 116. Why would a school cooperate?

A school might benefit from clearer payment references and fewer unclear appeals, but we need to ask the relevant staff what would actually help them. We would need an agreed way to check bills and confirm payment without exposing unnecessary student information. We have not secured an institutional integration or permission simply by naming a school in the prototype.

### 117. Why would donors use Kairos when a WhatsApp transfer is free?

A transfer can be convenient, especially when you know the person. Kairos adds a shared budget, a named destination and a record showing each donor’s share of what was paid. We still need to test whether donors find that worth using and what cost they will accept. We should explain the difference without pretending ordinary giving has no value.

### 118. What makes Kairos different from other crowdfunding services?

Our focus is on connecting the stated need, a published budget, the provider payment and each donor’s own share. The donor can follow more than the total amount raised. That is the experience we are demonstrating. We still need a more complete comparison with other services and evidence that people prefer this approach in practice.

### 119. What does “capped and unprofitable” mean? Are you guaranteeing fraud cannot pay?

We are describing a design goal, not guaranteeing that fraud can never pay. Smaller exposure, direct provider payments and records can make some misuse harder to hide. People can still collude, lie or misuse genuine documents. We need independent checks and review, and we should be clear that the current prototype has not proved that every dishonest attempt becomes unprofitable.

### 120. ★ Can the capped fee sustain the whole business?

We have not proved that it can. The cap limits what one cause contributes toward running costs, while verification and support still cost money. We need to measure those costs in a small pilot and compare them with reliable funding. Grants and NGO support are intended sources, but they are not secured. A working fee calculation is not proof of a sustainable operation.

### 121. Explain the fee cap with numbers.

If the cause has paid no upkeep yet and someone gives one hundred thousand naira, two thousand naira goes to upkeep and ninety-eight thousand reaches the cause. If total upkeep later reaches five thousand naira, no more upkeep is taken for that cause under the current rule. The example describes our platform upkeep; outside payment-provider charges still need to be agreed and disclosed.

### 122. What if grants never arrive?

We would have to match the scope of the service to funding we can actually rely on. That could mean a smaller pilot, fewer supported cases or a revised model that is explained before people give. We should not keep accepting real responsibilities on the assumption that a future grant will cover them. The current fallback fee is tentative, not a proven answer to every cost.

### 123. How would you measure success beyond money raised?

We would measure whether the correct bills were settled, donors understood the receipt, problems were resolved and people were willing to use the service again. We would also track privacy incidents, support effort and cost per case. Money raised alone can look impressive while a student’s actual bill remains unpaid. These are proposed measures, not completed results.


## Team, faith and next steps

### 124. ★ What is the first concrete step after this presentation?

Agree a small school-fee test with willing organisers and an institution, while confirming the financial partner arrangement and the checks needed before any real funds. We should write down who reviews uncertain cases, what information stays private and what would make us stop the test. Then we can test the full process rather than add unrelated features.

### 125. How long will a live launch take?

We cannot give a reliable launch date before the external dependencies are agreed. The remaining work includes a suitable funds-holding arrangement, connected checks and payments, privacy controls and tested handling of mistakes and refunds. We can set a realistic plan once those responsibilities and access requirements are clear. Finishing presentation files does not mean the service is ready for real donations.

### 126. Why move to hospitals later rather than immediately?

Hospitals can involve different billing processes, urgent decisions and particularly private information. Starting with a narrow school-fee case lets us test our basic process first. We would expand only after understanding the new verification and privacy needs. A hospital’s name in an example does not mean those additional processes have already been built.

### 127. How does Kairos reflect the faith-and-technology theme?

The idea supports care for others with clear responsibility for how help is used. Technology can make it easier to check a need and follow a contribution, while people still have to make careful decisions and treat applicants with dignity. We see transparency as a way to support generosity without asking donors or applicants to ignore legitimate concerns.

### 128. Is Kairos only for Christians or faith organisations?

No. The proposed service is for legitimate needs and people willing to follow its checks, whatever their faith. Participating in this event does not make religious membership a requirement for help. We would need to test that our process treats different people fairly and does not make access depend on who tells the most persuasive story.

### 129. What are your team’s responsibilities?

For this presentation, Abigail is the team lead and product manager, coordinating priorities and the user journey. Ugochukwu is the software engineer and CTO, responsible for technical implementation and integration work. Those roles do not mean we already have a staffed review, compliance or customer-support operation. The responsibilities for a live pilot still need to be assigned clearly.

### 130. What useful help are you asking the judges or organisers for?

Introductions to an institution willing to test a school-fee case and a financial partner able to discuss the intended funds arrangement would be especially useful. Feedback on our review and privacy processes would also help. We would rather leave with a concrete next conversation and a realistic test than imply that an event connection is already a signed partnership.


## Hard follow-ups and inclusion

### 131. What if AI wrongly flags an honest applicant or treats some people unfairly?

A flag should lead to a check, not automatically label an honest person a fraudster. The applicant should understand the issue, have a chance to correct information and be able to ask a person to review the decision. We also need to test different language styles and circumstances. We have not completed that fairness testing or built a full appeal process.

### 132. What if someone has a genuine need but cannot pass the identity checks?

A missing or failed check does not by itself prove dishonesty. We would need an agreed route for alternative evidence and human review that still protects the donor and beneficiary. Where we cannot support a case safely, we should explain that limit. We should not claim we can serve every genuine need before those alternatives are designed and tested.

### 133. How would people with limited English, connectivity or smartphone access use it?

We would test assisted use through trusted organisers, simpler wording and how the flow behaves on weak connections. The current prototype is a web application; it does not prove that someone without a smartphone or with limited English can complete it independently. Local-language and offline application support should be described as possibilities unless they have actually been built and tested.

### 134. Must someone make their hardship public to receive help?

They should only have to share the information needed for the cause and appropriate checks. Our intended process separates the public explanation from private evidence and requires agreement about what is published. The current public-attachment behaviour needs further work to support that safely. A person’s need for help should not be treated as permission to publish all their documents.

### 135. How would someone report a suspicious cause without publicly accusing the beneficiary?

We would need a private reporting route so a concern can be investigated without publicly labelling someone dishonest. An authorised person should assess the evidence, pause affected activity where necessary and let the organiser respond. A suspicion and a proven finding are different things. The full reporting and appeal process is not implemented yet.

### 136. What prevents an inflated bill from a real provider?

Checking that a provider exists does not prove that every amount it charges is justified. We would confirm the actual obligation and investigate unusual amounts through appropriate comparisons or an independent contact. A bill from a real institution can still need review. Automatic price checking and a complete overcharging process are not current features.

### 137. Could overseas donors contribute, and is Cleva already connected?

That is a possible later extension. We would first need a provider that permits this kind of contribution and clear records of the amount and charges before money reaches the Nigerian cause. Cleva is not connected to Kairos. Taking part in a competition does not establish provider access, permission to handle donations or a custody agreement.

### 138. What would you do if a private document were accidentally published?

We would stop public access, establish what information was exposed, support the affected person and follow the applicable response and notification process. We would also fix the underlying cause. We have not completed a production incident process. That is another reason private evidence and publication controls must be in place before we handle sensitive real cases.

### 139. How long would you keep documents, and can someone ask for deletion?

We need a clear retention and deletion policy before live use. It should explain what is collected, who can see it, how long it stays and what happens when someone asks for deletion. Some payment records may need different treatment from an uploaded document. Deleting a public cause should not be described as automatically removing every stored or third-party copy.

### 140. What would make you stop or narrow the first pilot?

We would agree stop conditions before the pilot, such as money records that do not match, an unresolved provider mismatch or private information being exposed. The affected activity should pause until the problem is understood. A small test should teach us whether the process is safe enough to continue, rather than become a reason to ignore a serious fault.

