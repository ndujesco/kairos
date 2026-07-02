import { ImageResponse } from "next/og";
import { loadOgFonts, ogFontConfig } from "@/lib/og/fonts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Kairos — Transparent Giving";

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
        <div style={{ display: "flex", fontSize: 120, color: "#00ba7c", fontWeight: 700 }}>⏳</div>
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
