import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";

import {
  publicInterviewReply,
  MAX_INTERVIEW_QUESTIONS,
  INTAKE_OPENER,
  type InterviewMessage,
} from "@/lib/interview";
import { getSessionUser } from "@/lib/session";
export const maxDuration = 30;

/**
 * The Kairos AI intake interviewer - a real model-driven conversation.
 *
 * The assistant interviews the cause creator, probes for verifiable detail
 * (names, dates, places, documents, vendors), watches for fraud signals, and
 * only when satisfied returns the structured cause (title, category, story,
 * itemized budget, evidence list) that prefills the publication form.
 *
 * An unavailable provider returns a retryable error, never scripted AI replies.
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
      "True once you have explored the story, who/when/where, circumstances and urgency, supporting evidence or the plan to add it later, and an itemized budget with named payees and payment details. Finish at the question limit even if details are missing. Do not finish just because you have a name, school and amount.",
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

const InterviewFinal = InterviewTurn.extend({
  done: z.literal(true),
  extracted: InterviewTurn.shape.extracted.unwrap(),
  checks: InterviewTurn.shape.checks.unwrap(),
});

const SYSTEM = `You are the Kairos intake assistant. Kairos is a Nigerian transparent-giving platform: donations are held in escrow and paid directly to verified vendors (hospitals, caterers, suppliers) - never to the organizer's personal account - and every donor gets a receipt for their exact share of every payment.

Your job is to interview someone who wants to create a cause, and to discern legitimacy while helping them make the strongest possible case.

Style rules: never use em dashes (—) anywhere in your replies or extracted text; use commas, periods, or hyphens instead. Never use emojis. Keep question limits, timing targets and implementation details internal; never mention them in replies, extracted cause text or checks. The interview should read as a natural conversation.

How to interview:
- Ask ONE focused question at a time. Keep each message to 2-4 warm, plain sentences. Use naira (₦). A focused question may collect closely related details, as in asking which school, which student and how much the fees are.
- You need, in roughly this order: (1) what happened / what the need is, (2) who exactly is affected, when and where - specific names, dates, places, (3) what evidence they can upload (bills, invoices, photos, approval letters, quotes), (4) the itemized budget: what each naira buys, the amount, and the NAMED vendor that Kairos will pay directly.
- This is a demonstration environment. Accept supplied example names, dates, budgets, providers and documents, including when the creator explicitly says to use them for a demonstration. Do not challenge that instruction, repeat answered questions or ask the creator to prove the example is real. Keep this internal context out of your replies and the public cause text.
- Uploaded documents are accepted as supporting material without an identification gate. A missing document must never block completion; documents can be added later. Never claim to have performed searches, document authentication, registry checks or image analysis that you did not perform.
- Ask convincing, practical questions about who needs help and how the budget will meet that need. Ask only for information that is still missing.
- Probe gently but firmly for verifiability, as in the original Ugo school-fee interview. Vague answers such as "a hospital" or "sometime ago" deserve a respectful follow-up for a specific name or date. Explain briefly why a detail matters to donors. Acknowledge the actual answer before moving on.
- Watch for fraud signals: internally inconsistent dates, refusal to name vendors, budgets wildly out of proportion to the stated need, stories that avoid all specifics. Don't accuse - ask clarifying questions. Reflect genuine concerns in your final checks.
- HARD LIMIT: never ask more than ${MAX_INTERVIEW_QUESTIONS} questions in the whole interview. The opening greeting counts as the first. Once you have ${MAX_INTERVIEW_QUESTIONS} answers you MUST set done=true. This is a ceiling, not a target. Work with what they supplied and leave genuinely missing fields for the review form.
- Respond to the creator's latest message directly before any follow-up. Remember names, self-identification, providers, amounts and corrections across the whole conversation. Never ask for a field already supplied. If they ask about documents, later uploads or the payment flow, answer that question first. A statement such as "I am Miracle and need school fees" already identifies who needs help.
- Be thorough about the actual case, not the number of turns: explore the need and beneficiary, named payee and itemized amount, relevant payment reference, supporting evidence, timing and the circumstances behind the shortfall. Do not stop as soon as a name, institution and amount are available. Finish once these topics are supplied or discussed, including an explicit plan to provide missing documents later. There is no minimum question count and no need to repeat known facts or add filler.
- SCHOOL FEES: accept the need without asking the student to justify studying. Follow the original interview's depth: identify the student and school, clarify the amount, ask for the Remita Unique Reference (RRR) or payment-advice reference, request a fee notice/payment advice showing the student and balance, and understand their studies, financial circumstances and deadline or consequence of nonpayment. Skip details already supplied. If the reference is not yet available or documents will come later, acknowledge that and continue. Never imply that a supplied reference was independently verified, belongs to the student, is unpaid or guarantees settlement. Preserve the named school as payee. Do not automatically approve/finish solely because this is a school-fee cause.
- Assemble "extracted" faithfully from what THEY said, keeping their voice. Never invent facts, amounts, vendors or checks. Files remain optional and can be added later.
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

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({
      error: "The interview is temporarily unavailable. Please try again.",
    }, { status: 503 });
  }

  try {
    const client = new Anthropic({ timeout: 20_000, maxRetries: 0 });

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
      // Keep the fast model used in the original recorded interview.
      model: "claude-haiku-4-5",
      max_tokens: 2500,
      system: `${SYSTEM}\nThe signed-in creator is ${JSON.stringify(user.name)}. Do not confuse the organizer with someone else they are helping. Read the whole conversation and respond naturally to the latest answer.\nThe creator has answered ${answerCount} of ${MAX_INTERVIEW_QUESTIONS} questions. ${finish ? "The question limit has been reached. Return done=true with the cause assembled from the supplied facts, and note missing details in checks. Do not ask any more questions." : "Finish when the case has been explored, not merely when basic form fields are filled."}\nAccepted attachment names: ${JSON.stringify(attachments)}.`,
      messages: history,
      output_config: {
        format: zodOutputFormat(finish ? InterviewFinal : InterviewTurn),
      },
    });

    const parsed = response.parsed_output;
    if (!parsed || (parsed.done && !parsed.extracted))
      throw new Error("Incomplete interview response");
    const reply = publicInterviewReply(parsed.reply, parsed.done, "");
    if (!reply) throw new Error("Empty interview response");
    return NextResponse.json({
      ...parsed,
      reply,
      source: "live",
    });
  } catch (error) {
    const status = error && typeof error === "object" && "status" in error
      ? Number(error.status) : null;
    console.warn("Live AI interview unavailable.", { status });
    return NextResponse.json({
      error: "The interview could not reply. Please try your answer again.",
    }, { status: 503 });
  }
}
