import Link from "next/link";
import { CamLogo } from "@/components/ui/CamLogo";

export function Contact() {
  return (
    <footer
      id="contact"
      className="relative mt-12 w-full overflow-hidden rounded-t-[2.5rem] bg-accent text-white"
    >
      <div className="w-full px-5 pb-40 pt-24 sm:px-8 lg:px-20">
        <div className="flex flex-col items-start gap-5 md:items-end md:text-right">
          <h2 className="font-serif text-5xl font-normal italic leading-[0.88] sm:text-6xl">
            Want to talk ?
          </h2>
          <Link
            href="mailto:hello@camille.com"
            className="inline-flex items-center gap-2 text-2xl font-medium underline-offset-8 transition hover:underline"
          >
            Let&apos;s talk <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {/* Grand logotype CAM (vecteurs) blanc, débordant en bas. */}
      <CamLogo className="pointer-events-none absolute -bottom-[12%] left-1/2 w-[64%] -translate-x-1/2 select-none text-white" />
    </footer>
  );
}
