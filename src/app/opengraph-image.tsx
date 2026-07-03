import { ImageResponse } from "next/og";
import { loadOgFonts, ogFontConfig } from "@/lib/og/fonts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Kairos - Transparent Giving";

export default async function OgImage() {
  const fonts = await loadOgFonts();
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
          gap: 28,
          background: "linear-gradient(135deg, #022c22, #000000 60%)",
          fontFamily: "Noto Sans",
        }}
      >
        <svg viewBox="0 0 24 24" width={120} height={120} fill="#00ba7c">
          <path d="M6 2v6l4 4-4 4v6h12v-6l-4-4 4-4V2H6zm10 14.5V20H8v-3.5l4-4 4 4zM8 7.5V4h8v3.5l-4 4-4-4z" />
        </svg>
        <div style={{ display: "flex", fontSize: 72, color: "#ffffff", fontWeight: 700 }}>
          Kairos
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#e7e9ea", textAlign: "center" }}>
          Give with proof, not faith.
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#71767b", textAlign: "center" }}>
          Escrowed donations · paid to verified vendors · every donor receipted
        </div>
      </div>
    ),
    { ...size, emoji: "twemoji", fonts: ogFontConfig(fonts) }
  );
}
