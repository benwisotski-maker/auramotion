"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OFFER_CARDS = [
  {
    title: "Explainvideos",
    description:
      "Produkte und Prozesse klar und einprägsam erklären – für SaaS und Tech.",
    icon: "▶",
  },
  {
    title: "Motion Graphics",
    description:
      "Marketing und Social Media mit professionellen Animationen stärken.",
    icon: "◆",
  },
  {
    title: "Konzept bis Finale",
    description:
      "Von der Idee bis zur fertigen Produktion – eine Ansprechperson, ein Ergebnis.",
    icon: "✓",
  },
];

export default function OfferSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
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
        introRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        cardsRef.current?.children ?? [],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 88%",
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
      className="bg-[var(--muted-bg)] px-6 py-24 md:py-32"
      aria-labelledby="offer-heading"
    >
      <div className="mx-auto max-w-5xl">
        <span
          ref={badgeRef}
          className="inline-block rounded-full border border-[var(--foreground)]/10 bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--foreground)]"
        >
          Was wir tun
        </span>
        <h2
          id="offer-heading"
          ref={headingRef}
          className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl"
        >
          Motion Design für SaaS & Tech
        </h2>
        <p ref={introRef} className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
          Auramotion ist Ihr Partner für professionelle Motion Grafiken und
          Explainvideos in der Schweiz. Wir inszenieren Ihre Inhalte so, dass sie
          ankommen.
        </p>
        <div
          ref={cardsRef}
          className="mt-16 grid gap-6 sm:grid-cols-3"
        >
          {OFFER_CARDS.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-8 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--muted-bg)] text-xl text-[var(--foreground)]">
                {card.icon}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[var(--foreground)]">
                {card.title}
              </h3>
              <p className="mt-2 text-[var(--muted)]">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
