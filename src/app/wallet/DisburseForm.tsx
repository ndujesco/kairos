"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function naira(n: number) {
  return "₦" + Math.round(n).toLocaleString("en-NG");
}

export default function DisburseForm({
  causeId,
  escrow,
  items,
}: {
  causeId: string;
  escrow: number;
  items: { label: string; remaining: number; vendor: string }[];
}) {
  const router = useRouter();
  const payable = items.filter((i) => i.remaining > 0);
  const [label, setLabel] = useState(payable[0]?.label ?? "");
  const [amount, setAmount] = useState("");
  const [stage, setStage] = useState<"idle" | "paying" | "done">("idle");
  const [result, setResult] = useState<{ invoiceNo: string; notified: number } | null>(null);
  const [error, setError] = useState("");

  const selected = items.find((i) => i.label === label);
  const maxPay = Math.min(escrow, selected?.remaining ?? 0);

  async function pay() {
    const amt = parseInt(amount.replace(/\D/g, ""), 10) || 0;
    if (amt <= 0) return setError("Enter an amount");
    setError("");
    setStage("paying");
    await new Promise((r) => setTimeout(r, 1500)); // vendor account name-match + transfer
    const res = await fetch(`/api/causes/${causeId}/disburse`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ budgetLabel: label, amount: amt }),
    });
    const j = await res.json();
    if (!res.ok) {
      setError(j.error || "Payment failed");
      setStage("idle");
      return;
    }
    setResult({ invoiceNo: j.invoiceNo, notified: j.notified });
    setStage("done");
    router.refresh();
  }

  if (payable.length === 0) return null;

  if (stage === "done" && result)
    return (
      <div className="mt-3 animate-slide-up rounded-xl border border-accent/40 bg-accent/5 p-3 text-sm">
        <p className="font-bold text-accent">✓ Payment sent to {selected?.vendor}</p>
        <p className="mt-1 text-muted">
          Invoice {result.invoiceNo} issued. <b className="text-foreground">{result.notified} donor
          {result.notified === 1 ? "" : "s"}</b> just received a personal breakdown of what their
          money did — check the Notifications tab as a donor to see it.
        </p>
      </div>
    );

  return (
    <div className="mt-3 rounded-xl border border-line p-3">
      <p className="mb-2 text-sm font-bold">Direct a payment from escrow</p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <select
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="flex-1 rounded-lg border border-line bg-black px-3 py-2 text-sm outline-none focus:border-accent"
        >
          {payable.map((i) => (
            <option key={i.label} value={i.label}>
              {i.label} → {i.vendor} ({naira(i.remaining)} left)
            </option>
          ))}
        </select>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={`Max ${naira(maxPay)}`}
          inputMode="numeric"
          className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-accent sm:w-36"
        />
        <button
          onClick={pay}
          disabled={stage === "paying"}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-black transition hover:bg-accent/90 disabled:opacity-60"
        >
          {stage === "paying" ? "Verifying vendor…" : "Pay vendor"}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
      <p className="mt-2 text-[12px] text-muted">
        Paid directly to the vendor’s verified account. Every donor is notified with their exact
        share, automatically.
      </p>
    </div>
  );
}
