import Link from "next/link";
import Image from "next/image";

const NAV = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex w-full items-center justify-between px-5 py-6 sm:px-8 lg:px-20">
        <div className="flex items-center gap-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-fg/30 px-4 py-1.5 text-sm font-medium text-fg transition-opacity hover:opacity-60"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link href="/" aria-label="Accueil">
          <Image
            src="/logo-mark.svg"
            alt="Camille Ameline de Cadeville"
            width={48}
            height={18}
            unoptimized
            className="h-4 w-auto"
          />
        </Link>
      </nav>
    </header>
  );
}
