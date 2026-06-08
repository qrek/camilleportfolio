import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact — Camille Ameline de Cadeville",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="px-5 pb-28 pt-36 sm:px-8 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <Reveal variant="up">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Contact
            </p>
            <h1 className="mt-6 font-serif text-5xl italic leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Let&apos;s work
              <br />
              together
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-[1.5] text-muted">
              Un projet, une collaboration ou simplement une question ? Écrivez-moi
              via le formulaire, je vous réponds rapidement.
            </p>
          </Reveal>

          <Reveal variant="up" delay={140}>
            <ContactForm />
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
