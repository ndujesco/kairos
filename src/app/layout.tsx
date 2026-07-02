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

export const metadata: Metadata = {
  title: "Kairos — Transparent Giving",
  description:
    "Give with proof, not faith. Every naira watched until it arrives at the need it was given for.",
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
