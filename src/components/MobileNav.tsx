import Link from "next/link";
import Avatar from "./Avatar";

const TABS = [
  { href: "/", label: "Home", icon: "M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3l9-8z" },
  {
    href: "/explore",
    label: "Explore",
    icon: "M10.25 4.25c-3.31 0-6 2.69-6 6s2.69 6 6 6c1.52 0 2.9-.56 3.96-1.48l4.63 4.64 1.42-1.42-4.64-4.63c.92-1.06 1.48-2.44 1.48-3.96 0-3.31-2.69-6-6-6zm-4 6c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z",
  },
  {
    href: "/notifications",
    label: "Alerts",
    icon: "M12 2C7.58 2 4 5.58 4 10v5l-2 2v1h20v-1l-2-2v-5c0-4.42-3.58-8-8-8zm0 20c1.38 0 2.5-1.12 2.5-2.5h-5c0 1.38 1.12 2.5 2.5 2.5z",
  },
  {
    href: "/wallet",
    label: "Wallet",
    icon: "M4 5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2H5c-.55 0-1-.45-1-1s.45-1 1-1h15V3H4zm13 8.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z",
  },
];

export function MobileTopBar({
  user,
}: {
  user: { handle: string; emoji: string; avatarColor: string };
}) {
  return (
    <div className="flex items-center justify-between border-b border-line bg-black px-4 py-2 sm:hidden">
      <Link href="/" className="text-2xl font-black text-accent" title="Kairos">
        ⧖ <span className="text-base font-extrabold text-foreground">Kairos</span>
      </Link>
      <Link href={`/profile/${user.handle}`} title="Profile">
        <Avatar emoji={user.emoji} color={user.avatarColor} size={8} />
      </Link>
    </div>
  );
}

export default function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-around border-t border-line bg-black/90 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden">
      {TABS.slice(0, 2).map((t) => (
        <Link key={t.href} href={t.href} className="flex flex-col items-center gap-0.5 p-2.5 text-muted">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path d={t.icon} />
          </svg>
          <span className="text-[10px] font-bold">{t.label}</span>
        </Link>
      ))}

      <Link
        href="/create"
        className="-mt-5 flex items-center justify-center rounded-full bg-accent text-3xl font-bold text-black shadow-[0_0_20px_rgba(0,186,124,0.4)]"
        title="Start a Cause"
        style={{ width: 52, height: 52 }}
      >
        +
      </Link>

      {TABS.slice(2).map((t) => (
        <Link key={t.href} href={t.href} className="flex flex-col items-center gap-0.5 p-2.5 text-muted">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path d={t.icon} />
          </svg>
          <span className="text-[10px] font-bold">{t.label}</span>
        </Link>
      ))}
    </nav>
  );
}
