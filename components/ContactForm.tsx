"use client";

import { useActionState } from "react";
import { sendContact, type ContactFormState } from "@/app/kontakt/actions";

const initialState: ContactFormState = { status: "idle", message: "" };

const fieldClass =
  "w-full border hairline bg-carbon/60 px-5 py-4 text-base font-light text-cream placeholder:text-smoke/60 transition-colors duration-300 focus:border-bronze focus:outline-none";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  if (state.status === "success") {
    return (
      <div className="border hairline bg-carbon/60 p-10 md:p-14" role="status">
        <p className="font-serif text-3xl italic text-bronze">Správa odoslaná</p>
        <p className="mt-4 text-base font-light text-smoke">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {/* honeypot — hidden from people, tempting for bots */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Nevypĺňajte toto pole
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-smoke">
            Meno
          </span>
          <input type="text" name="name" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-smoke">
            E-mail
          </span>
          <input type="email" name="email" required autoComplete="email" className={fieldClass} />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-smoke">
          Správa
        </span>
        <textarea name="message" required rows={6} className={fieldClass} />
      </label>

      {state.status === "error" && (
        <p role="alert" className="text-sm font-light text-bronze">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex items-center gap-4 border border-bronze/60 px-8 py-4 text-sm font-medium tracking-[0.18em] uppercase text-cream transition-colors duration-500 hover:bg-bronze hover:text-espresso disabled:cursor-wait disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
      >
        {pending ? "Odosiela sa…" : "Odoslať správu"}
        <span
          aria-hidden
          className="inline-block transition-transform duration-500 group-hover:translate-x-1.5"
        >
          →
        </span>
      </button>
    </form>
  );
}
