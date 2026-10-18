import Image from "next/image";
import Greeting from "@/components/Greeting";
import { fruits } from "@/lib/fruits";

const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const reasons = [
  {
    title: "氣候",
    text: "北回歸線橫越島嶼中段，熱帶與亞熱帶並存。日照足、雨量豐，一年四季都有東西成熟。",
  },
  {
    title: "地形",
    text: "從沿海平原到三千公尺以上的高山，不到半天車程，海拔與溫差就換了一套。同一種水果，因此長出不同的性格。",
  },
  {
    title: "人",
    text: "疏果、套袋、控水、採收時機。一代傳一代的細節，把甜度和穩定度一點一點堆上去。",
  },
];

export default function Home() {
  return (
    <>
      {/* 主視覺 */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-14 pt-10 sm:gap-10 sm:px-6 sm:pb-20 sm:pt-16 lg:grid-cols-[1.5fr_1fr] lg:pt-24">
        <div>
          <Greeting />
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50 sm:text-xs sm:tracking-[0.3em]">
            Vol.01 — 台灣的四季滋味
          </p>
          <h1 className="mt-8 font-serif text-[clamp(3rem,13vw,9rem)] font-black leading-[1.02] tracking-tight">
            四季，
            <br />
            都在
            <span className="text-vermilion">舌尖</span>上。
          </h1>
        </div>
        <div className="flex flex-col justify-end gap-8">
          <p className="max-w-sm leading-loose text-ink/75">
            一座不到四萬平方公里的島，從春天的鳳梨吃到冬天的蓮霧。
            這份水果誌依產季排列，記下六種最值得等待的台灣水果。
          </p>
          <a
            href="#fruits"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-ink/80 bg-gradient-to-b from-white/80 to-white/10 px-6 py-3 text-sm font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_16px_-6px_rgba(27,26,23,0.35)] backdrop-blur transition hover:bg-ink hover:text-paper"
          >
            開始翻閱
            <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </a>
        </div>
      </section>

      {/* 產季日曆 */}
      <section id="calendar" className="scroll-mt-16 border-y border-ink/15">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-3xl font-black sm:text-5xl">產季日曆</h2>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/50">
              01 — 什麼時候吃什麼
            </p>
          </div>

          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-[5rem_repeat(12,1fr)] pb-2 sm:grid-cols-[7rem_repeat(12,1fr)] font-mono text-[11px] text-ink/50">
                <span />
                {months.map((m) => (
                  <span key={m} className="text-center">
                    {m}月
                  </span>
                ))}
              </div>
              {fruits.map((f) => (
                <div
                  key={f.no}
                  className="grid grid-cols-[5rem_repeat(12,1fr)] items-center sm:grid-cols-[7rem_repeat(12,1fr)] border-t border-ink/10 py-2"
                >
                  <span className="font-serif text-lg font-black">{f.name.slice(-2)}</span>
                  {months.map((_, i) => {
                    const on = f.months.includes(i + 1);
                    return (
                      <span key={i} className="px-px">
                        <span
                          className="block h-6 rounded-[3px]"
                          style={{ background: on ? f.bg : "rgba(27,26,23,0.05)" }}
                        />
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 水果 */}
      <section id="fruits" className="scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 sm:pt-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/50">
            02 — 水果
          </p>
        </div>
        {fruits.map((f, i) => (
          <article
            key={f.no}
            className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-8 sm:px-6 sm:py-12 md:grid-cols-2 md:gap-10 lg:gap-20 lg:py-14"
          >
            <div
              className={`relative aspect-[5/4] overflow-hidden rounded-[2px] ${
                i % 2 ? "md:order-2" : ""
              }`}
              style={{ background: f.bg, color: f.fg }}
            >
              <Image
                src={f.image}
                alt={f.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
              <span className="absolute left-6 top-5 font-mono text-sm text-white/90">
                {f.no} / 06
              </span>
              <span className="absolute bottom-5 left-6 text-xs uppercase tracking-[0.25em] text-white/90">
                {f.en}
              </span>
            </div>

            <div>
              <h3 className="font-serif text-4xl font-black sm:text-5xl lg:text-6xl">{f.name}</h3>
              <p className="mt-6 max-w-md leading-loose text-ink/75">{f.desc}</p>
              <dl className="mt-8 max-w-md divide-y divide-ink/15 border-y border-ink/15 text-sm">
                {[
                  ["產季", f.season],
                  ["產地", f.area],
                  ["風味", f.taste],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[4rem_1fr] py-3">
                    <dt className="text-ink/50">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}
      </section>

      {/* 緣由 */}
      <section id="why" className="scroll-mt-16 border-t border-ink/15">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/50">
                03 — 緣由
              </p>
              <h2 className="mt-6 font-serif text-3xl font-black leading-tight sm:text-5xl">
                為什麼台灣的
                <br />
                水果特別好吃
              </h2>
            </div>
            <ol className="divide-y divide-ink/15 border-y border-ink/15">
              {reasons.map((r, i) => (
                <li key={r.title} className="grid gap-4 py-6 sm:py-8 md:grid-cols-[4rem_7rem_1fr] lg:grid-cols-[5rem_8rem_1fr]">
                  <span className="font-mono text-sm text-vermilion">0{i + 1}</span>
                  <h3 className="font-serif text-2xl font-black">{r.title}</h3>
                  <p className="leading-loose text-ink/75">{r.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
