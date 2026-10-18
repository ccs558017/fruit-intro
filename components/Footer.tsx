import InterestForm from "./InterestForm";

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-16 bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-paper/50">
            04 — 訂購
          </p>
          <h2 className="mt-6 font-serif text-4xl font-black leading-[1.15] sm:text-6xl lg:text-7xl">
            想吃當季的，
            <br />
            <span className="text-vermilion">先問我們。</span>
          </h2>
        </div>
        <div className="self-end text-paper/80">
          <p className="leading-relaxed">
            每週依產季挑選果園，產地直送。來信告訴我們你想吃什麼，我們回覆目前最好的那一批。
          </p>
          <a
            href="mailto:fruit@example.com"
            className="mt-6 inline-block border-b border-paper/60 pb-1 break-all font-serif text-xl transition-colors sm:text-2xl hover:border-vermilion hover:text-vermilion"
          >
            fruit@example.com
          </a>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <InterestForm />
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-4 py-5 text-xs sm:px-6 text-paper/50">
          <span>© 2026 台灣果誌</span>
          <span>依季節而生的水果誌</span>
        </div>
      </div>
    </footer>
  );
}
