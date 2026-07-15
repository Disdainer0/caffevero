"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  title: string;
  /** word inside the title rendered in the serif italic accent */
  accent: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}

/**
 * Fullscreen hero: seamless looped video over pure black.
 * The video only loads on fast connections and non-reduced-motion
 * clients; everyone else keeps the poster frame.
 */
export default function Hero({ title, accent, subtitle, ctaLabel, ctaHref }: HeroProps) {
  const [videoVariant, setVideoVariant] = useState<"desktop" | "mobile" | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    type NetworkInformation = { saveData?: boolean; effectiveType?: string };
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (connection?.saveData) return;
    if (connection?.effectiveType && ["slow-2g", "2g", "3g"].includes(connection.effectiveType)) return;

    // don't compete with the LCP poster — mount the video only after load
    const start = () => {
      const portrait = window.matchMedia("(orientation: portrait) and (max-width: 768px)").matches;
      setVideoVariant(portrait ? "mobile" : "desktop");
    };
    if (document.readyState === "complete") {
      start();
      return;
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  const videoBase = videoVariant === "mobile" ? "/video/hero-mobile" : "/video/hero";

  const [before, after] = title.split(accent);

  return (
    <section className="relative flex min-h-svh items-end overflow-hidden bg-espresso">
      {/* poster is always present (and is the LCP); video fades in above it once ready */}
      {/* full-viewport, so excluded from LCP — no preload, don't compete
          with fonts/headline for bandwidth; the espresso bg covers the gap */}
      <Image
        src="/video/hero-poster.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover"
      />
      {videoVariant && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000 data-[ready=true]:opacity-100"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/video/hero-poster.jpg"
          onCanPlay={(e) => e.currentTarget.setAttribute("data-ready", "true")}
        >
          <source src={`${videoBase}.mp4`} type="video/mp4" />
          <source src={`${videoBase}.webm`} type="video/webm" />
        </video>
      )}

      {/* legibility gradient — bottom third only, keeps the cup clean */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-espresso via-espresso/40 to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-20 pt-40 md:px-10 md:pb-20 lg:pb-20 lg:flex lg:justify-end">
        <div className="w-full lg:max-w-[50%] lg:pl-6">
          <p className="eyebrow hero-rise [animation-delay:0.15s]">Caffè Vero · Košice</p>
          <h1 className="hero-rise mt-6 max-w-4xl text-[13vw] leading-[1.02] font-semibold tracking-[-0.03em] text-cream [animation-delay:0.25s] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
            {before}
            <span className="accent-word">{accent}</span>
            {after}
          </h1>
          <p className="prose-col hero-rise mt-8 text-base font-light text-smoke [animation-delay:0.4s] md:text-lg">
            {subtitle}
          </p>
          <div className="hero-rise mt-10 [animation-delay:0.55s]">
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-4 border border-bronze/60 px-8 py-4 text-sm font-medium tracking-[0.18em] uppercase text-cream transition-colors duration-500 hover:bg-bronze hover:text-espresso focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
            >
              {ctaLabel}
              <span
                aria-hidden
                className="inline-block transition-transform duration-500 group-hover:translate-x-1.5"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
