import type { Metadata } from "next";
import MangoGame from "@/components/MangoGame";

export const metadata: Metadata = {
  title: "接芒果 | 台灣水果誌",
  description: "15 秒接芒果小遊戲，看看你能拿幾分。",
};

export default function GamePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50 sm:text-xs sm:tracking-[0.3em]">
        06 — 遊戲
      </p>
      <h1 className="mb-8 mt-6 font-serif text-[clamp(2.75rem,10vw,6rem)] font-black leading-[1.05] tracking-tight sm:mb-10 sm:mt-8">
        接<span className="text-vermilion">芒果</span>
      </h1>
      <MangoGame />
    </section>
  );
}
