import Link from "next/link";
import Avatar from "./Avatar";

const NAV = [
  { href: "/", label: "Home", icon: "M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3l9-8z" },
  {
    href: "/explore",
    label: "Explore",
    icon: "M10.25 4.25c-3.31 0-6 2.69-6 6s2.69 6 6 6c1.52 0 2.9-.56 3.96-1.48l4.63 4.64 1.42-1.42-4.64-4.63c.92-1.06 1.48-2.44 1.48-3.96 0-3.31-2.69-6-6-6zm-4 6c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z",
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: "M12 2C7.58 2 4 5.58 4 10v5l-2 2v1h20v-1l-2-2v-5c0-4.42-3.58-8-8-8zm0 20c1.38 0 2.5-1.12 2.5-2.5h-5c0 1.38 1.12 2.5 2.5 2.5z",
  },
  {
    href: "/wallet",
    label: "Escrow Wallet",
    icon: "M4 5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2H5c-.55 0-1-.45-1-1s.45-1 1-1h15V3H4zm13 8.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z",
  },
  {
    href: "/profile",
    label: "Profile",
    icon: "M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.34 0-10 1.67-10 5v3h20v-3c0-3.33-6.66-5-10-5z",
  },
];

export default function Sidebar({
  user,
}: {
  user: { name: string; handle: string; emoji: string; avatarColor: string };
}) {
  return (
    <header className="sticky top-0 hidden h-screen w-[76px] shrink-0 flex-col justify-between px-2 py-3 sm:flex xl:w-[260px]">
      <div className="flex flex-col gap-1">
        <Link
          href="/"
          className="mb-1 flex h-12 w-12 items-center justify-center rounded-full text-2xl font-black text-accent hover:bg-accent/10 xl:ml-1"
          title="Kairos"
        >
          ⧖
        </Link>

        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center gap-4 rounded-full p-3 text-xl transition-colors hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
              <path d={item.icon} />
            </svg>
            <span className="hidden xl:block">{item.label}</span>
          </Link>
        ))}

        <Link
          href="/create"
          className="mt-3 flex h-[52px] items-center justify-center rounded-full bg-accent font-bold text-black transition hover:bg-accent/90 xl:w-[90%]"
        >
          <span className="hidden xl:block">Start a Cause</span>
          <span className="text-2xl xl:hidden">+</span>
        </Link>
      </div>

      <div className="flex items-center gap-1">
        <Link
          href={`/profile/${user.handle}`}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-full p-3 transition hover:bg-white/10"
          title="Your profile"
        >
          <Avatar emoji={user.emoji} color={user.avatarColor} size={10} />
          <span className="hidden min-w-0 xl:block">
            <span className="block truncate text-[15px] font-bold">{user.name}</span>
            <span className="block truncate text-sm text-muted">@{user.handle}</span>
          </span>
        </Link>
        <form action="/api/auth/logout" method="POST" className="hidden shrink-0 xl:block">
          <button
            type="submit"
            title="Log out"
            className="rounded-full p-3 text-muted transition hover:bg-rose-400/10 hover:text-rose-400"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm4-10h-9v2h9v14h-9v2h9c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
            </svg>
          </button>
        </form>
      </div>
    </header>
  );
}
