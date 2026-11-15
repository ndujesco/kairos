"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "./Avatar";
import BellBadge from "./BellBadge";
import KairosMark from "./KairosMark";
import NavIcon from "./NavIcon";
import ThemeToggle from "./ThemeToggle";
const TABS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/notifications", label: "Notifications" },
  { href: "/wallet", label: "Wallet" },
];
export function MobileTopBar({
  user,
}: {
  user?: { handle: string; emoji: string; avatarColor: string } | null;
}) {
  return (
    <div className="relative flex h-[56px] items-center justify-between border-b border-line px-4 sm:hidden">
      {user ? (
        <Link href={`/profile/${user.handle}`} aria-label="Your profile">
          <Avatar emoji={user.emoji} color={user.avatarColor} size={8} />
        </Link>
      ) : (
        <Link href="/login" className="text-sm font-bold text-accent">
          Sign in
        </Link>
      )}
      <Link
        href="/"
        aria-label="Kairos home"
        className="absolute left-1/2 -translate-x-1/2 text-accent"
      >
        <KairosMark size={28} />
      </Link>
      <ThemeToggle compact />
    </div>
  );
}
export default function MobileNav({ unread = 0 }: { unread?: number }) {
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/create" && (
        <Link
          href="/create"
          aria-label="Start a cause"
          className="fixed bottom-[84px] right-5 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-on-accent shadow-lg sm:hidden"
        >
          <NavIcon name="Create" />
        </Link>
      )}
      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-20 flex h-[calc(56px+env(safe-area-inset-bottom))] items-start justify-around border-t border-line bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden"
      >
        {TABS.map((t) => {
          const active =
            t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-label={t.label}
              aria-current={active ? "page" : undefined}
              className="relative flex h-14 w-16 items-center justify-center hover:bg-surface"
            >
              <NavIcon name={t.label} active={active} />
              {t.label === "Notifications" && (
                <BellBadge
                  count={unread}
                  className="absolute right-2 top-1 h-[17px] min-w-[17px] px-1 text-[10px]"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
