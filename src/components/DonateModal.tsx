"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const PRESETS = [1000, 2000, 5000, 7000, 10000, 25000];

function naira(n: number) {
  return "₦" + Math.round(n).toLocaleString("en-NG");
}

export default function DonateModal({
  causeId,
  causeTitle,
  onClose,
}: {
  causeId: string;
  causeTitle: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(7000);
  const [custom, setCustom] = useState("");
  const [stage, setStage] = useState<"amount" | "gateway" | "confirming" | "done">("amount");
  const [error, setError] = useState("");

  const finalAmount = custom ? parseInt(custom.replace(/\D/g, ""), 10) || 0 : amount;

  // stable fake checkout details for this session
  const checkout = useMemo(
    () => ({
      account: String(9_000_000_000 + Math.floor(Math.random() * 999_999_999)),
      reference: "KAI-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    }),
    []
  );

  function toGateway() {
    if (finalAmount < 100) {
      setError("Minimum donation is ₦100");
      return;
    }
    setError("");
    setStage("gateway");
  }

  async function confirmPayment() {
    setStage("confirming");
    await new Promise((r) => setTimeout(r, 1800)); // gateway "verifying transfer"
    const res = await fetch(`/api/causes/${causeId}/donate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: finalAmount }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error || "Payment failed");
      setStage("amount");
      return;
    }
    setStage("done");
    router.refresh();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#5b708366] p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      onClick={(e) => e.target === e.currentTarget && stage !== "confirming" && onClose()}
    >
      <div className="w-full max-w-md animate-slide-up rounded-t-2xl bg-black shadow-[0_0_40px_rgba(0,186,124,0.15)] ring-1 ring-line sm:rounded-2xl">
        {/* ------------------------------ amount ------------------------------ */}
        {stage === "amount" && (
          <div className="p-5 sm:p-6">
            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-xl font-extrabold">Donate</h2>
              <button onClick={onClose} className="rounded-full p-1 text-muted hover:bg-white/10">
                ✕
              </button>
            </div>
            <p className="mb-4 text-sm text-muted">
              to <span className="text-foreground">{causeTitle}</span>
            </p>

            <div className="mb-3 grid grid-cols-3 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setAmount(p);
                    setCustom("");
                  }}
                  className={`rounded-full border px-2 py-2 text-sm font-bold transition ${
                    !custom && amount === p
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-line hover:bg-white/5"
                  }`}
                >
                  {naira(p)}
                </button>
              ))}
            </div>
            <input
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Custom amount (₦)"
              inputMode="numeric"
              className="mb-4 w-full rounded-xl border border-line bg-transparent px-4 py-3 outline-none placeholder:text-muted focus:border-accent"
            />

            <div className="mb-4 rounded-xl border border-line bg-white/5 p-3 text-[13px] text-muted">
              🔒 Your {naira(finalAmount || 0)} goes into <b className="text-foreground">escrow</b> —
              not the organizer’s account. It is only ever paid out to verified vendors, and you’ll
              get a receipt for your exact share of every payment.
            </div>

            {error && <p className="mb-3 text-sm text-rose-400">{error}</p>}

            <button
              onClick={toGateway}
              className="w-full rounded-full bg-accent py-3 font-bold text-black transition hover:bg-accent/90"
            >
              Continue to payment
            </button>
          </div>
        )}

        {/* ----------------------------- gateway ------------------------------ */}
        {stage === "gateway" && (
          <div className="p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted">
                  Kairos Secure Checkout
                </p>
                <p className="text-sm text-muted">Pay with bank transfer</p>
              </div>
              <span className="text-xl font-extrabold text-accent">{naira(finalAmount)}</span>
            </div>

            <p className="mb-3 text-sm text-muted">
              Transfer <b className="text-foreground">{naira(finalAmount)}</b> to the one-time
              account below. It expires in 30 minutes.
            </p>

            <div className="mb-4 flex flex-col gap-2 rounded-xl border border-line bg-white/5 p-4 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Bank</span>
                <b>Wema Bank (Kairos Escrow)</b>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Account number</span>
                <b className="tracking-wider">{checkout.account}</b>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Account name</span>
                <b>KAIROS ESCROW / {checkout.reference}</b>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Amount</span>
                <b className="text-accent">{naira(finalAmount)}</b>
              </div>
            </div>

            <button
              onClick={confirmPayment}
              className="w-full rounded-full bg-accent py-3 font-bold text-black transition hover:bg-accent/90"
            >
              I have completed this transfer
            </button>
            <button
              onClick={() => setStage("amount")}
              className="mt-2 w-full rounded-full border border-line py-2.5 text-sm font-bold text-muted transition hover:bg-white/5"
            >
              ← Change amount
            </button>
            <p className="mt-3 text-center text-[12px] text-muted">
              Simulated gateway — Paystack/Flutterwave virtual accounts in production
            </p>
          </div>
        )}

        {/* ---------------------------- confirming ---------------------------- */}
        {stage === "confirming" && (
          <div className="flex flex-col items-center gap-4 p-10">
            <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-line border-t-accent" />
            <p className="animate-pulse-soft text-muted">Confirming your transfer…</p>
            <p className="font-mono text-[12px] text-muted">{checkout.reference}</p>
          </div>
        )}

        {/* ------------------------------- done ------------------------------- */}
        {stage === "done" && (
          <div className="flex flex-col items-center gap-3 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-3xl">
              ✅
            </div>
            <h2 className="text-xl font-extrabold">Payment received — you’re in escrow</h2>
            <p className="text-sm text-muted">
              {naira(finalAmount)} is now held safely for this cause. The moment it moves — to a
              hospital, a vendor, a supplier — you’ll get an alert showing exactly what{" "}
              <i>your</i> money did.
            </p>
            <button
              onClick={onClose}
              className="mt-2 w-full rounded-full bg-accent py-3 font-bold text-black hover:bg-accent/90"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
