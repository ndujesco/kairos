# Kairos: 61 questions for the Cleva Grand Finale

Sokenu Abigail · Omohuma Miracle

Important things to learn comes first: official-source third-party lists for NIN/face checks, CAC/business verification, escrow, payments and every other claimed external service, plus supporting infrastructure. Researched 20 November 2026. These are candidates, existing technical suppliers or explicitly labelled checking authorities, not agreed financial partnerships. Global options need Nigeria/use-case confirmation. A separate answer explains how CAC helps; the original judge questions follow with their saved IDs preserved.

## Important things to learn: third-party partners

### 1. ★ Who could provide NIN and BVN identity checks?

Nigeria identity-check candidates. Learn the difference between a registry lookup, a face match and a liveness check. Confirm the current NIMC access/consent route and each vendor's live endpoints; NIN lookup in Kairos is still simulated.

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

### 2. ★ Who could provide selfie matching and face liveness checks?

Nigeria-focused options come first, followed by global biometric providers. A global selfie SDK does not itself supply Nigeria's NIN record. Compare face matching, spoof detection and support for low-end phones.

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

### 3. ★ Who could verify CAC registration, businesses and provider ownership?

For schools, hospitals, suppliers and NGOs, learn KYB: registered entity, directors and beneficial owners. Global providers need Nigeria-specific coverage confirmation. A CAC match alone does not authenticate an invoice or establish account ownership.

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

### 4. ★ Who could check a bank account name before paying a provider?

These candidates can support account resolution or account-detail checks. Learn name enquiry versus ownership verification: a matching account name does not prove that an organizer is authorized by the institution.

