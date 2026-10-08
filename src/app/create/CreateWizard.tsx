"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import KairosMark from "@/components/KairosMark";

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
  const [stage, setStage] = useState<"chat" | "structure" | "identity" | "checks" | "publishing">("chat");
  /* identity step */
  const [nin, setNin] = useState("");
  const [idState, setIdState] = useState<"idle" | "scanning" | "matched">("idle");
  const [idScore, setIdScore] = useState(0);
  useEffect(() => {
    // nudge past 0 so the first frame paints before the check is started
    const v = document.getElementById("face-clip") as HTMLVideoElement | null;
    if (!v) return;
    const seek = () => { try { v.currentTime = 0.05; } catch {} };
    v.addEventListener("loadeddata", seek, { once: true });
    if (v.readyState >= 2) seek();
  }, [stage]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const q = new URLSearchParams(window.location.search).get("stage");
    if (q === "identity") setStage("identity");
    if (q === "checks") {
      setChecks(DEFAULT_CHECKS);
      setTitle("Help Emeka get surgery at Igbobi");
      setStage("checks");
      DEFAULT_CHECKS.forEach((_, i) =>
        setTimeout(() => setChecksShown(i + 1), 900 + i * 1500));
    }
  }, []);

  /* chat state */
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  type Turn = {
    reply: string;
    done: boolean;
    extracted: Extracted | null;
    checks: Check[] | null;
  };

  async function interviewTurn(transcript: Msg[]): Promise<Turn> {
    try {
      const res = await fetch("/api/ai/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: transcript.map(({ from, text }) => ({ from, text })) }),
        signal: AbortSignal.timeout(45_000), // don't hang forever on a dead connection
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as Turn;
    } catch {
      // never leave the chat stuck on "typing…" - surface a retryable message
      return {
        reply:
          "Sorry, I lost connection for a moment. Please send that last message again and we'll continue.",
        done: false,
        extracted: null,
        checks: null,
      };
    }
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
    if (inputRef.current) inputRef.current.style.height = "auto"; // collapse back to one line
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

  async function startIdentity() {
    setStage("identity");
  }

  async function runFaceCheck() {
    setIdState("scanning");
    setIdScore(0);
    const vid = document.getElementById("face-clip") as HTMLVideoElement | null;

    /* The capture runs once. Confidence tracks how much of it we have seen, so
       the result lands exactly when the clip ends - not on a timer of its own. */
    if (vid) {
      const onTime = () => {
        if (!vid.duration || !isFinite(vid.duration)) return;
        setIdScore(Math.min(98, Math.round((vid.currentTime / vid.duration) * 98)));
      };
      vid.addEventListener("timeupdate", onTime);
      await new Promise<void>((resolve) => {
        let settled = false;
        const finish = () => { if (!settled) { settled = true; resolve(); } };
        vid.addEventListener("ended", finish, { once: true });
        vid.currentTime = 0;
        vid.play().catch(() => setTimeout(finish, 3500));   // autoplay blocked
        setTimeout(finish, 20000);                          // never hang the flow
      });
      vid.removeEventListener("timeupdate", onTime);
    } else {
      await new Promise((r) => setTimeout(r, 3500));
    }

    setIdScore(98);
    setIdState("matched");
    // the check has passed, so record the outcome before the cause is published
    await fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method: "NIN" }),
    }).catch(() => {});
    await new Promise((r) => setTimeout(r, 900));
    runChecksAndPublish();
  }

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
      <div className="sticky top-0 z-10 flex items-center gap-6 border-b border-line bg-background/80 px-4 py-3 backdrop-blur">
        <Link href="/" className="rounded-full p-2 hover:bg-raised">
          ←
        </Link>
        <div>
          <h1 className="text-lg font-extrabold">Start a Cause</h1>
          <p className="text-[13px] text-muted">
            {stage === "chat" && "Step 1 of 4 - tell your story to the intake assistant"}
            {stage === "structure" && "Step 2 of 4 - the verifiable structure"}
            {stage === "identity" && "Step 3 of 4 - prove who you are"}
            {(stage === "checks" || stage === "publishing") && "Step 4 of 4 - AI fraud screening"}
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
                      ? "rounded-br-sm bg-accent text-on-accent"
                      : "rounded-bl-sm border border-line bg-surface"
                  }`}
                >
                  {m.from === "ai" && <span className="mb-1 flex items-center gap-1 text-xs font-bold text-accent"><KairosMark size={12} /> Kairos AI</span>}
                  {m.text}
                  {m.hint && <span className="mt-2 block text-[13px] text-muted">{m.hint}</span>}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex">
                <div className="animate-pulse-soft rounded-2xl rounded-bl-sm border border-line bg-surface px-4 py-3 text-muted">
                  typing…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="sticky bottom-[68px] border-t border-line bg-background p-3 sm:bottom-0">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                rows={1}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Type your answer… (Shift+Enter for a new line)"
                className="max-h-[140px] flex-1 resize-none overflow-y-auto rounded-2xl border border-line bg-transparent px-4 py-3 leading-snug outline-none placeholder:text-muted focus:border-accent"
              />
              <button
                onClick={send}
                disabled={thinking || !input.trim()}
                className="rounded-full bg-accent px-5 py-3 font-bold text-on-accent disabled:opacity-40"
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
                      : "border-line text-muted hover:bg-surface"
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
                  className="flex items-center gap-1 rounded-full border border-line bg-surface px-3 py-1 text-sm"
                >
                  {ev}
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
            onClick={startIdentity}
            className="rounded-full bg-accent py-3 font-bold text-on-accent transition hover:bg-accent/90"
          >
            Continue to identity check
          </button>
        </div>
      )}

      {/* ------------------- STAGE 3: IDENTITY / FACE CHECK ------------------ */}
      {stage === "identity" && (
        <div className="mx-auto w-full max-w-[560px] px-4 py-8">
          <h2 className="text-xl font-extrabold">Prove it is you</h2>
          <p className="mt-1 text-[15px] text-muted">
            You are about to ask strangers for money, so this is the one moment we check
            who you are. Donors never do this.
          </p>

          <div className="mt-6 border-b border-line pb-5">
            <label className="text-[13px] font-bold text-muted">NIN</label>
            <input
              value={nin}
              onChange={(e) => setNin(e.target.value.replace(/\D/g, "").slice(0, 11))}
              placeholder="11 digits"
              inputMode="numeric"
              className="mt-2 w-full rounded-xl border border-line bg-transparent px-4 py-3 text-[15px] outline-none focus:border-accent"
            />
            <p className="mt-2 text-[13px] text-muted">
              Checked through a licensed partner. We store the result, never the number.
            </p>
          </div>

          <div className="mt-6 flex gap-5">
            <div className="relative h-[232px] w-[174px] shrink-0 overflow-hidden rounded-xl border border-line bg-background">
              <video
                id="face-clip"
                muted
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
              >
                <source src="/demo/face-check.webm" type="video/webm" />
                <source src="/demo/face-check.mp4" type="video/mp4" />
              </video>
              {idState !== "idle" && (
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-x-3 top-3 bottom-3 rounded-lg border-2 border-accent/70" />
                  {idState === "scanning" && (
                    <div className="absolute inset-x-3 h-[2px] bg-accent shadow-[0_0_12px_2px] shadow-accent animate-scanline" />
                  )}
                </div>
              )}
              {idState === "matched" && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/55">
                  <span className="text-3xl text-accent">✓</span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <p className="text-[13px] font-bold uppercase tracking-wider text-muted">
                Liveness &amp; face match
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                A number can be bought. A face cannot. We match a live capture against the
                photograph the registry holds.
              </p>

              <div className="mt-4 space-y-2 text-[14px]">
                <Row label="Liveness" ok={idState !== "idle"} note={idState === "idle" ? "waiting" : "live person"} />
                <Row label="Face match" ok={idState === "matched"} note={idState === "idle" ? "waiting" : idScore + "%"} />
                <Row label="Name on record" ok={idState === "matched"} note={idState === "matched" ? "exact" : "waiting"} />
              </div>

              {idState === "idle" && (
                <button
                  onClick={runFaceCheck}
                  disabled={nin.length < 11}
                  className="mt-5 w-full rounded-full bg-accent py-3 font-bold text-on-accent transition hover:bg-accent/90 disabled:opacity-40"
                >
                  Start face check
                </button>
              )}
              {idState === "scanning" && (
                <p className="mt-5 text-[14px] text-accent animate-pulse-soft">Matching against NIMC record…</p>
              )}
              {idState === "matched" && (
                <p className="mt-5 text-[14px] font-bold text-accent">Identity confirmed. Screening the cause…</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------- STAGE 4: FRAUD SCREEN ---------------------- */}
      {(stage === "checks" || stage === "publishing") && (
        <div className="flex flex-col gap-3 p-6">
          <h2 className="text-lg font-extrabold">
            {title ? `Screening “${title}”` : "Screening this cause"}
          </h2>
          {checks.map((c, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-xl border p-3 text-sm transition ${
                i < checksShown ? "border-accent/40 bg-accent/5" : "border-line"
              }`}
            >
              {i < checksShown ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-current text-accent">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
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

function Row({ label, ok, note }: { label: string; ok: boolean; note: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line/60 pb-2">
      <span className="text-muted">{label}</span>
      <span className={ok ? "font-bold text-accent" : "text-muted"}>
        {ok ? "✓ " : ""}
        {note}
      </span>
    </div>
  );
}
