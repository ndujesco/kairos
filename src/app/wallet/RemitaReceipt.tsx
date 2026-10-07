/**
 * The receipt UNILAG's own system returns once a Remita reference is settled.
 * Kairos does not compose this: it is what comes back, and it is what lands on
 * the public ledger and in every donor's notification.
 */
export default function RemitaReceipt({
  rrr, student, matric, institution, amount, invoiceNo, paidAt,
}: {
  rrr: string; student: string; matric: string; institution: string;
  amount: number; invoiceNo: string; paidAt: Date;
}) {
  const naira = (n: number) => "₦" + Math.round(n).toLocaleString("en-NG");
  const row = (k: string, v: string) => (
    <div className="flex justify-between gap-4 py-[3px]">
      <span className="shrink-0 text-muted">{k}</span>
      <span className="text-right font-medium text-foreground">{v}</span>
    </div>
  );
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-accent/40 bg-black">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
          Payment successful
        </span>
        <span className="text-[11px] text-muted">via Remita</span>
      </div>

      <div className="px-4 py-3 font-mono text-[12px] leading-relaxed">
        {row("Institution", institution)}
        {row("Student", student)}
        {row("Matric no.", matric)}
        {row("RRR", rrr)}
        {row("Description", "Tuition — 2025/2026 session")}
        {row("Channel", "Kairos escrow transfer")}
        {row("Date", paidAt.toLocaleString("en-NG", {
          day: "2-digit", month: "short", year: "numeric",
          hour: "2-digit", minute: "2-digit",
        }))}
        {row("Receipt no.", invoiceNo)}
        <div className="mt-2 flex justify-between border-t border-line pt-2 text-[14px]">
          <span className="font-bold">Amount paid</span>
          <span className="font-bold text-accent">{naira(amount)}</span>
        </div>
      </div>

      <p className="border-t border-line px-4 py-2 text-[11px] leading-snug text-muted">
        Settled directly to {institution}. The reference is now closed and cannot be paid
        again. Every donor has been sent their share of this payment.
      </p>
    </div>
  );
}
