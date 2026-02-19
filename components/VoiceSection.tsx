"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VoiceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const contentBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = [badgeRef.current, contentBlockRef.current].filter(Boolean);
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
      className="bg-[var(--muted-bg)] px-8 py-28 md:px-12 md:py-36"
      aria-labelledby="voice-heading"
    >
      <div className="mx-auto max-w-5xl text-left">
        <div
          ref={contentBlockRef}
          className="flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-14"
        >
          <img
            src="/keyframefusion.svg"
            alt=""
            className="h-auto w-full max-w-[400px] shrink-0 md:max-w-[520px]"
            width={255}
            height={103}
          />
          <div className="min-w-0 flex-1">
            <span
              ref={badgeRef}
              className="section-tag inline-block rounded-full bg-black px-4 py-2 text-xs font-extrabold uppercase tracking-tight text-white"
            >
              Tone of Voice
            </span>
            <h2
              id="voice-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-[2.5rem]"
            >
              Meistens ist weniger mehr.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
              Wir nutzen Motion Design, um deine Botschaft zu verstärken – nicht, um von ihr abzulenken. Kein Rauschen. Nur Fokus. Wenn eine Animation den Wert nicht erklärt, hat sie keinen Platz.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
