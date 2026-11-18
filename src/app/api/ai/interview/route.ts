import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";

import {
  fallbackInterview,
  publicInterviewReply,
  MAX_INTERVIEW_QUESTIONS,
  MIN_INTERVIEW_QUESTIONS,
  INTAKE_OPENER,
  interviewContext,
  interviewAskedForDocument,
  type InterviewMessage,
} from "@/lib/interview";
import { getSessionUser } from "@/lib/session";
export const maxDuration = 20;
let providerUnavailableUntil = 0;

/**
 * The Kairos AI intake interviewer - a real model-driven conversation.
 *
 * The assistant interviews the cause creator, probes for verifiable detail
 * (names, dates, places, documents, vendors), watches for fraud signals, and
 * only when satisfied returns the structured cause (title, category, story,
 * itemized budget, evidence list) that prefills the publication form.
 *
 * If no API key is configured (or the call fails), a scripted fallback keeps
 * the demo alive offline.
 */

const CATEGORIES = [
  "Medical",
  "Prison Outreach",
  "Education",
  "Food & Shelter",
  "Emergency",
  "Community",
] as const;

const InterviewTurn = z.object({
  reply: z
    .string()
    .describe(
      "Your next message to the cause creator. Warm, concise (2-4 sentences), ends with ONE clear question - unless done is true, in which case it is a short wrap-up telling them you've assembled their cause for review.",
    ),
  done: z
    .boolean()
    .describe(
      "True as soon as the creator has provided a usable story and budget, or the question limit has been reached. Documents are optional and can be added later.",
    ),
  extracted: z
    .object({
      title: z
        .string()
        .describe("Short, human, compelling cause title (max 70 chars)"),
      category: z.enum(CATEGORIES),
      summary: z.string().describe("1-2 sentence public summary of the cause"),
      story: z
        .string()
        .describe(
          "The full story, cleaned up, in the creator's first-person voice, 2-4 paragraphs",
        ),
      budget: z.array(
        z.object({
          label: z
            .string()
            .describe("What the money buys, e.g. 'Corrective surgery'"),
          amount: z.number().describe("Amount in naira (integer)"),
          vendorName: z
            .string()
            .describe(
              "The named vendor/institution that will be paid directly",
            ),
        }),
      ),
      evidence: z
        .array(z.string())
        .describe("Each document/photo the creator said they can provide"),
    })
    .nullable()
    .describe("Null until done is true; then the fully assembled cause."),
  checks: z
    .array(z.object({ label: z.string(), result: z.string() }))
    .nullable()
    .describe(
      "Null until done is true; then 3-5 fraud-screening checks you performed on their answers (consistency of dates, specificity of names/places, plausibility of budget vs. need, evidence quality). Phrase results as findings, e.g. 'Dates in story are internally consistent'. If something was thin, say so honestly.",
    ),
});

const SYSTEM = `You are the Kairos intake assistant. Kairos is a Nigerian transparent-giving platform: donations are held in escrow and paid directly to verified vendors (hospitals, caterers, suppliers) - never to the organizer's personal account - and every donor gets a receipt for their exact share of every payment.

Your job is to interview someone who wants to create a cause, and to discern legitimacy while helping them make the strongest possible case.

Style rules: never use em dashes (—) anywhere in your replies or extracted text; use commas, periods, or hyphens instead. Never use emojis. Keep question limits, timing targets and implementation details internal; never mention them in replies, extracted cause text or checks. The interview should read as a natural conversation.

How to interview:
- Ask ONE question at a time. Keep each message to 1-2 warm, plain sentences. Use naira (₦).
- You need, in roughly this order: (1) what happened / what the need is, (2) who exactly is affected, when and where - specific names, dates, places, (3) what evidence they can upload (bills, invoices, photos, approval letters, quotes), (4) the itemized budget: what each naira buys, the amount, and the NAMED vendor that Kairos will pay directly.
- This is a demonstration environment. Accept supplied example names, dates, budgets, providers and documents, including when the creator explicitly says to use them for a demonstration. Do not challenge that instruction, repeat answered questions or ask the creator to prove the example is real. Keep this internal context out of your replies and the public cause text.
- Uploaded documents are accepted as supporting material without an identification gate. A missing document must never block completion; documents can be added later. Never claim to have performed searches, document authentication, registry checks or image analysis that you did not perform.
- Ask convincing, practical questions about who needs help and how the budget will meet that need. Ask only for information that is still missing.
- Be scrupulous and specific: ask for supporting evidence early, within the first three questions. Ask how it connects the beneficiary, provider, amount and payment reference. Clarify the deadline, what the bill covers and the financial shortfall. If details contradict each other, ask a focused follow-up rather than overlooking the discrepancy. Accept supplied examples and later uploads, but never claim that a file or reference was authenticated.
- Watch for fraud signals: internally inconsistent dates, refusal to name vendors, budgets wildly out of proportion to the stated need, stories that avoid all specifics. Don't accuse - ask clarifying questions. Reflect genuine concerns in your final checks.
- Ask at least ${MIN_INTERVIEW_QUESTIONS} and at most ${MAX_INTERVIEW_QUESTIONS} questions, counting the opener. Never finish before ${MIN_INTERVIEW_QUESTIONS} creator answers. Ask explicitly for a supporting document at least once; if already uploaded, acknowledge it and ask whether they want to add another. A missing file is not a reason to refuse. At ${MAX_INTERVIEW_QUESTIONS} answers finish and leave genuinely missing fields for review.
- Respond to the creator's latest message directly before any follow-up. Remember names, self-identification, providers, amounts and corrections across the whole conversation. Never ask for a field already supplied. If they ask about documents, later uploads or the payment flow, answer that question first. A statement such as "I am Miracle and need school fees" already identifies who needs help.
- After the basic facts, ask useful follow-ups about the deadline, payment advice, financial shortfall or what the bill covers. Use details already given, never repeat answered fields. After ${MIN_INTERVIEW_QUESTIONS} answers and a document request, assemble the cause when ready; stop by ${MAX_INTERVIEW_QUESTIONS}. Keep their voice and never invent facts, amounts or vendors.
- SCHOOL FEES: accept school-fee needs without asking the student to justify studying. Capture the institution, student, amount and supplied Remita reference. Request the fee notice/payment advice and ask useful context-specific follow-ups until the minimum is met. Accept supplied details without claiming independent verification. Files can be added later.
- If an amount is given without a vendor, ask who should be paid. Kairos cannot release money to a person, only to a named counterparty.
- Reasonable rounding of amounts stated in words ("about 300k" → 300000) is fine.`;

