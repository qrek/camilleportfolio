import Image from "next/image";
import Link from "next/link";

export function About() {
  return (
    <section id="about" className="w-full px-5 py-28 sm:px-8 lg:px-20">
      <div className="relative mx-auto max-w-[1200px]">
        {/* Photo agrandie */}
        <div className="relative z-0 aspect-[417/497] w-[78%] max-w-[520px] overflow-hidden rounded-2xl border border-border">
          <Image
            src="/about-portrait.jpg"
            alt="Camille Ameline de Cadeville"
            fill
            sizes="(min-width: 768px) 520px, 78vw"
            className="object-cover"
          />
        </div>

        {/* Titre : déborde sur la photo et passe par-dessus (z-10) */}
        <div className="relative z-10 -mt-16 ml-4 md:absolute md:left-[36%] md:top-1/2 md:mt-0 md:-translate-y-1/2">
          <h2 className="font-serif text-5xl font-normal leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="not-italic">What</span>{" "}
            <span className="italic">about me ?</span>
          </h2>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-bg px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fg/5"
          >
            See more <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
