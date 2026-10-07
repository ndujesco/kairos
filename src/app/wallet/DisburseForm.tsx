"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RemitaReceipt from "./RemitaReceipt";

function naira(n: number) {
  return "₦" + Math.round(n).toLocaleString("en-NG");
}

type Item = {
  label: string;
  remaining: number;
  vendor: string;
  rrr?: string | null;
  rrrStudent?: string | null;
  rrrMatric?: string | null;
};

export default function DisburseForm({
  causeId,
  escrow,
  items,
  causeTitle,
}: {
  causeId: string;
  escrow: number;
  items: Item[];
  causeTitle?: string;
}) {
  const router = useRouter();
  const payable = items.filter((i) => i.remaining > 0);
  const [label, setLabel] = useState(payable[0]?.label ?? "");
  const [amount, setAmount] = useState("");
  const [stage, setStage] = useState<"idle" | "paying" | "done">("idle");
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<{ invoiceNo: string; notified: number } | null>(null);
  const [error, setError] = useState("");

  const selected = items.find((i) => i.label === label);
  const maxPay = Math.min(escrow, selected?.remaining ?? 0);

  const isFees = Boolean(selected?.rrr);

  /* Settling a school fee is a different act from paying a supplier: the
     reference carries the student, the fee and the institution, so there is
     no amount to type and nothing to misdirect. */
  const STEPS = isFees
    ? [
        "Looking up the reference with Remita…",
        "Confirming the biller and the amount…",
        "Checking the reference is still unpaid…",
        "Releasing from escrow…",
        "Settling to the institution…",
      ]
    : [
        "Checking the account name against CAC…",
        "Confirming the account belongs to the vendor…",
        "Releasing from escrow…",
      ];

  async function pay() {
    const amt = isFees
      ? (selected?.remaining ?? 0)
      : parseInt(amount.replace(/\D/g, ""), 10) || 0;
    if (amt <= 0) return setError("Enter an amount");
    setError("");
    setStage("paying");
    setStep(0);
    for (let i = 0; i < STEPS.length; i++) {
      setStep(i);
      await new Promise((r) => setTimeout(r, isFees ? 1000 : 500));
    }
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

  if (stage === "done" && result && isFees && selected)
    return (
      <div className="animate-slide-up">
        <RemitaReceipt
          rrr={selected.rrr as string}
          student={selected.rrrStudent || "—"}
          matric={selected.rrrMatric || "—"}
          institution={selected.vendor}
          amount={selected.remaining}
          invoiceNo={result.invoiceNo}
          paidAt={new Date()}
        />
        <p className="mt-2 text-[12.5px] leading-snug text-muted">
          <b className="text-foreground">{result.notified} donor
          {result.notified === 1 ? "" : "s"}</b> received their share of this payment,
          by notification and by email.
        </p>
      </div>
    );

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

  if (stage === "paying")
    return (
      <div className="mt-3 rounded-xl border border-line bg-white/5 p-4">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-line border-t-accent" />
          <p className="text-sm font-bold">{STEPS[step]}</p>
        </div>
        <div className="mt-3 flex gap-1.5">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-accent" : "bg-line"
              }`}
            />
          ))}
        </div>
        {isFees && (
          <p className="mt-3 font-mono text-[12px] text-muted">RRR {selected?.rrr}</p>
        )}
      </div>
    );

  return (
    <div className="mt-3 border-t border-line pt-3">
      <div className="mb-2 flex items-baseline justify-between">
        <p className="text-sm font-bold">{isFees ? "Pay the school" : "Pay a vendor"}</p>
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

        {isFees ? (
          <div className="rounded-lg border border-line p-3">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Remita reference
              </span>
              <span className="font-mono text-sm font-bold">{selected?.rrr}</span>
            </div>
            <p className="mt-1.5 text-[12px] leading-snug text-muted">
              {selected?.rrrStudent} · {selected?.rrrMatric} · {selected?.vendor}
            </p>
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3">
              <span className="text-sm">
                Amount due{" "}
                <b className="text-foreground">{naira(selected?.remaining ?? 0)}</b>
              </span>
              <button
                onClick={pay}
                className="shrink-0 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-black transition hover:bg-accent/90"
              >
                Pay fees
              </button>
            </div>
            <p className="mt-2 text-[11.5px] leading-snug text-muted">
              The reference is fixed to one student, one fee and one institution. There is
              no amount to type and nowhere else it can go.
            </p>
          </div>
        ) : (
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
            className="shrink-0 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-black transition hover:bg-accent/90"
          >
            Pay vendor
          </button>
        </div>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
      <p className="mt-2 text-[12px] leading-snug text-muted">
        Sent to the vendor&rsquo;s verified account. Each donor gets a receipt for their exact
        share.
      </p>
    </div>
  );
}
