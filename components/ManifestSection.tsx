"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ManifestSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = [badgeRef.current, headingRef.current, introRef.current, listRef.current, closingRef.current].filter(Boolean);
      gsap.fromTo(
        targets,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none reverse" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifest"
      ref={sectionRef}
      className="bg-[var(--muted-bg)] px-6 py-24 md:py-32"
      aria-labelledby="manifest-heading"
    >
      <div className="mx-auto max-w-3xl">
        <span
          ref={badgeRef}
          className="inline-block rounded-full border border-[var(--foreground)]/10 bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--foreground)]"
        >
          Philosophie
        </span>
        <h2
          id="manifest-heading"
          ref={headingRef}
          className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl"
        >
          Das Manifest. Studio of Two.
        </h2>
        <p ref={introRef} className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
          Wir bleiben klein, damit das Ergebnis gross bleibt. Scaling war nie unser Ziel. Wir sind ein Studio im kleinen Kreis, ansässig zwischen dem Crypto Valley in Zug und dem Finanzplatz Zürich. Alles, was unser Haus verlässt, wurde von unseren eigenen Händen geformt.
        </p>
        <ul ref={listRef} className="mt-8 space-y-2 text-lg font-semibold text-[var(--foreground)]">
          <li>Kein Outsourcing. Keine Abkürzungen. Keine Kompromisse.</li>
        </ul>
        <p ref={closingRef} className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
          Wir nutzen Technologie, um schneller zu denken – nicht, um schlechter zu gestalten. Während andere in «AI-Slop» versinken, setzen wir auf Deep Focus und Deliberate Craft. KI optimiert unsere Workflows, aber unser Team kuratiert jeden Frame, jedes Wort und jede Sekunde Storytelling.
        </p>
      </div>
    </section>
  );
}
