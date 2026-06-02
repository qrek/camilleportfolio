import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "About — Camille Ameline de Cadeville",
};

const SKILLS: { t: string; i?: boolean }[][] = [
  [{ t: "Direction artistique" }, { t: " & création graphique", i: true }],
  [{ t: "Motion", i: true }, { t: " design" }],
  [{ t: "Photographie" }, { t: " & Post-production", i: true }],
  [{ t: "Campagne print", i: true }, { t: ", packaging" }],
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-28">
        {/* Intro : portrait + présentation */}
        <section className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="relative aspect-[757/941] w-full max-h-[80vh] overflow-hidden md:max-h-none">
            <Image
              src="/about-portrait.jpg"
              alt="Camille Ameline de Cadeville"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="px-5 sm:px-8 lg:pr-20">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
              About
            </p>
            <h1 className="mt-4 font-serif text-3xl font-normal leading-[1.15] sm:text-4xl">
              Hey, my name is Camille, and i&apos;m an{" "}
              <span className="italic">Art director + Motion designer</span>{" "}
              based in Paris.
            </h1>
            <Link
              href="/cv.pdf"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-fg/30 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fg/5"
            >
              Curriculum vitae <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* Skills */}
        <section className="px-5 py-20 sm:px-8 lg:px-20">
          <div className="relative overflow-hidden rounded-[2rem] bg-fg/[0.04] px-6 py-16 sm:px-12">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
              <h2 className="font-serif italic leading-[0.8]">
                <span className="block text-4xl sm:text-5xl">My</span>
                <span className="block text-7xl sm:text-8xl">
                  Sk<span className="text-fg/30">ills</span>
                </span>
              </h2>
              <ul className="space-y-4 font-serif text-2xl leading-tight sm:text-[28px]">
                {SKILLS.map((segments, i) => (
                  <li key={i}>
                    {segments.map((seg, j) => (
                      <span key={j} className={seg.i ? "italic" : "not-italic"}>
                        {seg.t}
                      </span>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Contact />
    </>
  );
}
