"""Faith finale rehearsal only: proposed safeguards, not implemented product policy.

Reviewed against official guidance on 26 November 2026. The linked material
supports the principles; it is not a legal opinion approving Kairos's model.
"""

SOURCES = {
    "act": ("Nigeria Data Protection Act 2023", "https://ndpc.gov.ng/wp-content/uploads/2024/03/Nigeria_Data_Protection_Act_2023.pdf"),
    "gaid": ("NDPC implementation guidance, 2025", "https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf"),
    "cbn": ("CBN payment licence categories", "https://www.cbn.gov.ng/out/2020/ccd/categorization%20of%20psps.pdf"),
    "aml": ("CBN financial-institution AML/CFT/CPF regulations", "https://www.cbn.gov.ng/Out/2022/FPRD/AML%20CIRCULAR%20AND%20REGULATIONS%20MERGED.pdf"),
    "enisa": ("ENISA: pseudonymisation techniques and risks", "https://www.enisa.europa.eu/publications/pseudonymisation-techniques-and-best-practices"),
    "nist": ("NIST: pairwise pseudonymous identifiers", "https://pages.nist.gov/800-63-4/sp800-63c.html"),
}

# Each answer is a suggested spoken response. Priority marks the questions most
# useful for the finalist feedback and the user's returning-identity discussion.
QUESTIONS = [
    (
        "readiness", "Are you already licensed and fully compliant?", True,
        "We are presenting a prototype, not claiming a financial licence or completed compliance approval. Real identity verification, funds holding and external payments are not connected. Before taking real donations, we need to confirm the legal model, agree responsibilities with suitable partners and put the necessary privacy, review and complaints processes in place. A working demo is not permission to operate a live financial service.",
        ("cbn", "gaid"),
    ),
    (
        "licence", "If Kairos does not hold the money, does that mean it needs no licence?", True,
        "We cannot assume that. What matters is the activity Kairos actually performs and controls, including collecting donations, instructing payments and setting release conditions. We need the proposed arrangement reviewed against the applicable rules and the partner's permissions before launch. Saying that a partner holds the funds does not, by itself, establish that Kairos needs no authorisation.",
        ("cbn",),
    ),
    (
        "partner-permissions", "How would you know a financial partner is allowed to hold these donations?", True,
        "We would check the exact legal entity and its current permissions, then confirm in writing that it supports this donation and release model. A payment gateway connection is not automatically an escrow arrangement. We need to know who holds the money, whose account it is in, how it is kept separate from operating money, who can authorise releases and what happens in a dispute or provider failure. No such Kairos agreement is claimed today.",
        ("cbn",),
    ),
    (
        "responsibility", "Does using licensed third parties make all compliance their responsibility?", False,
        "No. The partner has responsibilities for its own service, while Kairos still has responsibilities for the information it collects, its published claims, access controls, budget rules and treatment of users. We would write down who performs each check, investigates concerns, answers complaints and handles incidents. We also need to verify the partner's actual service and permissions instead of treating a recognised company name as blanket approval.",
        ("cbn", "gaid"),
    ),
    (
        "aml", "How would you deal with money laundering, sanctions or suspicious donations?", True,
        "Before live payments, we would agree the required checks and escalation route with the financial partner and qualified advisers. That includes who reviews unusual donations, confirms relevant identities and makes any required reports. Donating to a charitable cause does not remove financial-crime risks. A warning needs investigation; it should not automatically become a fraud finding. Live screening, reporting arrangements and a staffed compliance operation are not implemented today.",
        ("aml",),
    ),
    (
        "donor-identity", "Would every donor have to provide a NIN, including an anonymous donor?", False,
        "We should not collect a NIN from everyone just because it is available. The checks should reflect the person's role, the risk and the financial partner's applicable requirements. Public anonymity means other viewers do not see the donor's identity; it does not promise that a payment partner will perform no checks. The current guest-donation demo is not a final live-payment identity policy.",
        ("act",),
    ),
    (
        "data-claim", "Can you truthfully say Kairos stores no sensitive data?", True,
        "We should not make that blanket claim. Kairos already stores account and cause information, and uploaded evidence could contain private details. Our goal should be to collect less, keep unnecessary identity documents out of Kairos and strictly control what becomes public. A protected identity token and a restriction record would still be data we retain. The present prototype does not yet provide a complete private-evidence and retention process.",
        ("act", "gaid"),
    ),
    (
        "lawful-basis", "What would justify keeping identity information for fraud prevention?", True,
        "We need a documented lawful basis for that particular use, a clear explanation to users and evidence that the information is necessary. Fraud prevention is a purpose, not automatic permission to collect or retain everything. If relying on legitimate interests, we would assess necessity and the effect on people's rights. We should not assume that one consent checkbox covers every check, future use or retention period. This assessment is still to be completed.",
        ("act", "gaid"),
    ),
    (
        "returning", "How could you recognise someone returning after a confirmed fraud-related restriction?", True,
        "Our proposed approach is to verify identity through an authorised provider, obtain a stable private identity token and check it against a restricted-access record. If the same verified identity returns under a new account, its restriction can be checked. That requires retaining a small amount of justified information; storing nothing would not support it. It would not stop someone using another person's identity, so additional checks and human review still matter. This is not implemented today.",
        ("enisa", "nist"),
    ),
    (
        "names", "Should you compare full names before comparing the identity token?", True,
        "No. Different people can share a full name, and a person's name can change. A name filter could miss the same person returning or draw attention to an unrelated person. Once identity has been properly verified, we would look up the stable token directly. Names may help a reviewer understand a case, but they should not be the key for matching a returning identity or deciding that someone is dishonest.",
        (),
    ),
    (
        "hmac", "Is storing an ordinary hash of someone's NIN safe enough?", True,
        "An ordinary hash is a poor choice here because someone with a leaked database could test possible NIN values against it. One proposed alternative is HMAC-SHA-256, which creates a repeatable token using a secret key kept separately from the database and used only on the server. A provider-issued private identifier may avoid handling the NIN ourselves, if it remains stable for the same verified person. A temporary verification reference is not that identifier.",
        ("enisa", "nist"),
    ),
    (
        "ownership", "What stops someone entering another person's NIN and getting that person restricted?", True,
        "A typed NIN is not proof that the applicant owns that identity. Before using an identity token for restrictions, the verification process must establish that the applicant is the person represented, using the authorised provider's appropriate checks. We must also consider account takeover and identity theft when investigating an incident. We should never turn an unverified number or a failed lookup into a permanent restriction on its real owner. Today's NIN check is simulated.",
        (),
    ),
    (
        "minimum-record", "What would you retain instead of the raw NIN or a simple fraud flag?", False,
        "A proposed minimum is the protected identity token, restriction status, a clear reason, a reference to necessary evidence, the decision date, who reviewed it and the next review or deletion date. Evidence itself needs limited access and its own retention rules. We should distinguish a temporary restriction from an upheld finding and an overturned decision. Retaining the full NIN or all uploaded documents indefinitely is not necessary just to recognise the same verified identity.",
        ("gaid",),
    ),
    (
        "appeal", "Who decides someone committed fraud, and what if the decision is wrong?", True,
        "An AI flag, a failed verification or an unsuccessful payment should not be treated as proof of fraud. An authorised person would review evidence, record the reason for any restriction and give the affected person a way to respond and appeal. A reviewer must be able to correct or overturn the decision. We should describe a platform restriction accurately rather than imply a criminal conviction. The full case-review and appeal process is still proposed.",
        ("act", "gaid"),
    ),
    (
        "erasure", "Could a restricted user delete their account and demand that you forget the restriction?", True,
        "Account deletion and retention of a justified restriction record are separate decisions. We would assess the request, the applicable rights and whether a limited record still has a lawful and necessary purpose. We cannot promise to erase every record immediately, or to keep every restriction forever. The policy must explain what remains, why, for how long and how the decision can be challenged. That policy has not yet been finalised.",
        ("act", "gaid"),
    ),
    (
        "personal-data", "If you store only a hash or token, is it still personal data?", True,
        "Yes, we would treat it as personal data. Its purpose is to recognise the same person and connect them to an account or restriction. Hiding the original NIN reduces exposure, but it does not make that record anonymous or automatically lawful. Access should be limited, retention justified and the record protected. We should say that we aim to avoid retaining raw NINs, rather than claim that no personal data is stored.",
        ("enisa", "act"),
    ),
    (
        "key-change", "What happens if the HMAC key or identity provider changes?", False,
        "We would need a migration plan before relying on the token. A new HMAC key produces a different token, so discarding the old key immediately could stop old restrictions from matching. If raw NINs are not retained, old tokens cannot simply be converted into new ones. Key versions, protected transition checks and re-verification may be needed. A new provider may also issue different identifiers. These are design requirements, not completed safeguards.",
        ("enisa",),
    ),
    (
        "children-health", "How would you protect children, students and people sharing medical information?", False,
        "We would ask only for what is needed, keep private evidence separate from the public story and establish the appropriate authority and permissions to act for the beneficiary. A student is not necessarily an adult, and a medical document may reveal particularly private information. Someone's need for help should not become permission to publish everything about them. Applicable safeguards and any guardian involvement must be assessed before a live pilot; these processes are not complete today.",
        ("act", "gaid"),
    ),
    (
        "cloud", "Can identity documents and cause information be sent to AI or overseas cloud providers?", False,
        "We cannot assume that using a familiar cloud or AI provider settles the privacy questions. We need to check what information each service receives, its purpose, where it is processed, who can access it and how deletion works. Contracts and any required transfer safeguards need review. Raw NINs and unnecessary private documents should not be sent to the AI interview. Current use of Claude, Cloudinary, MongoDB Atlas and Vercel is not a completed privacy assessment.",
        ("act", "gaid"),
    ),
    (
        "ndpc", "Do you need NDPC registration, a privacy officer or a data-protection impact assessment?", False,
        "We need to assess the applicable requirements against Kairos's actual activities, data and risks. We should not assume an early-stage prototype is automatically exempt. Registration as a controller or processor of major importance, a data-protection officer and an impact assessment each have their own triggers. Identity matching, sensitive evidence and decisions affecting access deserve particular attention. We are not claiming that Kairos has completed registration, appointed a qualified officer or passed an impact assessment.",
        ("gaid",),
    ),
    (
        "incident", "What would happen if private documents or identity tokens leaked?", False,
        "We would contain the exposure, protect affected accounts, establish what was accessed and preserve the information needed to investigate. The incident must be assessed for any required notices to the regulator and affected people within the applicable deadlines. A leaked HMAC key needs a separate response because it undermines the token's protection. We still need assigned responsibilities, tested response steps and a way for users to report a concern before live use.",
        ("act", "gaid", "enisa"),
    ),
    (
        "complaints", "What compliance questions remain around refunds and complaints?", False,
        "Before accepting real donations, donors should understand the charges, permitted use of their money and what happens if a bill changes, a cause closes or a payment fails. We need an accessible complaints route and agreed responsibilities for refunds, reversals and unresolved disputes. Kairos should not silently divert restricted donations to another purpose. These rules must match what the financial partner can actually do; a refund button or a draft policy would not be enough.",
        (),
    ),
    (
        "records", "How can you minimise personal data while keeping trustworthy payment records?", False,
        "Different records have different purposes. A payment reference, amount, recipient, status and donor allocation may need to be retained separately from an identity document. We should define the necessary fields, access and retention for each, taking account of applicable requirements and partner responsibilities. Deleting a public cause should not silently destroy evidence needed to resolve a payment dispute. Equally, keeping financial records does not justify retaining every personal attachment forever.",
        ("gaid",),
    ),
    (
        "pilot", "What would you put in place before inviting real donations?", True,
        "We would confirm the legal and funds-holding arrangement, test a real verification-to-receipt path with the partner, limit access to private evidence and assign people to reviews, complaints and incidents. We would also document data use and retention, test failed payments and refunds, and agree when the pilot must pause. Each safeguard needs evidence that it works. We have not completed those steps, so the present walkthrough should remain a demonstration using simulated funds.",
        (),
    ),
]


def compliance_questions():
    return [
        dict(
            id="fc-" + key,
            category="Compliance and identity safeguards",
            question=question,
            answer=answer,
            priority=priority,
            sources=[SOURCES[source] for source in sources],
        )
        for key, question, priority, answer, sources in QUESTIONS
    ]
