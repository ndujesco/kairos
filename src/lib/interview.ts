export const MAX_INTERVIEW_QUESTIONS = 8;
// Do not rely on the model alone to keep its internal demo context private.
export function publicInterviewReply(
  reply: string,
  done: boolean,
  fallback: string,
) {
  const sentences = reply.match(/[^.!?]+[.!?]*/g) ?? [];
  const clean = sentences
    .filter(
      (sentence) =>
        !/\b(?:demo|demonstration|prototype|simulated|simulation)\b/i.test(
          sentence,
        ),
    )
    .join(" ")
    .trim();
  return (
    clean ||
    (done
      ? "I’ve assembled your cause for review. You can adjust the details and add supporting documents."
      : fallback)
  );
}
export const INTAKE_OPENER =
  "Hi, I’m the Kairos intake assistant. Let’s build a cause people can trust. First, in one or two sentences, what happened, and what do you need?";
export type InterviewMessage = { from: "ai" | "me"; text: string };
export function interviewAskedForDocument(messages: InterviewMessage[]) {
  return messages.some((m) => m.from === "ai" &&
    /\b(?:attach|upload|add|provide|share|available|have)\b/i.test(m.text) &&
    /\b(?:document|documents|fee notice|payment advice|bill|evidence|proof|letter)\b/i.test(m.text));
}
type InterviewContext = {
  name: string;
  need: string;
  category: string;
  provider: string;
  amount: number | null;
};

const money = (amount: number) =>
  "₦" + amount.toLocaleString("en-NG", { maximumFractionDigits: 2 });

function suppliedName(text: string) {
  const matches = text.matchAll(
    /(?:my name is|i am|i'm|i’m|student(?:'s)? name(?: is|:)?|use|(?:my|our)\s+(?:mother|father|brother|sister|friend|son|daughter|child))\s+([\p{L}][\p{L}'’ -]{0,75})/giu,
  );
  const stop = /^(?:a|an|the|one|and|who|with|from|at|in|for|need|needs|am|is|student|final|first|second|third|fourth|fifth|affected|raising|asking|trying|unable|looking|hoping|struggling|example|these|this|my|our|due|sick|ill|unwell|injured|hospitalized|hospitalised|unemployed|broke|short|late|not)$/i;
  for (const match of matches) {
    const name: string[] = [];
    for (const word of match[1].trim().split(/\s+/)) {
      if (stop.test(word)) break;
      name.push(word);
      if (name.length === 4) break;
    }
    if (name.length) return name.join(" ").trim();
  }
  return "";
}

function suppliedProvider(text: string) {
  // Explicitly named payees take precedence over abbreviations in older turns.
  const named = text.match(
    /(?:pay(?:able)?\s+(?:directly\s+)?to|(?:school|hospital|institution|supplier|provider|vendor)(?:'s)?(?: name)?\s*(?:is|:|named|called))\s+(?:the\s+)?([\p{L}][\p{L}\d &'’().-]{2,100})/iu,
  )?.[1];
  const institution = named ?? text.match(
    /\b((?:[\p{Lu}][\p{L}'’-]*\s+){0,5}(?:School|University|Hospital|College|Clinic|Pharmacy)(?:\s+of\s+(?:[\p{Lu}][\p{L}'’-]*\s*){1,4})?)/u,
  )?.[1];
  if (institution) {
    const clean = institution.split(/\s+(?:and|for|with|by|due|next|this|in|at|amount|tuition)\b/i)[0].replace(/[. -]+$/, "").trim();
    if (clean && !/^(?:school|hospital|university|institution|supplier|provider|vendor|the school|the hospital)$/i.test(clean)) {
      return /^(?:UNILAG|University of Lagos)$/i.test(clean)
        ? "University of Lagos"
        : clean;
    }
  }
  if (/\b(?:UNILAG|University of Lagos)\b/i.test(text)) return "University of Lagos";
  if (/\bLUTH\b/i.test(text)) return "Lagos University Teaching Hospital";
  return "";
}

