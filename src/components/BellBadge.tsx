"use client";

import { usePathname } from "next/navigation";

/**
 * The unread count on the bell.
 *
 * Client-side on purpose. The root layout is preserved across navigation, so a
 * server-rendered badge would still be lit while you are standing on the very
 * page that just marked everything read. Reading the path here clears it the
 * instant you arrive, and the server count takes over again once you leave.
 */
export default function BellBadge({
  count,
  className = "",
}: {
  count: number;
  className?: string;
}) {
  const path = usePathname();
  if (count <= 0 || path === "/notifications") return null;
  return (
    <span
      className={`grid place-items-center rounded-full bg-accent font-extrabold leading-none text-on-accent ${className}`}
      aria-label={`${count} unread`}
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}
