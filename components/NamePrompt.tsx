"use client";

import { useEffect, useRef } from "react";
import { MAX_LENGTH, saveName, skipName, useVisitor } from "@/lib/visitor";

export default function NamePrompt() {
  const { ready, name, skipped, editing } = useVisitor();
  const open = ready && (editing || (!name && !skipped));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skipName();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
      onClick={skipName}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="name-title"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          saveName(inputRef.current?.value ?? "");
        }}
        className="w-full max-w-sm rounded-[2px] bg-paper p-6 shadow-2xl sm:p-8"
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/50">Welcome</p>
        <h2 id="name-title" className="mt-3 font-serif text-3xl font-black leading-tight">
          歡迎來到台灣果誌
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/60">怎麼稱呼你呢？</p>

        <input
          ref={inputRef}
          type="text"
          defaultValue={name}
          maxLength={MAX_LENGTH}
          placeholder="輸入你的稱呼"
          aria-label="你的稱呼"
          autoComplete="nickname"
          className="mt-5 w-full border-b-2 border-ink/30 bg-transparent px-1 py-2 text-lg outline-none transition-colors focus:border-vermilion"
        />

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={skipName}
            className="text-sm text-ink/50 underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            先逛逛
          </button>
          <button
            type="submit"
            className="rounded-full border border-ink/80 bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-vermilion"
          >
            開始瀏覽
          </button>
        </div>
      </form>
    </div>
  );
}
