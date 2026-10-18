"use client";

import { startEditing, useVisitor } from "@/lib/visitor";

export default function Greeting() {
  const { ready, name } = useVisitor();

  // 先保留高度，避免載入後內容跳動
  return (
    <p className="mb-5 min-h-6 text-sm text-ink/80 sm:mb-6 sm:text-base">
      {ready && name && (
        <>
          歡迎光臨，<span className="font-serif font-black text-vermilion">{name}</span>。
          <button
            type="button"
            onClick={startEditing}
            className="ml-3 text-xs text-ink/40 underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            更改稱呼
          </button>
        </>
      )}
    </p>
  );
}
