"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-[var(--border)]/60 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="#"
          className="flex items-center gap-2 rounded-full bg-[var(--muted-bg)] px-4 py-2 text-sm font-semibold text-[var(--foreground)]"
          aria-label="AuraMotion Startseite"
        >
          <span className="text-lg font-bold tracking-tight">AuraMotion</span>
        </Link>
        <nav className="hidden items-center gap-8 sm:flex" aria-label="Hauptnavigation">
          <Link
            href="#"
            className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            Home
          </Link>
          <Link
            href="#showcase"
            className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            Arbeiten
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            Über uns
          </Link>
        </nav>
        <Link
          href="#contact"
          className="rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Mehr erfahren
        </Link>
      </div>
    </header>
  );
}
