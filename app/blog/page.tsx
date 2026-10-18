import type { Metadata } from "next";
import Image from "next/image";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "文章 | 台灣水果誌",
  description: "關於愛文芒果的三篇文章：品種由來、挑選保存與吃法。",
};

export default function BlogPage() {
  return (
    <>
      {/* 標題 */}
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pb-16 sm:pt-16 lg:pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50 sm:text-xs sm:tracking-[0.3em]">
          05 — 文章
        </p>
        <h1 className="mt-6 font-serif text-[clamp(2.75rem,10vw,7rem)] font-black leading-[1.05] tracking-tight sm:mt-8">
          芒果<span className="text-vermilion">專題</span>
        </h1>
        <p className="mt-6 max-w-xl leading-loose text-ink/75">
          夏天的第一種水果。從品種由來、挑選保存到各種吃法，三篇文章讀完，下次買芒果更有把握。
        </p>
      </section>

      {/* 主圖 */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2px] sm:aspect-[21/9]">
          <Image
            src="/images/mango.jpg"
            alt="愛文芒果"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
      </div>

      {/* 文章：三欄並排 */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid divide-y divide-ink/15 border-y border-ink/15 md:grid-cols-3 md:divide-x md:divide-y-0">
          {posts.map((p) => (
            <article
              key={p.slug}
              id={p.slug}
              className="scroll-mt-20 py-10 md:px-6 md:py-12 md:first:pl-0 md:last:pr-0 lg:px-10"
            >
              <header>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-vermilion">
                  {p.no} / {p.tag}
                </p>
                <h2 className="mt-4 font-serif text-2xl font-black leading-tight sm:text-3xl">
                  {p.title}
                </h2>
                <p className="mt-4 text-sm leading-loose text-ink/60">{p.summary}</p>
              </header>
              <div className="mt-8 space-y-6 text-[15px] leading-loose text-ink/80">
                {p.body.map((b, i) => (
                  <section key={i}>
                    {b.heading && (
                      <h3 className="mb-2 font-serif text-lg font-black text-ink">
                        {b.heading}
                      </h3>
                    )}
                    <p>{b.text}</p>
                  </section>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
