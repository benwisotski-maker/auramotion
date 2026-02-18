"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OfferSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const handworkRef = useRef<HTMLParagraphElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = [
        badgeRef.current,
        headingRef.current,
        handworkRef.current,
        pricingRef.current,
      ].filter(Boolean);
      gsap.fromTo(
        targets,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="offer"
      ref={sectionRef}
      className="bg-[var(--muted-bg)] px-8 py-28 md:px-12 md:py-36"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span
          ref={badgeRef}
          className="section-tag inline-block rounded-full bg-black px-4 py-2 text-xs font-extrabold uppercase tracking-tight text-white"
        >
          Why Us
        </span>
        <h2
          id="why-heading"
          ref={headingRef}
          className="mt-8 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-[2.5rem]"
        >
          Meticulous Technical Rigour.
        </h2>
        <p
          ref={handworkRef}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]"
        >
          Wir glauben, dass der Unterschied zwischen einem guten und einem exzellenten Video in der Intention liegt. Jede Bewegung hat einen Grund. Jedes Wort im Skript hat ein Ziel. Wir sind für die Ambitionierten da – für diejenigen, die Detailliebe genauso schätzen wie wir.
        </p>

        <div
          ref={pricingRef}
          className="mx-auto mt-14 max-w-2xl rounded-[28px] bg-white p-8 text-left text-lg leading-relaxed text-[var(--muted)] shadow-md md:p-10"
        >
          Keine Fliessbandarbeit mit Paket-Preisen – jedes Projekt ist so einzigartig wie das Produkt unserer Kunden. <strong className="text-[var(--foreground)]">Massgeschneiderte Offerten nach einem Erstgespräch.</strong>
        </div>
      </div>
    </section>
  );
}
