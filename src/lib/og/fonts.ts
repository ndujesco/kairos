/**
 * Fonts for OG image rendering. Noto Sans covers the naira sign (₦) that the
 * default satori font lacks. Read from disk; `outputFileTracingIncludes` in
 * next.config.ts ensures the .ttf files ship with the serverless bundle.
 */
import { readFile } from "fs/promises";
import path from "path";

let cache: { regular: Buffer; bold: Buffer } | null = null;

const FONT_DIR = path.join(process.cwd(), "src", "lib", "og");

export async function loadOgFonts() {
  if (cache) return cache;
  const [regular, bold] = await Promise.all([
    readFile(path.join(FONT_DIR, "NotoSans-Regular.ttf")),
    readFile(path.join(FONT_DIR, "NotoSans-Bold.ttf")),
  ]);
  cache = { regular, bold };
  return cache;
}

export function ogFontConfig(fonts: { regular: Buffer; bold: Buffer }) {
  return [
    { name: "Noto Sans", data: fonts.regular, weight: 400 as const, style: "normal" as const },
    { name: "Noto Sans", data: fonts.bold, weight: 700 as const, style: "normal" as const },
  ];
}
