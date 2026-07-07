"use server";

import { Resend } from "resend";
import { siteContent } from "@/lib/content";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
}

export async function sendContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // honeypot: real users never see or fill this field
  if (formData.get("website")) {
    return { status: "success", message: "Ďakujeme, ozveme sa vám čo najskôr." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: "error",
      message: "Skontrolujte prosím meno, e-mail a správu — všetky polia sú povinné.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Resend not configured yet — log so the message isn't lost in dev
    console.warn("[kontakt] RESEND_API_KEY not set; message not delivered:", {
      name,
      email,
      message,
    });
    return {
      status: "error",
      message:
        "Odosielanie správ momentálne nie je dostupné. Napíšte nám prosím priamo na " +
        siteContent.contact.email,
    };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.CONTACT_FROM ?? "Caffè Vero <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? siteContent.contact.email,
      replyTo: email,
      subject: `Správa z caffevero.sk — ${name}`,
      text: `Meno: ${name}\nE-mail: ${email}\n\n${message}`,
    });
    return { status: "success", message: "Ďakujeme, ozveme sa vám čo najskôr." };
  } catch (error) {
    console.error("[kontakt] send failed:", error);
    return {
      status: "error",
      message:
        "Správu sa nepodarilo odoslať. Skúste to prosím neskôr alebo nám napíšte na " +
        siteContent.contact.email,
    };
  }
}
