"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OfferSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.15,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 px-6 py-24 md:py-32"
      aria-labelledby="offer-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="offer-heading"
          ref={headingRef}
          className="text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        >
          Was wir tun
        </h2>
        <div ref={contentRef} className="mt-12 space-y-6 text-zinc-300">
          <p className="text-lg leading-relaxed">
            <strong className="text-white">Auramotion</strong> ist Ihr Partner
            für professionelles Motion Design in der Schweiz. Wir erstellen{" "}
            <strong className="text-white">Motion Grafiken</strong> und{" "}
            <strong className="text-white">Explainvideos</strong>, die Ihre
            Produkte und Botschaften klar und überzeugend vermitteln.
          </p>
          <p className="text-lg leading-relaxed">
            Unser Fokus liegt auf <strong className="text-white">SaaS</strong>- und{" "}
            <strong className="text-white">Tech-Unternehmen</strong>: Von
            Produkt-Erklärvideos über Feature-Highlights bis zu
            Unternehmensvideos – wir inszenieren Ihre Inhalte so, dass sie
            ankommen und im Gedächtnis bleiben.
          </p>
          <h3 className="pt-4 text-xl font-semibold text-white">
            Unser Angebot
          </h3>
          <ul className="list-inside list-disc space-y-2 text-lg text-zinc-300">
            <li>Explainvideos für Software und digitale Produkte</li>
            <li>Motion Graphics für Marketing und Social Media</li>
            <li>Professionelle Umsetzung von Konzept bis Finale</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
