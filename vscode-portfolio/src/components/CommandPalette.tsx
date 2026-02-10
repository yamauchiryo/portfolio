import { useEffect, useMemo, useRef, useState } from "react";
import type { FileId } from "../content";

export function CommandPalette({
  open,
  onClose,
  files,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  files: { id: FileId; label: string }[];
  onPick: (id: FileId) => void;
}) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return files;
    return files.filter((f) => f.label.toLowerCase().includes(s));
  }, [q, files]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "Enter" && filtered[0]) {
        onPick(filtered[0].id);
        onClose();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, filtered, onClose, onPick]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-24"
      onMouseDown={onClose}
    >
      <div
        className="w-[720px] max-w-[92vw] rounded-xl border border-white/10 bg-[#252526] shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="border-b border-white/10 p-3">
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type to search files… (Enter to open)"
            className="w-full bg-[#1e1e1e] text-white placeholder:text-white/40 rounded-lg px-3 py-2 outline-none border border-white/10"
          />
        </div>
        <div className="max-h-[360px] overflow-auto">
          {filtered.map((f) => (
            <button
              key={f.id}
              className="w-full text-left px-3 py-2 hover:bg-white/5 flex items-center gap-2"
              onClick={() => {
                onPick(f.id);
                onClose();
              }}
            >
              <span className="text-[#4fc1ff]">📄</span>
              <span className="text-white/90">{f.label}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-3 py-8 text-white/60">No matches.</div>
          )}
        </div>
        <div className="border-t border-white/10 px-3 py-2 text-xs text-white/50">
          Tip: Press <b>Enter</b> to open first result, <b>Esc</b> to close
        </div>
      </div>
    </div>
  );
}
