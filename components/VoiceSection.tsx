"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const traits = [
  { label: "Souverän, aber nicht arrogant", text: "Wir wissen, was wir können. Wir müssen nicht schreien." },
  { label: "Minimalistisch", text: "Wir nutzen keine Buzzwords. Wir sagen, was Sache ist." },
  { label: "Philosophisch & Technisch", text: "Wir verbinden die Alchemie der Kreativität mit der Strenge der Technik." },
];

export default function VoiceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = [badgeRef.current, headingRef.current, quoteRef.current, listRef.current].filter(Boolean);
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
      id="tonalitaet"
      ref={sectionRef}
      className="bg-white px-8 py-28 md:px-12 md:py-36"
      aria-labelledby="voice-heading"
    >
      <div className="mx-auto max-w-3xl">
        <span
          ref={badgeRef}
          className="section-tag inline-block rounded-full bg-black px-4 py-2 text-xs font-extrabold uppercase tracking-tight text-white"
        >
          Tone of Voice
        </span>
        <h2
          id="voice-heading"
          ref={headingRef}
          className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl"
        >
          Unsere Sprache ist unser Filter.
        </h2>
        <p ref={quoteRef} className="mt-10 rounded-[28px] border-l-4 border-[var(--foreground)]/20 bg-[var(--muted-bg)] py-6 pl-8 pr-6 text-lg italic leading-relaxed text-[var(--muted)]">
          Bewegung ist eine Sprache, kein Effekt. Wir sprechen sie fliessend.
        </p>
        <div ref={listRef} className="mt-12 space-y-8">
          {traits.map((t) => (
            <div key={t.label}>
              <h3 className="font-bold text-[var(--foreground)]">{t.label}</h3>
              <p className="mt-1 text-[var(--muted)]">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
