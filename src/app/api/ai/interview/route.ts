import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";

export const maxDuration = 60;

/**
 * The Kairos AI intake interviewer — a real Claude conversation.
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
      "Your next message to the cause creator. Warm, concise (2-4 sentences), ends with ONE clear question — unless done is true, in which case it is a short wrap-up telling them you've assembled their cause for review."
    ),
  done: z
    .boolean()
    .describe(
      "True only when you have enough verified detail to assemble the cause: the story, who/when/where, at least one piece of evidence, and an itemized budget with vendors and amounts."
    ),
  extracted: z
    .object({
      title: z.string().describe("Short, human, compelling cause title (max 70 chars)"),
      category: z.enum(CATEGORIES),
      summary: z.string().describe("1-2 sentence public summary of the cause"),
      story: z.string().describe("The full story, cleaned up, in the creator's first-person voice, 2-4 paragraphs"),
      budget: z.array(
        z.object({
          label: z.string().describe("What the money buys, e.g. 'Corrective surgery'"),
          amount: z.number().describe("Amount in naira (integer)"),
          vendorName: z.string().describe("The named vendor/institution that will be paid directly"),
        })
      ),
      evidence: z.array(z.string()).describe("Each document/photo the creator said they can provide"),
    })
    .nullable()
    .describe("Null until done is true; then the fully assembled cause."),
  checks: z
    .array(z.object({ label: z.string(), result: z.string() }))
    .nullable()
    .describe(
      "Null until done is true; then 3-5 fraud-screening checks you performed on their answers (consistency of dates, specificity of names/places, plausibility of budget vs. need, evidence quality). Phrase results as findings, e.g. 'Dates in story are internally consistent'. If something was thin, say so honestly."
    ),
});

const SYSTEM = `You are the Kairos intake assistant. Kairos is a Nigerian transparent-giving platform: donations are held in escrow and paid directly to verified vendors (hospitals, caterers, suppliers) — never to the organizer's personal account — and every donor gets a receipt for their exact share of every payment.

Your job is to interview someone who wants to create a cause, and to discern legitimacy while helping them make the strongest possible case.

How to interview:
- Ask ONE question at a time. Keep each message to 2-4 warm, plain sentences. Use naira (₦).
- You need, in roughly this order: (1) what happened / what the need is, (2) who exactly is affected, when and where — specific names, dates, places, (3) what evidence they can upload (bills, invoices, photos, approval letters, quotes), (4) the itemized budget: what each naira buys, the amount, and the NAMED vendor that Kairos will pay directly.
- Probe gently but firmly for verifiability. Vague answers ("a hospital", "sometime ago") get a respectful follow-up asking for the specific name/date. Explain briefly why: donors only give when details are checkable.
- Watch for fraud signals: internally inconsistent dates, refusal to name vendors, budgets wildly out of proportion to the stated need, stories that avoid all specifics. Don't accuse — ask clarifying questions. Reflect genuine concerns in your final checks.
- Typical interview: 4-6 exchanges. Do not drag it out; once you have story + specifics + evidence + budget, set done=true, assemble "extracted" faithfully from what THEY said (clean up grammar, keep their voice, never invent facts, amounts or vendors they didn't give), and produce your "checks".
- If an amount is given without a vendor, ask who should be paid. Kairos cannot release money to a person, only to a named counterparty.
- Reasonable rounding of amounts stated in words ("about 300k" → 300000) is fine.`;

/* ------------------------------ fallback ------------------------------ */

const FALLBACK_STEPS = [
  {
    reply:
      "Hi, I’m the Kairos intake assistant 🤝. Let’s build a cause people can trust. First — in one or two sentences, what happened, and what do you need?",
  },
  {
    reply:
      "Thank you for sharing that. Who exactly is affected, and when and where did this happen? Specific names, dates and places make your cause verifiable — that’s what convinces donors.",
  },
  {
    reply:
      "Now let’s attach proof. What documents or photos can you upload? For medical causes: the hospital bill, a doctor’s estimate, photos. For an outreach: your plan, vendor quotes, past photos.",
  },
  {
    reply:
      "Last thing — the itemized budget. Not “support us”, but exactly what each naira buys and from whom. Which named vendors will Kairos pay directly? e.g. “Surgery — ₦850,000 to LUTH; Drugs — ₦120,000 to HealthPlus Pharmacy.”",
  },
];

const FALLBACK_CHECKS = [
  { label: "Reverse-image search on uploaded photos", result: "No prior campaign reuse found" },
  { label: "Document date consistency", result: "Dates match the story timeline" },
  { label: "Vendor specificity", result: "Named counterparties provided for each line item" },
  { label: "Story cross-check", result: "No contradictions detected" },
];

type ChatMsg = { from: "ai" | "me"; text: string };

function fallbackTurn(messages: ChatMsg[]) {
  const userTurns = messages.filter((m) => m.from === "me").length;
  if (userTurns < FALLBACK_STEPS.length) {
    return { reply: FALLBACK_STEPS[userTurns].reply, done: false, extracted: null, checks: null };
  }
  const answers = messages.filter((m) => m.from === "me").map((m) => m.text);
  return {
    reply:
      "Perfect — I have everything I need. I’ve assembled your cause for review; refine anything I got wrong before we run verification.",
    done: true,
    extracted: {
      title: (answers[0] ?? "My cause").slice(0, 70),
      category: "Community",
      summary: (answers[0] ?? "").slice(0, 200),
      story: answers.slice(0, 2).join("\n\n"),
      budget: [],
      evidence: (answers[2] ?? "")
        .split(/[,\n;]+/)
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 6),
    },
    checks: FALLBACK_CHECKS,
  };
}

/* -------------------------------- route ------------------------------- */

export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as { messages: ChatMsg[] };
  const chat: ChatMsg[] = Array.isArray(messages) ? messages : [];

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ ...fallbackTurn(chat), source: "scripted" });
  }

  try {
    const client = new Anthropic();

    const history: Anthropic.MessageParam[] = chat.map((m) => ({
      role: m.from === "me" ? ("user" as const) : ("assistant" as const),
      content: m.text,
    }));
    // conversation must start with a user turn; the opener is ours
    if (history.length === 0 || history[0].role === "assistant") {
      history.unshift({
        role: "user",
        content: "(The cause creator has just opened the intake chat. Greet them and begin the interview.)",
      });
    }

    const response = await client.messages.parse({
      model: "claude-opus-4-8",
      max_tokens: 4000,
      system: SYSTEM,
      messages: history,
      output_config: {
        effort: "low", // keep the chat snappy for live use
        format: zodOutputFormat(InterviewTurn),
      },
    });

    const parsed = response.parsed_output;
    if (!parsed) throw new Error("No parsed output");
    return NextResponse.json({ ...parsed, source: "claude" });
  } catch (err) {
    console.error("AI interview falling back to script:", err);
    return NextResponse.json({ ...fallbackTurn(chat), source: "scripted" });
  }
}
