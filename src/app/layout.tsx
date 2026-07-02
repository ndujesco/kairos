import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSessionUser } from "@/lib/session";
import Sidebar from "@/components/Sidebar";
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
    default: "Kairos — Transparent Giving",
    template: "%s · Kairos",
  },
  description:
    "Give with proof, not faith. Donations are held in escrow, paid directly to verified vendors, and every donor sees exactly what their naira did.",
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
    title: "Kairos — Transparent Giving",
    description:
      "Give with proof, not faith. Every naira watched until it arrives at the need it was given for.",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kairos — Transparent Giving",
    description:
      "Give with proof, not faith. Every naira watched until it arrives at the need it was given for.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSessionUser();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {user ? (
          <>
            <MobileTopBar
              user={{ handle: user.handle, emoji: user.emoji, avatarColor: user.avatarColor }}
            />
            <div className="mx-auto flex min-h-screen max-w-[1280px] justify-center">
              <Sidebar
                user={{
                  name: user.name,
                  handle: user.handle,
                  emoji: user.emoji,
                  avatarColor: user.avatarColor,
                }}
              />
              <main className="min-h-screen w-full max-w-[600px] border-line pb-24 sm:border-x sm:pb-0">
                {children}
              </main>
              <RightRail />
            </div>
            <MobileNav />
          </>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
