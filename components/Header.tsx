import Link from "next/link";
import MobileNav from "./MobileNav";

const links = [
  { href: "/#calendar", no: "01", label: "產季" },
  { href: "/#fruits", no: "02", label: "水果" },
  { href: "/#why", no: "03", label: "緣由" },
  { href: "/#contact", no: "04", label: "訂購" },
  { href: "/blog", no: "05", label: "文章" },
  { href: "/game", no: "06", label: "遊戲" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/15 bg-paper/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="shrink-0 font-serif text-lg font-black tracking-widest sm:text-xl">
          台灣果誌
          <span className="ml-3 hidden font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-ink/50 lg:inline">
            Taiwan Fruit Almanac
          </span>
        </Link>
        <nav className="hidden gap-5 text-sm md:flex lg:gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group flex items-baseline gap-1.5 transition-colors hover:text-vermilion"
            >
              <span className="font-mono text-[10px] text-ink/40 group-hover:text-vermilion">
                {l.no}
              </span>
              {l.label}
            </Link>
          ))}
        </nav>
        <MobileNav links={links} />
      </div>
    </header>
  );
}
