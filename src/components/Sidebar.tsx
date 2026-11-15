"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "./Avatar";
import BellBadge from "./BellBadge";
import ThemeToggle from "./ThemeToggle";
import KairosMark from "./KairosMark";
import NavIcon from "./NavIcon";
const NAV = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/notifications", label: "Notifications" },
  { href: "/wallet", label: "Wallet" },
  { href: "/profile", label: "Profile" },
];
export default function Sidebar({
  unread = 0,
  user,
}: {
  unread?: number;
  user?: {
    name: string;
    handle: string;
    emoji: string;
    avatarColor: string;
  } | null;
}) {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 hidden h-dvh w-[88px] shrink-0 flex-col justify-between px-3 py-2 sm:flex xl:w-[275px] xl:px-3">
      <div>
        <Link
          href="/"
          className="mb-3 flex h-14 w-14 items-center justify-center rounded-full text-accent transition hover:bg-accent/10"
          aria-label="Kairos home"
        >
          <KairosMark size={32} />
        </Link>
        <nav
          aria-label="Main navigation"
          className="flex flex-col items-start gap-1"
        >
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={`flex max-w-full items-center gap-5 rounded-full p-3 text-xl transition hover:bg-raised xl:pr-6 ${active ? "font-bold" : "font-normal"}`}
              >
                <span className="relative">
                  <NavIcon name={item.label} active={active} />
                  {item.label === "Notifications" && (
                    <BellBadge
                      count={unread}
                      className="absolute -right-2 -top-1.5 h-[18px] min-w-[18px] px-1 text-[11px]"
                    />
                  )}
                </span>
                <span className="hidden xl:block">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <Link
          href={user ? "/create" : "/login"}
          aria-label={user ? "Start a cause" : "Sign in"}
          className="mt-5 flex h-[52px] w-[52px] items-center justify-center gap-2 rounded-full bg-accent text-[17px] font-bold text-on-accent transition hover:bg-accent/90 xl:w-[90%]"
        >
          <span className="hidden xl:block">
            {user ? "Start a cause" : "Sign in"}
          </span>
          <span className="xl:hidden">
            <NavIcon name="Create" />
          </span>
        </Link>
        <p className="mt-4 hidden max-w-[215px] px-3 text-[13px] leading-relaxed text-muted xl:block">
          Small acts. Real change.
          <br />
          Every naira accounted for.
        </p>
      </div>
      <div className="space-y-2 pb-2">
        <ThemeToggle />
        {user && (
          <details className="relative">
            <summary
              className="flex cursor-pointer list-none items-center gap-3 rounded-full p-2.5 hover:bg-raised"
              aria-label="Account menu"
            >
              <Avatar emoji={user.emoji} color={user.avatarColor} />
              <span className="hidden min-w-0 flex-1 xl:block">
                <span className="block truncate text-[15px] font-bold">
                  {user.name}
                </span>
                <span className="block truncate text-[15px] text-muted">
                  @{user.handle}
                </span>
              </span>
              <span className="hidden font-bold xl:block" aria-hidden="true">
                ···
              </span>
            </summary>
            <div className="absolute bottom-full left-0 z-30 mb-3 w-60 rounded-2xl border border-line bg-background p-2 shadow-xl">
              <Link
                href={`/profile/${user.handle}`}
                className="block rounded-xl p-3 font-bold hover:bg-surface"
              >
                View your profile
              </Link>
              <form action="/api/auth/logout" method="POST">
                <button className="w-full rounded-xl p-3 text-left font-bold hover:bg-surface">
                  Log out @{user.handle}
                </button>
              </form>
            </div>
          </details>
        )}
      </div>
    </header>
  );
}
