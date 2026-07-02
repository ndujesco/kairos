import { gradient } from "@/lib/format";

export default function Avatar({
  emoji,
  color,
  size = 10,
}: {
  emoji: string;
  color: string;
  size?: number;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient(color)}`}
      style={{ width: size * 4, height: size * 4, fontSize: size * 1.8 }}
    >
      <span>{emoji}</span>
    </div>
  );
}
