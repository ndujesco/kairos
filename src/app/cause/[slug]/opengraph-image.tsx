import { ImageResponse } from "next/og";
import { loadOgFonts, ogFontConfig } from "@/lib/og/fonts";
import { dbConnect } from "@/lib/db";
import { Cause, type IUser } from "@/lib/models";

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

  const [c1, c2] = GRADIENTS[cause?.coverColor ?? "emerald"] ?? GRADIENTS.emerald;
  const [a1, a2] = GRADIENTS[cause?.organizer?.avatarColor ?? "emerald"] ?? GRADIENTS.emerald;
  const pct = cause ? Math.min(100, Math.round((cause.raised / Math.max(cause.goal, 1)) * 100)) : 0;
  const naira = (n: number) => "₦" + Math.round(n).toLocaleString("en-NG");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#000000",
          fontFamily: "Noto Sans",
        }}
      >
        {/* left band: the organizer's avatar, drawn like it appears in the app */}
        <div
          style={{
            width: 380,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
            background: `linear-gradient(135deg, ${c1}, ${c2})`,
          }}
        >
          <div
            style={{
              width: 240,
              height: 240,
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(135deg, ${a1}, ${a2})`,
              border: "8px solid rgba(0,0,0,0.55)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
              fontSize: 130,
            }}
          >
            {cause?.organizer?.emoji ?? "🙂"}
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 22px",
              borderRadius: 999,
              background: "rgba(0,0,0,0.55)",
              color: "#ffffff",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            @{cause?.organizer?.handle ?? "kairos"}
          </div>
        </div>

        {/* right content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 56px",
          }}
        >
          {/* brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg viewBox="0 0 24 24" width={40} height={40} fill="#00ba7c">
              <path d="M6 2v6l4 4-4 4v6h12v-6l-4-4 4-4V2H6zm10 14.5V20H8v-3.5l4-4 4 4zM8 7.5V4h8v3.5l-4 4-4-4z" />
            </svg>
            <span style={{ fontSize: 34, color: "#ffffff", fontWeight: 700 }}>Kairos</span>
            <span style={{ fontSize: 24, color: "#71767b", marginLeft: 8 }}>
              give with proof, not faith
            </span>
          </div>

          {/* title */}
          <div
            style={{
              display: "flex",
              fontSize: cause && cause.title.length > 55 ? 46 : 56,
              lineHeight: 1.15,
              color: "#ffffff",
              fontWeight: 700,
            }}
          >
            {cause?.title ?? "A cause on Kairos"}
          </div>

          {/* organizer */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 28, color: "#ffffff", fontWeight: 700 }}>
                {cause?.organizer?.name ?? "Verified organizer"}
              </span>
              <span style={{ fontSize: 24, color: "#00ba7c" }}>verified</span>
            </div>
            <span style={{ fontSize: 22, color: "#71767b" }}>
              held in escrow · paid to verified vendors
            </span>
          </div>

          {/* progress */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: 40, color: "#00ba7c", fontWeight: 700 }}>
                {cause ? naira(cause.raised) : ""}
              </span>
              <span style={{ fontSize: 26, color: "#71767b" }}>
                {cause ? `of ${naira(cause.goal)} · ${pct}% · ${cause.donorCount} donors` : ""}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                height: 16,
                borderRadius: 999,
                background: "#2f3336",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: `${Math.max(pct, 2)}%`,
                  height: 16,
                  borderRadius: 999,
                  background: "#00ba7c",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, emoji: "twemoji", fonts: ogFontConfig(fonts) }
  );
}