/* -------------------------------- route ------------------------------- */

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user)
    return NextResponse.json(
      { error: "Sign in to create a cause." },
      { status: 401 },
    );
  const { messages, attachments: suppliedFiles } = await req.json();
  const chat: InterviewMessage[] = Array.isArray(messages)
    ? messages
        .filter(
          (m): m is InterviewMessage =>
            (m?.from === "me" || m?.from === "ai") &&
            typeof m.text === "string",
        )
        .slice(-20)
        .map((m) => ({ ...m, text: m.text.slice(0, 6000) }))
    : [];
  const attachments: string[] = Array.isArray(suppliedFiles)
    ? suppliedFiles
        .filter((s): s is string => typeof s === "string")
        .slice(0, 10)
        .map((s) => s.slice(0, 160))
    : [];
  const answerCount = chat.filter((m) => m.from === "me").length;
  const finish = answerCount >= MAX_INTERVIEW_QUESTIONS;
  const backup = fallbackInterview(chat, attachments, finish, user.name);
  const documentAsked = interviewAskedForDocument(chat);

  // the opener never needs the AI - serve it instantly so the chat feels alive
  if (chat.filter((m) => m.from === "me").length === 0) {
    return NextResponse.json({
      reply: INTAKE_OPENER,
      done: false,
      extracted: null,
      checks: null,
      source: "instant",
    });
  }

  if (finish || (!documentAsked && answerCount >= 2) || !process.env.ANTHROPIC_API_KEY || Date.now() < providerUnavailableUntil) {
    return NextResponse.json({
      ...backup,
      source: finish ? "bounded" : "scripted",
    });
  }

  try {
    const client = new Anthropic({ timeout: 10_000, maxRetries: 0 });

    const history: Anthropic.MessageParam[] = chat.map((m) => ({
      role: m.from === "me" ? ("user" as const) : ("assistant" as const),
      content: m.text,
    }));
    // conversation must start with a user turn; the opener is ours
    if (history.length === 0 || history[0].role === "assistant") {
      history.unshift({
        role: "user",
        content:
          "(The cause creator has just opened the intake chat. Greet them and begin the interview.)",
      });
    }

    const response = await client.messages.parse({
      // small fast model - demo needs snappy replies over depth
      model: "claude-haiku-4-5",
      max_tokens: 1400,
      system: `${SYSTEM}\nThe signed-in creator is ${JSON.stringify(user.name)}. Do not confuse the organizer with someone else they are helping.\nConversation facts (hints only; the creator's words and latest corrections take precedence): ${JSON.stringify(interviewContext(chat, user.name))}. Do not ask them to repeat known details.\nThe creator has answered ${answerCount} questions. The minimum is ${MIN_INTERVIEW_QUESTIONS}, maximum ${MAX_INTERVIEW_QUESTIONS}. Supporting document requested: ${documentAsked}.\nAccepted attachment names: ${JSON.stringify(attachments)}.`,
      messages: history,
      output_config: {
        format: zodOutputFormat(InterviewTurn),
      },
    });

    const parsed = response.parsed_output;
    if (!parsed) throw new Error("No parsed output");
    if (parsed.done && (answerCount < MIN_INTERVIEW_QUESTIONS || !documentAsked))
      return NextResponse.json({ ...backup, source: "bounded" });
    if ((finish && !parsed.done) || (parsed.done && !parsed.extracted))
      return NextResponse.json({
        ...fallbackInterview(chat, attachments, true, user.name),
        source: "bounded",
      });
    return NextResponse.json({
      ...parsed,
      reply: publicInterviewReply(
        parsed.reply,
        parsed.done,
        backup.reply,
      ),
      source: "live",
    });
  } catch (error) {
    // Avoid retrying a known unavailable provider on every answer. A top-up or
    // temporary failure is checked again after one minute; no secrets are logged.
    if (error && typeof error === "object" && "status" in error) {
      const status = Number(error.status);
      const message = "message" in error ? String(error.message) : "";
      if ([401, 403, 429].includes(status) || /credit balance.*too low/i.test(message))
        providerUnavailableUntil = Date.now() + 60_000;
    }
    console.warn("AI interview used the context-aware local fallback.");
    return NextResponse.json({
      ...backup,
      source: "scripted",
    });
  }
}