function suppliedAmount(text: string, previousQuestion = ""): number | null {
  // Never interpret an RRR, NIN, date or account number as the requested amount.
  const candidates: { amount: number; priority: boolean }[] = [];
  const pattern = /(?:₦|\bNGN\s*|\bN(?=\s*\d))\s*(\d[\d,]*(?:\.\d+)?)\s*([km])?\b|(\d[\d,]*(?:\.\d+)?)\s*(k|m|naira)\b|\b(\d{1,3}(?:,\d{3})+)\b|\b(?:need(?: to pay)?|pay|owe|raise|total|amount|budget|balance|tuition|fees?(?: are| is| of)?|costs?)\s*(?:of|is|are|about|roughly|approximately|:)?\s*(\d[\d,]*(?:\.\d+)?)\s*([km])?\b|\b(\d[\d,]*(?:\.\d+)?)\s*(?:for\s+)?(?:the\s+)?(?:tuition|school\s*fees?|fees?|rent|treatment|surgery|bill)\b/gi;
  for (const match of text.matchAll(pattern)) {
    const raw = match[1] ?? match[3] ?? match[5] ?? match[6] ?? match[8];
    const suffix = (match[2] ?? match[4] ?? match[7] ?? "").toLowerCase();
    const prefix = text.slice(Math.max(0, match.index! - 28), match.index);
    const after = text.slice(match.index! + match[0].length);
    if (/\d[/-]\s*$/.test(prefix) || /^\s*[/-]\d/.test(after)) continue;
    if (/\b(?:rrr|remita|reference|nin|matric|account|phone)\s*[:#-]?\s*$/i.test(prefix)) continue;
    if (/\b(?:not|instead of|rather than)\s*$/i.test(prefix)) continue;
    if (raw.replace(/\D/g, "").length > 9) continue;
    let amount = Number(raw.replaceAll(",", ""));
    if (suffix === "k") amount *= 1000;
    if (suffix === "m") amount *= 1000000;
    if (!Number.isFinite(amount) || amount <= 0) continue;
    candidates.push({ amount, priority: /\b(?:total|need|owe|outstanding|balance|raise|amount)(?:\s+(?:is|are|of|about|roughly|approximately))?\s*$/i.test(prefix) || /^(?:need|owe|raise|total|amount|budget|balance)\b/i.test(match[0]) });
  }
  const contextualNumber = text.match(/^\s*(?:(?:just|only|the|it is|it's|it’s|about|roughly|approximately|actually)\s+)*(\d{1,9}(?:\.\d{1,2})?)\s*(?:(?:only|please|in total|total|needed)\s*)?[.!]?\s*$/i);
  if (!candidates.length && /\b(?:amount|how much|total)\b/i.test(previousQuestion) && contextualNumber) {
    const amount = Number(contextualNumber[1]);
    if (amount > 0) return amount;
  }
  const preferred = candidates.filter((c) => c.priority);
  const choices = preferred.length ? preferred : candidates;
  const amounts = [...new Set(choices.map((c) => c.amount))];
  return amounts.length === 1 ? amounts[0] : null;
}

export function interviewContext(
  messages: InterviewMessage[],
  profileName = "",
): InterviewContext {
  const answers = messages.filter((m) => m.from === "me").map((m) => m.text);
  const context: InterviewContext = { name: "", need: "", category: "Community", provider: "", amount: null };
  let previousQuestion = "";
  for (const message of messages) {
    if (message.from === "ai") { previousQuestion = message.text; continue; }
    const text = message.text;
    const name = suppliedName(text);
    if (name) context.name = name;
    else if (/\b(?:what.*name|name of the person)\b/i.test(previousQuestion) && /^[\p{L}'’ -]{2,60}$/u.test(text) && !/\b(?:unknown|later|skip|don't|not|sure|yes|no)\b/i.test(text)) context.name = text.trim();
    const topicStatement = !context.need || !/^(?:can|could|do|does|how|what|where|who|is|are|will|should)\b.*\?\s*$/i.test(text);
    if (topicStatement && /school\s*fees?|tuition|student|university|college|UNILAG/i.test(text)) {
      context.category = "Education";
      context.need = "school fees";
    } else if (topicStatement && /surgery|operation|treatment|medical|hospital|medicine/i.test(text)) {
      context.category = "Medical";
      context.need = "medical care";
    } else if (topicStatement && /food|shelter|rent|housing/i.test(text)) {
      context.category = "Food & Shelter";
      context.need = /rent|housing|shelter/i.test(text) ? "rent and shelter" : "food";
    }
    const provider = suppliedProvider(text) || (
      /\b(?:which school|which hospital|who should receive|which.*(?:supplier|organization))\b/i.test(previousQuestion) &&
      !/\b(?:don't|do not|not sure|unknown|later|skip)\b/i.test(text)
      && !/^(?:i|we|it|yes|no|here|attached|uploaded|this|that)\b/i.test(text)
        ? suppliedProvider(`provider is ${text}`) : ""
    );
    if (provider) context.provider = provider;
    const amount = suppliedAmount(text, previousQuestion);
    if (amount !== null) context.amount = amount;
  }
  const all = answers.join("\n");
  if (!context.name && /\b(?:I|me|my fees|my tuition|my treatment|my rent)\b/i.test(all) &&
      !/\b(?:my|our)\s+(?:mother|father|brother|sister|friend|son|daughter|child|family|community)\b/i.test(all)) {
    context.name = profileName;
  }
  return context;
}

// The original recorded interview explored these topics, rather than ending
// after collecting a name, school and amount. Topics already supplied or
// explicitly deferred do not need another question; there is no turn minimum.
export function interviewReadiness(
  messages: InterviewMessage[],
  attachments: string[] = [],
  profileName = "",
) {
  const context = interviewContext(messages, profileName);
  const answers = messages.filter((m) => m.from === "me").map((m) => m.text).join("\n");
  const answered = (topic: (text: string) => boolean) => messages.some((message, index) => {
    if (message.from !== "ai" || !topic(message.text)) return false;
    const reply = messages.slice(index + 1).find((m) => m.from === "me")?.text;
    // Answer the creator's own questions without marking an unrelated topic done.
    return Boolean(reply && (!/^(?:can|could|what|how|where|why|do|does|is|are|will|should)\b.*\?\s*$/i.test(reply) || /\b(?:later|not yet|don't have|do not have)\b/i.test(reply)));
  });
  const documents = attachments.length > 0 ||
    answered((text) => interviewAskedForDocument([{ from: "ai", text }])) ||
    /\b(?:attach(?:ed)?|upload(?:ed)?|documents?|fee notice|payment advice|bill|evidence|proof|letter)\b[^\n.!?]*\b(?:later|available|attached|uploaded)\b|\b(?:have|attached|uploaded|can provide)\b[^\n.!?]*\b(?:documents?|fee notice|payment advice|bill|evidence|proof|letter)\b/i.test(answers);
  const reference = context.category !== "Education" ||
    /\b(?:RRR|Remita(?:\s+(?:Unique\s+)?Reference)?|payment reference)\s*(?:is|:|#|-)?\s*\d[\d -]{7,}\b/i.test(answers) ||
    answered((text) => /\b(?:RRR|Remita|payment reference)\b/i.test(text));
  const timing = /\b(?:due|deadline|today|tomorrow|next week|this week|next month|this month|urgent|urgently|graduat\w*|exam\w*|registration closes)\b/i.test(answers) ||
    answered((text) => /\b(?:when|deadline|due|urgency|urgent|at risk|what happens)\b/i.test(text));
  const circumstances = /\b(?:orphan|indigent|lost|unemployed|income|salary|cannot afford|can't afford|struggling|shortfall|unable to pay|family|parents|sponsor)\b/i.test(answers) ||
    answered((text) => /\b(?:difficult|shortfall|circumstances|cover the bill|why.*(?:help|pay|fees|bill|need))\b/i.test(text));
  const basics = Boolean(context.need && context.name && context.provider && context.amount);
  return { context, documents, reference, timing, circumstances, ready: basics && documents && reference && timing && circumstances };
}

function answerCreatorQuestion(text: string, category: string, previousQuestion: string) {
  if ((/\b(?:doc(?:ument)?s?|bill|proof|evidence|payment advice|rrr|reference)\b/i.test(text) || interviewAskedForDocument([{ from: "ai", text: previousQuestion }])) &&
      /\?|\b(?:can|how|what|where|later|don't have|do not have|can't|cannot|no document|not yet|for now)\b|^no\b/i.test(text)) {
    if (/\b(?:later|don't have|do not have|can't|cannot|no document|not yet|for now)\b|^no\b/i.test(text)) {
      return "That’s okay. You can add supporting documents now or return to add them after publishing.";
    }
    return category === "Education"
      ? "You can attach a fee notice or payment advice with Add documents. A Remita reference can also be included in the details; you can add documents later if needed."
      : "Use Add documents to attach a bill, photo, letter or other supporting file. You can also add documents after publishing.";
  }
  if (/\b(?:who|where)\b.*\b(?:money|funds|payment|paid)\b|\b(?:withdraw|personal account)\b/i.test(text)) {
    return "The cause’s budget names the school, hospital or supplier to be paid directly. The organizer cannot withdraw the contributions as cash.";
  }
  if (/\b(?:demo|demonstration|example)\b/i.test(text)) {
    return "I’ll use the details you provide.";
  }
  return "";
}

// A bounded local fallback is shared with the browser, so network failures
// cannot leave the creator in an endless retry/question loop.
export function fallbackInterview(
  messages: InterviewMessage[],
  attachments: string[] = [],
  finish = false,
  profileName = "",
) {
  const answers = messages.filter((m) => m.from === "me").map((m) => m.text);
  const coverage = interviewReadiness(messages, attachments, profileName);
  const { context } = coverage;
  const latest = answers.at(-1) ?? "";
  const response = answerCreatorQuestion(latest, context.category, messages.filter((m) => m.from === "ai").at(-1)?.text ?? "");
  if (!finish && answers.length < MAX_INTERVIEW_QUESTIONS && !coverage.ready) {
    const missing: string[] = [];
    if (!context.need) missing.push("need");
    if (!context.name) missing.push("name");
    if (!context.provider) missing.push("provider");
    if (context.amount === null) missing.push("amount");
    let question: string;
    if (missing.includes("need")) {
      question = "What do you need the money to pay for?";
    } else if (missing.includes("name")) {
      question = "What is the name of the person who needs this help?";
    } else if (missing.includes("provider") && missing.includes("amount")) {
      question = context.category === "Education"
        ? "Which school should receive the payment, and how much are the fees?"
        : "Who should receive the payment directly, and what amount is needed?";
    } else if (missing.includes("provider")) {
      question = context.category === "Education"
        ? "Which school should receive the fee payment?"
        : "Which hospital, supplier or organization should receive the payment directly?";
    } else if (missing.includes("amount")) {
      question = context.provider
        ? `What is the total amount needed for ${context.provider}?`
        : "What is the total amount needed in naira?";
    } else if (!coverage.reference) {
      question = `For the ${money(context.amount!)} fee payment to ${context.provider}, what is your Remita Unique Reference (RRR), or is it still being generated?`;
    } else if (!coverage.documents) {
      question = context.category === "Education"
        ? `What supporting document can you upload showing your name and the ${money(context.amount!)} fee balance at ${context.provider}, such as a fee notice or payment advice? Use Add documents, or let me know if you will add it later.`
        : `What supporting document can you upload for this ${context.need}, such as a bill, estimate, letter or photo? Use Add documents, or let me know if you will add it later.`;
    } else if (!coverage.timing) {
      question = context.category === "Education"
        ? /\b(?:studying|study|course|programme|department)\b/i.test(answers.join("\n"))
          ? "When are the fees due, and what would missing that payment mean for your studies?"
          : "What are you studying, when are the fees due, and what would missing that payment mean for your studies?"
        : "When is this payment needed, and what happens if it is delayed?";
    } else {
      question = context.category === "Education"
        ? "Can you tell me a little about your studies and what has made it difficult to cover these fees?"
        : "What has made it difficult to cover this bill, and how will this help change the situation?";
    }
    return {
      reply: [response, question].filter(Boolean).join(" "),
      done: false,
      extracted: null,
      checks: null,
    };
  }
  const details = answers.map((text) => publicInterviewReply(text, false, ""))
    .filter((text) => text && !/^(?:can|how|what|where|who|is it|do i)\b.*\?$/i.test(text));
  const title = context.need
    ? `Help ${context.name || "with"} ${context.category === "Education" ? "pay school fees" : `with ${context.need}`}`.replace("with with", "with")
    : "Help with this cause";
  const summary = context.amount && context.provider
    ? `${context.name || "The applicant"} needs ${money(context.amount)} for ${context.need || "the stated need"}, payable to ${context.provider}.`
    : details[0] || "Review the details and budget for this cause.";
  return {
    reply: [response, context.amount && context.provider
      ? `I’ve put together the ${money(context.amount)} ${context.need || "cause"} budget for ${context.provider}. You can review it and add supporting documents whenever you’re ready.`
      : "I’ve put your cause together for review. Fill in any missing details and add documents whenever you’re ready."].filter(Boolean).join(" "),
    done: true,
    extracted: {
      title: title.slice(0, 70),
      category: context.category,
      summary: summary.slice(0, 200),
      story: details.join("\n\n") || summary,
      budget: context.amount && context.provider
        ? [{ label: context.category === "Education" ? "School fees" : context.need || "Stated expense", amount: context.amount, vendorName: context.provider }]
        : [],
      evidence: attachments,
    },
    checks: [
      {
        label: "Story collected",
        result: "Creator’s answers are ready for review.",
      },
      {
        label: "Supporting documents",
        result: attachments.length
          ? `${attachments.length} attachment(s) received.`
          : "Documents can be added now or after publishing.",
      },
      {
        label: "Budget review",
        result: "Check amounts and provider names before publishing.",
      },
    ],
  };
}
