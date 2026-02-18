"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const kernelRef = useRef<HTMLParagraphElement>(null);
  const promiseRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = [badgeRef.current, headingRef.current, introRef.current, kernelRef.current, promiseRef.current].filter(Boolean);
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
      id="vision"
      ref={sectionRef}
      className="bg-white px-6 py-24 md:py-32"
      aria-labelledby="vision-heading"
    >
      <div className="mx-auto max-w-3xl">
        <span
          ref={badgeRef}
          className="inline-block rounded-full border border-[var(--foreground)]/10 bg-[var(--muted-bg)] px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--foreground)]"
        >
          Die Essenz
        </span>
        <h2
          id="vision-heading"
          ref={headingRef}
          className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl"
        >
          Eine Werkstatt für digitale Exzellenz.
        </h2>
        <p ref={introRef} className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
          AuraMotion ist keine Agentur – es ist eine Werkstatt für digitale Exzellenz. Wir verwandeln abstrakte Software-Konzepte in visuelle Autorität. Wir glauben, dass in einer Welt voller digitalem Rauschen nur das wirklich Handgemachte, Durchdachte und Präzise Bestand hat.
        </p>
        <p ref={kernelRef} className="mt-6 text-lg font-semibold text-[var(--foreground)]">
          Der Kern: Wir geben Software eine Seele.
        </p>
        <p ref={promiseRef} className="mt-2 text-lg leading-relaxed text-[var(--muted)]">
          Das Versprechen: Schweizer Präzision trifft auf unbändige kreative Energie.
        </p>
      </div>
    </section>
  );
}
