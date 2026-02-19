"use client";

import { useRef, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { id: 1, title: "Persönlich" },
  { id: 2, title: "Details" },
  { id: 3, title: "Nachricht" },
];

const inputClass =
  "mt-1.5 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]";
const labelClass = "block text-sm font-medium text-[var(--foreground)]";

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
  const [step, setStep] = useState(1);

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
    if (result.success && formRef.current) {
      formRef.current.reset();
      setStep(1);
    }
  }

  function goNext() {
    const form = formRef.current;
    if (!form) return;
    if (step === 1) {
      const name = form.querySelector<HTMLInputElement>('[name="name"]');
      const email = form.querySelector<HTMLInputElement>('[name="email"]');
      if (!name?.value.trim()) {
        name?.focus();
        return;
      }
      if (!email?.value.trim()) {
        email?.focus();
        return;
      }
    }
    setStep((s) => Math.min(s + 1, 3));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
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

        {/* Stepper indicator */}
        <div className="mt-10 flex items-center justify-center gap-2 sm:gap-4">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                    step > s.id && "bg-[var(--foreground)] text-white",
                    step === s.id && "border-2 border-[var(--foreground)] bg-transparent text-[var(--foreground)]",
                    step < s.id && "border border-[var(--border)] bg-[var(--muted-bg)] text-[var(--muted)]"
                  )}
                >
                  {step > s.id ? (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s.id
                  )}
                </div>
                <span
                  className={cn(
                    "hidden text-sm font-medium sm:inline",
                    step >= s.id ? "text-[var(--foreground)]" : "text-[var(--muted)]"
                  )}
                >
                  {s.title}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-0.5 w-6 sm:mx-4 sm:w-12",
                    step > s.id ? "bg-[var(--foreground)]" : "bg-[var(--border)]"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <form
          ref={formRef}
          action={handleSubmit}
          className="mt-10 flex flex-col gap-6"
        >
          {/* Step 1: Name, E-Mail */}
          <div className={cn("flex flex-col gap-6", step !== 1 && "hidden")}>
            <div>
              <label htmlFor="contact-name" className={labelClass}>
                Name *
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                className={inputClass}
                placeholder="Ihr Name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className={labelClass}>
                E-Mail *
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className={inputClass}
                placeholder="ihre@email.ch"
              />
            </div>
          </div>

          {/* Step 2: Firma, Telefon */}
          <div className={cn("flex flex-col gap-6", step !== 2 && "hidden")}>
            <div>
              <label htmlFor="contact-company" className={labelClass}>
                Firma
              </label>
              <input
                id="contact-company"
                name="company"
                type="text"
                className={inputClass}
                placeholder="Firmenname (optional)"
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className={labelClass}>
                Telefon
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                className={inputClass}
                placeholder="+41 … (optional)"
              />
            </div>
          </div>

          {/* Step 3: Nachricht */}
          <div className={cn("flex flex-col gap-6", step !== 3 && "hidden")}>
            <div>
              <label htmlFor="contact-message" className={labelClass}>
                Nachricht *
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                className={cn(inputClass, "resize-y")}
                placeholder="Ihr Anliegen …"
              />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={goBack}
                className="rounded-full border-2 border-[var(--foreground)] bg-transparent px-6 py-3 text-base font-medium text-[var(--foreground)] transition-opacity hover:opacity-90"
              >
                Zurück
              </button>
              <SubmitButton />
            </div>
          </div>

          {/* Navigation (only for step 1 & 2) */}
          {step < 3 && (
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-full border-2 border-[var(--foreground)] bg-transparent px-6 py-3 text-base font-medium text-[var(--foreground)] transition-opacity hover:opacity-90"
                >
                  Zurück
                </button>
              ) : null}
              <button
                type="button"
                onClick={goNext}
                className="rounded-full bg-[var(--foreground)] px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90"
              >
                Weiter
              </button>
            </div>
          )}

          <div ref={messageRef} />
        </form>
      </div>
    </section>
  );
}
