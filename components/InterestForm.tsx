"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ok"; message: string }
  | { kind: "error"; message: string };

export default function InterestForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status.kind === "loading") return;
    setStatus({ kind: "loading" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { message?: string };
      if (res.ok) {
        setStatus({ kind: "ok", message: data.message ?? "加入成功！" });
        setEmail("");
      } else {
        setStatus({ kind: "error", message: data.message ?? "發生錯誤，請稍後再試" });
      }
    } catch {
      setStatus({ kind: "error", message: "網路連線有問題，請稍後再試" });
    }
  };

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h3 className="font-serif text-2xl font-black sm:text-3xl">搶先收到產季通知</h3>
      <p className="mt-3 text-sm leading-loose text-paper/70 sm:text-base">
        當季水果開始採收的那一刻，我們會第一時間通知你，還有搶先預購的專屬優惠。
      </p>

      <form onSubmit={submit} noValidate className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status.kind !== "loading") setStatus({ kind: "idle" });
          }}
          placeholder="your@email.com"
          aria-label="Email"
          autoComplete="email"
          aria-invalid={status.kind === "error"}
          className="min-w-0 flex-1 rounded-full border border-paper/25 bg-paper/10 px-6 py-3 text-paper outline-none transition-colors placeholder:text-paper/40 focus:border-vermilion"
        />
        <button
          type="submit"
          disabled={status.kind === "loading"}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-paper px-7 py-3 text-sm font-medium text-ink transition hover:bg-vermilion hover:text-paper disabled:cursor-wait disabled:opacity-60"
        >
          {status.kind === "loading" ? "送出中…" : "加入興趣名單"}
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </form>

      <p
        aria-live="polite"
        className={`mt-3 min-h-6 text-sm ${
          status.kind === "error" ? "text-[#ff8a75]" : "text-paper/80"
        }`}
      >
        {(status.kind === "ok" || status.kind === "error") && status.message}
      </p>
    </div>
  );
}
