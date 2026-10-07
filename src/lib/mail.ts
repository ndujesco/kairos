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

function shell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#000;padding:28px 16px;
    font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#e7e9ea">
    <div style="max-width:520px;margin:0 auto;background:#0b0b0b;border:1px solid #2f3336;border-radius:14px;overflow:hidden">
      <div style="padding:18px 22px;border-bottom:1px solid #2f3336">
        <span style="color:#00ba7c;font-weight:800;font-size:17px;letter-spacing:-.3px">Kairos</span>
        <span style="color:#71767b;font-size:12px"> &nbsp;·&nbsp; ${title}</span>
      </div>
      ${body}
      <div style="padding:14px 22px;border-top:1px solid #2f3336;color:#71767b;font-size:11px;line-height:1.6">
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
      <div style="padding:22px">
        <p style="margin:0 0 14px;font-size:15px">Hi ${o.donorName},</p>
        <p style="margin:0 0 18px;font-size:15px;line-height:1.6">
          Money just left escrow on <b>${o.causeTitle}</b>, and this is your share of it.
        </p>
        <div style="border:1px solid #2f3336;border-radius:12px;padding:16px">
          <div style="color:#71767b;font-size:11px;letter-spacing:.08em;text-transform:uppercase">
            Your share of this payment
          </div>
          <div style="color:#00ba7c;font-size:30px;font-weight:800;margin:6px 0 2px">
            ${naira(o.share)}
          </div>
          <div style="color:#71767b;font-size:13px">of your ${naira(o.credited)} · ${o.pct}% of your gift</div>
          <table style="width:100%;margin-top:14px;font-size:13px;color:#e7e9ea" cellpadding="0">
            <tr><td style="color:#71767b;padding:3px 0">Paid to</td><td align="right">${o.vendor}</td></tr>
            <tr><td style="color:#71767b;padding:3px 0">Receipt</td><td align="right">${o.invoiceNo}</td></tr>
          </table>
        </div>
        <a href="${APP_URL}/cause/${o.causeSlug}"
           style="display:inline-block;margin-top:18px;background:#00ba7c;color:#000;
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
      <div style="padding:22px">
        <p style="margin:0 0 14px;font-size:15px">Hi ${o.donorName}, thank you.</p>
        <p style="margin:0 0 18px;font-size:15px;line-height:1.6">
          Your gift is held against the published budget for <b>${o.causeTitle}</b>.
          It cannot reach the organiser's own account.
        </p>
        <table style="width:100%;border:1px solid #2f3336;border-radius:12px;font-size:14px" cellpadding="12">
          <tr><td style="color:#71767b">You paid</td><td align="right"><b>${naira(o.amount)}</b></td></tr>
          <tr><td style="color:#71767b">Kairos upkeep</td><td align="right">−${naira(o.upkeep)}</td></tr>
          <tr><td style="color:#71767b;border-top:1px solid #2f3336"><b>In escrow</b></td>
              <td align="right" style="border-top:1px solid #2f3336"><b style="color:#00ba7c">${naira(o.net)}</b></td></tr>
        </table>
        <p style="margin:16px 0 0;color:#71767b;font-size:13px;line-height:1.6">
          We will email you the moment any of it is paid out, with your exact share and the receipt.
        </p>
      </div>`),
  };
}