- [Paystack](https://paystack.com/docs/api/verification/): Nigerian account resolution.
- [Flutterwave](https://developer.flutterwave.com/docs/payout-outflow/introduction): Nigerian beneficiary verification.
- [Monnify / Moniepoint](https://developers.monnify.com/): bank-account detail verification.
- [Prembly / IdentityPass](https://docs.prembly.com/api-reference): bank-account basic and comparison APIs.
- [VerifyMe / QoreID](https://docs.qoreid.com/docs/our-service-availability): NUBAN regular / BVN-data checks.
- [Dojah](https://docs.dojah.io/api-reference/endpoint/general_service/resolve_nuban): NUBAN account-name resolution.
- [Mono](https://support.mono.co/en/articles/8394537-how-to-use-lookup-on-the-dashboard): bank-account Lookup; confirm required ownership data.
- [Safe Haven Microfinance Bank](https://safehavenmfb.readme.io/reference/name-enquiry): bank-account name-enquiry endpoint.

### 5. ★ Which banks or trustees could we approach for escrow and custody?

Start with the providers explicitly offering escrow. The final three are additional trust / charitable-custody conversations, with Kairos escrow capability still to confirm. Learn segregation, who legally holds the money and who enforces release only to the named bill; neither a virtual account nor split payments establishes escrow.

- [Stanbic IBTC Bank](https://www.stanbicibtcbank.com/nigeriabank/corporate-and-investment/transaction-banking/Escrow-services): explicit bank escrow and conditional release service.
- [FirstBank / FirstEscrow](https://firstescrow.firstbanknigeria.com/): FirstEscrow; confirm suitability for pooled donations.
- [Access Bank](https://www.accessbankplc.com/corporate/corporate-sector/access-investor-services): escrow within Access Investor Services.
- [United Capital Trustees](https://unitedcapitalplcgroup.com/faq/): corporate escrow and trustee services.
- [Coronation Trustees](https://coronation.ng/institutional/products-solutions/asset-management/corporate-trust/corporate-client-services/): corporate-trust escrow service.
- [First Trustees](https://firsttrustees.com/solutions/corporate-trust/): corporate trustee; bespoke donation-custody / escrow fit unconfirmed.
- [STL Trustees](https://stltrustees.com/corporate-trust/): corporate trustee; bespoke donation-custody / escrow fit unconfirmed.
- [Quantum Zenith Trustees & Investments](https://quantumzenithtrustees.com.ng/): charitable trust / structured giving; escrow/API fit unconfirmed.

### 6. ★ Which escrow technology companies could we also investigate?

Additional escrow-specific leads. Confirm the actual bank/custodian, funds protection, donation-platform eligibility, release/dispute rules and current API access. Their public escrow descriptions do not establish a licensed Kairos custody arrangement.

- [Vesicash](https://vesicash.com/terms/): published escrow terms and integration history; current site emphasizes merchant-of-record services.
- [Trustcrow](https://gotrustcrow.gitbook.io/trustcrow-api-v1): API for funding, holding and releasing escrow transactions.
- [EscrowLock](https://www.escrowlock.com/): Nigeria escrow service; confirm API and charity use case.

### 7. ★ Who could collect local donations and process checkout payments?

Nigeria-focused payment candidates. Learn supported channels, confirmed-payment events, settlement, charity/crowdfunding eligibility and external charges. Collection processing and cause-specific custody are separate roles.

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

### 8. ★ Who could supply virtual accounts or embedded banking infrastructure?

Options for identifying incoming transfers and linking them to a cause. A virtual account is a collection/reconciliation tool; its existence does not establish the legal escrow or release rules.

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

### 9. ★ Who could send the money to schools, hospitals and suppliers?

Potential transfer/disbursement providers. Learn beneficiary checks, payment references, retry safety, outcome queries and reversals. We would still need the agreed custody partner to restrict which payouts Kairos may request.

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

### 10. ★ Who could validate bill references and settle school or hospital bills?

Start with the institution's actual payment rail and biller catalogue. Remita is the relevant RRR lead; other bill-payment APIs do not automatically validate or settle a Remita reference. Confirm the student/patient, bill, payee and final institution acknowledgement directly.

- [Remita / SystemSpecs](https://api.remita.net/): RRR generation / lookup, collections and bill settlement.
- [Wema Bank / ALAT](https://playground.alat.ng/product-remita-product): ALAT Remita Payment Service: catalogue, validation and RRR generation.
- [Interswitch / Quickteller](https://docs.interswitchgroup.com/docs/quickteller-business): Quickteller / biller integration; institution availability varies.
- [Flutterwave](https://developer.flutterwave.com/api): Tuition and payment APIs; confirm the specific institution and access.
- [eTranzact](https://www.etranzact.com/): institutional payment integration; confirm school's active channel.
- [Xpress Payment Solutions](https://xpresspayments.com/business): Xpress Biller Services / institutional collections.
- [Paga](https://developer-docs.paga.com/docs/business-rest-api-operations): biller and registered-merchant payments.
- [Monnify / Moniepoint](https://developers.monnify.com/): bills APIs; confirm catalogue instead of assuming school/RRR coverage.

### 11. ★ Who could support overseas funding, currency conversion and naira settlement?

Explore a permitted foreign-to-Nigeria contribution flow. Business accounts and remittance features alone do not establish platform collection permissions or API access. Confirm donor countries, actual net naira credit, charges and refunds for every corridor.

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

### 12. ★ Who could handle future stablecoin funding, conversion or custody?

These companies cover different roles, not interchangeable services. Confirm Nigeria access, supported asset/network and legal account structure. Circle is a USDC lead; USDT needs a provider explicitly supporting USDT. Wallet technology alone does not establish licensed escrow.

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

### 13. ★ Who could screen sanctions, politically exposed persons and money-laundering risks?

Nigeria-focused compliance vendors and global screening alternatives. Learn AML, sanctions and PEP screening versus transaction monitoring. Access to a vendor does not replace our partner's compliance rules or Kairos's review responsibilities.

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

### 14. ★ Who could help monitor suspicious activity, devices and payment fraud?

Additional production-control candidates. These detect signals or support investigations; they do not prove a cause is truthful or make the product automatically secure.

- [Youverify](https://youverify.co/en/ng): fraud and transaction monitoring.
- [Prembly / IdentityPass](https://docs.prembly.com/api-reference): Fraud Lens and transaction screening.
- [VerifyMe / QoreID](https://docs.qoreid.com/docs/our-service-availability): fraud-prevention products.
- [SEON](https://seon.io/): device / digital-footprint and fraud signals.
- [Sardine](https://www.sardine.ai/): device, behavior and payment-fraud checks.
- [Feedzai](https://www.feedzai.com/): payment fraud and financial-crime monitoring.
- [Unit21](https://www.unit21.ai/): fraud monitoring and case investigation.
- [Fingerprint](https://fingerprint.com/): device identification and abuse signals.

### 15. ★ Who could independently check providers, addresses and supporting evidence?

Verification businesses are potential service partners. The named public bodies below are authoritative checking sources, not proposed commercial partners or proof of a particular bill. A school bursary or hospital finance office must still confirm the actual bill, beneficiary and outstanding balance through an independently obtained contact.

- [VerifyMe / QoreID](https://docs.qoreid.com/docs/our-service-availability): background / business-address verification; agree evidence-review scope.
- [Prembly / IdentityPass](https://docs.prembly.com/api-reference): background-check products; agree institution-specific scope.
- [Youverify](https://youverify.co/en/ng): entity, ownership and due-diligence checks.
- [Dojah](https://support.dojah.io/articles/what-does-dojah-do): business / identity checks; confirm physical-review scope.
- [Corporate Affairs Commission (CAC)](https://www.cac.gov.ng/services/company-search): source only: registered company / NGO entity details.
- [National Universities Commission (NUC)](https://www.nuc.edu.ng/): source only: university recognition / accreditation, not student bills.
- [HEFAMAA, Lagos](https://hefamaa.lagosstate.gov.ng/): source only: Lagos health-facility registration / accreditation.
- [Medical and Dental Council of Nigeria (MDCN)](https://www.mdcn.gov.ng/): source only: medical/dental professional registration, not hospital invoices.
- [Pharmacy Council of Nigeria (PCN)](https://pcn.gov.ng/): source only: pharmacy / professional registration, not invoice truth.

### 16. ★ Who could read invoices and receipts or detect document tampering?

OCR reads/extracts a document; fraud detection looks for manipulation. Neither alone confirms a genuine school/hospital debt. Test each supplier on Nigerian invoices, fee references and receipts, with issuer confirmation for authenticity.

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

### 17. ★ Who could help reconcile payments, refunds and the money ledger?

Start with our payment partner's confirmations, reports and refund/reversal APIs. Global ledger/reconciliation tools are optional technical alternatives, not Nigerian custody partners. Kairos's donor-share allocation and budget rules remain our responsibility.

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

### 18. ★ Who supplies the AI interview and budget structuring?

Anthropic/Claude is already used by Kairos. The remaining providers are alternatives to research, not integrations we have built. Compare structured output, privacy terms, cost and reliability; AI assistance does not authenticate NINs, bills or settlement.

- [Anthropic / Claude](https://platform.claude.com/docs/en/intro): CURRENT: Claude interview and structured cause/budget generation.
- [OpenAI](https://developers.openai.com/api/docs): alternative language-model / structured-output APIs.
- [Google Cloud / Gemini](https://ai.google.dev/gemini-api/docs): alternative Gemini API.
- [Mistral AI](https://docs.mistral.ai/): alternative model and document-processing APIs.
- [Cohere](https://docs.cohere.com/): alternative enterprise language-model APIs.
- [Groq](https://console.groq.com/docs/overview): alternative hosted model inference.
- [Amazon Web Services](https://aws.amazon.com/bedrock/): Bedrock: managed model access; model support varies.

### 19. ★ Who could store uploaded supporting documents and receipts?

Cloudinary is already used for authenticated raw-file storage. Alternatives below require their own access rules, retention and region choices. Current draft attachments are owner-only; published cause attachments are publicly viewable through Kairos. Storage is separate from document authentication.

- [Cloudinary](https://cloudinary.com/documentation/upload_parameters): CURRENT: supporting-file uploads / delivery.
- [Amazon Web Services](https://aws.amazon.com/s3/): S3 object storage.
- [Google Cloud / Gemini](https://cloud.google.com/storage): Cloud Storage.
- [Microsoft Azure](https://azure.microsoft.com/en-us/products/storage/blobs): Blob Storage.
- [Cloudflare](https://www.cloudflare.com/products/r2/): R2 object storage.
- [Backblaze](https://www.backblaze.com/cloud-storage): B2 object storage.
- [Supabase](https://supabase.com/storage): Storage with access policies.
- [DigitalOcean](https://www.digitalocean.com/products/spaces): Spaces object storage.
- [Uploadcare](https://uploadcare.com/): file upload, storage and delivery.

### 20. ★ Who could deliver donor receipts and email notifications?

Transactional-email delivery options. Kairos uses Nodemailer as a sending library, not an email-delivery company; email remains optional. Sending a message does not establish that the bill was paid, and anonymous guests do not currently receive a personal account receipt.

- [Twilio / SendGrid](https://www.twilio.com/en-us/sendgrid): SendGrid Email API / SMTP.
- [Amazon Web Services](https://aws.amazon.com/ses/): Amazon SES.
- [Postmark](https://postmarkapp.com/): transactional email / SMTP.
- [Resend](https://resend.com/): email API and delivery events.
- [Sinch / Mailgun](https://www.mailgun.com/): Mailgun transactional email API.
- [Brevo](https://www.brevo.com/products/transactional-email/): transactional email.
- [Zoho CPaaS (formerly ZeptoMail)](https://www.zoho.com/cpaas/): transactional email; formerly ZeptoMail.
- [SMTP2GO](https://www.smtp2go.com/): SMTP and email API.

### 21. ★ Who could deliver SMS, OTP or WhatsApp updates?

Optional notification channels, not a requirement to give and not currently a WhatsApp receipt integration. Sharing an ordinary cause link on WhatsApp is separate from using the WhatsApp Business messaging API. Confirm Nigeria delivery and opt-in/template requirements.

- [Termii](https://termii.com/): Nigeria-focused SMS, OTP and messaging.
- [Africa's Talking](https://help.africastalking.com/en/articles/2241664-does-africa-s-talking-support-sending-of-sms-to-dnd-numbers-in-nigeria): SMS APIs with Nigerian-network support.
- [Twilio / SendGrid](https://www.twilio.com/en-us/messaging): SMS / WhatsApp / verification APIs.
- [Infobip](https://www.infobip.com/): SMS, WhatsApp and omnichannel messaging.
- [Bird (formerly MessageBird)](https://bird.com/): SMS, WhatsApp and verification.
- [Vonage](https://www.vonage.com/communications-apis/): SMS, messaging and verification APIs.
- [Sinch / Mailgun](https://sinch.com/): messaging and verification APIs.
- [Meta / WhatsApp Business Platform](https://developers.facebook.com/documentation/business-messaging/whatsapp/about-the-platform): direct WhatsApp Business Platform access.
- [Gupshup](https://www.gupshup.ai/): WhatsApp and business-messaging platform.

### 22. ★ Which third parties support hosting, databases and scaling?

Vercel and MongoDB Atlas are already used. The others are infrastructure alternatives, not additional signed payment partners. Hosting, managed databases and edge protection still require Kairos to implement access control, backups, secure code and payment reconciliation.

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


## CAC: how it helps

### 23. ★ How does CAC verification help Kairos?

NIN helps identify the person; CAC helps identify a registered organization. For a private school, hospital, supplier or NGO, CAC checks can confirm the registered legal name, registration number, status and available director or trustee details. That gives us an independent record to compare with the named payee, its official contacts and separately verified bank account, making impersonation or payment to an unrelated entity easier to spot. For example, if an organizer names a hospital but the entity or bank details do not match, we would pause the proposed payout and investigate. Registration alone does not prove the bill is genuine, establish the organizer's authority, confirm a medical/education licence or guarantee honest conduct. Public institutions may need their statutory or sector-register evidence instead of a normal CAC company record. We would still confirm the actual bill with the institution. Live CAC verification is not built in Kairos yet.

Sources: [CAC company-search scope](https://www.cac.gov.ng/services/company-search) · [Mono CAC profile and ownership lookup](https://docs.mono.co/docs/lookup/cac-lookup) · [Dojah business-verification checks](https://dojah.io/business-verification)


## Cleva judges: start here

### 24. ★ How exactly is Kairos a payment solution?

Kairos addresses a specific type of payment: crowdfunding. For us, that payment is complete when the money reaches the need it was given for. Kairos is designed to control that route from contributors to the school, hospital or supplier, keeping the money tied to the stated bill. We combine existing payment services with budget controls and individual donor receipts, so each person can see what their money paid for.

### 25. ★ What real payment problem are you solving?

Someone sends money toward a school or hospital bill, but a successful transfer to the organizer does not establish that the provider was paid. With several contributors, each person also needs a clear account of their own share. Kairos is designed to coordinate that flow and its evidence.

### 26. ★ What makes your approach different?

The same flow connects a published expense, controlled provider payout and each donor's personal share. We should demonstrate that relationship, rather than claim that nobody else has ever built escrow, crowdfunding or receipts.

### 27. ★ Why not pay the school or hospital directly?

Direct payment is useful. Kairos adds coordination when several people are funding the same bill: one remaining balance, published spending rules and a receipt for every contributor. The first pilot should test whether that coordination saves users effort and improves confidence.

### 28. ★ What have you actually built for this finale?

The deployed app runs intake, document uploads, cause pages, anonymous guest giving, balance and budget checks, donor-share accounting and notifications. Bank transfers, Remita settlement and NIN lookup are simulated. Independent verification, licensed custody and a Cleva or stablecoin connection are not built.

### 29. ★ How is this the future of payments?

Our proposed direction lets supporters in Nigeria and abroad fund the same institutional bill and receive proof of their own share. The current local accounting is the base for that vision. The cross-border funding and external settlement connections remain work to agree and build.

### 30. ★ Why start with school fees?

The first flow has a named student, institution, amount and bill reference. That gives us a focused payment use case to test before broadening the operating model. Live reference validation and institutional settlement still require approved access.

### 31. ★ What do you want from Cleva after the hackathon?

A discussion about whether the use case is eligible, what account and integration model could support it, and whether a controlled test is possible. We would then connect that approved funding flow to licensed custody, provider settlement and reconciliation. No partnership or access has been agreed.


## Cleva and Tether connection

### 32. ★ Where exactly could Cleva fit?

An approved connection could let an eligible supporter abroad fund a Nigerian bill. Kairos would link the settled net naira contribution to the cause, provider payment and donor receipt. Cleva access, transaction eligibility, account ownership and the custody arrangement still need agreement.

### 33. ★ Are you already using Cleva or USDT?

No. Our application answered No to stablecoins, and that is still accurate for the built prototype. The proposed international funding route is a future connection; the current demo does not show Cleva or USDT transactions.

### 34. ★ Would Cleva hold the escrow?

We have not established a Cleva escrow arrangement for Kairos. An ordinary account balance does not itself enforce cause-specific release rules. Licensed custody and the restriction to named expenses need an agreed operating structure.

### 35. ★ Which Cleva API are you integrating?

We have not confirmed developer access or an API contract. Before selecting an approach, we need the permitted flow, account ownership, references, confirmation events, reconciliation and failure rules. A public product feature alone does not establish the integration we need.

### 36. ★ Have you confirmed that Cleva permits donation platforms?

Not yet. We need explicit confirmation of how our proposed flow and account structure fit the applicable terms before any live collection. Hackathon participation does not settle that product-eligibility question.

Sources: [Applicable activity restrictions to clarify](https://www.getcleva.com/legal/global/prohibited-countries-and-activities)

### 37. Why use USDT if a donor can send dollars?

It could be a useful funding option for a permitted supporter who already uses it. We would validate demand, total cost and the available flow first. The bill, provider payment and donor's proof remain the reason to use Kairos.

### 38. Would a USDT deposit remain held as USDT in Cleva?

Cleva's published deposit policy describes approved stablecoins being converted to USD. We should not describe that as a Kairos USDT escrow balance. The proposed flow would need to record the actual conversions and settled contribution.

Sources: [Cleva stablecoin policy](https://www.getcleva.com/legal/global/stablecoin-policy)

### 39. Does being a finalist mean the integration is approved?

No. Selection confirms our place in the competition. A commercial integration, permitted transaction flow, developer access and custody arrangement each still need explicit agreement.


## Overseas funding and settlement

### 40. ★ How would an overseas contribution remain traceable?

The proposed design links the incoming payment identity, conversion, external charges and actual settled naira amount to one cause and contributor. The subsequent provider confirmation must link back to that same chain. This external reconciliation is not implemented yet.

### 41. ★ When would you credit an international contribution to the cause?

The live design should credit a confirmed settled contribution, not a screenshot or a donor's confirmation click. Pending funds need a separate state until the relevant provider confirms the outcome. The current gateway is simulated.

### 42. What happens if the exchange rate changes?

We would disclose the applicable quote and charges, then allocate the actual net naira amount received. If that leaves the bill short, the remaining balance must stay visible. No foreign-currency quote or conversion flow is currently implemented.

### 43. Who pays conversion and transfer costs?

The proposed experience should disclose external charges separately from Kairos upkeep before confirmation. We have not agreed partner pricing, so we cannot promise a particular total cost, exchange rate or saving.

### 44. Can you promise instant or cheaper cross-border payments?

No measured end-to-end result supports that claim yet. We would test confirmation time, conversion, provider payout, support effort and total cost through the agreed connection before making a comparison.

### 45. Could local and overseas donors fund the same bill?

That is the proposed direction. Each contribution would enter the cause record at its actual settled net naira value. Donor attribution would then use those credited amounts. The international collection and settlement path remains unbuilt.

### 46. What if the bill becomes fully funded while an overseas payment is pending?

The live design needs to reserve or recheck the remaining amount before accepting funds, and define how excess or late arrivals are returned. Current accounting checks the remaining net need, but it does not prove a complete cross-border overpayment/refund process.

### 47. What if Cleva cannot support this use case?

We would respect that decision and assess a suitable permitted funding arrangement. The local bill-payment concept can still be tested with approved partners. We would not route transactions through an unrelated personal account to bypass restrictions.


## Controls and donor proof

### 48. ★ What prevents the organizer paying themselves?

The prototype has no cash-withdrawal path and records payments against published provider budget lines. Independent checks of provider ownership and the live custody/payment controls are still needed before claiming that money cannot be redirected in production.

### 49. What stops a payout before the bill is fully funded?

For the school-fee reference flow, the payment button stays unavailable while the available balance is short of the bill. The payout endpoint also checks available funds and the remaining budget. Those accounting checks can be demonstrated now.

### 50. What if the Remita reference expires?

Our agreed proposed flow pauses payout and lets the AI ask the organizer for a replacement. It must match the same student, institution and bill before proceeding. An unresolved mismatch goes to human review. This replacement workflow is not yet built.

### 51. ★ What exactly does the donor's receipt prove today?

It links the donor's share to a recorded prototype payout, showing the amount, provider and invoice reference. It is not independent evidence of a real bank or institutional settlement. A live settled receipt needs the provider's confirmed outcome.

### 52. What prevents a double payment on retry?

A live payout needs a stable payment identity, atomic accounting updates and reconciliation against the provider's outcome. Those production protections are not complete in the prototype. A timeout cannot safely mean that the earlier payment failed.

### 53. How do guest donations fit the proof of payment?

Guest gifts are anonymous in the public cause records and have no personal account inbox. Signed-in donors can follow their own in-app receipts; email is optional. Guest funds still contribute to the cause's accounting.

### 54. How are private documents protected?

Draft files are owner-only. Published cause attachments are currently public through the app. A live operating model needs appropriate private evidence review, redaction and access controls; storage in authenticated Cloudinary assets alone does not make every published file private.


## Business, pilot and execution

### 55. ★ How does Kairos fund itself?

The intended primary support is donations and NGO grants, with tentative 2% upkeep capped at ₦5,000 per cause as a fallback. That support and the unit economics are unproven. The prototype currently applies the upkeep rule; it has no funding-dependent fee switch.

### 56. ★ Show us how the fee and bill amounts reconcile.

Okefe pays ₦150,000: ₦3,000 upkeep and ₦147,000 credited. Abigail pays ₦155,000: ₦2,000 upkeep and ₦153,000 credited because the cause-wide cap is reached. The ₦305,000 gross total becomes ₦5,000 upkeep and ₦300,000 toward the school bill. External partner charges are not priced into this example.

### 57. Why would Cleva want to work with Kairos?

A permitted pilot could test a concrete reason for overseas funding: a named school or hospital bill with evidence returned to contributors. We would measure completed payments, repeat use, cost and support effort. No transaction-volume forecast or commercial agreement has been established.

### 58. ★ What user validation do you have?

The supplied materials document the school-fee observation behind the idea. No completed interview study or live-payment pilot was provided for this pitch. We should use actual dated conversations and results when available, without turning demo accounts into adoption metrics.

### 59. What would a first pilot look like?

A small set of school-fee cases with an agreed institution, permitted payment/custody partners, traceable references and an exception/refund process. Test settlement and reconciliation before opening the flow more widely. This is a proposal, not a pilot already completed.

### 60. Are refunds and disputes ready?

A complete live process is not implemented. We need to define who handles disputed bills, unused funds, reversals and contribution refunds, and reconcile those actions to the payment partner's records.

### 61. ★ What is the first step after this pitch?

Confirm eligibility and integration access, agree the custody/payment responsibilities and test a complete funding-to-provider flow in an appropriate test environment. A controlled live pilot would follow the required approvals and operating arrangements.

