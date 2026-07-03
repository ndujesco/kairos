import LoginClient from "./LoginClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sign in",
  description:
    "Sign in to Kairos to give, or to manage your causes. Donations are held in escrow and paid directly to verified vendors.",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return <LoginClient />;
}
