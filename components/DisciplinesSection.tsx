"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const disciplines = [
  {
    title: "SaaS Product Trailers",
    description: "Wir rücken dein User Interface ins Rampenlicht. Wir zeigen nicht nur Features; wir zeigen den Wert.",
  },
  {
    title: "Strategic Storytelling",
    description: "Wir graben tief, um die Essenz deines Produkts zu finden. Wir schreiben Skripte, die hängen bleiben.",
  },
  {
    title: "Explainer Videos",
    description: "Wir verwandeln Komplexität in Klarheit. Für Investoren, Kunden und Visionäre.",
  },
  {
    title: "Interface Motion Design",
    description: "Wir machen deine Software lebendig – direkt für die Webseite oder als App-Experience.",
  },
];

export default function DisciplinesSection() {
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
          stagger: 0.06,
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none reverse" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="disziplinen"
      ref={sectionRef}
      className="bg-[var(--muted-bg)] px-8 py-28 md:px-12 md:py-36"
      aria-labelledby="disciplines-heading"
    >
      <div className="mx-auto max-w-5xl">
        <span
          ref={badgeRef}
          className="section-tag inline-block rounded-full bg-black px-4 py-2 text-xs font-extrabold uppercase tracking-tight text-white"
        >
          Unsere Disziplinen
        </span>
        <h2
          id="disciplines-heading"
          ref={headingRef}
          className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl"
        >
          Services. Selektivität ist unser Vorteil.
        </h2>
        <p ref={introRef} className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
          Wenn wir darin nicht Weltklasse sind, bieten wir es nicht an.
        </p>
        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {disciplines.map((d, i) => (
            <div
              key={d.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="rounded-[28px] bg-white p-8 shadow-md md:p-10"
            >
              <h3 className="text-xl font-bold text-[var(--foreground)]">{d.title}</h3>
              <p className="mt-3 text-[var(--muted)] leading-relaxed">{d.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
