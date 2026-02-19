"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const comparisons = [
  { market: "AI-Slop: Seelenlose, generische Animationen.", us: "Human-Led: 100 % Handarbeit in der Animation." },
  { market: "Massen-Agentur: Projektmanager, die keine Ahnung von Design haben.", us: "Studio-Prinzip: Du sprichst direkt mit den Machern." },
  { market: "Old-School Agencies: Langsam, teuer, verstehen SaaS nicht.", us: "Hybrid Efficiency: Modernste Workflows, maximale Geschwindigkeit." },
  { market: "Günstig-Anbieter: «Satisfying» Videos ohne Business-Impact.", us: "ROI-Fokus: Storytelling, das Zahlen und Conversions liefert." },
];

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = [badgeRef.current, headingRef.current, tableRef.current].filter(Boolean);
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
      id="warum-wir"
      ref={sectionRef}
      className="bg-[#212224] px-8 py-28 md:px-12 md:py-36"
      aria-labelledby="why-us-heading"
    >
      <div className="mx-auto max-w-4xl">
        <span
          ref={badgeRef}
          className="section-tag inline-block rounded-full bg-black px-4 py-2 text-xs font-extrabold uppercase tracking-tight text-white"
        >
          Abgrenzung
        </span>
        <h2
          id="why-us-heading"
          ref={headingRef}
          className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Warum wir?
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-gray-300">
          Der Markt – und was AuraMotion anders macht.
        </p>
        <div ref={tableRef} className="mt-14 space-y-4">
          {comparisons.map((row, i) => (
            <div
              key={i}
              className="grid gap-0 overflow-hidden rounded-xl sm:grid-cols-2"
            >
              <div className="bg-[#2a2b2e] p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Der Markt</p>
                <p className="mt-1 text-gray-100">{row.market}</p>
              </div>
              <div className="bg-[#2f3033] p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">AuraMotion</p>
                <p className="mt-1 font-medium text-white">{row.us}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
