"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginClient() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // shared fields
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");

  // signup fields
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [verifying, setVerifying] = useState<"idle" | "checking" | "ok">("idle");

  async function signin() {
    if (!handle.trim() || !password) {
      setError("Enter your handle and password.");
      return;
    }
    setError("");
    setBusy(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ handle, password }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error || "Sign in failed");
      setBusy(false);
      return;
    }
    router.push("/");
    router.refresh();
  }

  async function signup() {
    if (!name.trim() || !handle.trim()) {
      setError("Fill in your name and a handle.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (idNumber.replace(/\D/g, "").length < 11) {
      setError("Enter a valid 11-digit BVN or NIN.");
      return;
    }
    setError("");
    setBusy(true);
    setVerifying("checking");
    await new Promise((r) => setTimeout(r, 1800)); // mock NIBSS/NIMC lookup
    setVerifying("ok");
    await new Promise((r) => setTimeout(r, 700));
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, handle, password }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error || "Signup failed");
      setVerifying("idle");
      setBusy(false);
      return;
    }
    router.push("/");
    router.refresh();
  }

  const inputCls =
    "rounded-xl border border-line bg-transparent px-4 py-3 outline-none placeholder:text-muted focus:border-accent";

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* brand panel */}
      <div className="flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-emerald-950 via-black to-black p-8 md:flex-1 md:gap-6 md:p-10">
        <span className="text-6xl leading-none text-accent md:text-[120px]">⧖</span>
        <h1 className="max-w-md text-center text-2xl font-extrabold leading-tight md:text-4xl">
          Giving shouldn’t be an act of faith.
        </h1>
        <p className="hidden max-w-md text-center text-lg text-muted md:block">
          Kairos holds every donation in escrow, pays verified vendors directly, and sends you a receipt for your share of every payment.
        </p>
      </div>

      {/* auth panel */}
      <div className="flex w-full flex-col justify-center p-6 md:max-w-xl md:p-14">
        <div className="mb-6 flex rounded-full border border-line p-1 text-sm font-bold">
          <button
            onClick={() => { setMode("signin"); setError(""); }}
            className={`flex-1 rounded-full py-2 transition ${
              mode === "signin" ? "bg-accent text-black" : "text-muted hover:text-foreground"
            }`}
          >
            Sign in
          </button>
          <button
            onClick={() => { setMode("signup"); setError(""); }}
            className={`flex-1 rounded-full py-2 transition ${
              mode === "signup" ? "bg-accent text-black" : "text-muted hover:text-foreground"
            }`}
          >
            Create account
          </button>
        </div>

        <h2 className="text-2xl font-extrabold md:text-3xl">
          {mode === "signin" ? "Welcome back" : "Join Kairos"}
        </h2>
        <p className="mb-6 mt-1 text-sm text-muted md:text-base">
          {mode === "signin"
            ? "Sign in to give, or to manage your causes."
            : "Every account is tied to one real identity. One person, one reputation."}
        </p>

        {mode === "signin" ? (
          <div className="flex flex-col gap-3">
            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="Handle (e.g. ugo)"
              autoCapitalize="none"
              className={inputCls}
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && signin()}
              placeholder="Password"
              type="password"
              className={inputCls}
            />
            {error && <p className="text-sm text-rose-400">{error}</p>}
            <button
              onClick={signin}
              disabled={busy}
              className="mt-1 rounded-full bg-accent py-3 font-bold text-black transition hover:bg-accent/90 disabled:opacity-60"
            >
              {busy ? "Signing in…" : "Sign in"}
            </button>
            <p className="text-center text-sm text-muted">
              New here?{" "}
              <button onClick={() => setMode("signup")} className="font-bold text-accent hover:underline">
                Create an account
              </button>
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name (as on BVN/NIN)"
              className={inputCls}
            />
            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))}
              placeholder="Handle (e.g. ada_gives)"
              autoCapitalize="none"
              className={inputCls}
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min. 6 characters)"
              type="password"
              className={inputCls}
            />
            <input
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="BVN or NIN (11 digits)"
              inputMode="numeric"
              className={inputCls}
            />

            {verifying === "checking" && (
              <div className="flex items-center gap-3 rounded-xl border border-line bg-white/5 p-3 text-sm text-muted">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-line border-t-accent" />
                Verifying identity with NIBSS/NIMC…
              </div>
            )}
            {verifying === "ok" && (
              <div className="flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 p-3 text-sm text-accent">
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-current">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Identity verified
              </div>
            )}
            {error && <p className="text-sm text-rose-400">{error}</p>}

            <button
              onClick={signup}
              disabled={busy}
              className="mt-1 rounded-full bg-accent py-3 font-bold text-black transition hover:bg-accent/90 disabled:opacity-60"
            >
              {busy ? "Creating account…" : "Verify & create account"}
            </button>
            <p className="text-[12px] text-muted">
              Identity check is simulated in this prototype; production uses NIBSS BVN-matching and
              NIMC NIN lookup.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
