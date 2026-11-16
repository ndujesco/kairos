export const MAX_INTERVIEW_QUESTIONS = 5;
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
  "Hi, I’m the Kairos intake assistant. What happened, who needs help, and what would you like to raise money for?";
export type InterviewMessage = { from: "ai" | "me"; text: string };
const QUESTIONS = [
  INTAKE_OPENER,
  "Who is affected, and where and when is help needed? A name, place and date will help donors understand the need.",
  "What amount is needed, and which hospital, school or supplier should receive the payment directly?",
  "What does the budget cover? You can list each item, its cost and the provider who will be paid.",
  "Is there anything else donors should know? You can attach a bill, photo or letter now, or add supporting documents after publishing.",
];

// A bounded local fallback is shared with the browser, so network failures
// cannot leave the creator in an endless retry/question loop.
export function fallbackInterview(
  messages: InterviewMessage[],
  attachments: string[] = [],
  finish = false,
) {
  const answers = messages.filter((m) => m.from === "me").map((m) => m.text);
  if (!finish && answers.length < MAX_INTERVIEW_QUESTIONS)
    return {
      reply: QUESTIONS[answers.length],
      done: false,
      extracted: null,
      checks: null,
    };
  const text = answers.join("\n\n");
  return {
    reply:
      "I’ve put your cause together. Review the story and budget, fill in any missing details, and add documents whenever you’re ready.",
    done: true,
    extracted: {
      title: (answers[0] || "My cause").slice(0, 70),
      category: /school|tuition|fees|student/i.test(text)
        ? "Education"
        : "Community",
      summary: (answers[0] || "").slice(0, 200),
      story: text,
      budget: [] as { label: string; amount: number; vendorName: string }[],
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
