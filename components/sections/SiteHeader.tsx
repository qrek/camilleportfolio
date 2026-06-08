import Link from "next/link";
import Image from "next/image";

const NAV = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex w-full items-center justify-between px-5 py-6 sm:px-8 lg:px-20">
        <Link href="/" aria-label="Accueil">
          <Image
            src="/logo-mark.svg"
            alt="Camille Ameline de Cadeville"
            width={48}
            height={18}
            unoptimized
            className="h-7 w-auto sm:h-8"
          />
        </Link>
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
      </nav>
    </header>
  );
}
