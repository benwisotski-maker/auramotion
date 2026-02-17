"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type VideoItem = {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail?: string;
  shortDescription?: string;
};

const placeholderVideos: VideoItem[] = [
  {
    id: "1",
    title: "SaaS Produkt-Erklärung",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    shortDescription: "Explainvideo für eine Software-Plattform",
  },
  {
    id: "2",
    title: "Tech Feature Highlight",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    shortDescription: "Motion Graphics für Produktfeatures",
  },
  {
    id: "3",
    title: "B2B Brand Story",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    shortDescription: "Unternehmensvideo mit Motion Design",
  },
];

function VideoCard({
  item,
  onClick,
}: {
  item: VideoItem;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLElement>(null);
  return (
    <article
      ref={cardRef}
      className="group cursor-pointer rounded-2xl bg-[var(--card-bg)] p-6 shadow-sm transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      <div className="aspect-video overflow-hidden rounded-xl bg-[var(--border)]">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt=""
            className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[var(--muted)]">
            <span className="text-4xl">▶</span>
          </div>
        )}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-[var(--foreground)]">
        {item.title}
      </h3>
      {item.shortDescription && (
        <p className="mt-1.5 text-sm text-[var(--muted)]">
          {item.shortDescription}
        </p>
      )}
    </article>
  );
}

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [modalVideo, setModalVideo] = useState<VideoItem | null>(null);

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
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        cardsRef.current?.children ?? [],
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="showcase"
        ref={sectionRef}
        className="bg-[var(--background)] px-6 py-24 md:py-32"
        aria-labelledby="showcase-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="showcase-heading"
            ref={headingRef}
            className="text-center text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl"
          >
            Ausgewählte Arbeiten
          </h2>
          <div
            ref={cardsRef}
            className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {placeholderVideos.map((item) => (
              <VideoCard
                key={item.id}
                item={item}
                onClick={() => setModalVideo(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {modalVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setModalVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Video abspielen"
        >
          <button
            type="button"
            className="absolute right-6 top-6 rounded-full bg-white/90 p-2.5 text-[var(--foreground)] shadow-md transition-colors hover:bg-white"
            onClick={() => setModalVideo(null)}
            aria-label="Schliessen"
          >
            ✕
          </button>
          <div
            className="relative max-h-[90vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              title={modalVideo.title}
              src={`${modalVideo.videoUrl}${modalVideo.videoUrl.includes("?") ? "&" : "?"}autoplay=1`}
              className="aspect-video w-full rounded-2xl shadow-2xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
