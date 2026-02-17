"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

const HeroWebGL = dynamic(() => import("./HeroWebGL"), { ssr: false });

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          sublineRef.current,
          { opacity: 0, y: 24 },
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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24"
      aria-label="Hero"
    >
      <HeroWebGL />
      <div className="relative z-10 max-w-4xl text-center">
        <h1
          ref={headlineRef}
          className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Motion Grafiken, die überzeugen
        </h1>
        <p
          ref={sublineRef}
          className="mt-6 text-lg text-zinc-400 sm:text-xl md:mt-8"
        >
          Explainvideos und Motion Design für SaaS & Tech – professionell, aus
          der Schweiz.
        </p>
        <Link
          ref={ctaRef}
          href="#showcase"
          className="mt-10 inline-block rounded-full bg-[var(--accent)] px-8 py-4 text-base font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90 sm:mt-12"
        >
          Videos ansehen
        </Link>
      </div>
    </section>
  );
}
