"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import EvidenceViewer from "./EvidenceViewer";

export type UploadedEvidence = {
  id: string;
  label: string;
  url: string;
  kind: "photo" | "document";
};
export default function EvidenceUpload({
  causeId,
  files = [],
  onUploaded,
  onBusy,
  existingCount = 0,
}: {
  causeId?: string;
  files?: UploadedEvidence[];
  onUploaded?: (file: UploadedEvidence) => void;
  onBusy?: (busy: boolean) => void;
  existingCount?: number;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const input = useRef<HTMLInputElement>(null);
  async function upload(selected: FileList | null) {
    if (!selected?.length || busy) return;
    setBusy(true);
    onBusy?.(true);
    setError("");
    setNotice("");
    try {
      if (existingCount + files.length + selected.length > 10)
        throw new Error("You can attach up to 10 files to a cause.");
      let count = 0;
      for (const file of Array.from(selected)) {
        if (file.size > 3 * 1024 * 1024)
          throw new Error(`${file.name} is larger than 3 MB.`);
        const form = new FormData();
        form.set("file", file);
        if (causeId) form.set("causeId", causeId);
        const res = await fetch("/api/evidence", {
          method: "POST",
          body: form,
          signal: AbortSignal.timeout(15000),
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.error || "Could not upload this file.");
        onUploaded?.(data);
        count++;
        setNotice(`${count} document${count === 1 ? "" : "s"} added.`);
      }
    } catch (e) {
      setError(
        e instanceof Error && e.name !== "TimeoutError"
          ? e.message
          : "Upload timed out. Please try again.",
      );
    } finally {
      setBusy(false);
      onBusy?.(false);
      if (input.current) input.current.value = "";
      if (causeId) router.refresh();
    }
  }
  return (
    <div className="rounded-2xl border border-dashed border-line p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-bold">Supporting documents</p>
        <button
          type="button"
          disabled={busy}
          onClick={() => input.current?.click()}
          className="rounded-full border border-accent/40 px-4 py-1.5 text-sm font-bold text-accent hover:bg-accent/10 disabled:opacity-50"
        >
          {busy ? "Uploading…" : "+ Add documents"}
        </button>
      </div>
      <input
        ref={input}
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png,.webp,.gif,.heic,.doc,.docx,.txt"
        aria-label="Upload supporting documents"
        className="sr-only"
        onChange={(e) => upload(e.target.files)}
        disabled={busy}
      />
      <p className="mt-2 text-[12px] leading-relaxed text-muted">
        Bills, photos, letters or other proof. Up to 10 files, 3 MB each. Files
        become public with your cause. You can add more after publishing.
      </p>
      {files.length > 0 && (
        <ul className="mt-2 space-y-1 text-sm">
          {files.map((f) => (
            <li key={f.id} className="break-all">
              <EvidenceViewer url={f.url} label={f.label} />
            </li>
          ))}
        </ul>
      )}
      {notice && (
        <p role="status" className="mt-2 text-sm text-accent">
          {notice}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-2 text-sm text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}
