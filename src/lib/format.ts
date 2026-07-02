export function naira(n: number) {
  return "₦" + Math.round(n).toLocaleString("en-NG");
}

export function timeAgo(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return "now";
  if (s < 3600) return Math.floor(s / 60) + "m";
  if (s < 86400) return Math.floor(s / 3600) + "h";
  if (s < 86400 * 30) return Math.floor(s / 86400) + "d";
  return d.toLocaleDateString("en-NG", { month: "short", day: "numeric" });
}

export const GRADIENTS: Record<string, string> = {
  emerald: "from-emerald-500 to-teal-700",
  sky: "from-sky-500 to-indigo-700",
  rose: "from-rose-500 to-fuchsia-700",
  amber: "from-amber-400 to-orange-600",
  violet: "from-violet-500 to-purple-800",
  slate: "from-slate-500 to-slate-800",
};

export function gradient(key: string) {
  return GRADIENTS[key] ?? GRADIENTS.emerald;
}
