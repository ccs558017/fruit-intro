"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavLink = { href: string; no: string; label: string };

export default function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "關閉選單" : "開啟選單"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 flex h-10 w-10 items-center justify-center"
      >
        <span className="relative block h-3.5 w-6">
          <span
            className={`absolute left-0 h-0.5 w-6 bg-ink transition-all duration-300 ${
              open ? "top-1.5 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1.5 h-0.5 w-6 bg-ink transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 h-0.5 w-6 bg-ink transition-all duration-300 ${
              open ? "top-1.5 -rotate-45" : "top-3"
            }`}
          />
        </span>
      </button>

      {open && (
        <nav
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-ink/15 bg-paper shadow-[0_16px_24px_-16px_rgba(27,26,23,0.35)]"
        >
          <ul className="mx-auto max-w-7xl divide-y divide-ink/10 px-4 sm:px-6">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4 font-serif text-2xl font-black transition-colors hover:text-vermilion"
                >
                  <span className="font-mono text-xs font-normal text-ink/40">{l.no}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
