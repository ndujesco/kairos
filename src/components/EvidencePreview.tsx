"use client";

import { useState } from "react";
import type { UploadedEvidence } from "./EvidenceUpload";

export default function EvidencePreview({ files }: { files: UploadedEvidence[] }) {
  const [selected, setSelected] = useState("");
  const file = files.find((f) => f.id === selected) ?? files[0];
  if (!file) return null;
  const pdf = /\.pdf$/i.test(file.label);
  return (
    <section className="overflow-hidden rounded-xl border border-line" aria-label="Document preview">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line p-3">
        <div className="min-w-0">
          <h3 className="text-sm font-bold">Document preview</h3>
          <p className="break-all text-xs text-muted">{file.label}</p>
        </div>
        <a href={file.url} target="_blank" rel="noreferrer" className="text-sm font-bold text-accent">Open document</a>
      </div>
      {files.length > 1 && (
        <select aria-label="Choose document to preview" value={file.id} onChange={(e) => setSelected(e.target.value)} className="m-3 max-w-[90%] rounded-lg border border-line bg-background p-2 text-sm">
          {files.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
        </select>
      )}
      {pdf ? (
        <iframe src={`${file.url}#view=FitH&navpanes=0`} title={`Preview of ${file.label}`} className="h-[420px] w-full border-0 bg-white" />
      ) : file.kind === "photo" ? (
        // Private same-origin evidence URLs retain the signed-in user's access.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={file.url} alt={file.label} className="max-h-[420px] w-full bg-white object-contain" />
      ) : (
        <p className="p-4 text-sm text-muted">This file is attached. Open the document to view its contents.</p>
      )}
    </section>
  );
}
