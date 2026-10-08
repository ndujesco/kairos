import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSessionUser } from "@/lib/session";
import { headers } from "next/headers";
import { dbConnect } from "@/lib/db";
import { Notification } from "@/lib/models";
import Sidebar from "@/components/Sidebar";
import DesktopAlerts from "@/components/DesktopAlerts";
import LiveRefresh from "@/components/LiveRefresh";
import ThemeScript from "@/components/ThemeScript";
import RightRail from "@/components/RightRail";
import MobileNav, { MobileTopBar } from "@/components/MobileNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Kairos - Transparent Giving",
    template: "%s · Kairos",
  },
  description:
    "Donations are held in escrow, paid directly to verified vendors, and every donor gets a receipt for their share of each payment.",
  applicationName: "Kairos",
  keywords: [
    "donate",
    "Nigeria",
    "transparent giving",
    "crowdfunding",
    "escrow donations",
    "charity",
    "NGO accountability",
  ],
  openGraph: {
    type: "website",
    siteName: "Kairos",
    title: "Kairos - Transparent Giving",
    description:
      "Donations held in escrow, paid directly to verified vendors, with a receipt for every donor.",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kairos - Transparent Giving",
    description:
      "Donations held in escrow, paid directly to verified vendors, with a receipt for every donor.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSessionUser();
  /* The bell carries a count, and LiveRefresh re-renders this layout the moment
     anything lands, so it fills in without the viewer touching the page. */
  let unread = 0;
  if (user) {
    await dbConnect();
    /* The notifications page marks everything read as it renders, which is the
       same pass this count runs in. Reading the path lets the bell clear on
       arrival rather than a beat later. */
    const onBell = (await headers()).get("x-pathname") === "/notifications";
    unread = onBell
      ? 0
      : await Notification.countDocuments({ user: user._id, read: false });
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ThemeScript />
        {user ? (
          <>
            <MobileTopBar
              user={{ handle: user.handle, emoji: user.emoji, avatarColor: user.avatarColor }}
            />
            <div className="mx-auto flex min-h-screen max-w-[1280px] justify-center">
              <Sidebar
                unread={unread}
                user={{
                  name: user.name,
                  handle: user.handle,
                  emoji: user.emoji,
                  avatarColor: user.avatarColor,
                }}
              />
              <DesktopAlerts />
              <LiveRefresh />
              <main className="min-h-screen w-full max-w-[600px] border-line pb-24 sm:border-x sm:pb-0">
                {children}
              </main>
              <RightRail />
            </div>
            <MobileNav unread={unread} />
          </>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
