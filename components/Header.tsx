"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteContent } from "@/lib/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the overlay on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
          scrolled && !open
            ? "bg-espresso/80 backdrop-blur-md hairline"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 md:h-20 max-w-[1600px] items-center justify-between px-5 md:px-10">
          <Link href="/" aria-label="Caffè Vero — domov" className="relative z-50">
            <Image
              src="/img/logo.png"
              alt="Caffè Vero"
              width={132}
              height={26}
              priority
              className="brightness-0 invert h-5 md:h-6 w-auto"
            />
          </Link>

          <div className="flex items-center gap-6 md:gap-10">
            <a
              href={`tel:${siteContent.contact.phones[0].replace(/\s/g, "")}`}
              className="relative z-50 hidden sm:block text-sm font-light tracking-wide text-smoke transition-colors duration-300 hover:text-cream"
            >
              {siteContent.contact.phones[0]}
            </a>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Zavrieť menu" : "Otvoriť menu"}
              className="relative z-50 flex h-11 w-11 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-bronze"
            >
              <span className="relative block h-3 w-7">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-cream transition-transform duration-400 ${
                    open ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-0 h-px w-full bg-cream transition-transform duration-400 ${
                    open ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <nav
        aria-label="Hlavná navigácia"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-espresso/95 px-5 pt-28 pb-10 backdrop-blur-xl transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-10 md:pt-36 ${
          open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <ul className="space-y-1 md:space-y-2">
          {siteContent.navigation.map((item, i) => (
            <li
              key={item.href}
              style={{ transitionDelay: open ? `${60 + i * 45}ms` : "0ms" }}
              className={`transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <Link
                href={item.href}
                tabIndex={open ? 0 : -1}
                className={`group inline-flex items-baseline gap-4 text-4xl md:text-6xl font-medium tracking-tight transition-colors duration-300 ${
                  pathname === item.href ? "text-bronze" : "text-cream hover:text-bronze"
                }`}
              >
                <span className="text-xs font-light tracking-[0.25em] text-smoke group-hover:text-bronze transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          style={{ transitionDelay: open ? "480ms" : "0ms" }}
          className={`mt-12 flex flex-col gap-1 text-sm font-light text-smoke transition-opacity duration-600 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          <span>{siteContent.contact.company}</span>
          <span>
            {siteContent.contact.street}, {siteContent.contact.city}
          </span>
          <a
            href={`mailto:${siteContent.contact.email}`}
            tabIndex={open ? 0 : -1}
            className="text-cream hover:text-bronze transition-colors duration-300"
          >
            {siteContent.contact.email}
          </a>
        </div>
      </nav>
    </>
  );
}
