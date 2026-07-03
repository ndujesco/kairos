import { ImageResponse } from "next/og";
import { loadOgFonts, ogFontConfig } from "@/lib/og/fonts";
import { dbConnect } from "@/lib/db";
import { Cause, Donation, User } from "@/lib/models";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Kairos profile";

// gradient pairs matching the in-app avatar colors
const GRADIENTS: Record<string, [string, string]> = {
  emerald: ["#10b981", "#0f766e"],
  sky: ["#0ea5e9", "#4338ca"],
  rose: ["#f43f5e", "#a21caf"],
  amber: ["#fbbf24", "#ea580c"],
  violet: ["#8b5cf6", "#6b21a8"],
  slate: ["#64748b", "#1e293b"],
};

export default async function OgImage(props: { params: Promise<{ handle: string }> }) {
  const fonts = await loadOgFonts();
  const { handle } = await props.params;
  await dbConnect();
  const user = await User.findOne({ handle }).lean();

  const [causes, donations] = user
    ? await Promise.all([
        Cause.find({ organizer: user._id }).lean(),
        Donation.find({ donor: user._id }).lean(),
      ])
    : [[], []];

  const totalRaised = causes.reduce((s, c) => s + c.raised, 0);
  const totalGiven = donations.reduce((s, d) => s + d.amount, 0);
  const [a1, a2] = GRADIENTS[user?.avatarColor ?? "emerald"] ?? GRADIENTS.emerald;
  const naira = (n: number) => "₦" + Math.round(n).toLocaleString("en-NG");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 26,
          background: "linear-gradient(135deg, #022c22, #000000 65%)",
          fontFamily: "Noto Sans",
        }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(135deg, ${a1}, ${a2})`,
            border: "8px solid rgba(255,255,255,0.12)",
            fontSize: 104,
          }}
        >
          {user?.emoji ?? "🙂"}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 56, color: "#ffffff", fontWeight: 700 }}>
            {user?.name ?? "Kairos"}
          </span>
          {user?.verified?.identity && (
            <span style={{ fontSize: 30, color: "#00ba7c" }}>verified</span>
          )}
        </div>
        <span style={{ fontSize: 30, color: "#71767b", marginTop: -18 }}>
          @{user?.handle ?? "kairos"}
        </span>

        <div style={{ display: "flex", gap: 44, fontSize: 28, color: "#e7e9ea" }}>
          <span style={{ display: "flex", gap: 10 }}>
            <span style={{ color: "#00ba7c", fontWeight: 700 }}>{naira(totalRaised)}</span> raised
          </span>
          <span style={{ display: "flex", gap: 10 }}>
            <span style={{ color: "#00ba7c", fontWeight: 700 }}>{naira(totalGiven)}</span> given
          </span>
          <span style={{ display: "flex", gap: 10 }}>
            <span style={{ fontWeight: 700 }}>{causes.length}</span> cause
            {causes.length === 1 ? "" : "s"}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
          <svg viewBox="0 0 24 24" width={30} height={30} fill="#00ba7c">
            <path d="M6 2v6l4 4-4 4v6h12v-6l-4-4 4-4V2H6zm10 14.5V20H8v-3.5l4-4 4 4zM8 7.5V4h8v3.5l-4 4-4-4z" />
          </svg>
          <span style={{ fontSize: 26, color: "#71767b" }}>Kairos · transparent giving</span>
        </div>
      </div>
    ),
    { ...size, emoji: "twemoji", fonts: ogFontConfig(fonts) }
  );
}
