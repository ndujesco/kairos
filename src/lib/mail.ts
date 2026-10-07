import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

/**
 * Email is how a donor hears that their money moved when they are not looking
 * at the app. It is optional: donors who give without an address still get the
 * in-app receipt, and we never require one to browse or to give.
 */
const HOST = process.env.SMTP_HOST;
const USER = process.env.SMTP_USER;
const PASS = process.env.SMTP_PASS;
const FROM = process.env.MAIL_FROM || (USER ? `Kairos <${USER}>` : "");
export const APP_URL = process.env.APP_URL || "http://localhost:3000";

let cached: Transporter | null = null;
function transport() {
  if (!HOST || !USER || !PASS) return null;    // not configured: stay silent
  if (!cached) {
    cached = nodemailer.createTransport({
      host: HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: { user: USER, pass: PASS },
    });
  }
  return cached;
}

const naira = (n: number) => "₦" + Math.round(n).toLocaleString("en-NG");

/** Never let a mail failure break a payment. */
export async function sendMail(to: string, subject: string, html: string) {
  const t = transport();
  if (!t || !to) return { sent: false as const, reason: "not configured" };
  try {
    await t.sendMail({ from: FROM, to, subject, html });
    return { sent: true as const };
  } catch (e) {
    console.error("[mail]", (e as Error).message);
    return { sent: false as const, reason: (e as Error).message };
  }
}

/**
 * The email shell, light by default and dark where the client supports it.
 *
 * Mail clients are not browsers. Many strip <style> blocks entirely, so the
 * inline styles carry the LIGHT theme and must stand alone. The <style> block
 * then flips the handful of surfaces that matter when the reader is in dark
 * mode, matched by class. Clients that drop it simply show the light version,
 * which is why light is the default rather than the override.
 */
function shell(title: string, body: string) {
  return `<!doctype html><html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <style>
      :root { color-scheme: light dark; supported-color-schemes: light dark; }
      @media (prefers-color-scheme: dark) {
        .k-bg    { background:#000000 !important; }
        .k-card  { background:#0b0b0b !important; border-color:#2f3336 !important; }
        .k-line  { border-color:#2f3336 !important; }
        .k-text  { color:#e7e9ea !important; }
        .k-muted { color:#8b98a5 !important; }
        .k-panel { background:#0b0b0b !important; border-color:#2f3336 !important; }
      }
    </style>
  </head>
  <body class="k-bg" style="margin:0;background:#f4f6f8;padding:28px 16px;
    font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#15202b">
    <div class="k-card" style="max-width:520px;margin:0 auto;background:#ffffff;
      border:1px solid #dfe3e8;border-radius:14px;overflow:hidden">
      <div class="k-line" style="padding:18px 22px;border-bottom:1px solid #dfe3e8">
        <span style="color:#00875a;font-weight:800;font-size:17px;letter-spacing:-.3px">Kairos</span>
        <span class="k-muted" style="color:#5b7083;font-size:12px"> &nbsp;·&nbsp; ${title}</span>
      </div>
      ${body}
      <div class="k-line k-muted" style="padding:14px 22px;border-top:1px solid #dfe3e8;
        color:#5b7083;font-size:11px;line-height:1.6">
        You are getting this because you gave through Kairos. Every naira is paid to a
        verified counterparty, never to the organiser.
      </div>
    </div></body></html>`;
}

/** The receipt a donor gets the moment their share of a payment goes out. */
export function paidOutEmail(o: {
  donorName: string; share: number; credited: number; vendor: string;
  causeTitle: string; causeSlug: string; invoiceNo: string; pct: number;
}) {
  return {
    subject: `Your ${naira(o.share)} reached ${o.vendor}`,
    html: shell("Your donation was paid out", `
      <div class="k-text" style="padding:22px;color:#15202b">
        <p style="margin:0 0 14px;font-size:15px">Hi ${o.donorName},</p>
        <p style="margin:0 0 18px;font-size:15px;line-height:1.6">
          Money just left escrow on <b>${o.causeTitle}</b>, and this is your share of it.
        </p>
        <div class="k-panel" style="border:1px solid #dfe3e8;border-radius:12px;padding:16px;background:#f8fafb">
          <div class="k-muted" style="color:#5b7083;font-size:11px;letter-spacing:.08em;text-transform:uppercase">
            Your share of this payment
          </div>
          <div style="color:#00875a;font-size:30px;font-weight:800;margin:6px 0 2px">
            ${naira(o.share)}
          </div>
          <div class="k-muted" style="color:#5b7083;font-size:13px">of your ${naira(o.credited)} · ${o.pct}% of your gift</div>
          <table class="k-text" style="width:100%;margin-top:14px;font-size:13px;color:#15202b" cellpadding="0">
            <tr><td class="k-muted" style="color:#5b7083;padding:3px 0">Paid to</td><td align="right">${o.vendor}</td></tr>
            <tr><td class="k-muted" style="color:#5b7083;padding:3px 0">Receipt</td><td align="right">${o.invoiceNo}</td></tr>
          </table>
        </div>
        <a href="${APP_URL}/cause/${o.causeSlug}"
           style="display:inline-block;margin-top:18px;background:#00875a;color:#ffffff;
                  text-decoration:none;font-weight:700;font-size:14px;padding:11px 18px;border-radius:999px">
          View the receipt and the ledger
        </a>
      </div>`),
  };
}

/** Confirmation that a gift landed in escrow, with the upkeep stated. */
export function donationEmail(o: {
  donorName: string; amount: number; upkeep: number; net: number;
  causeTitle: string; causeSlug: string;
}) {
  return {
    subject: `Your ${naira(o.amount)} is in escrow for ${o.causeTitle}`,
    html: shell("Donation received", `
      <div class="k-text" style="padding:22px;color:#15202b">
        <p style="margin:0 0 14px;font-size:15px">Hi ${o.donorName}, thank you.</p>
        <p style="margin:0 0 18px;font-size:15px;line-height:1.6">
          Your gift is held against the published budget for <b>${o.causeTitle}</b>.
          It cannot reach the organiser's own account.
        </p>
        <table class="k-panel k-text" style="width:100%;border:1px solid #dfe3e8;border-radius:12px;
          font-size:14px;background:#f8fafb;color:#15202b" cellpadding="12">
          <tr><td class="k-muted" style="color:#5b7083">You paid</td><td align="right"><b>${naira(o.amount)}</b></td></tr>
          <tr><td class="k-muted" style="color:#5b7083">Kairos upkeep</td><td align="right">−${naira(o.upkeep)}</td></tr>
          <tr><td class="k-muted k-line" style="color:#5b7083;border-top:1px solid #dfe3e8"><b>In escrow</b></td>
              <td align="right" class="k-line" style="border-top:1px solid #dfe3e8"><b style="color:#00875a">${naira(o.net)}</b></td></tr>
        </table>
        <p class="k-muted" style="margin:16px 0 0;color:#5b7083;font-size:13px;line-height:1.6">
          We will email you the moment any of it is paid out, with your exact share and the receipt.
        </p>
      </div>`),
  };
}
