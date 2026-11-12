"""Shared two-person pitch: one source for the script, notes and question bank.

Product scope: transparent giving. This entry is represented by Abigail and
Miracle. Status is grounded in the November Faith & Tech materials and code.
"""

META = {
    "title": "Kairos | Shared Pitch Room",
    "event": "Shared pitch",
    "stage": "Transparent giving · Abigail and Miracle",
    "team": "Sokenu Abigail · Omohuma Miracle",
    "date": "13 November 2026",
    "version": "shared-pitch-2026-11-12",
    "demo_url": "https://drive.google.com/file/d/1AuvERGMvTvp39lxLGsgHUWnPvmE0a3jn/view?usp=sharing",
}

# The common deck and script contain no competition or sponsor references.
# Timing is a rehearsal estimate. Confirm each organiser's actual time limit.
SLIDES = [
    {
        "title": "Transparent giving for Nigeria",
        "speaker": "Abigail", "seconds": 18,
        "cue": "Camera on. Say Kairos clearly. The deck is already shared.",
        "paragraphs": [
            "Good day. I'm Sokenu Abigail, and I'm here with Omohuma Miracle, representing Team Kairos.",
            "Kairos is a transparent giving platform. We want someone helping with a bill to see what their own contribution paid for.",
        ],
    },
    {
        "title": "A transfer succeeds. The doubt stays.",
        "speaker": "Abigail", "seconds": 36,
        "cue": "Pause after 'Then you hesitate.' Keep the example personal and familiar.",
        "paragraphs": [
            "A message lands on WhatsApp. Someone's sister needs surgery, with an account number attached. You want to help. Then you hesitate. Is it real? What will my money pay for?",
            "We felt that around school-fee appeals. Similar posts appeared with almost identical screenshots, and it became hard to tell which ones to believe.",
            "Even after giving, 'transfer successful' only tells you an account was credited. It doesn't tell you the bill was paid. That gap is what Kairos addresses.",
        ],
    },
    {
        "title": "From a published budget to a personal receipt.",
        "speaker": "Abigail", "seconds": 35,
        "cue": "Three steps. Explain the intended live flow, then hand over to Miracle.",
        "paragraphs": [
            "The organiser publishes the need and an itemised budget naming the school, hospital or supplier to be paid. An AI interviewer helps put the case together.",
            "The intended live flow holds donations with a licensed partner and pays those providers directly. The organiser cannot withdraw into a personal account.",
            "Each payment appears in the public record, and every donor receives their own share with the receipt. Miracle will show what that means.",
        ],
    },
    {
        "title": "Every giver sees their own part.",
        "speaker": "Miracle", "seconds": 29,
        "cue": "Point at the receipt. Read the numbers slowly, then pause for two seconds.",
        "paragraphs": [
            "Suppose you give seven thousand naira, with upkeep covered separately. The cause pays seventy percent of its contributed funds to LUTH.",
            "Your update says: four thousand nine hundred naira of your seven thousand helped pay that bill, with the invoice attached.",
            "The prototype calculates each donor's share automatically. Even a small contribution has a clear account of what it helped cover.",
        ],
    },
    {
        "title": "What runs today.",
        "speaker": "Miracle", "seconds": 32,
        "cue": "Say all three simulated parts. A seeded balance is not a bank balance.",
        "paragraphs": [
            "Our working web prototype runs cause creation, escrow accounting, budget payments, donor-share calculations, notifications and the public history.",
            "Bank transfer, Remita settlement and NIN lookup are simulated. CAC and bank account-name checks remain unbuilt, and no custody partner is signed. No real donations have moved.",
            "We can demonstrate the flow today and show exactly what needs to be connected before live use.",
        ],
    },
    {
        "title": "Useful to give. Sustainable to run.",
        "speaker": "Abigail", "seconds": 27,
        "cue": "Take back the floor. Stress that the cap is per cause and the rate is tentative.",
        "paragraphs": [
            "We propose two percent upkeep, capped at five thousand naira for the whole cause. Donors see it before confirming and can cover it so the cause receives the full gift.",
            "The aim is cost recovery, with grants, credits and sponsorship supporting shared costs. Those economics still need testing in a pilot.",
        ],
    },
    {
        "title": "Start with a bill that can be checked.",
        "speaker": "Abigail", "seconds": 28,
        "cue": "This is the launch sequence, not a completed pilot or signed partnership.",
        "paragraphs": [
            "We plan to start with school fees, tying contributions to an institution's payment reference. Then a small list of hospitals whose registration, accounts and invoices are checked before use.",
            "We'd begin with communities already organising support, such as alumni groups and student welfare funds. A few real bills fully accounted for would be the first test.",
        ],
    },
    {
        "title": "Clearer giving. Real needs met.",
        "speaker": "Abigail", "seconds": 24,
        "cue": "Connect the receipt to the people it serves. These are intended outcomes, not pilot results.",
        "paragraphs": [
            "For donors, the aim is confidence to help again. For honest organisers, it's an account they can share as bills are paid. For the person waiting for help, it's support reaching the right bill.",
            "We'd measure bills settled, whether donors understand their receipts, and whether they give again.",
        ],
    },
    {
        "title": "Accountability has rules.",
        "speaker": "Abigail", "seconds": 24,
        "cue": "Lead with what is enforced today. Avoid 'fraud-proof' or a guarantee of delivery.",
        "paragraphs": [
            "The prototype checks who can request a payment, the available balance and the amount left on that budget item.",
            "Before live donations, we need provider checks, licensed custody, reliable settlement and refunds, and consent and privacy controls. A payment receipt alone doesn't prove delivery, so a dispute process matters too.",
        ],
    },
    {
        "title": "Abigail and Miracle.",
        "speaker": "Abigail", "seconds": 13,
        "cue": "Only Abigail and Miracle participate in these entries. Keep the introduction natural.",
        "paragraphs": [
            "I'm Abigail, the team lead and product manager. Miracle leads product design. We share responsibility for understanding the need, the prototype and the work ahead.",
        ],
    },
    {
        "title": "Give with proof, not faith.",
        "speaker": "Abigail", "seconds": 19,
        "cue": "Finish, then stop. Offer the demo if there is time.",
        "paragraphs": [
            "Next we need a suitable payments and custody partner, verification support and a few pilot communities.",
            "Nigerians already help one another. Kairos gives that help a clear record: the need, the provider and each donor's own receipt. Thank you.",
        ],
    },
]

