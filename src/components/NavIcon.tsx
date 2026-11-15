export default function NavIcon({
  name,
  active = false,
  className = "h-[26px] w-[26px]",
}: {
  name: string;
  active?: boolean;
  className?: string;
}) {
  const paths: Record<string, string> = {
    Home: "m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z",
    Explore: "m21 21-5-5M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z",
    Notifications: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
    Wallet: "M20 7H5a2 2 0 0 1 0-4h14M3 5v14a2 2 0 0 0 2 2h15V7M20 11h-5v6h5",
    Profile: "M20 21a8 8 0 0 0-16 0M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
    Create: "m14 4 6 6M4 20l5-1L21 7a2.1 2.1 0 0 0-4-4L5 15Z",
    Share: "M12 16V3m-5 5 5-5 5 5M5 13v7h14v-7",
    Comment: "M21 11.5a9.5 9.5 0 0 1-9.5 9.5H3l2-5A9.5 9.5 0 1 1 21 11.5Z",
    Heart:
      "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
  };
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={active && name !== "Explore" ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={active ? 2 : 1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] ?? paths.Home} />
    </svg>
  );
}
