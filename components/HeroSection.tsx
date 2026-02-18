"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

const DotGrid = dynamic(() => import("./DotGrid"), { ssr: false });
const Carousel = dynamic(() => import("./Carousel"), { ssr: false });

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const macRef = useRef<HTMLDivElement>(null);
  const macScreenRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(360);
  const callout1Ref = useRef<HTMLDivElement>(null);
  const callout2Ref = useRef<HTMLDivElement>(null);
  const callout3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = macScreenRef.current;
    if (!el) return;
    const update = () => setCarouselWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.2"
        )
        .fromTo(
          sublineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          macRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        )
        .fromTo(
          [callout1Ref.current, callout2Ref.current, callout3Ref.current],
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.3"
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[900px] flex-col items-center justify-start bg-[var(--background)] px-6 pt-20 sm:min-h-[1000px] sm:pt-28 md:min-h-[1100px] md:pt-32"
      aria-label="Hero"
    >
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#ffffff"
          activeColor="#37ff29"
          proximity={60}
          speedTrigger={100}
          shockRadius={110}
          shockStrength={5}
          maxSpeed={5000}
          resistance={750}
          returnDuration={1.5}
          className="h-full w-full"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#f0f0f2] via-[#ebebed] to-[#e2e2e6]"
        aria-hidden
      />
      {/* Arrow hinter dem Text (hand-drawn) */}
      <div
        className="pointer-events-none absolute left-1/2 top-[10%] z-[4] w-full max-w-[440px] -translate-x-1/2 sm:max-w-[560px] md:top-[12%] md:max-w-[700px] lg:max-w-[820px]"
        aria-hidden
      >
        <img
          src="/arrow.png"
          alt=""
          className="h-auto w-full opacity-90 mix-blend-screen"
        />
      </div>
      <div className="relative z-20 flex w-full justify-center px-4">
        <div className="max-w-4xl text-center">
        <span
          ref={badgeRef}
          className="inline-block rounded-full border border-[var(--foreground)]/15 bg-[var(--muted-bg)] px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--foreground)]"
        >
          Converting Code into Emotion
        </span>
        <h1
          ref={headlineRef}
          className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-5xl sm:leading-tight md:text-6xl lg:text-6xl"
        >
          Premium Motion Design für SaaS. Handgemacht in der Schweiz.
        </h1>
        <p
          ref={sublineRef}
          className="mx-auto mt-6 max-w-2xl text-lg text-[var(--muted)] sm:text-xl"
        >
          Wir verwandeln komplexe Software in visuelle Autorität. Zwischen Zug und Zürich erschaffen wir Trailer und Erklärvideos, die nicht nur beeindrucken, sondern resonieren. Keine Abkürzungen. Nur Fokus.
        </p>
        <div
          ref={ctaRef}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
        >
          <Link
            href="#offer"
            className="inline-flex min-w-[200px] items-center justify-center gap-3 rounded-full bg-[#1a1a1a] px-8 py-4 text-base font-bold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            Unsere Pakete
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded bg-black" aria-hidden>
              <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7h-6M17 7v6" /></svg>
            </span>
          </Link>
          <Link
            href="#contact"
            className="inline-flex min-w-[200px] items-center justify-center gap-3 rounded-full border-2 border-black bg-white px-8 py-4 text-base font-bold text-black transition-colors hover:bg-gray-100"
          >
            Kontakt
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded bg-black" aria-hidden>
              <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7h-6M17 7v6" /></svg>
            </span>
          </Link>
        </div>
        </div>
      </div>

      {/* Mac mit Carousel im Bildschirm + Callouts relativ zum Mac */}
      <div
        ref={macRef}
        className="absolute bottom-0 left-1/2 z-[5] w-full max-w-[380px] -translate-x-1/2 sm:max-w-[440px] md:max-w-[540px] lg:max-w-[640px] xl:max-w-[760px]"
        style={{ aspectRatio: "268/177" }}
      >
        <div className="relative h-full w-full">
          <img
            src="/mac.svg"
            alt=""
            className="h-full w-full object-contain drop-shadow-lg pointer-events-none"
          />
          <div
            ref={macScreenRef}
            className="absolute inset-0 flex h-full w-full flex-col items-stretch justify-center overflow-hidden rounded-lg"
            aria-hidden
          >
            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
              <div
                className="absolute left-1/2 top-[54%] h-[90%] max-h-[90%] -translate-x-1/2 -translate-y-1/2"
                style={{ width: Math.max(260, carouselWidth - 140) }}
              >
                <Carousel
                  baseWidth={Math.max(260, carouselWidth - 140)}
                  fullHeight
                  autoplay
                  autoplayDelay={9000}
                  pauseOnHover
                  loop
                  items={[
                    { id: 1, title: "SaaS Trailers", description: "Dein UI im Rampenlicht.", video: "/videos/first-vidtry.mp4" },
                    { id: 2, title: "Storytelling", description: "Skripte, die hängen bleiben.", video: "/videos/cssvid.mp4" },
                    { id: 3, title: "Explainer", description: "Komplexität in Klarheit.", icon: <span className="carousel-icon">◇</span> },
                    { id: 4, title: "Motion Design", description: "Software wird lebendig.", video: "/videos/brandedeaglevid.mp4" },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Callouts fixiert relativ zum Mac */}
        <div
          ref={callout1Ref}
          className="absolute bottom-[68%] left-[-24%] z-20 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-md sm:left-[-22%] sm:bottom-[70%] md:left-[-20%] md:bottom-[72%]"
          aria-hidden
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span className="text-sm font-semibold text-[var(--foreground)]">100 % Handarbeit</span>
        </div>
        <div
          ref={callout3Ref}
          className="absolute bottom-[20%] left-[-32%] z-20 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-md sm:left-[-28%] sm:bottom-[22%] md:left-[-26%] md:bottom-[24%]"
          aria-hidden
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </span>
          <span className="text-sm font-semibold text-[var(--foreground)]">Full-Service Storytelling</span>
        </div>
        <div
          ref={callout2Ref}
          className="absolute bottom-[38%] right-[-24%] z-20 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-md sm:right-[-22%] sm:bottom-[40%] md:right-[-20%] md:bottom-[42%]"
          aria-hidden
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935M12 12a2 2 0 104 0 2 2 0 00-4 0z" />
            </svg>
          </span>
          <span className="text-sm font-semibold text-[var(--foreground)]">Schweizer Präzision</span>
        </div>
      </div>
    </section>
  );
}