SHORT_PITCH = [
    "Kairos is a transparent giving platform. Think of a hospital appeal on WhatsApp: you want to help, but an account number and a transfer confirmation don't tell you whether the bill was paid.",
    "On Kairos, the organiser publishes an itemised budget naming the hospital, school or supplier. The intended live flow holds donations with a licensed partner and pays those providers directly. Every donor receives a receipt showing their own share of each payment.",
    "The prototype already demonstrates the accounting, budget checks, donor attribution and notifications. Bank transfers, Remita settlement and NIN lookup are simulated. Provider checks and licensed custody still need to be connected, and no real donations have moved.",
    "We would start with school fees and a few pilot communities, then hospital bills. The aim is a clearer account for donors and organisers, so more genuine needs can earn support.",
]

EVENTS = [
    {
        "name": "Cleva × Tether", "focus": "Future of Payments",
        "schedule": ["Office hour: Friday 13 November 2026.",
                     "Eleven teams selected; five advance to the live final on 21 November.",
                     "Book by EOD 12 November. Complete event registration and Cleva KYC with referral code UNILAG."],
        "assess": "The invitation lists problem, solution, prototype / MVP and team preparedness. It gives no presentation duration.",
        "spoken": "Our connection to the future of payments is keeping the purpose attached to the contribution: a named bill, the provider payment, and proof back to each donor.",
        "follow_up": "Only if asked about funding rails: Cleva or stablecoin funding could be explored later with suitable partners. Neither integration is built today.",
    },
    {
        "name": "APWEN LASU", "focus": "Social Innovation & Community Development",
        "schedule": ["Virtual pitching: Friday 13 November 2026, for ten shortlisted teams.",
                     "Five teams advance to the physical final on Friday 27 November.",
                     "Check the official email and group for the meeting link, start time and presentation requirements."],
        "assess": "The supplied notice asks teams to explain the idea, the problem and proposed solution, demonstrate understanding, and answer judges' questions. It does not give scoring weights or the virtual pitch duration.",
        "spoken": "The social innovation is making community giving easier to account for: genuine needs can earn support, organisers can show what was paid, and every donor can follow their own contribution.",
        "follow_up": "Keep the focus on the need, direct provider payments and donor receipts. The shared deck and main script need no changes for this session.",
    },
]

DEMO = [
    {"seconds": 15, "title": "Open the cause", "say": "This is a seeded demonstration. Here is the need, its budget and the provider named against each expense. The money figures are demo accounting.", "action": "Have a rehearsed cause and two separate signed-in browser sessions ready. Open the cause page; show the named provider and budget."},
    {"seconds": 20, "title": "Make a demo contribution", "say": "Before confirming, the donor sees the upkeep in naira and can cover it. The recorded contribution increases this cause's available balance.", "action": "Show the fee breakdown and cover option. Use the simulated transfer confirmation. Do not call it a live bank payment."},
    {"seconds": 20, "title": "Request the provider payment", "say": "The organiser can request a payment against this budget item. There is no cash-withdrawal path. The code checks the available balance and the amount left on this line.", "action": "Switch to the organiser's separate session. Show the named budget item, then record the rehearsed demo payout. Say that settlement and provider verification are simulated or unbuilt."},
    {"seconds": 20, "title": "Show the donor's receipt", "say": "Now the donor sees their own share, the provider and the invoice. This is the connection between the contribution and the bill.", "action": "Open the donor's in-app notification and read the actual displayed amount. Show the same payout in the public history. Do not substitute the deck's illustrative ₦4,900 if this run gives another number."},
    {"seconds": 15, "title": "State the next step", "say": "The accounting and donor updates are running. Bank transfer, Remita settlement and NIN lookup are simulated. Live custody and provider checks are the next integration work.", "action": "Stop the demo. If a page stalls, finish the sentence and use the existing recording. Treat the recording as an older prototype demonstration, not evidence of live verification or settlement."},
]

