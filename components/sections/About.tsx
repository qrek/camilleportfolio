import Image from "next/image";
import Link from "next/link";

export function About() {
  return (
    <section id="about" className="w-full px-5 py-28 sm:px-8 lg:px-20">
      <div className="mx-auto flex max-w-[1300px] flex-col items-center gap-12 md:flex-row md:gap-16 lg:gap-24">
        {/* Photo */}
        <div className="relative aspect-[417/497] w-full max-w-[460px] shrink-0 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/about-portrait.jpg"
            alt="Camille Ameline de Cadeville"
            fill
            sizes="(min-width: 768px) 460px, 100vw"
            className="object-cover"
          />
        </div>

        {/* Titre + CTA */}
        <div>
          <h2 className="font-serif text-6xl italic leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            <span className="block">What</span>
            <span className="block">about me ?</span>
          </h2>
          <div className="mt-10 flex items-center gap-2.5">
            <Link
              href="/about"
              className="inline-flex h-12 items-center rounded-md border border-fg/50 px-6 text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-fg/5"
            >
              See more
            </Link>
            <Link
              href="/about"
              aria-label="En savoir plus"
              className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-royal text-lg text-white transition-opacity hover:opacity-90"
            >
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
