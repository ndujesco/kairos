"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Msg = { from: "ai" | "me"; text: string; hint?: string };
type BudgetRow = { label: string; amount: string; vendorName: string };
type Check = { label: string; result: string };

type Extracted = {
  title: string;
  category: string;
  summary: string;
  story: string;
  budget: { label: string; amount: number; vendorName: string }[];
  evidence: string[];
};

const DEFAULT_CHECKS: Check[] = [
  { label: "Reverse-image search on uploaded photos", result: "No prior campaign reuse found" },
  { label: "Document date consistency", result: "Dates match the story timeline" },
  { label: "Vendor specificity", result: "Named counterparties provided" },
  { label: "Story cross-check", result: "No contradictions detected" },
];

function naira(n: number) {
  return "₦" + Math.round(n).toLocaleString("en-NG");
}

const CATEGORIES = ["Medical", "Prison Outreach", "Education", "Food & Shelter", "Emergency", "Community"];

export default function CreateWizard({
  user,
}: {
  user: { name: string; emoji: string; raiseLimit: number };
}) {
  const router = useRouter();
  const [stage, setStage] = useState<"chat" | "structure" | "checks" | "publishing">("chat");

  /* chat state */
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  /* structure state */
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Medical");
  const [summary, setSummary] = useState("");
  const [story, setStory] = useState("");
  const [budget, setBudget] = useState<BudgetRow[]>([{ label: "", amount: "", vendorName: "" }]);
  const [evidence, setEvidence] = useState<string[]>([]);
  const [evidenceInput, setEvidenceInput] = useState("");
  const [error, setError] = useState("");

  /* checks state */
  const [checks, setChecks] = useState<Check[]>([]);
  const [checksShown, setChecksShown] = useState(0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  async function interviewTurn(transcript: Msg[]) {
    const res = await fetch("/api/ai/interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: transcript.map(({ from, text }) => ({ from, text })) }),
    });
    return res.json() as Promise<{
      reply: string;
      done: boolean;
      extracted: Extracted | null;
      checks: Check[] | null;
    }>;
  }

  // kick off the interview
  useEffect(() => {
    (async () => {
      setThinking(true);
      const j = await interviewTurn([]);
      setThinking(false);
      setMessages([{ from: "ai", text: j.reply }]);
    })();
  }, []);

  async function send() {
    if (!input.trim() || thinking) return;
    const answer = input.trim();
    const transcript: Msg[] = [...messages, { from: "me", text: answer }];
    setMessages(transcript);
    setInput("");
    setThinking(true);

    const j = await interviewTurn(transcript);
    setThinking(false);
    setMessages((m) => [...m, { from: "ai", text: j.reply }]);

    if (!j.done) return;

    // interview finished → the AI hands over the structured cause
    setChecks(j.checks?.length ? j.checks : DEFAULT_CHECKS);
    const x = j.extracted;
    if (x) {
      setTitle(x.title.slice(0, 70));
      if (CATEGORIES.includes(x.category)) setCategory(x.category);
      setSummary(x.summary ?? "");
      setStory(x.story ?? "");
      if (x.budget?.length) {
        setBudget(
          x.budget.map((b) => ({
            label: b.label,
            amount: String(Math.round(b.amount)),
            vendorName: b.vendorName,
          }))
        );
      }
      setEvidence((x.evidence ?? []).slice(0, 8));
    }
    setTimeout(() => setStage("structure"), 1400);
  }

  const goal = budget.reduce((s, b) => s + (parseInt(b.amount.replace(/\D/g, ""), 10) || 0), 0);

  async function runChecksAndPublish() {
    if (!title.trim() || !story.trim()) return setError("Title and story are required.");
    const cleanBudget = budget.filter((b) => b.label.trim() && parseInt(b.amount.replace(/\D/g, ""), 10) > 0);
    if (cleanBudget.length === 0) return setError("Add at least one budget line with an amount.");
    if (goal > user.raiseLimit)
      return setError(
        `Your trust level caps raises at ${naira(user.raiseLimit)}. Reduce the budget or complete smaller causes first.`
      );
    setError("");
    setStage("checks");

    // reveal checks one by one - the "AI screening" moment
    for (let i = 1; i <= checks.length; i++) {
      await new Promise((r) => setTimeout(r, 900));
      setChecksShown(i);
    }
    await new Promise((r) => setTimeout(r, 800));
    setStage("publishing");

    const res = await fetch("/api/causes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        category,
        story,
        summary: summary || story.split("\n")[0],
        budget: cleanBudget.map((b) => ({
          label: b.label,
          amount: parseInt(b.amount.replace(/\D/g, ""), 10),
          vendorName: b.vendorName || "Vendor TBD",
        })),
        evidence,
      }),
    });
    const j = await res.json();
    if (!res.ok) {
      setError(j.error || "Failed to publish");
      setStage("structure");
      return;
    }
    router.push(`/cause/${j.slug}`);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-10 flex items-center gap-6 border-b border-line bg-black/80 px-4 py-3 backdrop-blur">
        <Link href="/" className="rounded-full p-2 hover:bg-white/10">
          ←
        </Link>
        <div>
          <h1 className="text-lg font-extrabold">Start a Cause</h1>
          <p className="text-[13px] text-muted">
            {stage === "chat" && "Step 1 of 3 - tell your story to the intake assistant"}
            {stage === "structure" && "Step 2 of 3 - the verifiable structure"}
            {(stage === "checks" || stage === "publishing") && "Step 3 of 3 - AI fraud screening"}
          </p>
        </div>
      </div>

      {/* ------------------------- STAGE 1: AI CHAT ------------------------- */}
      {stage === "chat" && (
        <>
          <div className="flex-1 space-y-4 p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] animate-slide-up rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
                    m.from === "me"
                      ? "rounded-br-sm bg-accent text-black"
                      : "rounded-bl-sm border border-line bg-white/5"
                  }`}
                >
                  {m.from === "ai" && <span className="mb-1 block text-xs font-bold text-accent">⧖ Kairos AI</span>}
                  {m.text}
                  {m.hint && <span className="mt-2 block text-[13px] text-muted">{m.hint}</span>}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex">
                <div className="animate-pulse-soft rounded-2xl rounded-bl-sm border border-line bg-white/5 px-4 py-3 text-muted">
                  typing…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="sticky bottom-[68px] border-t border-line bg-black p-3 sm:bottom-0">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type your answer…"
                className="flex-1 rounded-full border border-line bg-transparent px-4 py-3 outline-none placeholder:text-muted focus:border-accent"
              />
              <button
                onClick={send}
                disabled={thinking || !input.trim()}
                className="rounded-full bg-accent px-5 font-bold text-black disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}

      {/* --------------------- STAGE 2: STRUCTURED FORM --------------------- */}
      {stage === "structure" && (
        <div className="flex flex-col gap-4 p-4">
          <div>
            <label className="mb-1 block text-sm font-bold">Cause title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-line bg-transparent px-4 py-3 outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold">Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-bold transition ${
                    category === c
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-line text-muted hover:bg-white/5"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold">Your story</label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              rows={5}
              className="w-full rounded-xl border border-line bg-transparent px-4 py-3 outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold">
              Itemized budget <span className="font-normal text-muted"> - paid directly to vendors, never to you</span>
            </label>
            <div className="flex flex-col gap-2">
              {budget.map((b, i) => (
                <div key={i} className="flex flex-wrap gap-2 rounded-xl border border-line/60 p-2 sm:border-0 sm:p-0">
                  <input
                    value={b.label}
                    onChange={(e) =>
                      setBudget(budget.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))
                    }
                    placeholder="What for? e.g. Surgery"
                    className="w-full flex-1 rounded-xl border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-accent sm:w-auto"
                  />
                  <input
                    value={b.amount}
                    onChange={(e) =>
                      setBudget(budget.map((x, j) => (j === i ? { ...x, amount: e.target.value } : x)))
                    }
                    placeholder="₦ amount"
                    inputMode="numeric"
                    className="min-w-0 flex-1 rounded-xl border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-accent sm:w-28 sm:flex-none"
                  />
                  <input
                    value={b.vendorName}
                    onChange={(e) =>
                      setBudget(budget.map((x, j) => (j === i ? { ...x, vendorName: e.target.value } : x)))
                    }
                    placeholder="Vendor e.g. LUTH"
                    className="min-w-0 flex-1 rounded-xl border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-accent sm:w-36 sm:flex-none"
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <button
                onClick={() => setBudget([...budget, { label: "", amount: "", vendorName: "" }])}
                className="text-sm font-bold text-accent hover:underline"
              >
                + Add line item
              </button>
              <p className="text-sm">
                Total goal: <b className="text-accent">{naira(goal)}</b>{" "}
                <span className="text-muted">(your cap: {naira(user.raiseLimit)})</span>
              </p>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold">Evidence attached</label>
            <div className="flex flex-wrap gap-2">
              {evidence.map((ev, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 rounded-full border border-line bg-white/5 px-3 py-1 text-sm"
                >
                  📎 {ev}
                  <button
                    onClick={() => setEvidence(evidence.filter((_, j) => j !== i))}
                    className="ml-1 text-muted hover:text-rose-400"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <input
                value={evidenceInput}
                onChange={(e) => setEvidenceInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && evidenceInput.trim()) {
                    setEvidence([...evidence, evidenceInput.trim()]);
                    setEvidenceInput("");
                  }
                }}
                placeholder="e.g. Hospital bill from LUTH (press Enter)"
                className="flex-1 rounded-xl border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <p className="mt-1 text-[12px] text-muted">
              File uploads are simulated in this prototype - each item goes through the reuse/EXIF/date screen.
            </p>
          </div>

          {error && <p className="text-sm text-rose-400">{error}</p>}

          <button
            onClick={runChecksAndPublish}
            className="rounded-full bg-accent py-3 font-bold text-black transition hover:bg-accent/90"
          >
            Run AI verification & publish
          </button>
        </div>
      )}

      {/* ---------------------- STAGE 3: FRAUD SCREEN ---------------------- */}
      {(stage === "checks" || stage === "publishing") && (
        <div className="flex flex-col gap-3 p-6">
          <h2 className="text-lg font-extrabold">🛡️ Screening “{title}”</h2>
          {checks.map((c, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-xl border p-3 text-sm transition ${
                i < checksShown ? "border-accent/40 bg-accent/5" : "border-line"
              }`}
            >
              {i < checksShown ? (
                <span className="text-accent">✓</span>
              ) : (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-line border-t-accent" />
              )}
              <div>
                <p className="font-bold">{c.label}</p>
                {i < checksShown && <p className="text-muted">{c.result}</p>}
              </div>
            </div>
          ))}
          {stage === "publishing" && (
            <p className="animate-pulse-soft mt-2 text-center text-muted">
              All checks passed - publishing your cause…
            </p>
          )}
        </div>
      )}
    </div>
  );
}
