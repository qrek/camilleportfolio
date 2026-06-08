import Link from "next/link";
import { CamLogo } from "@/components/ui/CamLogo";
import { Email } from "@/components/ui/Email";

/** Footer « Let's discuss » partagé (accueil + about). */
export function SiteFooter() {
  return (
    <footer className="relative mt-12 w-full overflow-hidden rounded-t-[2.5rem] bg-royal text-white">
      <div className="relative z-10 px-5 py-24 sm:px-8 lg:px-20">
        <div className="ml-auto w-full max-w-xl">
          <h2 className="font-serif text-5xl italic leading-[0.9] sm:text-6xl lg:text-7xl">
            Let&apos;s discuss !
          </h2>
          <div className="mt-14 grid max-w-md grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Contact
              </p>
              <div className="mt-5 space-y-1.5 text-sm text-white/80">
                <p>Based in Paris</p>
                <Email className="block transition-colors hover:text-white" />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Connect
              </p>
              <div className="mt-5 flex flex-col items-start gap-3">
                <Link
                  href="https://instagram.com"
                  className="rounded-md border border-white/50 px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors hover:bg-white/10"
                >
                  Instagram
                </Link>
                <Link
                  href="https://linkedin.com"
                  className="rounded-md border border-white/50 px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors hover:bg-white/10"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grand logotype CAM blanc, débordant en bas à gauche. */}
      <CamLogo className="pointer-events-none absolute -bottom-[8%] -left-[6%] w-[42%] select-none text-white" />
    </footer>
  );
}