# Each item is (question, spoken answer, priority). Exactly ten per category.
# Answers describe current implementation separately from intended launch rules.
GROUPS = [
    ("Start here", [
        ("What is Kairos, in one sentence?", "Kairos is a transparent giving platform where contributions are tied to a published budget, providers are the intended payees, and each donor gets a receipt for their own share of every recorded payment.", True),
        ("What problem are you solving?", "People want to help with a stranger's bill but cannot easily check the appeal or follow the money after transferring. Honest fundraisers struggle to earn support, and donors are left guessing. We connect the need, the named provider, the payment and each giver's own contribution.", True),
        ("Why does this belong in a payments hackathon?", "The gap sits in the payment flow. We connect collection to a stated expense, restrict recorded payouts to its budget item, and attribute the payout back to the donors. The product is still transparent giving; the payments theme helps us explain how that accountability works.", True),
        ("What makes your approach different?", "We bring the published budget, direct provider payment and each donor's personal receipt into one giving flow. The donor can see what their contribution helped cover. We can show that relationship in the prototype without making an unsupported claim that no one else has ever built something similar.", True),
        ("Is this working software or a design concept?", "It is working software, deployed on the web. Cause creation, escrow accounting, budget checks, donor-share calculations, notifications and the public history run in code. The money movement and external verification are not live, so we describe the stage as a working prototype.", True),
        ("What exactly is simulated?", "The bank transfer, Remita settlement and NIN lookup. CAC and bank account-name verification are unbuilt, rather than working external checks. General uploads and automated document verification are also not complete. We have not signed a custody partner or processed real donations.", True),
        ("Are you holding anybody's money today?", "No. The escrow figures are balances calculated from demo records, not balances held in a bank account. The intended production arrangement is for an appropriately licensed partner to hold and settle funds under agreed controls. That arrangement has not been signed.", True),
        ("Can you explain the whole journey quickly?", "The organiser describes the need and names the providers in a budget. Donors contribute to that cause. The organiser requests payment against a budget item. The prototype checks the balance and line limit, records the payout, and generates each donor's share with an invoice reference and a public entry.", True),
        ("What have you actually validated?", "We have demonstrated that the software can connect a contribution to a budget payment and a personalised donor update. The problem also comes from our experience of appeals and informal conversations with peers. We have not established product-market fit, a measured conversion improvement, or a completed pilot with real donations.", True),
        ("What do you need next?", "A suitable custody and payments partner, external identity and provider checks, and a few communities willing to pilot the flow. Engineering also needs reliable settlement handling, reconciliation, refunds and security work before real donations. We want to take a few real bills through the full loop and measure what happens.", True),
    ]),
    ("Payments theme", [
        ("Does Kairos use stablecoins now?", "No. Our application answered No, and that remains accurate. The current prototype accounts in naira and simulates settlement. A stablecoin route is a future funding option to assess with suitable partners, not something that is required for the existing giving flow.", True),
        ("Are you integrated with Cleva?", "No. We are participating in the Cleva × Tether hackathon, which is different from having a product integration or partnership. We would welcome a discussion about a suitable future funding route, subject to the services, access and operating terms actually available.", True),
        ("Where could Cleva fit?", "Potentially on the funding side for a donor abroad helping with a named bill in Nigeria. We would first confirm whether an appropriate supported integration exists and how reconciliation, currency conversion and refunds would work. Kairos would still connect that contribution to the provider payment and the donor's receipt."),
        ("Where could Tether or USDT fit?", "As a possible future incoming funding rail. A donor's contribution would still need to reach the correct cause, settle through suitable partners and pay the named provider. An on-chain transfer alone would not prove that a school fee or hospital bill was settled. We have not built that route."),
        ("Why not build on blockchain from the start?", "Our first problem is whether the bill and destination are correct, then whether each donor can follow the payout. Those checks involve institutions and evidence outside a blockchain. We can prove the product flow using the existing prototype and assess a different rail when there is a clear user need."),
        ("Are donors going to need crypto wallets?", "They do not need a crypto wallet for the current prototype. We want the giving experience to remain a simple shared cause page. Any future funding option should make that experience more useful without requiring every donor or hospital to adopt it."),
        ("Are you becoming a remittance company?", "The product remains transparent giving for a stated need. A donor abroad could be another person funding that same hospital or school bill. We are not replacing the current idea with a general remittance app or claiming permission to operate a cross-border payment service."),
        ("Would hospitals have to accept stablecoins?", "We would not assume that. A possible future design would use suitable partners for conversion and local settlement so the provider receives an agreed payment through a supported channel. That needs validation. The provider, bill and donor receipt remain the product's focus."),
        ("Who would set the exchange rate and pay the charges?", "That has not been designed or contracted. Before offering a foreign-currency route, we would show the donor the quote, charges, expected amount for the cause and the refund terms. We would record the executed conversion and reconcile it to the local payout. We should not promise a rate or cost now."),
        ("What would you build if the judges required a stablecoin demonstration?", "We would first confirm that requirement, because the application made stablecoin use optional. If it were useful, we could demonstrate a clearly labelled sandbox funding adapter while retaining the same cause, provider and receipt flow. We would not claim a live integration simply to fit the theme."),
    ]),
    ("Users and product", [
        ("Who is the first user?", "An organiser in a community that already collects support, such as a student welfare fund, alumni group or church, with a real school bill and existing supporters. That gives us a clear first journey to test. We have not yet confirmed a pilot group."),
        ("Who benefits besides the donor?", "The person whose bill needs paying, the organiser who needs an accountable record, and the hospital, school or supplier intended to receive the payment. Honest NGOs and community groups could use the same record to update their supporters without reconstructing the spending later."),
        ("Why not just send money to someone you trust?", "You may already have enough confidence to do that. Kairos is useful where the donor wants a clearer connection between an appeal, a bill and the eventual payment. It also helps organisers show many supporters the same evidence and each person's own contribution."),
        ("Can an ordinary person create a cause, or only an NGO?", "An ordinary person can create one. The original idea deliberately includes people moved to organise help without becoming an NGO. The prototype also represents organisations. For a live launch, both the organiser's authority and the destination of payments need appropriate checks."),
        ("Do people have to install an app?", "No. Kairos is a web app and causes are shareable links. Anyone can view the public cause page without installing software. The current prototype requires sign-in to record a donation; we should not describe that part as guest checkout."),
        ("Why use a familiar social feed?", "People already discover appeals through social posts and group chats. A familiar feed makes causes easy to browse, while the cause page carries the budget and payment record. The interface supports the giving flow; the important difference is how the contribution is accounted for afterward."),
        ("Why begin with school fees?", "There is a specific institution, student and payable bill to check. We can work toward paying an institutional reference and reconciling the receipt rather than handing cash to the organiser. The reference lookup and settlement are simulated today; they still need to be integrated and tested.", True),
        ("Are hospital bills still part of the idea?", "Yes. They remain a central use case. Our proposed sequence is school fees first, followed by a small checked hospital list. That keeps the first live scope manageable while preserving the broader transparent-giving product."),
        ("What about a cause that genuinely needs cash?", "The current design is strongest where there is a provider or bill that can be paid directly. We should say when a need does not fit. Supplies or transport might be arranged through a suitable provider, but we should not disguise a cash withdrawal as a verified provider payment."),
        ("What would success feel like to a donor?", "They open a cause, understand the need and costs, see the charge before giving, then receive a clear account of the payment their contribution helped fund. We want to test whether they understand that receipt and feel comfortable supporting another cause afterward."),
    ]),
    ("Prototype and AI", [
        ("What is the technology stack?", "Next.js, React and TypeScript, with MongoDB through Mongoose, Tailwind CSS, and an Anthropic Claude integration for the intake interview. It is deployed on Vercel. The stack supports a working prototype; using those tools is not evidence that the payment system is production-ready."),
        ("What does the AI actually do?", "It interviews the organiser and turns the conversation into structured fields: the story, category, budget, named providers and an evidence list. It can report consistency findings about what was typed. It does not independently verify a hospital, read uploaded evidence end to end, or authorise a real payment.", True),
        ("Is the AI live or scripted?", "The interviewer has a live Claude integration when configured and reachable. It also has a scripted fallback. We can identify which source a demo used, and we should say so. A functioning fallback keeps the journey available; it is not a live model response."),
        ("Can the AI prove that an appeal is genuine?", "No. A consistent story is not proof that the story happened. AI helps collect specific, checkable information. Production approval would also need independent provider and invoice checks and appropriate human review. The current prototype is not an autonomous fraud investigation system."),
        ("Does it detect reused photos and forged invoices today?", "No. Some demo evidence statuses are constants. The model can reason about the conversation, but independent image reuse detection, document reading and forgery checks have not been built into a complete verification workflow. We will not describe a green demo status as proof that a document was checked."),
        ("Can people upload any supporting document now?", "General file uploads are simulated. Some demonstration documents already exist in the app, which is different from a complete upload, storage, access-control and verification pipeline. That pipeline still needs implementation before sensitive evidence is handled in a real pilot."),
        ("Does an AI finding automatically stop a cause?", "The current prototype displays findings but does not implement a dependable end-to-end review queue or evidence gate. The intended launch process is to hold questionable cases for review. We should explain that as work to build, not an operational safeguard that exists today."),
        ("What if the model invents a provider or amount?", "The organiser reviews the extracted fields before publishing, and the prompt asks the model not to invent facts. Those are useful controls, not a guarantee. Before live use, the provider, bill and amount need independent checks, and the model must not have authority to settle payments."),
        ("Is the face scan a live identity verification?", "No. The NIN lookup and matching presentation are simulated. The prototype stores the outcome of that simulated check. A live identity partner and a tested verification process are still needed; a scan animation is not evidence that a government record was queried."),
        ("What can you show us immediately?", "A cause with a budget and named providers, a demo contribution with the upkeep shown, the organiser's budget payment flow, the public payment entry, and the donor's calculated share. We will identify the seeded records and simulated parts before showing them."),
    ]),
    ("Providers and fraud", [
        ("How will you know the hospital account is really the hospital's?", "The launch design requires independent checks of the institution, the receiving account and the invoice together. An account-name lookup is one part of that, alongside institution records and contact through independently obtained details. Those checks are not integrated today.", True),
        ("Is CAC verification already built?", "No. The prototype has provider records and a verified flag used by the payout rule, but it does not run a live CAC lookup. The flag in a seeded or newly created demo cause is not an independent company verification."),
        ("What would a company registry check prove?", "It can help establish that an entity exists and identify relevant registration information. It would not by itself prove the organiser is authorised, the payout account belongs to the entity, the invoice is genuine, or the service was delivered. We need those questions checked separately."),
        ("What if the organiser names themselves as the provider?", "That is an attack the launch process must detect through account ownership, authorisation and related-party checks. The current prototype's verified flag is not enough to stop that deception on its own. We would restrict the first pilot to independently checked institutional destinations."),
        ("What if the organiser and a real hospital collude?", "Direct payment does not eliminate collusion. Independent invoice confirmation, price review, staged exposure where appropriate and a dispute process can reduce risk, but none makes collusion impossible. We should name that limit rather than claim that a registered provider cannot commit fraud."),
        ("What about an informal supplier without a CAC record?", "That is harder, which is why we would not start there. Later we could assess personal identity, account ownership, independence and delivery with controlled exposure. If a destination cannot be checked adequately, we should decline that payment or use a properly verified alternative."),
        ("Can someone steal a patient's story and fundraise with it?", "They could. Paying a genuine provider reduces diversion of the money but does not solve permission or dignity. We need the beneficiary's consent, or an appropriate authorised process, and confirmation that the bill really relates to the intended person. That consent workflow is not complete."),
        ("What stops two causes funding the same invoice?", "Production needs a unique obligation reference, invoice checks across causes and a fresh settlement-status check before payment. That must also be protected against concurrent requests. The current prototype does not provide a production guarantee against duplicate funding or settlement."),
        ("Does a receipt prove the treatment happened?", "It proves a recorded payment, and in production we want that payment tied to independent settlement evidence. It does not prove treatment quality or delivery. Where delivery matters, we need separate confirmation, consent and dispute handling. Those are different kinds of evidence."),
        ("Can you guarantee there will be no fraud?", "No. The aim is to reduce diversion and make money use easier to check. Live provider checks, limits, settlement records and review processes would add safeguards. We can show what the prototype enforces and explain what remains; we cannot promise a fraud-free service."),
    ]),
    ("Custody and operations", [
        ("Where would a naira physically sit in production?", "The intended flow is collection through suitable payment infrastructure, custody with an appropriately licensed partner under an agreed arrangement, then payment to the named provider. Kairos would maintain the cause and donor records and reconcile them to partner records. No such live arrangement is signed today.", True),
        ("Is a virtual account automatically escrow?", "We would not assume so. An account identifier can help route a contribution, but the actual custody, release authority, segregation and refund obligations depend on the partner arrangement. We need those terms established explicitly rather than treating a virtual account label as protection."),
        ("Who can request a payment?", "In the prototype, only the signed-in organiser of that cause can call the payout route successfully. That route also checks the budget item, verified flag, positive amount, available balance and unspent line amount. Independent verification and live settlement remain separate work."),
        ("What if the cause doesn't reach its goal?", "We need a clear rule agreed before fundraising: whether a fully funded budget item can proceed, or whether the cause is all-or-refund. The prototype demonstrates a full-bill school-fee flow, but it does not implement a complete live expiry and refund service. We would settle that policy before a pilot."),
        ("What if the student withdraws or the patient's situation changes?", "The intended response is to pause further payouts, confirm what changed, notify donors and apply the agreed refund or revised-budget process. We cannot quietly move the money to a different purpose. That full operational workflow has not been implemented or tested with real money."),
        ("Can donors get refunds today?", "No live donations are being handled, and there is no complete live refund integration. We intend unused funds to be returned under clear terms, including how upkeep is treated. Money already settled to a provider would depend on that provider's refund terms and the dispute process."),
        ("What if the reference has already been paid by someone else?", "The production flow should confirm status immediately before settlement, recognise a duplicate or already-paid reference, and stop another payment. It should then notify the cause and handle unused contributions under the agreed terms. The lookup and settlement are simulated today."),
        ("What if the payment partner is unavailable?", "A request timing out must not be treated as either a confirmed failure or a success. We need a pending state, a way to query status and a controlled retry using the same payment identity. The current demo doesn't prove that recovery path is implemented."),
        ("What if a provider takes the money but doesn't deliver?", "A payment record alone cannot prevent that. Production needs service confirmation, dispute ownership, appropriate release conditions and clear escalation and refund terms. Any later release should depend on the agreed evidence. We should not promise recovery of money already paid out."),
        ("What if Kairos or the custody partner closes?", "The partner agreement should define access to records, outstanding balances, instructions and how unused funds are returned if either party stops operating. We cannot promise insolvency protection before those arrangements and legal implications are established. That is part of selecting and contracting the partner."),
    ]),
    ("Engineering", [
        ("How is a donor's share calculated?", "For the current prototype, the recorded payout is divided by total net contributions raised for the cause. That fraction is multiplied by each donor's net contribution. The notification carries the rounded share, provider and invoice. Our illustrative ₦7,000 example assumes upkeep is covered separately.", True),
        ("Is the attribution calculated from the gift or the amount after upkeep?", "The net amount credited to the cause. If upkeep comes out of a ₦7,000 payment, less than ₦7,000 reaches the cause. The deck assumes the donor covers upkeep separately, so the full ₦7,000 is credited and 70% is ₦4,900. The displayed demo amount should always be read from that actual run."),
        ("What if donors join after an earlier payout?", "They are not retroactively notified for a payout already recorded. However, the current formula uses cumulative contributions for subsequent payouts, so production needs better tracking of each donor's unspent contribution across successive rounds. We should not claim that this multi-round allocation problem is fully solved."),
        ("Do all the donor shares add up exactly?", "The prototype rounds individual shares to whole naira, so the sum can differ slightly from the payout. Before real money, we need consistent minor-unit arithmetic and a deterministic remainder allocation so donor amounts reconcile exactly. The illustration avoids that rounding edge case."),
        ("What prevents a double payment on retry?", "A production payout needs an idempotency key, atomic accounting updates and settlement reconciliation. Those are not fully implemented in the current prototype. Its balance and budget checks are useful, but they do not by themselves protect against every concurrent request or retried payment."),
        ("What if your database update succeeds but the bank payment fails?", "Production must track the payment state separately and reconcile it to the partner's confirmed outcome before showing a settled receipt. It needs to handle pending, failed and reversed payments. The demo records a simulated payout, so it is not evidence that this distributed failure case has been solved."),
        ("Can somebody edit your public ledger?", "Someone with database privileges could alter the prototype's records. We do not claim cryptographic immutability. Production needs restricted access, an audit trail and reconciliation against independent settlement records. A public page helps inspection; it does not remove the need for those controls."),
        ("Can someone bypass the interface and call your API?", "They can call it, but the payout checks run on the server against the session and cause record. That includes organiser ownership and balance and line limits. This does not amount to a complete security audit; production still needs further validation, abuse controls and testing."),
        ("How will notifications scale?", "Today, payout processing writes a notification per donor and can send email. At larger scale we would separate delivery into a queue with retries and deduplication. An alert delivery failure must not change the payment result. We have not demonstrated a large-scale donor notification service."),
        ("Are these real push notifications?", "The desktop alert uses the browser notification API, with the open page polling for new records. That needs the page open. There is also an in-app record and an email path when configured. We have not implemented a general push service that works with the browser closed."),
    ]),
    ("Privacy and governance", [
        ("What identity data do you store?", "The prototype stores the result and method of its simulated identity check, not a raw NIN in that verification route. A live identity integration still needs a data-flow review, appropriate consent, retention rules and access controls. The current design choice is not proof that launch privacy work is complete."),
        ("Will medical documents be public?", "They should not be published by default. The production plan needs consent, redaction and access controls so donors can see appropriate proof without exposing diagnoses, identifiers or private family details. The existing demo documents are not a model for publishing every real patient's complete records."),
        ("Can a donor be anonymous?", "The prototype supports hiding the donor's name publicly while keeping the donation associated with their account for attribution. That is public anonymity, not an absence of records. Any identity requirements imposed by a future payment partner would need to be communicated separately."),
        ("Do donors need to provide NIN?", "The prototype's organiser verification step is separate from giving; it does not require a donor NIN to record a demo contribution. Live payment or cross-border requirements will depend on the selected partner and rules. We should not promise donors will never face a verification requirement."),
        ("Have you completed legal registration and approvals?", "We should not claim that. The current materials do not establish completed registrations, a signed custody contract or a completed legal review. Before launch, we need to determine the applicable obligations with qualified advice and the partner, then complete the required work."),
        ("Can you legally hold donations just because you call them escrow?", "We would not rely on that label. Our intended approach is partner-held custody, with the actual permissions, contract and operating responsibilities established before live funds. We have not obtained a legal conclusion that the whole product is exempt from regulation."),
        ("Are you already a registered nonprofit?", "The intended model is nonprofit cost recovery, but we should not claim a completed nonprofit registration unless we can show it. The presentation describes our operating intention and tentative upkeep model. Legal form and registration need to be confirmed as part of launch preparation."),
        ("Who handles disputes and human reviews?", "That operating process still needs to be built and staffed. The intended pilot would have a named person responsible for holds, beneficiary confirmation, provider evidence and escalation. It would need documented response times and decisions; the current prototype is not an established review service."),
        ("How would you handle a suspicious or harmful appeal?", "The live service needs reporting, moderation, temporary holds and a fair review and appeal process. It also needs a way to protect beneficiaries from unauthorised disclosure. Those are requirements for launch; we should not present every one as a completed prototype capability."),
        ("Will sponsors get access to donors or preferential treatment?", "Our intended model does not sell donor data or let sponsorship buy ranking or easier verification. A sponsor could cover upkeep with clear attribution. Those principles need to be reflected in the agreements, access controls and operating policies before sponsorship goes live."),
    ]),
    ("Sustainability", [
        ("How will Kairos sustain itself?", "The proposed model is a visible 2% upkeep charge, capped at ₦5,000 per cause, alongside grants, credits and sponsored upkeep for shared costs. The prototype implements the demo fee calculation and cover option. The commercial arrangements and real unit economics still need validation.", True),
        ("Is the ₦5,000 cap per donor or per cause?", "Per cause, across the contributions to that cause. It is not a fresh ₦5,000 allowance for each donor or each payout. The code tracks upkeep already taken against that cause so the demo charge stops when the cap has been reached."),
        ("What does the donor actually pay?", "They see the amount before confirming. If upkeep is deducted from the chosen payment, the cause receives the net amount. If they choose to cover upkeep, the total is adjusted so the intended gift reaches the cause. The prototype shows that breakdown; real processing charges need partner terms."),
        ("Why did older materials say 5%?", "That was an earlier commercial model explored for other applications. The later JCI and Faith & Tech materials moved to tentative 2% upkeep capped per cause, with cost recovery as the intention. We should use the current model consistently instead of mixing old projections into this pitch."),
        ("Does a capped fee guarantee you're not making a profit?", "No. A cap limits the amount collected; it does not by itself determine profit or legal status. Our intention is cost recovery, with any surplus supporting smaller causes. That would require clear governance, records and reporting. The actual economics must be measured in the pilot."),
        ("Where does the ₦2,820 cost estimate come from?", "It is an internal planning example: ₦100 for identity, ₦600 for three provider checks, ₦120 for intake AI and ₦2,000 for 80 donor messages. It is not measured pilot cost or a current supplier quote. It also excludes important shared costs, so we should not present it as proven profitability."),
        ("What if hundreds of small donors support one cause?", "Message delivery, support and reconciliation work can grow with donor count while upkeep stays capped. We need to measure that, use efficient channels and appropriate batching, and secure sponsored support where needed. The cap is a fairness choice, not evidence that costs will always fit under it."),
        ("Who pays the people building and running it?", "The capped upkeep is intended to cover cause-level costs, not a reliable salary budget. Grants, sponsorship and other appropriate support would need to cover shared work. Those are intended funding sources, not confirmed commitments. We should be honest if the project remains part-time until that support exists."),
        ("Would NGOs pay to use it?", "The current intended model lets NGOs use the giving flow and bring their supporters, while partners may sponsor upkeep for batches of causes. It does not assume an NGO subscription or guaranteed sponsorship income. We would test willingness and costs with actual partner conversations."),
        ("What would you spend prize money on?", "We would prioritise partner and verification setup, production payment reliability, privacy and security work, and the costs of a tightly scoped pilot. We do not have a quoted budget to defend yet, so we should not invent percentage allocations or promise a launch date that depends on unconfirmed partners."),
    ]),
    ("Pilot and team", [
        ("Who is participating in this competition?", "Sokenu Abigail and Omohuma Miracle represent Kairos in both competitions. Abigail is the team lead and product manager; Miracle leads product design. They are the only two people named and pictured in the shared deck.", True),
        ("Did the two of you write every part of the code?", "We are the two people representing this entry. Kairos is an existing team project with product, design and engineering contributions documented in its history. We should describe our own contributions accurately rather than imply the code was all written by the two people on this call."),
        ("Who answers technical questions if your developers aren't on the call?", "Both of us should understand the core journey, what the server checks, how donor shares are calculated and what is simulated. We have the source and preparation notes to support that. If a detail needs checking, we'll say so and verify it rather than improvise an answer."),
        ("Why are you the right people to work on this?", "The idea comes from a giving problem we have encountered ourselves, and we have taken it beyond a description into a working prototype. Abigail brings product and project leadership; Miracle brings product design. Our next responsibility is to test the assumptions with real organisers and suitable payment partners."),
        ("How will you get the first donors?", "We would start with organisers who already have a community: a welfare fund, alumni group or church supporting a specific bill. They bring existing supporters to a clearer process. We have not signed those groups, and we should not describe a proposed distribution route as established traction."),
        ("What will you measure in the pilot?", "Bills successfully settled and reconciled, whether donors understand their receipts, repeat giving, time and cost per completed cause, and failures or disputes. We'd set a small scope and explicit success criteria with the pilot partners before starting, rather than claim numerical targets are already agreed."),
        ("What is your biggest unresolved risk?", "Getting a reliable live operating arrangement and proving that people actually want to use it. A working demo does not establish either. Provider collusion, payment failures, privacy and the cost of supporting each cause also need attention. We would keep the first pilot narrow enough to learn responsibly."),
        ("What can you finish before the office hour or final?", "We can rehearse and demonstrate the existing prototype, make the implementation limits clear, and prepare a concrete integration and pilot plan. Any extra sandbox integration depends on confirmed access. We should commit only to work that is feasible and distinguish a new plan from progress already made."),
        ("What would make you change your mind about the idea?", "If donors cannot understand or value the receipt, organisers will not use a provider-directed flow, or operating costs and dispute burdens are too high. A small pilot should test those points. We would use the evidence to improve the current giving flow rather than assume the prototype proves demand."),
        ("What should you ask the organisers?", "Confirm the start time, meeting link and how long is available for the deck, demo and questions. Ask what they most want to see before the next stage and what support or introductions are available. The two competitions have separate logistics; the shared product pitch stays the same."),
    ]),
    ("APWEN focus", [
        ("Why does Kairos fit the APWEN track?", "We entered Social Innovation & Community Development. Kairos addresses the hesitation around giving to strangers and the difficulty honest organisers face proving where support went. It uses ordinary payment infrastructure to make community help easier to account for, with direct provider payments and a receipt for each giver.", True),
        ("What is the social innovation rather than just another app?", "The important change is the giving arrangement: a published budget, the provider as the intended payee, and each donor's share of the resulting payment. The feed is just how people find the cause. We can demonstrate the accounting behind that arrangement in the prototype.", True),
        ("Who in the community would you work with first?", "A student welfare fund, alumni group or other community already raising support for a specific school bill. They bring an organiser, a real need and existing supporters. That is a proposed pilot route; no community partnership has been confirmed."),
        ("How could women benefit from this?", "Women facing urgent bills, women organising community support and women donating could use the same giving flow. We have not built a separate women-only product or measured gender-specific outcomes. A pilot should include the people who actually experience the problem and examine whether access and benefit are fair."),
        ("How would you include someone who finds the technology difficult?", "The intention is for an organiser to help explain a need through the guided interview and share a web link with supporters. Accessibility still needs testing, including plain language and low-data use. We should not claim completed local-language, voice or offline payment features."),
        ("What community impact can you prove already?", "We can demonstrate the software connecting a contribution, a budget payment and a donor receipt. We cannot yet prove bills settled with real donations or improved community giving rates. Those are outcomes the pilot needs to measure.", True),
        ("How do you protect the dignity of someone asking for help?", "The launch process needs consent, careful wording and control over sensitive documents. A beneficiary should not have to expose an entire medical or family history publicly to make a payment checkable. Those privacy and consent controls still need to be completed."),
        ("How will you know this improved giving rather than just added paperwork?", "Measure whether people understand the receipt, whether organisers can use the flow without excessive work, what it costs per completed cause, and whether donors return. Compare those findings with the communities' current process. We should not assume more visible records automatically mean more donations."),
        ("What are the APWEN stages and dates?", "The supplied update says ten teams advance from screening to virtual pitching on 13 November. Five then advance to the physical final on 27 November. Check the official notification for selection, meeting times and presentation requirements; the notice does not establish a specific pitch duration."),
        ("Why should the APWEN judges take you to the final five?", "We have moved beyond describing the idea into a working prototype and can show the link between a need, a budget payment and each donor's receipt. We understand its current limits and have a narrow pilot plan. The next step is making that existing flow dependable with real partners and communities."),
    ]),
]

QUESTIONS = []
for category, rows in GROUPS:
    for row in rows:
        q, a, *priority = row
        QUESTIONS.append({"id": f"q{len(QUESTIONS)+1:03d}", "category": category,
                          "question": q, "answer": a,
                          "priority": bool(priority and priority[0])})

assert len(QUESTIONS) == 110
assert len({q["question"] for q in QUESTIONS}) == len(QUESTIONS)
