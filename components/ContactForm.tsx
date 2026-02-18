"use client";

import { useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { submitContact, type ContactState } from "@/app/actions/contact";

gsap.registerPlugin(ScrollTrigger);

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 w-full rounded-full bg-[var(--foreground)] px-8 py-4 text-base font-medium text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-70 sm:w-auto sm:min-w-[220px]"
    >
      {pending ? "Wird gesendet …" : "Nachricht senden"}
    </button>
  );
}

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

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
        formRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.1,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  async function handleSubmit(formData: FormData) {
    const result: ContactState = await submitContact(formData);
    const el = messageRef.current;
    if (!el) return;
    el.textContent = result.message;
    el.setAttribute("role", "alert");
    el.className =
      "mt-4 rounded-xl px-4 py-3 text-sm " +
      (result.success
        ? "bg-emerald-50 text-emerald-800"
        : "bg-red-50 text-red-700");
    if (result.success && formRef.current) formRef.current.reset();
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-[var(--background)] px-8 py-28 md:px-12 md:py-36"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-xl">
        <h2
          id="contact-heading"
          ref={headingRef}
          className="text-center text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl"
        >
          Kontakt
        </h2>
        <p className="mt-4 text-center text-[var(--muted)]">
          Sie haben ein Projekt im Kopf? Schreiben Sie uns – oder treffen Sie uns auf einen Kaffee in Zug oder Zürich.
        </p>
        <form
          ref={formRef}
          action={handleSubmit}
          className="mt-14 flex flex-col gap-6"
        >
          <div>
            <label
              htmlFor="contact-name"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Name *
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              className="mt-1.5 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]"
              placeholder="Ihr Name"
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              E-Mail *
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              className="mt-1.5 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]"
              placeholder="ihre@email.ch"
            />
          </div>
          <div>
            <label
              htmlFor="contact-company"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Firma
            </label>
            <input
              id="contact-company"
              name="company"
              type="text"
              className="mt-1.5 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]"
              placeholder="Firmenname (optional)"
            />
          </div>
          <div>
            <label
              htmlFor="contact-phone"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Telefon
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              className="mt-1.5 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]"
              placeholder="+41 … (optional)"
            />
          </div>
          <div>
            <label
              htmlFor="contact-message"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Nachricht *
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              className="mt-1.5 w-full resize-y rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]"
              placeholder="Ihr Anliegen …"
            />
          </div>
          <SubmitButton />
          <div ref={messageRef} />
        </form>
      </div>
    </section>
  );
}
