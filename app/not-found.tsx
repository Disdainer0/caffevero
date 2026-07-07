import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow">Chyba 404</p>
      <h1 className="mt-6 text-5xl font-semibold tracking-[-0.025em] text-cream md:text-7xl">
        Stránka sa <span className="accent-word">nenašla</span>
      </h1>
      <p className="mt-6 max-w-md text-base font-light text-smoke">
        Táto stránka neexistuje alebo bola presunutá. Skúste začať od domovskej stránky.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-4 border border-bronze/60 px-8 py-4 text-sm font-medium tracking-[0.18em] uppercase text-cream transition-colors duration-500 hover:bg-bronze hover:text-espresso"
      >
        Späť domov
      </Link>
    </div>
  );
}
