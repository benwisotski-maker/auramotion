"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich").max(100),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  company: z.string().max(100).optional(),
  phone: z.string().max(30).optional(),
  message: z.string().min(1, "Nachricht ist erforderlich").max(2000),
});

export type ContactState =
  | { success: true; message: string }
  | { success: false; message: string; errors?: Record<string, string[]> };

export async function submitContact(formData: FormData): Promise<ContactState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string[]> = {};
    const fieldErrors = parsed.error.flatten().fieldErrors;
    for (const [key, messages] of Object.entries(fieldErrors)) {
      if (messages) errors[key] = messages;
    }
    return {
      success: false,
      message: "Bitte überprüfen Sie Ihre Eingaben.",
      errors,
    };
  }

  const { name, email, company, phone, message } = parsed.data;

  // E-Mail versenden mit Resend, wenn RESEND_API_KEY und CONTACT_EMAIL gesetzt sind.
  // Sonst: nur validieren und Erfolg zurückgeben (für lokales Testen).
  if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Auramotion Kontakt <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL,
        replyTo: email,
        subject: `Kontaktanfrage von ${name}${company ? ` (${company})` : ""}`,
        text: `Name: ${name}\nE-Mail: ${email}\n${company ? `Firma: ${company}\n` : ""}${phone ? `Telefon: ${phone}\n` : ""}\nNachricht:\n${message}`,
      });
    } catch (e) {
      console.error("Contact email send failed:", e);
      return {
        success: false,
        message: "Nachricht konnte nicht gesendet werden. Bitte später erneut versuchen.",
      };
    }
  }

  return {
    success: true,
    message: "Vielen Dank. Wir melden uns in Kürze bei Ihnen.",
  };
}
