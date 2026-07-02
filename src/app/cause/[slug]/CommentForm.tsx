"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommentForm({ causeId }: { causeId: string }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  async function post() {
    if (!text.trim() || busy) return;
    setBusy(true);
    await fetch(`/api/causes/${causeId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setText("");
    setBusy(false);
    router.refresh();
  }

  return (
    <div className="mt-3 flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && post()}
        placeholder="Say something encouraging…"
        className="flex-1 rounded-full border border-line bg-transparent px-4 py-2 text-[15px] outline-none placeholder:text-muted focus:border-accent"
      />
      <button
        onClick={post}
        disabled={busy || !text.trim()}
        className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-black disabled:opacity-40"
      >
        Post
      </button>
    </div>
  );
}
