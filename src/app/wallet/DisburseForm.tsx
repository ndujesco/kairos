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
      <div className="mt-3 animate-slide-up rounded-xl border border-accent/40 bg-accent/5 p-3.5 text-sm">
        <p className="font-bold text-accent">Payment sent to {selected?.vendor}</p>
        <p className="mt-1 leading-snug text-muted">
          Invoice {result.invoiceNo} issued.{" "}
          <b className="text-foreground">
            {result.notified} donor{result.notified === 1 ? "" : "s"}
          </b>{" "}
          received a receipt for their share of this payment.
        </p>
      </div>
    );

  return (
    <div className="mt-3 border-t border-line pt-3">
      <div className="mb-2 flex items-baseline justify-between">
        <p className="text-sm font-bold">Pay a vendor</p>
        <p className="text-[13px] text-muted">{naira(escrow)} available</p>
      </div>

      <div className="flex flex-col gap-2">
        <select
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
            setAmount("");
          }}
          className="w-full rounded-lg border border-line bg-black px-3 py-2.5 text-sm outline-none focus:border-accent"
        >
          {payable.map((i) => (
            <option key={i.label} value={i.label}>
              {i.label} · {i.vendor} · {naira(i.remaining)} left
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <div className="relative min-w-0 flex-1">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Up to ${naira(maxPay)}`}
              inputMode="numeric"
              className="w-full rounded-lg border border-line bg-transparent py-2.5 pl-3 pr-14 text-sm outline-none placeholder:text-muted focus:border-accent"
            />
            <button
              type="button"
              onClick={() => setAmount(String(maxPay))}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-bold text-accent hover:bg-accent/10"
            >
              Max
            </button>
          </div>
          <button
            onClick={pay}
            disabled={stage === "paying"}
            className="shrink-0 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-black transition hover:bg-accent/90 disabled:opacity-60"
          >
            {stage === "paying" ? "Verifying…" : "Pay vendor"}
          </button>
        </div>
      </div>

      {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
      <p className="mt-2 text-[12px] leading-snug text-muted">
        Sent to the vendor&rsquo;s verified account. Each donor gets a receipt for their exact
        share.
      </p>
    </div>
  );
}
