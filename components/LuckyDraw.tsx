"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const WIN_RATE = 0.1;
const COUPON_CODE = "MANGO90";
const SPIN_MS = 1400;
const reel = ["🥭", "🍍", "🍈", "🍎", "🍇", "🍊"];

type Phase = "idle" | "spinning" | "win" | "lose";

export default function LuckyDraw() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [face, setFace] = useState(reel[0]);
  const [copied, setCopied] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const close = useCallback(() => {
    clearTimers();
    setOpen(false);
    setPhase("idle");
    setCopied(false);
  }, [clearTimers]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  useEffect(() => clearTimers, [clearTimers]);

  const draw = () => {
    if (phase === "spinning") return;
    setPhase("spinning");
    setCopied(false);
    const won = Math.random() < WIN_RATE;

    let i = 0;
    const tick = () => {
      i += 1;
      setFace(reel[i % reel.length]);
      timers.current.push(window.setTimeout(tick, 90));
    };
    tick();

    timers.current.push(
      window.setTimeout(() => {
        clearTimers();
        setFace(won ? "🥭" : reel[1 + Math.floor(Math.random() * (reel.length - 1))]);
        setPhase(won ? "win" : "lose");
      }, SPIN_MS),
    );
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COUPON_CODE);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-ink/80 bg-vermilion px-5 py-3 text-sm font-medium text-paper shadow-[0_8px_20px_-6px_rgba(27,26,23,0.5)] transition hover:-translate-y-0.5 hover:bg-ink sm:bottom-6 sm:right-6"
      >
        <span aria-hidden>🎁</span>
        抽芒果優惠
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="draw-title"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-[2px] bg-paper p-6 text-center shadow-2xl sm:p-8"
          >
            <button
              type="button"
              aria-label="關閉"
              onClick={close}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center text-2xl leading-none text-ink/50 transition-colors hover:text-ink"
            >
              ×
            </button>

            <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/50">
              Lucky Draw
            </p>
            <h2 id="draw-title" className="mt-3 font-serif text-3xl font-black">
              芒果幸運抽
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">
              每次有 10% 機會抽中芒果優惠券 9 折
            </p>

            <div
              className={`mx-auto mt-6 flex h-28 w-28 items-center justify-center rounded-full border-2 text-6xl transition-colors ${
                phase === "win"
                  ? "border-vermilion bg-vermilion/10"
                  : "border-ink/20 bg-white/50"
              } ${phase === "spinning" ? "animate-pulse" : ""}`}
              aria-hidden
            >
              {face}
            </div>

            <div className="mt-6 min-h-24" aria-live="polite">
              {phase === "win" && (
                <>
                  <p className="font-serif text-2xl font-black text-vermilion">恭喜中獎！</p>
                  <p className="mt-1 text-sm text-ink/70">芒果優惠券 9 折</p>
                  <button
                    type="button"
                    onClick={copy}
                    className="mt-3 inline-flex items-center gap-3 border border-dashed border-ink/50 px-4 py-2 font-mono text-lg tracking-widest transition-colors hover:border-vermilion hover:text-vermilion"
                  >
                    {COUPON_CODE}
                    <span className="text-xs tracking-normal text-ink/50">
                      {copied ? "已複製" : "點擊複製"}
                    </span>
                  </button>
                </>
              )}
              {phase === "lose" && (
                <>
                  <p className="font-serif text-2xl font-black">差一點點</p>
                  <p className="mt-1 text-sm text-ink/70">這次沒抽中，再試一次吧！</p>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={draw}
              disabled={phase === "spinning"}
              className="mt-2 w-full rounded-full border border-ink/80 bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-vermilion disabled:cursor-wait disabled:opacity-60"
            >
              {phase === "spinning" ? "抽獎中…" : phase === "idle" ? "開始抽獎" : "再抽一次"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
