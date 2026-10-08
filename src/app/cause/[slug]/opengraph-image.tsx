import { ImageResponse } from "next/og";
import { loadOgFonts, ogFontConfig } from "@/lib/og/fonts";
import { dbConnect } from "@/lib/db";
import { Cause, type IUser } from "@/lib/models";
import fs from "node:fs";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Kairos cause";

// gradient pairs matching the in-app cover colors
const GRADIENTS: Record<string, [string, string]> = {
  emerald: ["#10b981", "#0f766e"],
  sky: ["#0ea5e9", "#4338ca"],
  rose: ["#f43f5e", "#a21caf"],
  amber: ["#fbbf24", "#ea580c"],
  violet: ["#8b5cf6", "#6b21a8"],
  slate: ["#64748b", "#1e293b"],
};

export default async function OgImage(props: { params: Promise<{ slug: string }> }) {
  const fonts = await loadOgFonts();
  const { slug } = await props.params;
  await dbConnect();
  const cause = await Cause.findOne({ slug }).populate<{ organizer: IUser }>("organizer").lean();

  const pct = cause ? Math.min(100, Math.round((cause.raised / Math.max(cause.goal, 1)) * 100)) : 0;
  const naira = (n: number) => "\u20A6" + Math.round(n).toLocaleString("en-NG");

  /* The share card leads with the evidence rather than a decorative avatar.
     A real document photographs as a real document; a gradient and an emoji
     photograph as a template, which is the opposite of what this product is
     claiming about itself. */
  /* Only the cause that actually owns the document may show it. A medical
     appeal wearing a school-fees advice would be worse than no image at all. */
  const THUMBS: Record<string, string> = {
    "/demo/docs/unilag-fee-demand-notice.pdf": "advice-thumb.png",
    "/demo/docs/luth-surgical-estimate.pdf": "estimate-thumb.png",
  };
  let doc: string | null = null;
  const attached = cause?.evidence?.find((e) => e.url && THUMBS[e.url]);
  if (attached?.url) {
    try {
      const f = path.join(process.cwd(), "public/demo/docs", THUMBS[attached.url]);
      if (fs.existsSync(f)) doc = `data:image/png;base64,${fs.readFileSync(f).toString("base64")}`;
    } catch {
      /* fall through to the budget panel */
    }
  }
  const lines = (cause?.budget ?? []).slice(0, 3);

  /* The app's own colours. The document is a white page, so on black it reads
     like evidence laid on a dark table rather than a decorative panel. */
  const BG = "#000000", PANEL = "#0C0F0E", INK = "#E7E9EA",
        MUTED = "#71767B", GREEN = "#00BA7C", RULE = "#2F3336";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: BG,
                    fontFamily: "Noto Sans" }}>

        {/* evidence */}
        <div style={{ width: 470, height: "100%", display: "flex", alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(145deg, #0E1A15 0%, #070807 60%, #050505 100%)",
                      borderRight: `1px solid ${RULE}`, overflow: "hidden" }}>
          {doc ? (
            <img src={doc} width={400} height={350}
                 style={{ objectFit: "cover", objectPosition: "top",
                          border: "1px solid rgba(255,255,255,0.14)",
                          boxShadow: "0 20px 60px rgba(0,0,0,0.75)" }} />
          ) : (
            /* No document, so the budget itself is the evidence. It is the
               thing a sceptical reader actually wants: who gets paid, how much. */
            <div style={{ display: "flex", flexDirection: "column", width: 382,
                          background: "#121614", border: `1px solid ${RULE}`,
                          boxShadow: "0 20px 60px rgba(0,0,0,0.75)" }}>
              <div style={{ display: "flex", justifyContent: "space-between",
                            padding: "16px 22px", borderBottom: `1px solid ${RULE}` }}>
                <span style={{ fontSize: 15, letterSpacing: 1.6, color: MUTED }}>ITEMISED BUDGET</span>
                <span style={{ fontSize: 15, letterSpacing: 1.6, color: MUTED }}>AMOUNT</span>
              </div>
              {lines.map((b, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 5,
                                      padding: "15px 22px", borderBottom: `1px solid ${RULE}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between",
                                alignItems: "baseline", gap: 12 }}>
                    <span style={{ fontSize: 20, color: INK, fontWeight: 700, maxWidth: 230 }}>
                      {b.label}
                    </span>
                    <span style={{ fontSize: 20, color: INK, fontWeight: 700 }}>
                      {naira(b.amount)}
                    </span>
                  </div>
                  <span style={{ fontSize: 16, color: MUTED }}>paid to {b.vendor?.name}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between",
                            padding: "15px 22px" }}>
                <span style={{ fontSize: 17, color: MUTED }}>Never to the organiser</span>
                <span style={{ fontSize: 17, color: GREEN, fontWeight: 700 }}>verified vendors</span>
              </div>
            </div>
          )}
        </div>

        {/* the cause */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column",
                      justifyContent: "space-between", padding: "46px 52px" }}>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg viewBox="0 0 24 24" width={30} height={30} fill={GREEN}>
              <path d="M6 2v6l4 4-4 4v6h12v-6l-4-4 4-4V2H6zm10 14.5V20H8v-3.5l4-4 4 4zM8 7.5V4h8v3.5l-4 4-4-4z" />
            </svg>
            <span style={{ fontSize: 26, color: INK, fontWeight: 700, letterSpacing: -0.3 }}>Kairos</span>
            <span style={{ fontSize: 19, color: MUTED, marginLeft: 6 }}>
              every naira, traceable to what it bought
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", fontSize: cause && cause.title.length > 46 ? 48 : 56,
                          lineHeight: 1.1, color: INK, fontWeight: 700, letterSpacing: -1 }}>
              {cause?.title ?? "A cause on Kairos"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 23, color: INK, fontWeight: 700 }}>
                {cause?.organizer?.name ?? "Verified organizer"}
              </span>
              <span style={{ fontSize: 19, color: MUTED }}>
                &middot; identity verified
                {(cause?.vouches?.length ?? 0) > 0
                  ? ` \u00B7 ${cause!.vouches.length} independent vouches`
                  : ""}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontSize: 48, color: INK, fontWeight: 700, letterSpacing: -1.5 }}>
                {naira(cause?.raised ?? 0)}
              </span>
              <span style={{ fontSize: 22, color: MUTED }}>
                of {naira(cause?.goal ?? 0)} &middot; {pct}% &middot; held in escrow
              </span>
            </div>
            <div style={{ display: "flex", width: "100%", height: 8, background: "#20262B" }}>
              <div style={{ display: "flex", width: `${Math.max(pct, 2)}%`, background: GREEN }} />
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: ogFontConfig(fonts) }
  );
}
