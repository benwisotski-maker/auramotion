"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const edges = [
  {
    title: "Präzision",
    text: "Wie ein Uhrwerk – wir liefern pünktlich, diskret und in höchster Qualität.",
  },
  {
    title: "Verständnis",
    text: "Wir verstehen die lokale Business-Kultur in Zug und Zürich, sprechen aber die Sprache des globalen Silicon Valleys.",
  },
  {
    title: "Vertrauen",
    text: "Ein Handschlag (oder ein Kaffee in der Bahnhofstrasse) zählt bei uns noch.",
  },
];

export default function SwissEdgeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = [badgeRef.current, headingRef.current, introRef.current, ...cardRefs.current].filter(Boolean);
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
      id="swiss-edge"
      ref={sectionRef}
      className="bg-white px-8 py-28 md:px-12 md:py-36"
      aria-labelledby="swiss-edge-heading"
    >
      <div className="mx-auto max-w-4xl">
        <span
          ref={badgeRef}
          className="section-tag inline-block rounded-full bg-black px-4 py-2 text-xs font-extrabold uppercase tracking-tight text-white"
        >
          Lokale Identität
        </span>
        <h2
          id="swiss-edge-heading"
          ref={headingRef}
          className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl"
        >
          Der Swiss Edge.
        </h2>
        <p ref={introRef} className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
          Wir bringen 10 % mehr Schweizer Rigorosität in den digitalen Raum:
        </p>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {edges.map((edge, i) => (
            <div
              key={edge.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="rounded-[28px] border border-[var(--border)] bg-[var(--muted-bg)] p-8 shadow-sm"
            >
              <h3 className="text-lg font-bold text-[var(--foreground)]">{edge.title}</h3>
              <p className="mt-3 text-[var(--muted)] leading-relaxed">{edge.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
