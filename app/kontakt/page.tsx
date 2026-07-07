import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { siteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Tatras Trade s.r.o., Hurbanova 7, 040 01 Košice. Sme vám k dispozícii — neváhajte nás kontaktovať.",
};

export default function ContactPage() {
  const { contact } = siteContent;
  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-32 md:px-10 md:pb-44 md:pt-44">
      <Reveal>
        <p className="eyebrow">Kontakt</p>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.025em] text-cream md:text-8xl">
          Sme vám k <span className="accent-word">dispozícii</span>
        </h1>
        <p className="prose-col mt-8 text-lg font-light text-smoke">
          Neváhajte nás kontaktovať — radi pripravíme ponuku kávy, čajov aj kávovarov
          pre vašu prevádzku.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.2}>
          <div className="space-y-10">
            <address className="space-y-1 text-base font-light not-italic text-smoke">
              <p className="text-xl font-normal text-cream">{contact.company}</p>
              <p>
                {contact.street}, {contact.city}
              </p>
              <div className="pt-4 space-y-1">
                {contact.phones.map((phone) => (
                  <p key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="transition-colors duration-300 hover:text-bronze"
                    >
                      {phone}
                    </a>
                  </p>
                ))}
                <p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-bronze transition-colors duration-300 hover:text-cream"
                  >
                    {contact.email}
                  </a>
                </p>
              </div>
            </address>

            <div className="overflow-hidden border hairline">
              <iframe
                title="Mapa — Hurbanova 7, Košice"
                src="https://www.google.com/maps?q=Hurbanova%207,%20040%2001%20Ko%C5%A1ice,%20Slovensko&output=embed"
                className="h-80 w-full grayscale invert-[0.92] hue-rotate-180 contrast-[0.9]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
