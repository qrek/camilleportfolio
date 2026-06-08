import Image from "next/image";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SkillsList } from "@/components/ui/SkillsList";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";

export const metadata: Metadata = {
  title: "About — Camille Ameline de Cadeville",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-28">
        {/* Intro : portrait + présentation */}
        <section className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[3/4] w-full max-h-[80vh] overflow-hidden md:max-h-none">
            <Parallax cover speed={0.1}>
              <Image
                src="/about-portrait.jpg"
                alt="Camille Ameline de Cadeville"
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </Parallax>
          </div>

          <div className="px-5 sm:px-8 lg:pr-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              About
            </p>
            <h1 className="mt-6 font-serif text-5xl font-normal italic leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Hey, my name is Camille, and i&apos;m an Art director + Motion
              designer based in Paris.
            </h1>
          </div>
        </section>

        {/* What i do */}
        <Reveal>
          <section className="px-5 py-28 sm:px-8 lg:px-20">
            <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
              <h2 className="font-serif text-6xl italic leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
                <span className="block">What</span>
                <span className="block">i do ?</span>
              </h2>

              <SkillsList />
            </div>
          </section>
        </Reveal>
      </main>

      <SiteFooter />
    </>
  );
}
