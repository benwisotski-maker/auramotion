"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.2"
        )
        .fromTo(
          sublineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[85vh] flex-col items-center justify-center bg-[var(--background)] px-6 py-28"
      aria-label="Hero"
    >
      <div className="mx-auto max-w-4xl text-center">
        <span
          ref={badgeRef}
          className="inline-block rounded-full border border-[var(--foreground)]/15 bg-[var(--muted-bg)] px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--foreground)]"
        >
          Motion Design Schweiz
        </span>
        <h1
          ref={headlineRef}
          className="mt-6 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl lg:text-6xl"
        >
          Motion Grafiken, die überzeugen
        </h1>
        <p
          ref={sublineRef}
          className="mt-6 text-lg text-[var(--muted)] sm:text-xl"
        >
          Explainvideos und Motion Design für SaaS & Tech – professionell, aus
          der Schweiz.
        </p>
        <div
          ref={ctaRef}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
        >
          <Link
            href="#showcase"
            className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-8 py-4 text-base font-medium text-white shadow-sm transition-opacity hover:opacity-90"
          >
            Videos ansehen
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="#contact"
            className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-transparent px-8 py-4 text-base font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--muted-bg)]"
          >
            Kontakt
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
